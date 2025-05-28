
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FileSpreadsheet } from "lucide-react";

export const metadata: Metadata = {
  title: 'Impôts et Domaines - SenPass',
  description: 'Simulation des services fiscaux (Impôts et Domaines) accessibles via SenPass.',
};

export default function ImpotsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
           <FileSpreadsheet className="h-8 w-8" /> Impôts et Domaines (Simulation)
       </h1>

       <Card>
         <CardHeader>
           <CardTitle>Gestion Fiscale</CardTitle>
           <CardDescription>
             Accédez aux services fiscaux simulés comme les déclarations, les paiements, etc.
           </CardDescription>
         </CardHeader>
         <CardContent>
           <p className="text-muted-foreground">
             Contenu spécifique au service Impôts et Domaines. Cette section est une simulation et n'est pas fonctionnelle.
           </p>
           {/* Placeholder for future content */}
         </CardContent>
       </Card>
    </div>
  );
}
