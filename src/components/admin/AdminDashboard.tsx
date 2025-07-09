import React, { useState, useEffect } from 'react';
import { supabase } from '@/integrations/supabase/client';
import { subscriptionService, PlanType, UserProfile } from '@/services/subscriptionService';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { toast } from 'sonner';
import { 
  Users, 
  Crown, 
  Shield, 
  UserPlus, 
  BarChart3, 
  DollarSign,
  Activity 
} from 'lucide-react';

interface AdminStats {
  totalUsers: number;
  freeUsers: number;
  proUsers: number;
  teamUsers: number;
  totalRevenue: number;
  activeSubscriptions: number;
}

interface UserWithSubscription extends UserProfile {
  subscription?: {
    tier: PlanType;
    status: string;
    plan_type: string;
  };
}

export const AdminDashboard: React.FC = () => {
  const [stats, setStats] = useState<AdminStats>({
    totalUsers: 0,
    freeUsers: 0,
    proUsers: 0,
    teamUsers: 0,
    totalRevenue: 0,
    activeSubscriptions: 0,
  });
  const [users, setUsers] = useState<UserWithSubscription[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [newAdminEmail, setNewAdminEmail] = useState('');
  const [isAddingAdmin, setIsAddingAdmin] = useState(false);

  useEffect(() => {
    loadDashboardData();
  }, []);

  const loadDashboardData = async () => {
    try {
      setIsLoading(true);
      await Promise.all([
        loadStats(),
        loadUsers(),
      ]);
    } catch (error) {
      console.error('Error loading dashboard data:', error);
      toast.error('Fout bij laden van dashboard gegevens');
    } finally {
      setIsLoading(false);
    }
  };

  const loadStats = async () => {
    try {
      // Get total users
      const { count: totalUsers } = await supabase
        .from('profiles')
        .select('*', { count: 'exact', head: true });

      // Get subscription stats
      const { data: subscriptions } = await supabase
        .from('subscriptions')
        .select('status, plan_type')
        .eq('status', 'active');

      const freeUsers = subscriptions?.filter(s => !s.plan_type || s.plan_type.includes('free')).length || 0;
      const proUsers = subscriptions?.filter(s => s.plan_type?.includes('pro')).length || 0;
      const teamUsers = subscriptions?.filter(s => s.plan_type?.includes('team')).length || 0;

      setStats({
        totalUsers: totalUsers || 0,
        freeUsers,
        proUsers,
        teamUsers,
        totalRevenue: 0, // This would need to be calculated from payment data
        activeSubscriptions: subscriptions?.length || 0,
      });
    } catch (error) {
      console.error('Error loading stats:', error);
    }
  };

  const loadUsers = async () => {
    try {
      // Get users with their subscription info
      const { data: profiles } = await supabase
        .from('profiles')
        .select('*')
        .order('created_at', { ascending: false })
        .limit(100);

      if (!profiles) return;

      // Get subscription data for users
      const userIds = profiles.map(p => p.id);
      const { data: subscriptions } = await supabase
        .from('subscriptions')
        .select('user_id, status, plan_type')
        .in('user_id', userIds)
        .eq('status', 'active');

      // Combine user and subscription data
      const usersWithSubscriptions: UserWithSubscription[] = profiles.map(profile => {
        const subscription = subscriptions?.find(s => s.user_id === profile.id);
        
        // Map plan_type to tier
        let tier: PlanType = 'free';
        if (subscription?.plan_type?.includes('pro')) {
          tier = 'pro';
        } else if (subscription?.plan_type?.includes('team')) {
          tier = 'team';
        }
        
        return {
          ...profile,
          subscription: subscription ? {
            tier,
            status: subscription.status,
            plan_type: subscription.plan_type,
          } : undefined,
        };
      });

      setUsers(usersWithSubscriptions);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleAddAdmin = async () => {
    if (!newAdminEmail.trim()) {
      toast.error('Voer een geldig e-mailadres in');
      return;
    }

    try {
      setIsAddingAdmin(true);
      await subscriptionService.addAdmin(newAdminEmail.trim());
      toast.success(`${newAdminEmail} is nu admin`);
      setNewAdminEmail('');
      await loadUsers(); // Refresh user list
    } catch (error) {
      console.error('Error adding admin:', error);
      toast.error(error instanceof Error ? error.message : 'Fout bij toevoegen admin');
    } finally {
      setIsAddingAdmin(false);
    }
  };

  const getPlanBadgeColor = (tier?: PlanType) => {
    switch (tier) {
      case 'pro': return 'bg-blue-100 text-blue-800';
      case 'team': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getPlanIcon = (tier?: PlanType) => {
    switch (tier) {
      case 'pro': return <Crown className="h-4 w-4" />;
      case 'team': return <Users className="h-4 w-4" />;
      default: return null;
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Admin Dashboard</h1>
          <p className="text-muted-foreground">
            Beheer gebruikers, abonnementen en systeeminstellingen
          </p>
        </div>

        <Dialog>
          <DialogTrigger asChild>
            <Button>
              <UserPlus className="h-4 w-4 mr-2" />
              Admin toevoegen
            </Button>
          </DialogTrigger>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Nieuwe admin toevoegen</DialogTitle>
            </DialogHeader>
            <div className="space-y-4">
              <Input
                placeholder="E-mailadres"
                value={newAdminEmail}
                onChange={(e) => setNewAdminEmail(e.target.value)}
                type="email"
              />
              <Button 
                onClick={handleAddAdmin}
                disabled={isAddingAdmin}
                className="w-full"
              >
                {isAddingAdmin ? 'Toevoegen...' : 'Admin maken'}
              </Button>
            </div>
          </DialogContent>
        </Dialog>
      </div>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Totaal gebruikers</CardTitle>
            <Users className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.totalUsers}</div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Actieve abonnementen</CardTitle>
            <Activity className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stats.activeSubscriptions}</div>
            <div className="text-xs text-muted-foreground mt-1">
              Pro: {stats.proUsers} | Team: {stats.teamUsers}
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Conversion rate</CardTitle>
            <BarChart3 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              {stats.totalUsers > 0 
                ? Math.round(((stats.proUsers + stats.teamUsers) / stats.totalUsers) * 100)
                : 0}%
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Van free naar betaald
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium">Omzet (geschat)</CardTitle>
            <DollarSign className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">
              €{((stats.proUsers * 19) + (stats.teamUsers * 49)).toLocaleString()}
            </div>
            <div className="text-xs text-muted-foreground mt-1">
              Maandelijks geschat
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Users Table */}
      <Card>
        <CardHeader>
          <CardTitle>Gebruikers overzicht</CardTitle>
        </CardHeader>
        <CardContent>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Naam</TableHead>
                <TableHead>E-mail</TableHead>
                <TableHead>Abonnement</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Aangemeld</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell className="font-medium">
                    <div className="flex items-center gap-2">
                      {user.full_name}
                      {user.email === 'djuliusvdijk@protonmail.com' && (
                        <Badge variant="secondary" className="text-xs">
                          <Shield className="h-3 w-3 mr-1" />
                          Admin
                        </Badge>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{user.email}</TableCell>
                  <TableCell>
                    <Badge className={getPlanBadgeColor(user.subscription?.tier)}>
                      <div className="flex items-center gap-1">
                        {getPlanIcon(user.subscription?.tier)}
                        {user.subscription?.tier || 'free'}
                      </div>
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Badge variant={user.subscription?.status === 'active' ? 'default' : 'secondary'}>
                      {user.subscription?.status || 'free'}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {user.created_at ? new Date(user.created_at).toLocaleDateString('nl-NL') : '-'}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
};