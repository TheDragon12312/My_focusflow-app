import { supabase } from "@/integrations/supabase/client";

export type PlanType = "free" | "pro" | "team";
export type SubscriptionStatus = "active" | "cancelled" | "past_due" | "trial";

export interface UserProfile {
  id: string;
  plan: PlanType;
  is_admin: boolean;
  full_name?: string;
  avatar_url?: string;
  subscription_id?: string;
  subscription_status: SubscriptionStatus;
  subscription_expires_at?: string;
  trial_ends_at?: string;
  created_at: string;
  updated_at: string;
}

export interface PlanFeatures {
  maxFocusSessionsPerDay: number | null; // null = unlimited
  hasAICoach: boolean;
  hasAdvancedStats: boolean;
  hasCalendarIntegration: boolean;
  hasDistractionBlocking: boolean;
  hasTeamCollaboration: boolean;
  hasSharedStats: boolean;
  hasAdminDashboard: boolean;
  hasSSOIntegration: boolean;
  supportType: "email" | "priority" | "dedicated";
}

// Plan configurations
export const PLAN_FEATURES: Record<PlanType, PlanFeatures> = {
  free: {
    maxFocusSessionsPerDay: 5,
    hasAICoach: false,
    hasAdvancedStats: false,
    hasCalendarIntegration: false,
    hasDistractionBlocking: false,
    hasTeamCollaboration: false,
    hasSharedStats: false,
    hasAdminDashboard: false,
    hasSSOIntegration: false,
    supportType: "email",
  },
  pro: {
    maxFocusSessionsPerDay: null, // unlimited
    hasAICoach: true,
    hasAdvancedStats: true,
    hasCalendarIntegration: true,
    hasDistractionBlocking: true,
    hasTeamCollaboration: false,
    hasSharedStats: false,
    hasAdminDashboard: false,
    hasSSOIntegration: false,
    supportType: "priority",
  },
  team: {
    maxFocusSessionsPerDay: null, // unlimited
    hasAICoach: true,
    hasAdvancedStats: true,
    hasCalendarIntegration: true,
    hasDistractionBlocking: true,
    hasTeamCollaboration: true,
    hasSharedStats: true,
    hasAdminDashboard: true,
    hasSSOIntegration: true,
    supportType: "dedicated",
  },
};

export const PLAN_DESCRIPTIONS = {
  free: {
    name: "Free",
    description: "Get started with basic productivity features",
    price: 0,
    features: [
      "Up to 5 focus sessions per day",
      "Basic statistics",
      "Simple timer",
      "Email support",
    ],
  },
  pro: {
    name: "Pro",
    description: "Unlock advanced features and AI coaching",
    price: 9.99,
    features: [
      "Unlimited focus sessions",
      "AI productivity coach",
      "Advanced statistics",
      "Calendar integration",
      "Distraction blocking",
      "Priority support",
    ],
  },
  team: {
    name: "Team",
    description: "Everything in Pro plus team collaboration",
    price: 19.99,
    features: [
      "Everything in Pro",
      "Team collaboration",
      "Shared statistics",
      "Admin dashboard",
      "SSO integration",
      "Dedicated support",
    ],
  },
};

class SubscriptionService {
  // Helper functions for checking user roles
  isProUser(user: UserProfile | null): boolean {
    return user?.plan === "pro" || user?.plan === "team";
  }

  isTeamUser(user: UserProfile | null): boolean {
    return user?.plan === "team";
  }

  isAdmin(user: UserProfile | null): boolean {
    return user?.is_admin === true;
  }

  isPaidUser(user: UserProfile | null): boolean {
    return this.isProUser(user) || this.isTeamUser(user);
  }

  // Feature access control
  hasAccessTo(
    featureName: keyof PlanFeatures,
    user: UserProfile | null,
  ): boolean {
    if (!user) return false;

    // Admins have access to everything
    if (this.isAdmin(user)) return true;

    const planFeatures = PLAN_FEATURES[user.plan];
    const hasFeature = planFeatures[featureName];

    // Handle special case for boolean features
    if (typeof hasFeature === "boolean") {
      return hasFeature;
    }

    // Handle special case for maxFocusSessionsPerDay
    if (featureName === "maxFocusSessionsPerDay") {
      return true; // They have access to focus sessions, just check limits separately
    }

    return false;
  }

  // Check focus session limits
  async canCreateFocusSession(user: UserProfile | null): Promise<boolean> {
    if (!user) return false;

    // Unlimited for pro/team users
    if (this.isProUser(user)) return true;

    // Check daily limit for free users
    const maxSessions = PLAN_FEATURES[user.plan].maxFocusSessionsPerDay;
    if (maxSessions === null) return true;

    // Count today's sessions
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);

    try {
      const { count, error } = await supabase
        .from("focus_blocks")
        .select("*", { count: "exact", head: true })
        .eq("user_id", user.id)
        .gte("created_at", today.toISOString())
        .lt("created_at", tomorrow.toISOString());

      if (error) {
        console.error("Error checking focus session count:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
          status: error.status,
          fullError: error,
        });
        return false;
      }

