import { EventView } from '../_components/event-view';
import { SEOHead } from '@/components/seo-head';
import { Navbar } from '@/components/navbar';
import { Link } from '@/i18n/routing';
import { MOCK_EVENTS, MOCK_USER } from '@/lib/mock-data';
import { Event } from '../../(home)/_types/event';

interface PageProps {
    params: Promise<{ id: string }>;
}

export const revalidate = 0; // Dynamic for auth check

export default async function EventPage({ params }: PageProps) {
    const { id } = await params;
    const event = MOCK_EVENTS.find((e) => e.id === id) as unknown as Event;

    if (!event) {
        return (
            <div className="flex h-screen flex-col items-center justify-center bg-white px-4">
                <SEOHead
                    title="Event Not Found"
                    description="The event you're looking for doesn't exist or has been removed."
                />
                <Navbar />
                <div className="mt-20 text-center">
                    <h1 className="mb-4 text-4xl font-medium text-[#1A1A1A]">
                        Event Not Found
                    </h1>
                    <p className="mb-8 text-lg text-[#1A1A1A] opacity-70">
                        The event you're looking for doesn't exist or has been
                        removed.
                    </p>
                    <Link
                        href="/"
                        className="border border-[#1A1A1A] bg-[#1A1A1A] px-6 py-3 text-sm font-medium text-white uppercase transition-colors hover:bg-white hover:text-[#1A1A1A]"
                    >
                        Browse Events
                    </Link>
                </div>
            </div>
        );
    }

    const user = MOCK_USER;
    let isRegistered = false;

    if (user) {
        // Mock registration check
        isRegistered = false; // Could check a mock registrations array
    }

    return (
        <EventView
            event={event}
            user={user}
            initialIsRegistered={isRegistered}
        />
    );
}
