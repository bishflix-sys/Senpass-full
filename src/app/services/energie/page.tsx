
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Zap } from "lucide-react";

export const metadata: Metadata = {
  title: "Service Énergie (Senelec) - SenPass",
  description: "Accès aux services de gestion de l'énergie via SenPass.",
};

export default function EnergiePage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
           <Zap className="h-8 w-8" /> Énergie (Senelec)
       </h1>

       <Card>
         <CardHeader>
           <CardTitle>Gestion de l'Énergie</CardTitle>
           <CardDescription>
             Accédez aux services énergétiques comme la consultation de factures, le suivi de consommation, etc.
           </CardDescription>
         </CardHeader>
         <CardContent>
           <p className="text-muted-foreground">
             Contenu spécifique au service Énergie. Cette section est fournie à titre de démonstration et n'est pas fonctionnelle.
           </p>
           {/* Placeholder for future content */}
         </CardContent>
       </Card>
    </div>
  );
}
