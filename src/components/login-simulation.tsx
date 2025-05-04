
"use client";

import { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"; // Added CardFooter
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Fingerprint, ScanFace, KeyRound, Loader2, CheckCircle, Smartphone } from "lucide-react"; // Added Smartphone
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

type AuthMethod = 'pin' | 'fingerprint' | 'face' | null;

export default function LoginSimulation() {
  const [pin, setPin] = useState("");
  const [loadingMethod, setLoadingMethod] = useState<AuthMethod>(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Keep this for potential future use (e.g., showing logged-in state briefly before redirect)
  const { toast } = useToast();
  const router = useRouter(); // Get router instance

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
            message = "Authentification par PIN réussie ! Redirection...";
        } else {
            message = "PIN incorrect. Veuillez réessayer.";
        }
      } else if (method === 'fingerprint') {
         success = Math.random() > 0.2; // Simulate 80% success rate
         message = success ? "Empreinte digitale reconnue ! Redirection..." : "Échec de la reconnaissance d'empreinte.";
      } else if (method === 'face') {
         success = Math.random() > 0.3; // Simulate 70% success rate
         message = success ? "Reconnaissance faciale réussie ! Redirection..." : "Échec de la reconnaissance faciale.";
      }

      if (success) {
        // setIsAuthenticated(true); // We can remove this if redirecting immediately
        toast({
          title: "Succès",
          description: message,
          variant: "default", // Use default variant for success
        });
        // Redirect to home page on success
        router.push('/');
      } else {
        toast({
          title: "Échec",
          description: message,
          variant: "destructive",
        });
         setLoadingMethod(null); // Only stop loading on failure here
         setPin(""); // Clear PIN input after failed attempt
      }
      // setLoadingMethod(null); // Moved loading reset to failure case or let redirect handle it
      // setPin(""); // Moved PIN reset to failure case
    }, 1500); // Simulate 1.5 seconds delay
  };


  return (
    <Card className="shadow-lg border"> {/* Added border and increased shadow */}
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-lg"> {/* Slightly larger title */}
            <Smartphone className="h-5 w-5 text-primary" /> {/* Added icon */}
            Application Mobile SenPass
        </CardTitle>
        <CardDescription>Simulez l'authentification depuis l'application mobile.</CardDescription>
      </CardHeader>
      <CardContent className="space-y-6"> {/* Increased spacing */}
         {/* PIN Section */}
         <div className="space-y-2">
           <Label htmlFor="pin" className="flex items-center gap-1.5 text-sm font-medium">
              <KeyRound className="h-4 w-4 text-muted-foreground" />
              Entrez votre code PIN
           </Label>
           <div className="flex gap-2">
             <Input
               id="pin"
               type="password"
               maxLength={4}
               value={pin}
               onChange={(e) => setPin(e.target.value.replace(/\D/g, ''))} // Only allow digits
               placeholder="••••" // Use dots for placeholder
               disabled={!!loadingMethod}
               className="w-full tabular-nums tracking-widest text-lg h-12" // Larger input
               aria-label="Code PIN"
             />
             <Button
               onClick={() => handleAuth('pin')}
               disabled={!pin || pin.length !== 4 || !!loadingMethod}
               className={cn("w-32 h-12", loadingMethod === 'pin' && "bg-primary/80")} // Larger button
             >
               {loadingMethod === 'pin' ? (
                 <Loader2 className="animate-spin h-5 w-5" />
               ) : (
                 <>
                   Valider
                 </>
               )}
             </Button>
           </div>
         </div>

         {/* Separator */}
         <div className="relative">
           <div className="absolute inset-0 flex items-center">
             <span className="w-full border-t" />
           </div>
           <div className="relative flex justify-center text-xs uppercase">
             <span className="bg-background px-2 text-muted-foreground">
               Ou utiliser
             </span>
           </div>
         </div>

         {/* Biometric Buttons */}
         <div className="grid grid-cols-2 gap-4 pt-2"> {/* Use grid for equal width */}
           <Button
             variant="outline"
             onClick={() => handleAuth('fingerprint')}
             disabled={!!loadingMethod}
             className="h-12 text-base" // Larger button, base text size
           >
             {loadingMethod === 'fingerprint' ? (
               <Loader2 className="animate-spin h-5 w-5" />
             ) : (
               <Fingerprint className="mr-2 h-5 w-5 text-accent" />
             )}
             Empreinte
           </Button>
           <Button
             variant="outline"
             onClick={() => handleAuth('face')}
             disabled={!!loadingMethod}
             className="h-12 text-base" // Larger button, base text size
           >
             {loadingMethod === 'face' ? (
               <Loader2 className="animate-spin h-5 w-5" />
             ) : (
               <ScanFace className="mr-2 h-5 w-5 text-accent" />
             )}
             Visage
           </Button>
         </div>
      </CardContent>
       {/* Optional Footer */}
      {/* <CardFooter>
        <p className="text-xs text-muted-foreground text-center w-full">Simulation uniquement.</p>
      </CardFooter> */}
    </Card>
  );
}
