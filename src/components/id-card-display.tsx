
"use client";

import React from 'react';
import { QRCodeCanvas } from 'qrcode.react';
import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Loader2, User } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { UserProfile } from "@/services/identity"; // Import UserProfile type

interface IdCardDisplayProps {
  /** User profile data */
  user: UserProfile;
  /** QR code data string */
  qrData: string | null;
  /** Optional className for the Card component */
  className?: string;
}

// Senegal Flag SVG component
const SenegalFlag = () => (
  <svg width="30" height="20" viewBox="0 0 3 2" className="rounded-sm">
    <rect width="1" height="2" fill="#00853F"/>
    <rect x="1" width="1" height="2" fill="#FDEF42"/>
    <rect x="2" width="1" height="2" fill="#E31B23"/>
    <polygon points="1.5,0.8 1.6,1.1 1.9,1.1 1.65,1.3 1.75,1.6 1.5,1.4 1.25,1.6 1.35,1.3 1.1,1.1 1.4,1.1" fill="#00853F"/>
  </svg>
);


/**
 * A component to display a simulated Senegalese ID card within a card.
 */
export default function IdCardDisplay({
  user,
  qrData,
  className,
}: IdCardDisplayProps) {

  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  // Use Senegal Flag Colors for QR Code
  const fgColor = "#00853F"; // Green
  const bgColor = "#FFFFFF"; // White background

  // Format date helper (simple version)
  const formatDate = (dateString?: string) => {
    if (!dateString) return 'N/A';
    try {
      const [year, month, day] = dateString.split('-');
      return `${day}/${month}/${year}`;
    } catch {
      return dateString; // Fallback if format is unexpected
    }
  };

  return (
    <Card className={cn("border shadow-md overflow-hidden", className)}>
      <CardContent className="p-0">
        <div className="bg-gradient-to-b from-muted/50 to-muted/10 p-4 border-b">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
                <SenegalFlag />
                <span className="text-xs font-bold text-foreground/80 uppercase tracking-wider">République du Sénégal</span>
            </div>
            <span className="text-xs font-semibold text-primary">CARTE NATIONALE D'IDENTITÉ</span>
          </div>
        </div>

        <div className="p-4 space-y-3">
          <div className="flex items-start gap-4">
            {/* User Photo */}
            <Avatar className="h-24 w-20 border-2 border-muted shadow-sm rounded-md">
              <AvatarImage src={`https://picsum.photos/seed/${user.email}/80/96`} alt={user.name} data-ai-hint="black person tie" className="object-cover rounded-md"/>
              <AvatarFallback className="text-lg bg-secondary text-secondary-foreground rounded-md">
                 <User className="h-8 w-8" />
              </AvatarFallback>
            </Avatar>

            {/* User Details */}
            <div className="flex-1 space-y-1 text-sm">
               <div className="mb-2">
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Nom</p>
                  <p className="font-semibold text-base truncate">{user.name?.split(' ').pop()?.toUpperCase() || 'N/A'}</p>
               </div>
               <div className="mb-2">
                   <p className="text-xs text-muted-foreground uppercase tracking-wide">Prénom(s)</p>
                   <p className="font-medium text-base truncate">{user.name?.split(' ').slice(0, -1).join(' ') || 'N/A'}</p>
               </div>
               <div>
                  <p className="text-xs text-muted-foreground uppercase tracking-wide">Né(e) le</p>
                  <p className="font-medium">{formatDate(user.dateOfBirth)}</p>
               </div>
            </div>
          </div>

          {/* ID Number and QR Code */}
          <div className="flex items-end gap-4 pt-2">
            <div className="flex-1 space-y-1">
               <p className="text-xs text-muted-foreground uppercase tracking-wide">Numéro d'identification national</p>
               <p className="font-mono font-semibold text-base tracking-wider">{user.nationalId || 'N/A'}</p>
                {/* You could add issue/expiry dates here if available */}
            </div>

            {/* QR Code Section */}
            <div className="flex flex-col items-center">
              {qrData ? (
                <div className="p-1 bg-white rounded-sm shadow-inner border border-muted">
                  <QRCodeCanvas
                    value={qrData}
                    size={64} // Smaller size for embedding
                    bgColor={bgColor}
                    fgColor={fgColor}
                    level={"Q"} // Quartile error correction
                    includeMargin={false}
                  />
                </div>
              ) : (
                 <div className="w-[68px] h-[68px] flex items-center justify-center bg-muted rounded-sm border border-muted">
                    <Loader2 className="h-5 w-5 animate-spin text-muted-foreground" />
                 </div>
              )}
              <p className="text-[8px] text-muted-foreground mt-0.5">SENPASS ID</p>
            </div>
          </div>
           {/* Optional: Add address or other details if needed */}
           {/*
           <div className="pt-2 border-t border-muted/50">
              <p className="text-xs text-muted-foreground uppercase tracking-wide">Adresse</p>
              <p className="text-sm">{user.address}</p>
           </div>
           */}
        </div>
      </CardContent>
    </Card>
  );
}

