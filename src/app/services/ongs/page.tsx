
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Users } from "lucide-react";

export const metadata: Metadata = {
  title: 'ONGs / Associations - SenPass',
  description: 'Simulation des services pour ONGs et Associations accessibles via SenPass.',
};

export default function OngsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
           <Users className="h-8 w-8" /> ONG / Associations (Simulation)
       </h1>

       <Card>
         <CardHeader>
           <CardTitle>Gestion des ONG et Associations</CardTitle>
           <CardDescription>
             Accédez aux services simulés pour les ONG comme l'enregistrement, le suivi des activités, etc.
           </CardDescription>
         </CardHeader>
         <CardContent>
           <p className="text-muted-foreground">
             Contenu spécifique aux services pour les ONG. Cette section est une simulation et n'est pas fonctionnelle.
           </p>
           {/* Placeholder for future content */}
         </CardContent>
       </Card>
    </div>
  );
}
