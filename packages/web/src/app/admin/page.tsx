import { redirect } from 'next/navigation';
import { supabase } from '@/integrations/supabase/client';
import { SEOHead } from '@/components/seo-head';
import { AdminDashboard } from './_components/admin-dashboard';
import { adminService } from './_services/admin.service';
import { Event } from '../_types/event';

export const revalidate = 0;

export default async function AdminPage() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth');
  }

  const isAdmin = await adminService.isAdmin(session.user.id);
  if (!isAdmin) {
    redirect('/');
  }

  const { data: events } = await supabase.from('events').select('*');

  return (
    <div className="min-h-screen bg-white p-8">
      <SEOHead
        title="Admin Dashboard"
        description="Manage events and content for your event platform"
      />
      <AdminDashboard
        initialEvents={(events as Event[]) || []}
        user={session.user}
      />
    </div>
  );
}
