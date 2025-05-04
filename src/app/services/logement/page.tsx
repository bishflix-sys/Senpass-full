
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Home } from "lucide-react";

export default function LogementPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
           <Home className="h-8 w-8" /> Logement (Simulation)
       </h1>

       <Card>
         <CardHeader>
           <CardTitle>Gestion du Logement</CardTitle>
           <CardDescription>
             Accédez aux services liés au logement simulés tels que les demandes d'aide, le suivi des dossiers, etc.
           </CardDescription>
         </CardHeader>
         <CardContent>
           <p className="text-muted-foreground">
             Contenu spécifique au service Logement. Cette section est une simulation et n'est pas fonctionnelle.
           </p>
           {/* Placeholder for future content */}
         </CardContent>
       </Card>
    </div>
  );
}
