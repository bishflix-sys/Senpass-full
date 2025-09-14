
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Landmark, Users, FileText, Settings, LogOut, BarChart3, Banknote, Eye, EyeOff, Loader2, MapPin, Handshake, Briefcase } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import { Skeleton } from "@/components/ui/skeleton";
import * as React from "react";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import Image from "next/image";
import dynamic from 'next/dynamic';

const LocationMap = dynamic(() => import('@/components/location-map'), {
  loading: () => <Skeleton className="h-[400px] w-full" />,
  ssr: false
});

export default function MinistryDashboardPage() {
    const router = useRouter();
    const { toast } = useToast();
    const [isLoading, setIsLoading] = React.useState(true);
    const [ministryName, setMinistryName] = React.useState<string>("Ministère de l'Exemple");
    const [walletBalance, setWalletBalance] = React.useState<number | null>(null);
    const [isBalanceVisible, setIsBalanceVisible] = React.useState(false);

    React.useEffect(() => {
        const timer = setTimeout(() => {
            setMinistryName("Ministère de l'Économie, du Plan et de la Coopération");
            setWalletBalance(Math.floor(Math.random() * 1000000000) + 50000000);
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
             <Image src="https://media.licdn.com/dms/image/v2/D4E0BAQEZqb1Jwm5tDQ/company-logo_100_100/B4EZa0hKR.HoAQ-/0/1746785314889?e=1756339200&v=beta&t=Jd6PipGqCyUUvYcM_sEpCtQb_OHUtNBtVYBTk9K2Khw" alt="SenPass Logo" width={40} height={40} className="rounded-md" />
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

      <Alert variant="default" className="bg-blue-50 border-blue-200" icon={Landmark}>
          <AlertTitle className="text-blue-800">Espace Ministériel</AlertTitle>
          <AlertDescription className="text-blue-700">
             Ce portail donne accès aux outils et données accessibles aux ministères via SenPass.
             Toutes les données et fonctionnalités sont fournies à titre de démonstration.
          </AlertDescription>
       </Alert>

      {/* Main Content Area */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {/* Card 1: Citizen Data Access */}
            <Card className="hover:shadow-lg transition-shadow duration-200 border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <BarChart3 className="h-5 w-5 text-primary" /> Tableau de Bord National
                    </CardTitle>
                    <CardDescription>Statistiques agrégées en temps réel.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-sm">Suivi des KPIs (population, santé, éducation).</p>
                    <Button variant="secondary" size="sm" className="mt-2" onClick={() => toast({title: "Information", description: "Ouverture du tableau de bord national."})}>
                        Consulter les stats
                    </Button>
                </CardContent>
            </Card>

            {/* Card 2: Suivi des Subventions Sociales */}
            <Card className="hover:shadow-lg transition-shadow duration-200 border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Briefcase className="h-5 w-5 text-primary" /> Subventions Sociales
                    </CardTitle>
                    <CardDescription>Gérez les bourses, aides et allocations.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-sm">Suivi des paiements et des bénéficiaires.</p>
                    <Button variant="outline" size="sm" className="mt-2" onClick={() => toast({title: "Information", description: "Ouverture du module de gestion des subventions."})}>
                        Gérer les Aides
                    </Button>
                </CardContent>
            </Card>

            {/* Card 3: Registre Foncier Numérique */}
            <Card className="hover:shadow-lg transition-shadow duration-200 border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileText className="h-5 w-5 text-primary" /> Registre Foncier
                    </CardTitle>
                    <CardDescription>Consultez et sécurisez les titres fonciers.</CardDescription>
                </CardHeader>
                <CardContent>
                     <p className="text-muted-foreground text-sm">Interopérabilité avec le cadastre.</p>
                     <Button variant="link" className="p-0 h-auto mt-2 text-primary" onClick={() => toast({title: "Information", description: "Ouverture du registre foncier."})}>
                        Accéder au Registre
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

        {/* Map Section */}
        <section>
            <h2 className="text-2xl font-semibold mb-4 flex items-center gap-2">
                <MapPin className="h-6 w-6" /> Carte des Agences Gouvernementales
            </h2>
             <Card className="border shadow-sm">
                <CardContent className="p-4">
                    <LocationMap />
                </CardContent>
            </Card>
        </section>

        <Separator />

        {/* Specific Ministerial Tools Section (Placeholder) */}
        <section>
            <h2 className="text-2xl font-semibold mb-4">Autres Outils Spécifiques</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="border shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary"><Handshake className="h-5 w-5"/> Interopérabilité CEDEAO</CardTitle>
                        <CardDescription>Faciliter la mobilité et le commerce régional.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Outils pour l'échange de données sécurisé avec les pays membres.</p>
                        <Button size="sm" variant="outline" className="mt-2" onClick={() => toast({description: "Accès au portail CEDEAO."})}>Portail Régional</Button>
                    </CardContent>
                </Card>
                <Card className="border shadow-sm">
                    <CardHeader>
                        <CardTitle className="flex items-center gap-2 text-primary"><Users className="h-5 w-5"/> Contrôle de Présence</CardTitle>
                        <CardDescription>Système de pointage des fonctionnaires.</CardDescription>
                    </CardHeader>
                    <CardContent>
                        <p className="text-sm text-muted-foreground">Basé sur la biométrie ou le scan de QR code via SenPass.</p>
                         <Button size="sm" variant="outline" className="mt-2" onClick={() => toast({description: "Ouverture du système de pointage."})}>Tableau de bord RH</Button>
                    </CardContent>
                </Card>
            </div>
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
          <Skeleton className="h-10 w-10 rounded-md" /> {/* Logo Skeleton */}
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
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        <Skeleton className="h-56 rounded-lg" /> {/* Card Skeleton 1 */}
        <Skeleton className="h-56 rounded-lg" /> {/* Card Skeleton 2 */}
        <Skeleton className="h-56 rounded-lg" /> {/* Card Skeleton 3 */}
        <Skeleton className="h-56 rounded-lg" /> {/* Card Skeleton 4 (Wallet) */}
      </div>

      <Separator />

      {/* Map Skeleton */}
      <section>
        <Skeleton className="h-8 w-56 mb-4" /> {/* Section Title Skeleton */}
        <Skeleton className="h-96 rounded-lg" />
      </section>

      <Separator />

       {/* Other Sections Skeleton */}
       <section>
            <Skeleton className="h-8 w-60 mb-4" /> {/* Section Title Skeleton */}
            <Skeleton className="h-72 rounded-lg" /> {/* Large Card for tools */}
        </section>
    </div>
  );
}

    