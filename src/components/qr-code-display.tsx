
"use client";

import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { QrCode } from 'lucide-react';

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
}

/**
 * A component to display a QR code within a card.
 */
export default function QRCodeDisplay({
  data,
  title,
  description,
  size = 128,
  className
}: QRCodeDisplayProps) {

  // Use Senegal Flag Colors: Green (#00853F), Yellow (#FDEF42), Red (#E31B23)
  // For simplicity, we'll use green as the primary color.
  const fgColor = "#00853F";
  const bgColor = "#FFFFFF"; // White background

  return (
    <Card className={className}>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            <QrCode className="h-5 w-5" /> {title}
        </CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex items-center justify-center p-4">
        {data ? (
          <QRCodeCanvas
            value={data}
            size={size}
            bgColor={bgColor}
            fgColor={fgColor}
            level={"H"} // High error correction level
            includeMargin={true}
          />
        ) : (
          <p className="text-muted-foreground">Aucune donnée à afficher.</p>
        )}
      </CardContent>
    </Card>
  );
}
