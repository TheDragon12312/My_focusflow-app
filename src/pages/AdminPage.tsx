import React from 'react';
import { AccessControl } from '@/components/auth/AccessControl';
import { AdminDashboard } from '@/components/admin/AdminDashboard';

export default function AdminPage() {
  return (
    <AccessControl requireAdmin={true}>
      <AdminDashboard />
    </AccessControl>
  );
}