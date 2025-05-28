
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Signal } from "lucide-react";

export const metadata: Metadata = {
  title: 'Télécommunications - SenPass',
  description: 'Accès aux services de télécommunications via SenPass.',
};

export default function TelecomPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
           <Signal className="h-8 w-8" /> Télécommunications
       </h1>

       <Card>
         <CardHeader>
           <CardTitle>Gestion des Services Télécom</CardTitle>
           <CardDescription>
             Accédez aux services télécom comme la gestion d'abonnements, le suivi de crédit, etc.
           </CardDescription>
         </CardHeader>
         <CardContent>
           <p className="text-muted-foreground">
             Contenu spécifique au service Télécom. Cette section est fournie à titre de démonstration et n'est pas fonctionnelle.
           </p>
           {/* Placeholder for future content */}
         </CardContent>
       </Card>
    </div>
  );
}
