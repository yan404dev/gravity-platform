import type { Metadata } from "next";
import { Host_Grotesk } from "next/font/google";
import "./globals.css";
import { Toaster } from "@/components/ui/sonner";
import { Toaster as UIToaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

const font = Host_Grotesk({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Event Template",
  description: "Event Management Platform",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${font.className} antialiased`}>
        <TooltipProvider>
          {children}
          <Toaster />
          <UIToaster />
        </TooltipProvider>
      </body>
    </html>
  );
}
