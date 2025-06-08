
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Landmark, Users, FileText, Settings, LogOut, BarChart3, Banknote, Eye, EyeOff, Loader2 } from "lucide-react"; // Added Banknote, Eye, EyeOff, Loader2
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import * as React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";

export default function MinistryDashboardPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = React.useState(true);
    const [ministryName, setMinistryName] = React.useState<string>("Ministère de l'Exemple"); // Placeholder
    const [walletBalance, setWalletBalance] = React.useState<number | null>(null);
    const [isBalanceVisible, setIsBalanceVisible] = React.useState(false);

    React.useEffect(() => {
        // Simulate fetching ministry-specific data
        const timer = setTimeout(() => {
            // In a real app, you'd fetch the actual ministry name based on auth
            setMinistryName("Ministère de l'Économie, du Plan et de la Coopération"); // Example Ministry related to finance
            setWalletBalance(Math.floor(Math.random() * 1000000000) + 50000000); // Simulate large balance in FCFA
            setIsLoading(false);
        }, 1500);
        return () => clearTimeout(timer);
    }, []);

    const handleLogout = () => {
        toast({
          title: "Déconnexion Ministère",
          description: "Vous avez été déconnecté du portail ministère.",
        });
        setTimeout(() => {
          router.push("/login?tab=ministries");
        }, 1000);
    };

    if (isLoading) {
      return <MinistryDashboardSkeleton />;
    }

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
           <Link href="/dashboard" className="flex-shrink-0">
             <span className="text-2xl font-bold text-foreground tracking-tight">SENPASS</span>
           </Link>
           <div className="flex-1">
             <h1 className="text-2xl sm:text-3xl font-bold text-primary flex items-center gap-3">
               <Landmark className="h-7 w-7 sm:h-8 sm:w-8" /> Portail Ministère
             </h1>
             <p className="text-muted-foreground mt-1 text-sm sm:text-base">
               Tableau de bord pour {ministryName}.
             </p>
           </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout} className="flex-shrink-0 mt-2 sm:mt-0">
            <LogOut className="mr-2 h-4 w-4" />
            Se déconnecter
        </Button>
      </div>

      <Separator />

      <Alert variant="default" className="bg-blue-50 border-blue-200">
          <Landmark className="h-4 w-4 text-blue-700" />
          <AlertTitle className="text-blue-800">Espace Ministériel</AlertTitle>
          <AlertDescription className="text-blue-700">
             Ce portail donne accès aux outils et données accessibles aux ministères via SenPass.
             Toutes les données et fonctionnalités sont fournies à titre de démonstration.
          </AlertDescription>
       </Alert>

      {/* Main Content Area */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> {/* Adjusted to xl:grid-cols-4 */}
            {/* Card 1: Citizen Data Access */}
            <Card className="hover:shadow-lg transition-shadow duration-200 border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" /> Données Citoyennes
                    </CardTitle>
                    <CardDescription>Consulter les statistiques et données agrégées.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-sm">Accès aux statistiques démographiques, utilisation des services, etc.</p>
                    <Button variant="secondary" size="sm" className="mt-2" onClick={() => toast({title: "Information", description: "Ouverture du module d'analyse de données."})}>
                        Analyser les Données
                    </Button>
                </CardContent>
            </Card>

            {/* Card 2: Service Management */}
            <Card className="hover:shadow-lg transition-shadow duration-200 border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5 text-primary" /> Gestion des Services
                    </CardTitle>
                    <CardDescription>Configurer les services du ministère liés à SenPass.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-sm">Intégrer de nouveaux services, gérer les accès API, etc.</p>
                    <Button variant="outline" size="sm" className="mt-2" onClick={() => toast({title: "Information", description: "Ouverture du panneau de configuration des services."})}>
                        Configurer
                    </Button>
                </CardContent>
            </Card>

            {/* Card 3: Reporting & Analytics */}
            <Card className="hover:shadow-lg transition-shadow duration-200 border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-primary" /> Rapports et Performances
                    </CardTitle>
                    <CardDescription>Visualiser les indicateurs clés de performance (KPIs).</CardDescription>
                </CardHeader>
                <CardContent>
                     <p className="text-muted-foreground text-sm">Suivi de l'adoption des e-services, temps de traitement, etc.</p>
                     <Button variant="link" className="p-0 h-auto mt-2 text-primary" onClick={() => toast({title: "Information", description: "Affichage des tableaux de bord de performance."})}>
                        Voir les Rapports
                     </Button>
                </CardContent>
            </Card>

            {/* Card 4: Wallet Impôts et Domaines */}
            <Card className="hover:shadow-lg transition-shadow duration-200 border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Banknote className="h-5 w-5 text-primary" /> Portefeuille Impôts & Domaines
                    </CardTitle>
                    <CardDescription>Gérer les fonds et transactions fiscales.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                     <div className="flex items-center justify-between">
                        <span className="text-2xl font-bold tracking-tight">
                            {walletBalance === null ? (
                                <Loader2 className="h-6 w-6 animate-spin inline-block" />
                            ) : isBalanceVisible ? (
                                `${walletBalance.toLocaleString('fr-FR')} FCFA`
                            ) : (
                                '**** FCFA'
                            )}
                        </span>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                            aria-label={isBalanceVisible ? "Masquer le solde" : "Afficher le solde"}
                            className="text-muted-foreground hover:text-primary"
                        >
                            {isBalanceVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                        </Button>
                     </div>
                     <div className="flex flex-col sm:flex-row gap-2 mt-2">
                        <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => toast({title: "Information", description: "Affichage de l'historique des transactions."})}>
                            Transactions
                        </Button>
                        <Button variant="outline" size="sm" className="w-full sm:w-auto" onClick={() => toast({title: "Information", description: "Ouverture du module de gestion des fonds."})}>
                            Gérer Fonds
                        </Button>
                     </div>
                     <p className="text-xs text-muted-foreground pt-2">Dernière synchronisation: Aujourd'hui</p>
                </CardContent>
            </Card>
       </div>

        <Separator />

        {/* Specific Ministerial Tools Section (Placeholder) */}
        <section>
            <h2 className="text-2xl font-semibold mb-4">Outils Spécifiques au Ministère</h2>
            <Card className="border shadow-sm">
                <CardHeader>
                    <CardTitle>Modules Métiers</CardTitle>
                    <CardDescription>Exemples de modules qui pourraient être disponibles selon le ministère.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    <div className="p-4 border rounded-md bg-muted/50">
                        <h3 className="font-semibold text-primary flex items-center gap-2"><FileText className="h-5 w-5"/> Gestion Documentaire Sécurisée</h3>
                        <p className="text-sm text-muted-foreground mt-1">Archivage, consultation et partage de documents officiels internes.</p>
                        <Button size="sm" variant="ghost" className="mt-2 text-primary" onClick={() => toast({description: "Accès aux archives."})}>Accéder aux archives</Button>
                    </div>
                    <div className="p-4 border rounded-md bg-muted/50">
                        <h3 className="font-semibold text-primary flex items-center gap-2"><Users className="h-5 w-5"/> Registre National (Exemple)</h3>
                        <p className="text-sm text-muted-foreground mt-1">Interface pour la gestion d'un registre national spécifique (ex: registre de l'état civil, registre foncier).</p>
                         <Button size="sm" variant="ghost" className="mt-2 text-primary" onClick={() => toast({description: "Ouverture du registre."})}>Ouvrir le registre</Button>
                    </div>
                    {/* Add more ministry-specific tools based on the type of ministry */}
                </CardContent>
            </Card>
        </section>

    </div>
  );
}

// Skeleton component for loading state
function MinistryDashboardSkeleton() {
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
      <Skeleton className="h-20 w-full rounded-lg" />

      {/* Main Content Grid Skeleton */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6"> {/* Adjusted to xl:grid-cols-4 */}
        <Skeleton className="h-56 rounded-lg" /> {/* Card Skeleton 1 */}
        <Skeleton className="h-56 rounded-lg" /> {/* Card Skeleton 2 */}
        <Skeleton className="h-56 rounded-lg" /> {/* Card Skeleton 3 */}
        <Skeleton className="h-56 rounded-lg" /> {/* Card Skeleton 4 (Wallet) */}
      </div>

      <Separator />

       {/* Other Sections Skeleton */}
       <section>
            <Skeleton className="h-8 w-60 mb-4" /> {/* Section Title Skeleton */}
            <Skeleton className="h-72 rounded-lg" /> {/* Large Card for tools */}
        </section>
    </div>
  );
}

