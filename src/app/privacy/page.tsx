
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ShieldCheck } from "lucide-react";

export default function PrivacyPage() {
  return (
    <div className="container mx-auto px-4 py-8">
       <h1 className="text-3xl font-bold text-primary mb-6 flex items-center gap-3">
           <ShieldCheck className="h-8 w-8" /> Politique de Confidentialité (Simulation)
       </h1>

       <Card>
         <CardHeader>
           <CardTitle>Politique de Confidentialité de SenPass</CardTitle> {/* Changed from SenPass Lite */}
           <CardDescription>
             Dernière mise à jour : {new Date().toLocaleDateString('fr-FR')}
           </CardDescription>
         </CardHeader>
         <CardContent className="space-y-4">
           <p>Cette politique décrit comment SenPass (Simulation) gère les informations.</p> {/* Changed from SenPass Lite */}
           <p><strong>1. Collecte d'Informations :</strong> SenPass est une application de simulation. Elle <strong>ne collecte, ne stocke et ne traite aucune donnée personnelle réelle</strong> des utilisateurs de manière persistante. Les informations saisies (par exemple, nom, numéro CNI lors de l'inscription simulée) sont utilisées temporairement pour la démonstration et ne sont pas sauvegardées.</p> {/* Changed from SenPass Lite */}
           <p><strong>2. Utilisation des Informations :</strong> Les données temporaires saisies sont utilisées uniquement pour simuler les fonctionnalités de l'application (affichage du profil, génération de QR code, etc.) pendant la session active.</p>
           <p><strong>3. Cookies et Stockage Local :</strong> L'application peut utiliser un stockage local minimal (par exemple, pour l'état de connexion simulé ou les préférences de thème) mais ne stocke pas d'informations personnelles identifiables.</p>
           <p><strong>4. Partage d'Informations :</strong> Aucune information n'est partagée avec des tiers, car aucune donnée personnelle réelle n'est collectée.</p>
           <p><strong>5. Sécurité :</strong> Bien qu'il s'agisse d'une simulation, des mesures de base sont prises pour la structure du code. Cependant, ne saisissez jamais d'informations réelles ou sensibles dans cette application.</p>
           <p><strong>6. Caméra :</strong> L'accès à la caméra est demandé uniquement pour la fonctionnalité de reconnaissance faciale simulée. Les images ne sont pas stockées ni transmises.</p>
            <p><strong>7. Modifications :</strong> Cette politique de confidentialité simulée peut être mise à jour.</p>
           <p className="text-muted-foreground italic">
             Ceci est un document de simulation. Référez-vous toujours aux politiques de confidentialité officielles des services réels.
           </p>
         </CardContent>
       </Card>
    </div>
  );
}


