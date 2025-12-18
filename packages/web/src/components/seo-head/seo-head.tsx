'use client';

interface SEOHeadProps {
    title: string;
    description?: string;
    keywords?: string;
    image?: string;
}

export const SEOHead = ({
    title,
    description,
    keywords,
    image,
}: SEOHeadProps) => {
    if (typeof window !== 'undefined') {
        document.title = `${title} | Event Template`;
    }

    return null;
};
