import { supabase } from '@/integrations/supabase/client';
import type { User } from '@supabase/supabase-js';

export type PlanType = 'free' | 'pro' | 'team';

export interface SubscriptionFeatures {
  maxFocusSessions: number; // -1 voor unlimited
  aiCoaching: boolean;
  teamCollaboration: boolean;
  advancedStatistics: boolean;
  calendarIntegration: boolean;
  distractionBlocking: boolean;
  prioritySupport: boolean;
  ssoIntegration: boolean;
  adminDashboard: boolean;
}

export interface UserSubscription {
  userId: string;
  tier: PlanType;
  status: string;
  features: SubscriptionFeatures;
}

export interface UserProfile {
  id: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  subscription_type?: string;
  team_id?: string;
  created_at?: string;
  updated_at?: string;
}

class SubscriptionService {
  // Plan definitietie zoals gevraagd
  private readonly PLAN_FEATURES: Record<PlanType, SubscriptionFeatures> = {
    free: {
      maxFocusSessions: 5,
      aiCoaching: false,
      teamCollaboration: false,
      advancedStatistics: false,
      calendarIntegration: false,
      distractionBlocking: false,
      prioritySupport: false,
      ssoIntegration: false,
      adminDashboard: false,
    },
    pro: {
      maxFocusSessions: -1, // unlimited
      aiCoaching: true,
      teamCollaboration: false,
      advancedStatistics: true,
      calendarIntegration: true,
      distractionBlocking: true,
      prioritySupport: true,
      ssoIntegration: false,
      adminDashboard: false,
    },
    team: {
      maxFocusSessions: -1, // unlimited
      aiCoaching: true,
      teamCollaboration: true,
      advancedStatistics: true,
      calendarIntegration: true,
      distractionBlocking: true,
      prioritySupport: true,
      ssoIntegration: true,
      adminDashboard: true,
    },
  };

  /**
   * Haal de gebruiker subscription informatie op
   */
  async getUserSubscription(userId?: string): Promise<UserSubscription | null> {
    try {
      const targetUserId = userId || (await supabase.auth.getUser()).data.user?.id;
      
      if (!targetUserId) {
        return {
          userId: '',
          tier: 'free',
          status: 'active',
          features: this.PLAN_FEATURES.free,
        };
      }

      const { data, error } = await supabase
        .from('subscriptions')
        .select('user_id, plan_type, status')
        .eq('user_id', targetUserId)
        .eq('status', 'active')
        .single();

      if (error) {
        console.error('Error fetching user subscription:', error);
        // Fallback naar free plan
        return {
          userId: targetUserId,
          tier: 'free',
          status: 'active',
          features: this.PLAN_FEATURES.free,
        };
      }

      // Map plan_type to tier
      let tier: PlanType = 'free';
      if (data.plan_type?.includes('pro')) {
        tier = 'pro';
      } else if (data.plan_type?.includes('team')) {
        tier = 'team';
      }

      return {
        userId: data.user_id,
        tier,
        status: data.status || 'active',
        features: this.PLAN_FEATURES[tier],
      };
    } catch (error) {
      console.error('Error in getUserSubscription:', error);
      return null;
    }
  }

  /**
   * Haal gebruiker profiel op inclusief admin status
   */
  async getUserProfile(userId?: string): Promise<UserProfile | null> {
    try {
      const targetUserId = userId || (await supabase.auth.getUser()).data.user?.id;
      
      if (!targetUserId) {
        throw new Error('User not authenticated');
      }

      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', targetUserId)
        .single();

      if (error) {
        console.error('Error fetching user profile:', error);
        return null;
      }

      return data;
    } catch (error) {
      console.error('Error in getUserProfile:', error);
      return null;
    }
  }

  /**
   * Check of gebruiker toegang heeft tot een specifieke feature
   */
  async hasAccessTo(featureName: keyof SubscriptionFeatures, user?: User): Promise<boolean> {
    try {
      const subscription = await this.getUserSubscription(user?.id);
      
      if (!subscription) {
        return false;
      }

      const featureValue = subscription.features[featureName];
      
      // Voor maxFocusSessions check we of het > 0 of -1 (unlimited)
      if (featureName === 'maxFocusSessions') {
        return typeof featureValue === 'number' && (featureValue > 0 || featureValue === -1);
      }
      
      // Voor andere features verwachten we boolean values
      return Boolean(featureValue);
    } catch (error) {
      console.error('Error in hasAccessTo:', error);
      return false;
    }
  }

