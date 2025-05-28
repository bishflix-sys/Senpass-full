
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Scale } from "lucide-react";

export const metadata: Metadata = {
  title: 'Justice - SenPass',
  description: 'Accès aux services judiciaires via SenPass.',
};

export default function JusticePage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
           <Scale className="h-8 w-8" /> Justice
       </h1>

       <Card>
         <CardHeader>
           <CardTitle>Services Judiciaires</CardTitle>
           <CardDescription>
             Accédez aux services judiciaires comme le suivi des affaires, les demandes de casier, etc.
           </CardDescription>
         </CardHeader>
         <CardContent>
           <p className="text-muted-foreground">
             Contenu spécifique au service Justice. Cette section est fournie à titre de démonstration et n'est pas fonctionnelle.
           </p>
           {/* Placeholder for future content */}
         </CardContent>
       </Card>
    </div>
  );
}
