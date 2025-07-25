
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { CodeXml, Key, BookOpen, BarChart2, Settings, LogOut, PackagePlus, Terminal, ShoppingCart } from "lucide-react"; // Added ShoppingCart
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Skeleton } from "@/components/ui/skeleton"; // For loading state
import * as React from "react";
import Image from "next/image";

export default function DeveloperDashboardPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = React.useState(true); // Add loading state
    const [apiKey, setApiKey] = React.useState<string | null>(null); // API key

     // Simulate loading data
    React.useEffect(() => {
        const timer = setTimeout(() => {
           setApiKey(`sk_dev_${Date.now().toString(36)}`); // Generate a key
           setIsLoading(false);
        }, 1500); // Simulate 1.5s loading
        return () => clearTimeout(timer); // Cleanup timer
    }, []);

    const handleLogout = () => {
        toast({
          title: "Déconnexion Développeur",
          description: "Vous avez été déconnecté du portail développeur.",
        });
        setTimeout(() => {
          router.push("/login?tab=developers");
        }, 1000);
    };

    const handleGenerateKey = () => {
        toast({
            title: "Information",
            description: "Génération d'une nouvelle clé API...",
        });
         setApiKey(`sk_dev_${Date.now().toString(36)}`);
    };

    if (isLoading) {
      return <DeveloperDashboardSkeleton />;
    }


  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
           <Link href="/dashboard" className="flex-shrink-0">
             <Image src="https://media.licdn.com/dms/image/v2/D4E0BAQEZqb1Jwm5tDQ/company-logo_100_100/B4EZa0hKR.HoAQ-/0/1746785314889?e=1756339200&v=beta&t=Jd6PipGqCyUUvYcM_sEpCtQb_OHUtNBtVYBTk9K2Khw" alt="SenPass Logo" width={40} height={40} className="rounded-md" />
           </Link>
           <div className="flex-1">
             <h1 className="text-2xl sm:text-3xl font-bold text-primary flex items-center gap-3">
               <CodeXml className="h-7 w-7 sm:h-8 sm:w-8" /> Portail Développeur
             </h1>
             <p className="text-muted-foreground mt-1 text-sm sm:text-base">
               Gérez vos intégrations et clés API SenPass.
             </p>
           </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout} className="flex-shrink-0 mt-2 sm:mt-0">
            <LogOut className="mr-2 h-4 w-4" />
            Se déconnecter
        </Button>
      </div>

      <Separator />

      <Alert variant="default" className="mb-6 bg-blue-50 border-blue-200" icon={Terminal}>
          <AlertTitle className="text-blue-800">Espace de Développement</AlertTitle>
          <AlertDescription className="text-blue-700">
             Ce portail est destiné à la gestion de vos intégrations. Les clés API et les statistiques sont réelles dans un environnement de production.
          </AlertDescription>
       </Alert>


      {/* Main Content Area */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* API Keys Management */}
            <Card className="hover:shadow-lg transition-shadow duration-200 border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Key className="h-5 w-5 text-primary" /> Gestion des Clés API
                    </CardTitle>
                    <CardDescription>Générez et gérez vos clés d'accès.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                     <p className="text-sm font-medium">Votre clé API:</p>
                     <div className="flex items-center justify-between gap-2 p-2 bg-muted rounded border">
                        <code className="text-xs break-all text-muted-foreground">{apiKey ? apiKey : "Aucune clé générée"}</code>
                        <Button variant="ghost" size="sm" onClick={() => navigator.clipboard.writeText(apiKey || '').then(() => toast({ title: 'Copié !' }))} disabled={!apiKey}>Copier</Button>
                     </div>
                    <Button variant="secondary" size="sm" className="mt-2" onClick={handleGenerateKey}>
                         <PackagePlus className="mr-2 h-4 w-4" /> Générer Nouvelle Clé
                    </Button>
                </CardContent>
            </Card>

            {/* API Documentation */}
            <Card className="hover:shadow-lg transition-shadow duration-200 border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BookOpen className="h-5 w-5 text-primary" /> Documentation API
                    </CardTitle>
                    <CardDescription>Explorez les endpoints et guides.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-sm mb-3">Consultez nos guides pour intégrer SenPass.</p>
                    <Button variant="outline" size="sm" asChild>
                       <Link href="/docs/api" target="_blank"> {/* Link to future docs */}
                           Voir la documentation
                       </Link>
                    </Button>
                    {/* Placeholder link, target should be actual docs */}
                     <p className="text-xs text-muted-foreground mt-2">Exemples: Authentification, Signature...</p>
                </CardContent>
            </Card>

            {/* Usage Statistics */}
            <Card className="hover:shadow-lg transition-shadow duration-200 border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart2 className="h-5 w-5 text-primary" /> Statistiques d'Usage
                    </CardTitle>
                    <CardDescription>Suivez l'utilisation de vos APIs.</CardDescription>
                </CardHeader>
                <CardContent>
                     <p className="text-muted-foreground text-sm">Aucune donnée disponible.</p>
                     {/* Placeholder for charts or stats */}
                     <div className="mt-3 space-y-2">
                        <Skeleton className="h-4 w-3/4" />
                        <Skeleton className="h-4 w-1/2" />
                     </div>
                     <Button variant="link" className="p-0 h-auto mt-2 text-primary" onClick={() => toast({title: "Information", description: "Affichage des statistiques détaillées."})}>Voir détails</Button>
                </CardContent>
            </Card>
       </div>

        <Separator />

        {/* Payment Section */}
        <section>
            <h2 className="text-2xl font-semibold mb-4">Paiement des Services</h2>
            <Card className="border shadow-sm">
                <CardHeader>
                    <CardTitle>Payer un Service via API</CardTitle>
                    <CardDescription>Effectuez un paiement de service pour vos intégrations.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Button asChild size="lg" className="w-full sm:w-auto">
                        <Link href="/select-service">
                            <ShoppingCart className="mr-2 h-5 w-5" /> Sélectionner un service à payer
                        </Link>
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                        Ceci reflète le processus de sélection d'un service avant de procéder au paiement.
                    </p>
                </CardContent>
            </Card>
        </section>

        <Separator />


        {/* Other Potential Sections */}
        <section>
            <h2 className="text-2xl font-semibold mb-4">Autres Outils et Paramètres</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 {/* Sandbox Environment */}
                <Card className="border">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2">
                            <Terminal className="h-5 w-5 text-accent" /> Environnement Sandbox
                        </CardTitle>
                        <CardDescription>Testez vos intégrations en toute sécurité.</CardDescription>
                    </CardHeader>
                    <CardContent>
                         <Button variant="outline" size="sm" onClick={() => toast({ title: "Information", description: "Accès à l'environnement Sandbox." })}>Accéder au Sandbox</Button>
                    </CardContent>
                </Card>

                 {/* Account Settings */}
                 <Card className="border">
                     <CardHeader>
                         <CardTitle className="flex items-center gap-2">
                             <Settings className="h-5 w-5 text-accent" /> Paramètres du Compte Dev
                         </CardTitle>
                         <CardDescription>Gérez vos informations de contact et de sécurité.</CardDescription>
                     </CardHeader>
                     <CardContent>
                          <Button variant="secondary" size="sm" onClick={() => toast({ title: "Information", description: "Ouverture des paramètres développeur." })}>Modifier</Button>
                     </CardContent>
                 </Card>
            </div>
        </section>
    </div>
  );
}


