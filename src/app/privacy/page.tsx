
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { ShieldCheck, User, Database, Clock, Fingerprint, Users, FileWarning } from "lucide-react";

export const metadata: Metadata = {
  title: 'Politique de Confidentialité - SenPass',
  description: 'Découvrez comment SenPass protège vos données personnelles conformément au RGPD.',
};

export default function PrivacyPage() {
  const lastUpdated = "25 Mai 2024";

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
       <div className="mb-8">
           <h1 className="text-4xl font-bold text-primary mb-2 flex items-center gap-3">
               <ShieldCheck className="h-10 w-10" /> Politique de Confidentialité
           </h1>
           <p className="text-muted-foreground">Dernière mise à jour : {lastUpdated}</p>
       </div>

       <div className="space-y-8">
            <p className="text-lg text-foreground">
                Votre confiance est primordiale. Cette politique de confidentialité explique de manière transparente comment vos données personnelles sont traitées sur la plateforme SenPass, en accord avec le Règlement Général sur la Protection des Données (RGPD) et les lois sénégalaises en vigueur.
            </p>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><User className="h-5 w-5 text-accent"/> 1. Principes Fondamentaux</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-muted-foreground">
                 <p><strong>Minimisation des données :</strong> Nous ne collectons que les informations strictement nécessaires pour fournir et sécuriser nos services.</p>
                 <p><strong>Base légale :</strong> Chaque traitement de données repose sur une base légale claire : votre consentement, l'exécution d'un contrat, une obligation légale ou notre intérêt légitime à sécuriser la plateforme.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Database className="h-5 w-5 text-accent"/> 2. Données Collectées et Finalités</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-muted-foreground">
                <p>Nous collectons des informations pour la création de votre compte (nom, identifiants), la fourniture des services (données de profil) et la sécurité (logs de connexion, appareil utilisé). Ces données ne sont utilisées que pour vous permettre d'accéder aux services publics et privés, sécuriser votre compte, et vous assister.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Clock className="h-5 w-5 text-accent"/> 3. Durée de Conservation</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>Vos données sont conservées tant que votre compte est actif, puis archivées ou supprimées conformément aux obligations légales. Les logs de sécurité sont conservés pour une durée limitée.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Fingerprint className="h-5 w-5 text-accent"/> 4. Droits des Utilisateurs</CardTitle>
              </CardHeader>
              <CardContent className="space-y-2 text-muted-foreground">
                <p>Conformément au RGPD, vous disposez des droits suivants :</p>
                <ul className="list-disc list-inside pl-4 space-y-1">
                    <li><strong>Droit d'accès :</strong> Consulter les données que nous détenons sur vous.</li>
                    <li><strong>Droit de rectification :</strong> Corriger des informations inexactes.</li>
                    <li><strong>Droit à l'effacement (« droit à l'oubli ») :</strong> Demander la suppression de votre compte et de vos données, sous réserve des obligations légales.</li>
                    <li><strong>Droit à la portabilité :</strong> Recevoir vos données dans un format structuré.</li>
                    <li><strong>Droit d'opposition et de limitation :</strong> Vous opposer à certains traitements ou en demander la limitation.</li>
                </ul>
                <p className="pt-2">Vous pouvez exercer ces droits depuis les paramètres de votre compte ou en contactant notre Délégué à la Protection des Données (DPO).</p>
              </CardContent>
            </Card>

             <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><Users className="h-5 w-5 text-accent"/> 5. Partage des Données et Sous-traitants</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>Vos données ne sont partagées avec des services tiers (administrations, partenaires) que lorsque vous initiez une action (ex: paiement, demande de document) et avec votre autorisation explicite. Nos partenaires techniques (hébergeurs, etc.) sont rigoureusement sélectionnés pour leur conformité au RGPD.</p>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2"><FileWarning className="h-5 w-5 text-accent"/> Note sur la version de démonstration</CardTitle>
              </CardHeader>
              <CardContent className="text-muted-foreground">
                <p>
                    Cette application est une version de démonstration. Elle **ne collecte, ne stocke et ne traite aucune donnée personnelle réelle** des utilisateurs de manière persistante. Les informations que vous pourriez saisir sont utilisées temporairement pour l'expérience applicative et ne sont pas sauvegardées. L'accès à la caméra, par exemple, est demandé uniquement pour illustrer une fonctionnalité et les images ne sont ni stockées ni transmises.
                </p>
              </CardContent>
            </Card>
       </div>
    </div>
  );
}
