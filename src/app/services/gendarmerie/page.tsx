
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ShieldAlert } from "lucide-react";

export const metadata: Metadata = {
  title: 'Gendarmerie - SenPass',
  description: 'Accès aux services de gendarmerie via SenPass.',
};

export default function GendarmeriePage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
           <ShieldAlert className="h-8 w-8" /> Gendarmerie
       </h1>

       <Card>
         <CardHeader>
           <CardTitle>Services de Gendarmerie</CardTitle>
           <CardDescription>
             Accédez aux services de gendarmerie comme les signalements, les contacts d'urgence, etc.
           </CardDescription>
         </CardHeader>
         <CardContent>
           <p className="text-muted-foreground">
             Contenu spécifique aux services de la Gendarmerie. Cette section est fournie à titre de démonstration et n'est pas fonctionnelle.
           </p>
           {/* Placeholder for future content */}
         </CardContent>
       </Card>
    </div>
  );
}
