
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Anchor } from "lucide-react"; // Using Anchor as Ship is not available

export const metadata: Metadata = {
  title: 'Services Douaniers - SenPass',
  description: 'Simulation des services douaniers accessibles via SenPass.',
};

export default function DouanesPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
           <Anchor className="h-8 w-8" /> Douanes (Simulation)
       </h1>

       <Card>
         <CardHeader>
           <CardTitle>Services Douaniers</CardTitle>
           <CardDescription>
             Accédez aux services douaniers simulés comme les déclarations, le suivi des marchandises, etc.
           </CardDescription>
         </CardHeader>
         <CardContent>
           <p className="text-muted-foreground">
             Contenu spécifique aux services des Douanes. Cette section est une simulation et n'est pas fonctionnelle.
           </p>
           {/* Placeholder for future content */}
         </CardContent>
       </Card>
    </div>
  );
}
