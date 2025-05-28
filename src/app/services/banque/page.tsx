
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Landmark } from "lucide-react";

export const metadata: Metadata = {
  title: 'Services Bancaires - SenPass',
  description: 'Simulation des services bancaires accessibles via SenPass.',
};

export default function BanquePage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
           <Landmark className="h-8 w-8" /> Services Bancaires (Simulation)
       </h1>

       <Card>
         <CardHeader>
           <CardTitle>Gestion des Services Bancaires</CardTitle>
           <CardDescription>
             Accédez aux services bancaires simulés comme la consultation de comptes, les virements, etc.
           </CardDescription>
         </CardHeader>
         <CardContent>
           <p className="text-muted-foreground">
             Contenu spécifique aux Services Bancaires. Cette section est une simulation et n'est pas fonctionnelle.
           </p>
           {/* Placeholder for future content */}
         </CardContent>
       </Card>
    </div>
  );
}
