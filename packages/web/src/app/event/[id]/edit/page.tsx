import { redirect } from "next/navigation";
import { EditEventForm } from "../../_components/edit-event-form";
import { SEOHead } from "@/components/seo-head";
import { MOCK_EVENTS, MOCK_USER } from "@/lib/mock-data";
import { Event } from "@/app/_types/event";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 0; // Dynamic for auth/ownership checks

export default async function EditEventPage({ params }: PageProps) {
  const { id } = await params;

  // 1. Auth Check - Mocked
  const user = MOCK_USER;

  if (!user) {
    redirect("/");
  }

  // 2. Data Fetching (Mock)
  const event = MOCK_EVENTS.find(e => e.id === id) as unknown as Event;

  // Mock registrants and owner check
  const registrants: any[] = [];
  const isOwner = true; // Always owner in mock mode

  // 3. Validation
  if (!event) {
    // Could redirect to 404 or show error
    redirect("/my-events?error=event_not_found");
  }

  if (!isOwner) {
    // Unauthorized to edit
    redirect("/my-events?error=unauthorized");
  }

  // 4. Render Client Component
  return (
    <>
      <SEOHead title="Edit Event" description="Update your event details" />
      <EditEventForm
        event={event}
        user={user}
        registrants={registrants}
      />
    </>
  );
}
