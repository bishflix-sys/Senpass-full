
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { HeartPulse } from "lucide-react";

export const metadata: Metadata = {
  title: 'Santé - SenPass',
  description: 'Accès aux services de santé via SenPass.',
};

export default function SantePage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
           <HeartPulse className="h-8 w-8" /> Santé
       </h1>

       <Card>
         <CardHeader>
           <CardTitle>Gestion de la Santé</CardTitle>
           <CardDescription>
             Accédez aux services de santé tels que la consultation du carnet de santé, la prise de rendez-vous, etc.
           </CardDescription>
         </CardHeader>
         <CardContent>
           <p className="text-muted-foreground">
             Contenu spécifique au service Santé. Cette section est fournie à titre de démonstration et n'est pas fonctionnelle.
           </p>
           {/* Placeholder for future content */}
         </CardContent>
       </Card>
    </div>
  );
}
