
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Droplet } from "lucide-react";

export default function EauPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
           <Droplet className="h-8 w-8" /> Eau (Sen'Eau - Simulation)
       </h1>

       <Card>
         <CardHeader>
           <CardTitle>Gestion de l'Eau</CardTitle>
           <CardDescription>
             Accédez aux services d'eau simulés comme la consultation de factures, le signalement de fuites, etc.
           </CardDescription>
         </CardHeader>
         <CardContent>
           <p className="text-muted-foreground">
             Contenu spécifique au service Eau. Cette section est une simulation et n'est pas fonctionnelle.
           </p>
           {/* Placeholder for future content */}
         </CardContent>
       </Card>
    </div>
  );
}
