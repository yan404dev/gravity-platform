import { redirect } from 'next/navigation';
import { EditEventForm } from '../../_components/edit-event-form';
import { SEOHead } from '@/shared/components/seo-head';
import { MOCK_EVENTS, MOCK_USER } from '@/shared/lib/mock-data';
import { Event } from '../../../(home)/_types/event';

interface PageProps {
    params: Promise<{ id: string }>;
}

export const revalidate = 0;

export default async function EditEventPage({ params }: PageProps) {
    const { id } = await params;

    const user = MOCK_USER;

    if (!user) {
        redirect('/');
    }

    const event = MOCK_EVENTS.find((e) => e.id === id) as unknown as Event;

    const registrants: any[] = [];
    const isOwner = true;

    if (!event) {
        redirect('/my-events?error=event_not_found');
    }

    if (!isOwner) {
        redirect('/my-events?unauthorized');
    }

    return (
        <>
            <SEOHead
                title="Edit Event"
                description="Update your event details"
            />
            <EditEventForm
                event={event}
                user={user}
                registrants={registrants}
            />
        </>
    );
}
