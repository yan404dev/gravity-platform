import { redirect } from 'next/navigation';
import { SEOHead } from '@/shared/components/seo-head';
import { MyEventsList } from './_components/my-events-list';
import { MOCK_USER, MOCK_EVENTS } from '@/shared/lib/mock-data';
import { Event } from '../(home)/_types/event';

export const revalidate = 0;

export default async function MyEventsPage() {
    const user = MOCK_USER;

    if (!user) {
        redirect('/');
    }

    // Mock filtering
    const createdEvents = MOCK_EVENTS.filter(
        (e) => e.creator === user.id,
    ) as unknown as Event[];
    const registeredEvents = [] as Event[];

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
