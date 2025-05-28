
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Home } from "lucide-react";

export const metadata: Metadata = {
  title: 'Logement - SenPass',
  description: 'Accès aux services liés au logement via SenPass.',
};

export default function LogementPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
           <Home className="h-8 w-8" /> Logement
       </h1>

       <Card>
         <CardHeader>
           <CardTitle>Gestion du Logement</CardTitle>
           <CardDescription>
             Accédez aux services liés au logement tels que les demandes d'aide, le suivi des dossiers, etc.
           </CardDescription>
         </CardHeader>
         <CardContent>
           <p className="text-muted-foreground">
             Contenu spécifique au service Logement. Cette section est fournie à titre de démonstration et n'est pas fonctionnelle.
           </p>
           {/* Placeholder for future content */}
         </CardContent>
       </Card>
    </div>
  );
}
