
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Loader2, ShieldCheck, Fingerprint, ScanFace } from "lucide-react";
import { useRouter } from "next/navigation";

interface SecureAccessDialogProps {
  onVerified: () => void;
  resourceName: string;
}

const SecureAccessDialog: React.FC<SecureAccessDialogProps> = ({ onVerified, resourceName }) => {
  const [isVerifying, setIsVerifying] = React.useState(false);
  const router = useRouter();

  const handleVerify = () => {
    setIsVerifying(true);
    // Simulate a network request for verification
    setTimeout(() => {
      onVerified();
      setIsVerifying(false);
    }, 1500);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-background/80 backdrop-blur-sm">
      <Card className="w-full max-w-md m-4 shadow-2xl border-primary/20 animate-in fade-in-0 zoom-in-95">
        <CardHeader className="text-center">
          <div className="mx-auto bg-primary text-primary-foreground rounded-full h-16 w-16 flex items-center justify-center mb-4">
             <ShieldCheck className="h-8 w-8" />
          </div>
          <CardTitle className="text-2xl">Vérification Requise</CardTitle>
          <CardDescription className="text-base">
            Pour votre sécurité, veuillez confirmer votre identité pour accéder à {resourceName}.
          </CardDescription>
        </CardHeader>
        <CardContent className="space-y-6 p-6">
          <p className="text-sm text-center text-muted-foreground">
            Ceci est une étape de sécurité supplémentaire pour protéger vos informations sensibles.
          </p>
          <div className="flex flex-col gap-4">
             <Button
                size="lg"
                className="w-full h-14 text-lg"
                onClick={handleVerify}
                disabled={isVerifying}
              >
                {isVerifying ? (
                  <Loader2 className="mr-2 h-6 w-6 animate-spin" />
                ) : (
                  <Fingerprint className="mr-2 h-6 w-6" />
                )}
                Confirmer l'Identité
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full h-14 text-lg"
                onClick={() => router.push('/dashboard')}
                disabled={isVerifying}
              >
                Annuler et retourner au tableau de bord
              </Button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default SecureAccessDialog;