// Skeleton component for loading state
function DeveloperDashboardSkeleton() {
  return (
    <div className="container mx-auto px-4 py-8 space-y-8 animate-pulse">
      {/* Header Skeleton */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
          <Skeleton className="h-8 w-32" /> {/* Logo Skeleton */}
          <div className="flex-1 space-y-2">
            <Skeleton className="h-8 w-64" /> {/* Title Skeleton */}
            <Skeleton className="h-4 w-80" /> {/* Description Skeleton */}
          </div>
        </div>
        <Skeleton className="h-9 w-32 rounded-md" /> {/* Logout Button Skeleton */}
      </div>
      <Separator />

      {/* Alert Skeleton */}
      <Skeleton className="h-16 w-full rounded-lg" />

      {/* Main Content Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Skeleton className="h-64 rounded-lg" /> {/* Card Skeleton 1 */}
        <Skeleton className="h-64 rounded-lg" /> {/* Card Skeleton 2 */}
        <Skeleton className="h-64 rounded-lg" /> {/* Card Skeleton 3 */}
      </div>

      <Separator />

      {/* Payment Section Skeleton */}
      <section>
        <Skeleton className="h-8 w-56 mb-4" /> {/* Section Title Skeleton */}
        <Skeleton className="h-48 rounded-lg" /> {/* Payment Card Skeleton */}
      </section>

      <Separator />

       {/* Other Sections Skeleton */}
       <section>
            <Skeleton className="h-8 w-48 mb-4" /> {/* Section Title Skeleton */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <Skeleton className="h-40 rounded-lg" /> {/* Other Card 1 */}
                 <Skeleton className="h-40 rounded-lg" /> {/* Other Card 2 */}
            </div>
        </section>
    </div>
  );
}
