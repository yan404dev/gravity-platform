import type { Metadata } from 'next';
import { Host_Grotesk } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/shared/components/ui/sonner';
import { Toaster as UIToaster } from '@/shared/components/ui/toaster';
import { TooltipProvider } from '@/shared/components/ui/tooltip';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/shared/i18n/routing';
import { QueryProvider } from '@/shared/providers/query-provider';

const font = Host_Grotesk({ subsets: ['latin'] });

export const metadata: Metadata = {
    title: 'Event Template',
    description: 'Event Management Platform',
};

export default async function RootLayout({
    children,
    params,
}: {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}) {
    const { locale } = await params;

    if (!routing.locales.includes(locale as any)) {
        notFound();
    }

    const messages = await getMessages();

    return (
        <html lang={locale}>
            <body className={`${font.className} antialiased`}>
                <NextIntlClientProvider messages={messages}>
                    <QueryProvider>
                        <TooltipProvider>
                            {children}
                            <Toaster />
                            <UIToaster />
                        </TooltipProvider>
                    </QueryProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
