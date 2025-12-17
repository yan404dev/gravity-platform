import { redirect } from 'next/navigation';
import { SEOHead } from '@/components/seo-head';
import { supabase } from '@/integrations/supabase/client';
import { MyEventsList } from './_components/my-events-list';
import { myEventsService } from './_services/my-events.service';

export const revalidate = 0;

export default async function MyEventsPage() {
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session) {
    redirect('/');
  }

  // Parallel data fetching
  const [createdEvents, registeredEvents] = await Promise.all([
    myEventsService.getCreatedEvents(session.user.id),
    myEventsService.getRegisteredEvents(session.user.id),
  ]);

  return (
    <>
      <SEOHead
        title="My Events"
        description="Manage your created events and view events you've registered for"
      />
      <MyEventsList
        user={session.user}
        initialCreatedEvents={createdEvents}
        initialRegisteredEvents={registeredEvents}
      />
    </>
  );
}
