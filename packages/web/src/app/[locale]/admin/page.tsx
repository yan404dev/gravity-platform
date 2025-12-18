"use client";

import { SEOHead } from "@/components/seo-head";
import { AdminDashboard } from "./_components/admin-dashboard";
import { useAdminPage } from "./_hooks/use-admin-page";

export default function AdminPage() {
  const { isLoading, user, events } = useAdminPage();

  if (isLoading) {
    return <div className="min-h-screen flex items-center justify-center bg-white">Loading...</div>;
  }

  if (!user) return null;

  return (
    <div className="min-h-screen bg-white p-8">
      <SEOHead
        title="Admin Dashboard"
        description="Manage events and content for your event platform"
      />
      <AdminDashboard
        initialEvents={events}
        user={user}
      />
    </div>
  );
}
