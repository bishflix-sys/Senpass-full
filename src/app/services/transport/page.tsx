
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Truck } from "lucide-react";

export const metadata: Metadata = {
  title: 'Transport - SenPass',
  description: 'Simulation des services liés au transport accessibles via SenPass.',
};

export default function TransportPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
           <Truck className="h-8 w-8" /> Transport (Simulation)
       </h1>

       <Card>
         <CardHeader>
           <CardTitle>Gestion des Transports</CardTitle>
           <CardDescription>
             Accédez aux services liés aux transports simulés comme les permis de conduire, les titres de transport, etc.
           </CardDescription>
         </CardHeader>
         <CardContent>
           <p className="text-muted-foreground">
             Contenu spécifique au service Transport. Cette section est une simulation et n'est pas fonctionnelle.
           </p>
           {/* Placeholder for future content */}
         </CardContent>
       </Card>
    </div>
  );
}
