
"use client"; // Required for usePathname

import type { Metadata } from "next";
// Font import removed previously due to error, relying on Tailwind's default sans-serif stack.
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";
import { Separator } from "@/components/ui/separator"; // Import Separator
import Footer from "@/components/footer"; // Import Footer
import { usePathname } from 'next/navigation'; // Import usePathname

// export const metadata: Metadata = { // Metadata should be defined in a server component or exported from page.tsx
//   title: "SenPass",
//   description: "Identité numérique nationale du Sénégal (Simulation)",
// };

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const pathname = usePathname();
  const showHeaderFooter = pathname !== '/login' && pathname !== '/';

  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased flex flex-col",
          // Apply Tailwind's default sans-serif font stack
        )}
      >
        {showHeaderFooter && <Header />}
        <main className="flex-grow container mx-auto px-4 py-8">{children}</main>
        {showHeaderFooter && <Footer />}
        <Toaster />
      </body>
    </html>
  );
}

