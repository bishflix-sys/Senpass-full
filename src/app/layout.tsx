
// Font import removed previously due to error, relying on Tailwind's default sans-serif stack.
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";
import { Separator } from "@/components/ui/separator"; // Import Separator
import Footer from "@/components/footer"; // Import Footer
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: "SenPass",
  description: "Identité numérique nationale du Sénégal (Simulation)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // The logic to show/hide header/footer needs to be handled within the page components
  // or a more granular layout component, as the root layout should remain a Server Component.
  // For this app's structure, we can assume they should generally be visible and
  // pages like /login can be structured to not include them if needed.

  return (
    <html lang="fr" suppressHydrationWarning>
      <head>
        <link rel="manifest" href="/manifest.json" />
        <meta name="theme-color" content="#4D88E0" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="SenPass" />
        {/* 
          Ensure you have icons in the public/icons/ directory
          <link rel="apple-touch-icon" href="/icons/apple-touch-icon-180x180.png" /> 
        */}
      </head>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          // Apply Tailwind's default sans-serif font stack
        )}
      >
        {/* This approach is simplified. A robust app might have nested layouts. */}
        {/* For this app, we will let the individual pages control their appearance. */}
        {/* For example, the login page is full-screen and won't use the Header/Footer. */}
        {/* The dashboard pages will be wrapped in a layout that includes them. */}
        <div className="flex flex-col flex-1">
            {children}
        </div>
        <Toaster />
      </body>
    </html>
  );
}
