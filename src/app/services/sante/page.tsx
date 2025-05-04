
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { HeartPulse } from "lucide-react";

export default function SantePage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
           <HeartPulse className="h-8 w-8" /> Santé (Simulation)
       </h1>

       <Card>
         <CardHeader>
           <CardTitle>Gestion de la Santé</CardTitle>
           <CardDescription>
             Accédez aux services de santé simulés tels que la consultation du carnet de santé, la prise de rendez-vous, etc.
           </CardDescription>
         </CardHeader>
         <CardContent>
           <p className="text-muted-foreground">
             Contenu spécifique au service Santé. Cette section est une simulation et n'est pas fonctionnelle.
           </p>
           {/* Placeholder for future content */}
         </CardContent>
       </Card>
    </div>
  );
}
