"use client";

import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fingerprint, ScanFace, KeyRound, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type AuthMethod = 'pin' | 'fingerprint' | 'face' | null;

export default function LoginSimulation() {
  const [pin, setPin] = useState("");
  const [loadingMethod, setLoadingMethod] = useState<AuthMethod>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const { toast } = useToast();

  const handleAuth = (method: AuthMethod) => {
    if (!method) return;
    setLoadingMethod(method);
    setIsAuthenticated(false); // Reset auth state

    // Simulate API call
    setTimeout(() => {
      let success = false;
      let message = "";

      if (method === 'pin') {
        if (pin === "1234") { // Simple PIN check simulation
            success = true;
            message = "Authentification par PIN réussie !";
        } else {
            message = "PIN incorrect. Veuillez réessayer.";
        }
      } else if (method === 'fingerprint') {
         success = Math.random() > 0.2; // Simulate 80% success rate
         message = success ? "Empreinte digitale reconnue !" : "Échec de la reconnaissance d'empreinte.";
      } else if (method === 'face') {
         success = Math.random() > 0.3; // Simulate 70% success rate
         message = success ? "Reconnaissance faciale réussie !" : "Échec de la reconnaissance faciale.";
      }

      if (success) {
        setIsAuthenticated(true);
        toast({
          title: "Succès",
          description: message,
        });
      } else {
        toast({
          title: "Échec",
          description: message,
          variant: "destructive",
        });
      }
      setLoadingMethod(null);
      setPin(""); // Clear PIN input after attempt
    }, 1500); // Simulate 1.5 seconds delay
  };

  return (
    <Card className="shadow-md">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
            Application mobile Senpass <span className="text-sm font-normal text-muted-foreground">(Simulation)</span>
        </CardTitle>
        <CardDescription>Simulez l'authentification sécurisée.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
         {isAuthenticated && (
             <div className="flex items-center gap-2 p-3 rounded-md bg-green-100 text-green-800 border border-green-200">
                <CheckCircle className="h-5 w-5" />
                <p className="text-sm font-medium">Vous êtes authentifié.</p>
                <Button variant="ghost" size="sm" onClick={() => setIsAuthenticated(false)} className="ml-auto h-auto p-1 text-green-800 hover:bg-green-200">
                  Déconnexion
                </Button>
             </div>
         )}
         {!isAuthenticated && (
           <>
             <div className="space-y-2">
               <Label htmlFor="pin">Code PIN</Label>
               <div className="flex gap-2">
                 <Input
                   id="pin"
                   type="password"
                   maxLength={4}
                   value={pin}
                   onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))} // Only allow digits
                   placeholder="****"
                   disabled={!!loadingMethod}
                   className="w-full tabular-nums tracking-widest"
                 />
                 <Button
                   onClick={() => handleAuth('pin')}
                   disabled={!pin || pin.length !== 4 || loadingMethod === 'pin'}
                   className={cn("w-28", loadingMethod === 'pin' && "bg-primary/80")}
                 >
                   {loadingMethod === 'pin' ? (
                     <Loader2 className="animate-spin" />
                   ) : (
                     <>
                      <KeyRound className="mr-2 h-4 w-4" /> Valider
                     </>
                   )}
                 </Button>
               </div>
             </div>

             <div className="flex flex-col sm:flex-row gap-2 pt-2">
               <Button
                 variant="outline"
                 onClick={() => handleAuth('fingerprint')}
                 disabled={!!loadingMethod}
                 className="flex-1"
               >
                 {loadingMethod === 'fingerprint' ? (
                   <Loader2 className="animate-spin" />
                 ) : (
                   <Fingerprint className="mr-2 h-4 w-4 text-accent" />
                 )}
                 Empreinte Digitale
               </Button>
               <Button
                 variant="outline"
                 onClick={() => handleAuth('face')}
                 disabled={!!loadingMethod}
                 className="flex-1"
               >
                 {loadingMethod === 'face' ? (
                   <Loader2 className="animate-spin" />
                 ) : (
                   <ScanFace className="mr-2 h-4 w-4 text-accent" />
                 )}
                  Reconnaissance Faciale
               </Button>
             </div>
           </>
         )}
      </CardContent>
    </Card>
  );
}
