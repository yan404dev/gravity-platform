import { redirect } from 'next/navigation';
import { SEOHead } from '@/components/seo-head';
import { MyEventsList } from './_components/my-events-list';
import { myEventsService } from './_services/my-events.service';
import { MOCK_USER } from '@/lib/mock-data';

export const revalidate = 0;

export default async function MyEventsPage() {
  const user = MOCK_USER;

  if (!user) {
    redirect('/');
  }

  // Parallel data fetching
  const [createdEvents, registeredEvents] = await Promise.all([
    myEventsService.getCreatedEvents(user.id),
    myEventsService.getRegisteredEvents(user.id),
  ]);

  return (
    <>
      <SEOHead
        title="My Events"
        description="Manage your created events and view events you've registered for"
      />
      <MyEventsList
        user={user}
        initialCreatedEvents={createdEvents}
        initialRegisteredEvents={registeredEvents}
      />
    </>
  );
}