      return (count || 0) < maxSessions;
    } catch (error) {
      console.error("Error checking focus session limit:", {
        message: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined,
        fullError: error,
      });
      return false;
    }
  }

  // Get user profile
  async getUserProfile(): Promise<UserProfile | null> {
    try {
      const {
        data: { user },
      } = await supabase.auth.getUser();
      if (!user) return null;

      const { data: profile, error } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .single();

      if (error) {
        console.error("Error fetching user profile:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
          status: error.status,
          fullError: error,
        });
        return null;
      }

      return profile;
    } catch (error) {
      console.error("Error getting user profile:", {
        message: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined,
        fullError: error,
      });
      return null;
    }
  }

  // Update user plan
  async updateUserPlan(
    userId: string,
    plan: PlanType,
    subscriptionData?: {
      subscription_id?: string;
      subscription_status?: SubscriptionStatus;
      subscription_expires_at?: string;
    },
  ): Promise<boolean> {
    try {
      const updateData: any = { plan };

      if (subscriptionData) {
        Object.assign(updateData, subscriptionData);
      }

      const { error } = await supabase
        .from("profiles")
        .update(updateData)
        .eq("id", userId);

      if (error) {
        console.error("Error updating user plan:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
          status: error.status,
          fullError: error,
        });
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error updating user plan:", {
        message: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined,
        fullError: error,
      });
      return false;
    }
  }

  // Admin functions
  async addAdmin(email: string): Promise<boolean> {
    try {
      // First check if current user is admin
      const currentProfile = await this.getUserProfile();
      if (!this.isAdmin(currentProfile)) {
        console.error("Only admins can add other admins");
        return false;
      }

      // Find user by email
      const { data: users, error: userError } =
        await supabase.auth.admin.listUsers();
      if (userError) {
        console.error("Error listing users:", {
          message: userError.message,
          details: userError.details,
          hint: userError.hint,
          code: userError.code,
          status: userError.status,
          fullError: userError,
        });
        return false;
      }

      const targetUser = users.users.find((u) => u.email === email);
      if (!targetUser) {
        console.error("User not found with email:", email);
        return false;
      }

      // Update user to be admin
      const { error } = await supabase
        .from("profiles")
        .update({ is_admin: true })
        .eq("id", targetUser.id);

      if (error) {
        console.error("Error making user admin:", {
          message: error.message,
          details: error.details,
          hint: error.hint,
          code: error.code,
          status: error.status,
          fullError: error,
        });
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error adding admin:", {
        message: error instanceof Error ? error.message : error,
        stack: error instanceof Error ? error.stack : undefined,
        fullError: error,
      });
      return false;
    }
  }

  async removeAdmin(userId: string): Promise<boolean> {
    try {
      // Check if current user is admin
      const currentProfile = await this.getUserProfile();
      if (!this.isAdmin(currentProfile)) {
        console.error("Only admins can remove admin privileges");
        return false;
      }

      // Don't allow removing admin from the original admin
      const { data: targetProfile } = await supabase
        .from("profiles")
        .select("*")
        .eq("id", userId)
        .single();

      // Get user email to check if it's the original admin
      const {
        data: { user },
      } = await supabase.auth.admin.getUserById(userId);
      if (user?.email === "djuliusvdijk@protonmail.com") {
        console.error("Cannot remove admin privileges from original admin");
        return false;
      }

      const { error } = await supabase
        .from("profiles")
        .update({ is_admin: false })
        .eq("id", userId);

      if (error) {
        console.error("Error removing admin:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error removing admin:", error);
      return false;
    }
  }

  // Get all users (admin only)
  async getAllUsers(): Promise<UserProfile[]> {
    try {
      const currentProfile = await this.getUserProfile();
      if (!this.isAdmin(currentProfile)) {
        console.error("Only admins can view all users");
        return [];
      }

      const { data: profiles, error } = await supabase
        .from("profiles")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) {
        console.error("Error fetching all users:", error);
        return [];
      }

      return profiles || [];
    } catch (error) {
      console.error("Error getting all users:", error);
      return [];
    }
  }

  // Plan upgrade/downgrade
  async requestPlanUpgrade(plan: PlanType): Promise<string> {
    // Return Paddle checkout URL or redirect to checkout page
    const checkoutUrl = `/checkout?plan=${plan}&cycle=monthly`;
    return checkoutUrl;
  }

  // Feature limits and usage
  getFeatureLimits(user: UserProfile | null): PlanFeatures {
    if (!user) return PLAN_FEATURES.free;
    return PLAN_FEATURES[user.plan];
  }

  getPlanDescription(plan: PlanType) {
    return PLAN_DESCRIPTIONS[plan];
  }

  // Trial management
  async startTrial(
    userId: string,
    durationDays: number = 14,
  ): Promise<boolean> {
    try {
      const trialEndsAt = new Date();
      trialEndsAt.setDate(trialEndsAt.getDate() + durationDays);

      const { error } = await supabase
        .from("profiles")
        .update({
          plan: "pro",
          subscription_status: "trial",
          trial_ends_at: trialEndsAt.toISOString(),
        })
        .eq("id", userId);

      if (error) {
        console.error("Error starting trial:", error);
        return false;
      }

      return true;
    } catch (error) {
      console.error("Error starting trial:", error);
      return false;
    }
  }

  async isTrialExpired(user: UserProfile | null): Promise<boolean> {
    if (!user || user.subscription_status !== "trial" || !user.trial_ends_at) {
      return false;
    }

    return new Date(user.trial_ends_at) < new Date();
  }
}

export const subscriptionService = new SubscriptionService();

// Make available globally for debugging
if (typeof window !== "undefined") {
  (window as any).subscriptionService = subscriptionService;
}
