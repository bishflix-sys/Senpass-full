
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { GraduationCap } from "lucide-react";

export const metadata: Metadata = {
  title: 'Scolarité - SenPass',
  description: 'Accès aux services liés à la scolarité via SenPass.',
};

export default function ScolaritePage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
           <GraduationCap className="h-8 w-8" /> Scolarité
       </h1>

       <Card>
         <CardHeader>
           <CardTitle>Gestion de la Scolarité</CardTitle>
           <CardDescription>
             Accédez aux services liés à la scolarité comme les inscriptions, la consultation des résultats, etc.
           </CardDescription>
         </CardHeader>
         <CardContent>
           <p className="text-muted-foreground">
             Contenu spécifique au service Scolarité. Cette section est fournie à titre de démonstration et n'est pas fonctionnelle.
           </p>
           {/* Placeholder for future content */}
         </CardContent>
       </Card>
    </div>
  );
}
