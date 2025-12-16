import { redirect } from 'next/navigation';
import { SEOHead } from '@/components/seo-head';
import { supabase } from '@/integrations/supabase/client';
import { CreateEventForm } from './_components/create-event-form';

export default async function CreateEventPage() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/auth');
  }

  return (
    <>
      <SEOHead
        title="Create Event"
        description="Create and publish a new event for your community to discover and join"
      />
      <CreateEventForm user={session.user} />
    </>
  );
}
