
import type { Metadata } from "next";
// Removed GeistSans import as it's causing an error and wasn't explicitly requested for styling.
// import { GeistSans } from "geist/font/sans";
import "./globals.css";
import { cn } from "@/lib/utils";
import { Toaster } from "@/components/ui/toaster";
import Header from "@/components/header";

export const metadata: Metadata = {
  title: "SenPass Lite",
  description: "Identité numérique nationale du Sénégal (Simulation)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" suppressHydrationWarning>
      <body
        className={cn(
          "min-h-screen bg-background font-sans antialiased",
           // Font variable application removed
          // GeistSans.variable
        )}
      >
        <Header />
        <main className="container mx-auto px-4 py-8">{children}</main>
        <Toaster />
      </body>
    </html>
  );
}

