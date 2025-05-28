
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FileText } from "lucide-react";

export const metadata: Metadata = {
  title: "Conditions d'Utilisation - SenPass",
  description: "Consultez les conditions d'utilisation de la plateforme SenPass (Simulation).",
};

export default function TermsPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
           <FileText className="h-8 w-8" /> Conditions d'Utilisation (Simulation)
       </h1>

       <Card>
         <CardHeader>
           <CardTitle>Conditions Générales d'Utilisation</CardTitle>
           <CardDescription>
             Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
           </CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
           <p>Bienvenue sur cette simulation de plateforme d'identité numérique.</p>
           <p><strong>1. Acceptation des Conditions :</strong> En utilisant cette application de simulation, vous acceptez les présentes conditions. Cette application est fournie à des fins de démonstration uniquement et ne constitue pas un service officiel.</p>
           <p><strong>2. Simulation :</strong> Toutes les données (noms, numéros d'identification, etc.) et fonctionnalités (connexion, vérification, signature) sont simulées et n'ont aucune valeur légale ou réelle.</p>
           <p><strong>3. Données Utilisateur :</strong> Aucune donnée personnelle réelle n'est collectée, stockée ou traitée de manière persistante par cette simulation. Les informations saisies sont utilisées uniquement pour la durée de la session de démonstration.</p>
           <p><strong>4. Utilisation Autorisée :</strong> Cette application est destinée à des fins éducatives et d'évaluation. Toute utilisation abusive ou tentative d'exploitation à des fins malveillantes est interdite.</p>
           <p><strong>5. Limitation de Responsabilité :</strong> Les créateurs de cette plateforme ne peuvent être tenus responsables de toute interprétation erronée ou de toute conséquence découlant de l'utilisation de cette simulation.</p>
           <p><strong>6. Modifications :</strong> Ces conditions peuvent être modifiées à tout moment.</p>
           <p className="text-muted-foreground italic">
             Ceci est un document de simulation. Consultez toujours les conditions officielles des services réels.
           </p>
         </CardContent>
       </Card>
    </div>
  );
}
