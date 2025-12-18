import { redirect } from 'next/navigation';
import { SEOHead } from '@/components/seo-head';
import { CreateEventForm } from './_components/create-event-form';
import { MOCK_USER } from '@/lib/mock-data';

export default function CreateEventPage() {
    const user = MOCK_USER;

    if (!user) {
        redirect('/');
    }

    return (
        <>
            <SEOHead
                title="Create Event"
                description="Create and publish a new event for your community to discover and join"
            />
            <CreateEventForm user={user} />
        </>
    );
}
