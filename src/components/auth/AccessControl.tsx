import React, { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { subscriptionService, SubscriptionFeatures, PlanType } from '@/services/subscriptionService';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Shield, Crown, Users } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface AccessControlProps {
  children: React.ReactNode;
  requireFeature?: keyof SubscriptionFeatures;
  requirePlan?: PlanType;
  requireAdmin?: boolean;
  fallback?: React.ReactNode;
  redirectTo?: string;
}

export const AccessControl: React.FC<AccessControlProps> = ({
  children,
  requireFeature,
  requirePlan,
  requireAdmin = false,
  fallback,
  redirectTo,
}) => {
  const { user, isInitialized } = useAuth();
  const navigate = useNavigate();
  const [hasAccess, setHasAccess] = useState<boolean | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const checkAccess = async () => {
      if (!isInitialized || !user) {
        setHasAccess(false);
        setIsLoading(false);
        return;
      }

      try {
        let accessGranted = true;

        // Check admin requirement
        if (requireAdmin) {
          const isAdminUser = await subscriptionService.isAdmin(user);
          if (!isAdminUser) {
            accessGranted = false;
          }
        }

        // Check plan requirement
        if (requirePlan && accessGranted) {
          const subscription = await subscriptionService.getUserSubscription(user.id);
          const userTier = subscription?.tier || 'free';
          
          // Define plan hierarchy: free < pro < team
          const planHierarchy: Record<PlanType, number> = {
            free: 0,
            pro: 1,
            team: 2,
          };
          
          if (planHierarchy[userTier] < planHierarchy[requirePlan]) {
            accessGranted = false;
          }
        }

        // Check feature requirement
        if (requireFeature && accessGranted) {
          const hasFeatureAccess = await subscriptionService.hasAccessTo(requireFeature, user);
          if (!hasFeatureAccess) {
            accessGranted = false;
          }
        }

        setHasAccess(accessGranted);
      } catch (error) {
        console.error('Error checking access:', error);
        setHasAccess(false);
      } finally {
        setIsLoading(false);
      }
    };

    checkAccess();
  }, [user, isInitialized, requireFeature, requirePlan, requireAdmin]);

  // Loading state
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  // No access
  if (!hasAccess) {
    if (redirectTo) {
      navigate(redirectTo);
      return null;
    }

    if (fallback) {
      return <>{fallback}</>;
    }

    return <AccessDeniedMessage 
      requireFeature={requireFeature}
      requirePlan={requirePlan}
      requireAdmin={requireAdmin}
    />;
  }

  // Access granted
  return <>{children}</>;
};

interface AccessDeniedMessageProps {
  requireFeature?: keyof SubscriptionFeatures;
  requirePlan?: PlanType;
  requireAdmin?: boolean;
}

const AccessDeniedMessage: React.FC<AccessDeniedMessageProps> = ({
  requireFeature,
  requirePlan,
  requireAdmin,
}) => {
  const navigate = useNavigate();

  const getIcon = () => {
    if (requireAdmin) return <Shield className="h-6 w-6" />;
    if (requirePlan === 'team') return <Users className="h-6 w-6" />;
    if (requirePlan === 'pro') return <Crown className="h-6 w-6" />;
    return <Shield className="h-6 w-6" />;
  };

  const getTitle = () => {
    if (requireAdmin) return 'Admin toegang vereist';
    if (requirePlan === 'team') return 'Team abonnement vereist';
    if (requirePlan === 'pro') return 'Pro abonnement vereist';
    if (requireFeature) return 'Premium functie';
    return 'Toegang geweigerd';
  };

  const getDescription = () => {
    if (requireAdmin) {
      return 'Deze functie is alleen beschikbaar voor administrators.';
    }
    if (requirePlan === 'team') {
      return 'Upgrade naar een Team abonnement om toegang te krijgen tot team samenwerking functies.';
    }
    if (requirePlan === 'pro') {
      return 'Upgrade naar een Pro abonnement om toegang te krijgen tot geavanceerde functies.';
    }
    if (requireFeature) {
      return `De functie "${requireFeature}" is niet beschikbaar in je huidige abonnement.`;
    }
    return 'Je hebt geen toegang tot deze functie.';
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8 text-center">
      <div className="mb-4 p-3 rounded-full bg-muted">
        {getIcon()}
      </div>
      
      <h2 className="text-2xl font-bold mb-2">{getTitle()}</h2>
      
      <Alert className="max-w-md mb-6">
        <AlertDescription>
          {getDescription()}
        </AlertDescription>
      </Alert>

      <div className="flex gap-3">
        {!requireAdmin && (
          <Button onClick={() => navigate('/pricing')}>
            Bekijk abonnementen
          </Button>
        )}
        
        <Button variant="outline" onClick={() => navigate('/dashboard')}>
          Terug naar dashboard
        </Button>
      </div>
    </div>
  );
};

// HOC voor component wrapping
export function withAccessControl<P extends object>(
  Component: React.ComponentType<P>,
  accessConfig: Omit<AccessControlProps, 'children'>
) {
  return (props: P) => (
    <AccessControl {...accessConfig}>
      <Component {...props} />
    </AccessControl>
  );
}

// Utility hooks
export const useAccessControl = () => {
  const { user } = useAuth();
  
  return {
    checkFeatureAccess: (feature: keyof SubscriptionFeatures) => 
      subscriptionService.hasAccessTo(feature, user),
    
    checkPlanAccess: async (plan: PlanType) => {
      const subscription = await subscriptionService.getUserSubscription(user?.id);
      const userTier = subscription?.tier || 'free';
      const planHierarchy: Record<PlanType, number> = { free: 0, pro: 1, team: 2 };
      return planHierarchy[userTier] >= planHierarchy[plan];
    },
    
    checkAdminAccess: () => subscriptionService.isAdmin(user),
    
    isProUser: () => subscriptionService.isProUser(user),
    isTeamUser: () => subscriptionService.isTeamUser(user),
  };
};