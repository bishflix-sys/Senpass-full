
"use client";

import Link from "next/link";
import { Separator } from "@/components/ui/separator"; // Import Separator
import { ShieldCheck, Wifi, Loader2 } from "lucide-react"; // Import a security icon
import * as React from "react";

export default function Footer() {
  const [ipAddress, setIpAddress] = React.useState<string | null>(null);
  const [isLoadingIp, setIsLoadingIp] = React.useState(true);

  React.useEffect(() => {
    fetch('https://api.ipify.org?format=json')
      .then(response => response.json())
      .then(data => {
        setIpAddress(data.ip);
        setIsLoadingIp(false);
      })
      .catch(error => {
        console.error("Failed to fetch IP address:", error);
        setIpAddress("Indisponible");
        setIsLoadingIp(false);
      });
  }, []);

  return (
    <footer className="mt-auto border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <Separator /> {/* Add Separator above footer content */}
      <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} SenPass (Simulation). Tous droits réservés.</p>
        <div className="mt-2 space-x-4">
           <Link href="/terms" className="hover:text-primary transition-colors">
             Conditions d'utilisation
           </Link>
           <span className="opacity-50">|</span>
           <Link href="/privacy" className="hover:text-primary transition-colors">
             Politique de confidentialité
           </Link>
        </div>
         <div className="mt-4 flex items-center justify-center gap-4 text-xs">
            <div className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-green-600" />
                <span>Session sécurisée</span>
            </div>
            <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4" />
                <span>Adresse IP : {isLoadingIp ? <Loader2 className="h-3 w-3 animate-spin"/> : ipAddress}</span>
            </div>
        </div>
         <p className="mt-3 text-xs">
          Ceci est une application de démonstration à des fins éducatives et de simulation uniquement.
        </p>
      </div>
    </footer>
  );
}
