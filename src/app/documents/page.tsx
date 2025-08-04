
"use client";

import * as React from 'react';
import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { FolderArchive, Lock, FileText, FileScan } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import SecureAccessDialog from '@/components/secure-access-dialog'; // Import the new component

// Metadata is now handled at the page level, not as an exported const for client components
// You can set the title using document.title in a useEffect hook if needed.

export default function DocumentsPage() {
  const [isVerified, setIsVerified] = React.useState(false);

  React.useEffect(() => {
    document.title = 'Mon Coffre-Fort Numérique - SenPass';
  }, []);


  const handleVerificationSuccess = () => {
    setIsVerified(true);
  };

  if (!isVerified) {
    return (
      <SecureAccessDialog
        onVerified={handleVerificationSuccess}
        resourceName="votre coffre-fort numérique"
      />
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
       <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
              <FolderArchive className="h-8 w-8" /> Mon Coffre-Fort Numérique
          </h1>
           <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary">
               Retour au tableau de bord
           </Link>
       </div>
       <p className="text-muted-foreground mb-8">
            Accédez et gérez vos documents officiels stockés de manière sécurisée dans le cloud.
       </p>

       <Alert variant="default" className="mb-8 bg-blue-50 border-blue-200" icon={Lock}>
          <AlertTitle className="text-blue-800">Fonctionnalité de Démonstration</AlertTitle>
          <AlertDescription className="text-blue-700">
            Cette section représente le coffre-fort numérique où vos documents importants (CNI, actes de naissance, diplômes, etc.) seraient stockés et accessibles. Dans cette démonstration, aucun document réel n'est sauvegardé.
          </AlertDescription>
       </Alert>

       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
         {/* Placeholder Card 1: Example Document Type */}
         <Card className="border hover:shadow-md transition-shadow">
           <CardHeader>
             <CardTitle className="flex items-center gap-2 text-lg">
               <FileText className="h-5 w-5 text-accent" /> Carte Nationale d'Identité
             </CardTitle>
             <CardDescription>Votre CNI numérique.</CardDescription>
           </CardHeader>
           <CardContent className="space-y-3">
             <p className="text-sm text-muted-foreground">Statut : Valide</p>
             <p className="text-xs text-muted-foreground">Dernière mise à jour : 01/01/2024</p>
             <Button variant="outline" size="sm" disabled>Voir le document</Button>
           </CardContent>
         </Card>

         {/* Placeholder Card 2: Example Document Type */}
         <Card className="border hover:shadow-md transition-shadow">
           <CardHeader>
             <CardTitle className="flex items-center gap-2 text-lg">
                <FileText className="h-5 w-5 text-accent" /> Acte de Naissance
             </CardTitle>
             <CardDescription>Extrait de votre acte de naissance.</CardDescription>
           </CardHeader>
           <CardContent className="space-y-3">
             <p className="text-sm text-muted-foreground">Statut : Disponible</p>
              <p className="text-xs text-muted-foreground">Délivré le : 15/05/1992</p>
             <Button variant="outline" size="sm" disabled>Télécharger</Button>
           </CardContent>
         </Card>

         {/* Placeholder Card 3: Add New Document */}
          <Card className="border border-dashed border-primary/50 hover:border-primary transition-colors">
           <CardHeader>
             <CardTitle className="flex items-center gap-2 text-lg text-primary">
               <FileScan className="h-5 w-5" /> Ajouter un Document
             </CardTitle>
             <CardDescription>Importer et sécuriser un nouveau document.</CardDescription>
           </CardHeader>
           <CardContent>
             <Button variant="secondary" className="w-full" disabled>
                Importer
             </Button>
              <p className="text-xs text-center text-muted-foreground mt-2">Formats supportés: PDF, JPG, PNG</p>
           </CardContent>
         </Card>
       </div>

        <div className="mt-10 text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
            <Lock className="h-3 w-3" /> Vos documents sont chiffrés et sécurisés.
        </div>
    </div>
  );
}
