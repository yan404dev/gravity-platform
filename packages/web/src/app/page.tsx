import { SEOHead } from '@/components/seo-head';
import { DiscoverView } from './_components/discover-view';
import { MOCK_EVENTS } from '@/lib/mock-data';
import { Event } from './_types/event';

export const revalidate = 0; // Ensure fresh data on every request, or set to 60 for caching

export default async function DiscoverPage() {
  const events = MOCK_EVENTS as unknown as Event[];

  return (
    <>
      <SEOHead
        title="Discover Events"
        description="Explore popular events near you, browse by category, or check out some of the great community calendars."
        keywords="events, discover events, community events, local events, event calendar"
      />
      <DiscoverView initialEvents={events} />
    </>
  );
}
