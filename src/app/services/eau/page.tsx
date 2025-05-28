
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Droplet } from "lucide-react";

export const metadata: Metadata = {
  title: "Service Eau (Sen'Eau) - SenPass",
  description: "Accès aux services de gestion de l'eau via SenPass.",
};

export default function EauPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
           <Droplet className="h-8 w-8" /> Eau (Sen'Eau)
       </h1>

       <Card>
         <CardHeader>
           <CardTitle>Gestion de l'Eau</CardTitle>
           <CardDescription>
             Accédez aux services d'eau comme la consultation de factures, le signalement de fuites, etc.
           </CardDescription>
         </CardHeader>
         <CardContent>
           <p className="text-muted-foreground">
             Contenu spécifique au service Eau. Cette section est fournie à titre de démonstration et n'est pas fonctionnelle.
           </p>
           {/* Placeholder for future content */}
         </CardContent>
       </Card>
    </div>
  );
}
