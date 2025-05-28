
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: 'État Civil - SenPass',
  description: "Accès aux services d'état civil via SenPass.",
};

export default function EtatCivilPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
           <FileText className="h-8 w-8" /> État Civil
       </h1>

       <Card>
         <CardHeader>
           <CardTitle>Gestion de l'État Civil</CardTitle>
           <CardDescription>
             Accédez aux services d'état civil tels que la demande d'actes de naissance, de mariage, etc.
           </CardDescription>
         </CardHeader>
         <CardContent>
           <p className="text-muted-foreground">
             Contenu spécifique au service État Civil. Cette section est fournie à titre de démonstration et n'est pas fonctionnelle.
           </p>
           {/* Placeholder for future content */}
         </CardContent>
       </Card>
    </div>
  );
}
