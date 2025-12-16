import { redirect } from "next/navigation";
import { supabase } from "@/integrations/supabase/client";
import { eventDetailService } from "../../_services/event-detail.service";
import { eventOwnerService } from "../../_services/event-owner.service";
import { EditEventForm } from "../../_components/edit-event-form";
import { SEOHead } from "@/components/seo-head";

interface PageProps {
  params: Promise<{ id: string }>;
}

export const revalidate = 0; // Dynamic for auth/ownership checks

export default async function EditEventPage({ params }: PageProps) {
  const { id } = await params;

  // 1. Auth Check
  const {
    data: { session },
  } = await supabase.auth.getSession();

  if (!session?.user) {
    redirect("/auth");
  }

  // 2. Data Fetching (Parallel)
  const [event, registrants, isOwner] = await Promise.all([
    eventDetailService.getEventById(id),
    eventOwnerService.getRegistrants(id),
    eventOwnerService.verifyOwnership(id, session.user.id),
  ]);

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
        user={session.user}
        registrants={registrants}
      />
    </>
  );
}
