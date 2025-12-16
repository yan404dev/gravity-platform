"use client";

interface SEOHeadProps {
  title: string;
  description?: string;
  keywords?: string;
  image?: string;
}

export const SEOHead = ({ title, description, keywords, image }: SEOHeadProps) => {
  // In Next.js App Router, metadata is handled via generateMetadata or the Metadata object
  // For client components, we'll use document.title as a simple fallback
  if (typeof window !== 'undefined') {
    document.title = `${title} | Event Template`;
  }
  
  return null;
};