  /**
   * Check of gebruiker Pro gebruiker is
   */
  async isProUser(user?: User): Promise<boolean> {
    const subscription = await this.getUserSubscription(user?.id);
    return subscription?.tier === 'pro';
  }

  /**
   * Check of gebruiker Team gebruiker is
   */
  async isTeamUser(user?: User): Promise<boolean> {
    const subscription = await this.getUserSubscription(user?.id);
    return subscription?.tier === 'team';
  }

  /**
   * Check of gebruiker admin is
   */
  async isAdmin(user?: User): Promise<boolean> {
    // Voor nu, check of de gebruiker het admin e-mailadres heeft
    // Later kan dit uitgebreid worden als is_admin kolom aan profiles is toegevoegd
    const currentUser = user || (await supabase.auth.getUser()).data.user;
    return currentUser?.email === 'djuliusvdijk@protonmail.com';
  }

  /**
   * Check of gebruiker nieuwe focus sessie kan starten
   */
  async canStartFocusSession(userId?: string): Promise<boolean> {
    try {
      const targetUserId = userId || (await supabase.auth.getUser()).data.user?.id;
      
      if (!targetUserId) {
        return false;
      }

      const subscription = await this.getUserSubscription(targetUserId);
      
      if (!subscription) {
        return false;
      }

      const maxSessions = subscription.features.maxFocusSessions;
      
      // Als unlimited (-1), altijd toestaan
      if (maxSessions === -1) {
        return true;
      }

      // Check huidige dagelijkse sessies
      const currentSessions = await this.getDailyFocusSessionCount(targetUserId);
      
      return currentSessions < maxSessions;
    } catch (error) {
      console.error('Error in canStartFocusSession:', error);
      return false;
    }
  }

  /**
   * Haal dagelijkse focus sessie telling op
   */
  async getDailyFocusSessionCount(userId?: string, date?: Date): Promise<number> {
    try {
      const targetUserId = userId || (await supabase.auth.getUser()).data.user?.id;
      
      if (!targetUserId) {
        return 0;
      }

      const checkDate = date ? date.toISOString().split('T')[0] : new Date().toISOString().split('T')[0];

      const { data, error } = await supabase
        .from('focus_blocks')
        .select('id')
        .eq('user_id', targetUserId)
        .eq('status', 'completed')
        .gte('created_at', checkDate + 'T00:00:00.000Z')
        .lte('created_at', checkDate + 'T23:59:59.999Z');

      if (error) {
        console.error('Error getting daily focus session count:', error);
        return 0;
      }

      return data?.length || 0;
    } catch (error) {
      console.error('Error in getDailyFocusSessionCount:', error);
      return 0;
    }
  }

  /**
   * Admin functie: voeg admin toe
   */
  async addAdmin(email: string): Promise<boolean> {
    try {
      // Check of huidige gebruiker admin is
      const isCurrentUserAdmin = await this.isAdmin();
      
      if (!isCurrentUserAdmin) {
        throw new Error('Only admins can add other admins');
      }

      // Zoek gebruiker op via email
      const { data: targetUser, error: userError } = await supabase
        .from('profiles')
        .select('id')
        .eq('email', email)
        .single();

      if (userError || !targetUser) {
        throw new Error(`User with email ${email} not found`);
      }

      // Voor nu return true omdat we nog geen is_admin kolom hebben
      // Later: update de gebruiker om admin te maken
      console.log(`Would make ${email} an admin (functionality pending database update)`);
      return true;
    } catch (error) {
      console.error('Error in addAdmin:', error);
      throw error;
    }
  }

  /**
   * Haal plan features op voor een specifiek plan type
   */
  getPlanFeatures(planType: PlanType): SubscriptionFeatures {
    return this.PLAN_FEATURES[planType];
  }

  /**
   * Haal alle beschikbare plan types op
   */
  getAvailablePlans(): PlanType[] {
    return Object.keys(this.PLAN_FEATURES) as PlanType[];
  }
}

// Singleton instance
export const subscriptionService = new SubscriptionService();

// Export helper functions voor gemakkelijk gebruik
export const isProUser = (user?: User) => subscriptionService.isProUser(user);
export const isTeamUser = (user?: User) => subscriptionService.isTeamUser(user);
export const isAdmin = (user?: User) => subscriptionService.isAdmin(user);
export const hasAccessTo = (featureName: keyof SubscriptionFeatures, user?: User) => 
  subscriptionService.hasAccessTo(featureName, user);
export const addAdmin = (email: string) => subscriptionService.addAdmin(email);