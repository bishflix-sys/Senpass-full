
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Briefcase } from "lucide-react";

export default function SecuPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
           <Briefcase className="h-8 w-8" /> Sécurité Sociale (Simulation)
       </h1>

       <Card>
         <CardHeader>
           <CardTitle>Gestion de la Sécurité Sociale</CardTitle>
           <CardDescription>
             Accédez aux services de sécurité sociale simulés comme la consultation des prestations, le suivi des cotisations, etc.
           </CardDescription>
         </CardHeader>
         <CardContent>
           <p className="text-muted-foreground">
             Contenu spécifique au service Sécurité Sociale. Cette section est une simulation et n'est pas fonctionnelle.
           </p>
           {/* Placeholder for future content */}
         </CardContent>
       </Card>
    </div>
  );
}
