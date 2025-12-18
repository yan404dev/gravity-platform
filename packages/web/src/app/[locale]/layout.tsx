import type { Metadata } from 'next';
import { Host_Grotesk } from 'next/font/google';
import './globals.css';
import { Toaster } from '@/components/ui/sonner';
import { Toaster as UIToaster } from '@/components/ui/toaster';
import { TooltipProvider } from '@/components/ui/tooltip';
import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';

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
                    <TooltipProvider>
                        {children}
                        <Toaster />
                        <UIToaster />
                    </TooltipProvider>
                </NextIntlClientProvider>
            </body>
        </html>
    );
}
