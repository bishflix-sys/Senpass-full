
"use client";

import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode, Loader2 } from 'lucide-react'; // Import Loader2
import { cn } from '@/lib/utils'; // Import cn

interface QRCodeDisplayProps {
  /** The data to encode in the QR code. */
  data: string;
  /** Title for the QR code card. */
  title: string;
  /** Description for the QR code card. */
  description: string;
  /** Size of the QR code canvas. Defaults to 128. */
  size?: number;
  /** Optional className for the Card component */
  className?: string;
  /** Indicates if the QR code data is currently loading */
  isLoading?: boolean;
}

/**
 * A component to display a QR code within a card.
 */
export default function QRCodeDisplay({
  data,
  title,
  description,
  size = 128,
  className,
  isLoading = false // Default isLoading to false
}: QRCodeDisplayProps) {

  // Use Senegal Flag Colors: Green (#00853F), Yellow (#FDEF42), Red (#E31B23)
  // Using green as the primary QR color.
  const fgColor = "#00853F";
  const bgColor = "#FFFFFF"; // White background

  // Calculate dynamic height for content area to prevent layout shifts
  const contentHeight = size + 32; // Base size + padding

  return (
    <Card className={cn("border", className)}> {/* Ensure border is present */}
      <CardHeader className="pb-2"> {/* Reduce bottom padding */}
        <CardTitle className="flex items-center gap-2 text-lg"> {/* Adjusted size */}
            <QrCode className="h-5 w-5 text-primary" /> {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center p-4" style={{ height: contentHeight, minHeight: contentHeight }}> {/* Set fixed min-height */}
        {isLoading ? (
          <div className="flex flex-col items-center justify-center text-muted-foreground space-y-2 w-full h-full">
             <Loader2 className="h-8 w-8 animate-spin" />
             <p className="text-sm">Chargement QR...</p>
           </div>
        ) : data ? (
           <div className="p-2 bg-white rounded-md shadow-inner"> {/* White background container */}
              <QRCodeCanvas
                value={data}
                size={size}
                bgColor={bgColor}
                fgColor={fgColor}
                level={"H"} // High error correction level
                includeMargin={true}
                className="rounded" // Optional: slight rounding on the canvas itself
              />
           </div>
        ) : (
           <div className="flex items-center justify-center text-muted-foreground h-full w-full">
              <p>QR non disponible.</p>
           </div>
        )}
      </CardContent>
    </Card>
  );
}
