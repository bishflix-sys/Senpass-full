
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Building, Users, FileCheck, Settings, LogOut, QrCode, CreditCard, Smartphone, RadioTower, ShoppingCart, Terminal } from "lucide-react"; // Added Terminal for Alert
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import Link from "next/link";
import Image from "next/image";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert"; // Added Alert

export default function BusinessDashboardPage() {
    const router = useRouter();
    const { toast } = useToast();

    const handleLogout = () => {
        // Simulate logout process
        toast({
          title: "Déconnexion Business",
          description: "Vous avez été déconnecté du portail entreprise.",
        });

        // Redirect to login page after a short delay, specifying the business tab
        setTimeout(() => {
          router.push("/login?tab=business");
        }, 1000);
      };


  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header Section with Text Logo */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
           <Link href="/dashboard" className="flex-shrink-0">
             <Image src="https://media.licdn.com/dms/image/v2/D4E0BAQEZqb1Jwm5tDQ/company-logo_100_100/B4EZa0hKR.HoAQ-/0/1746785314889?e=1756339200&v=beta&t=Jd6PipGqCyUUvYcM_sEpCtQb_OHUtNBtVYBTk9K2Khw" alt="SenPass Logo" width={40} height={40} className="rounded-md" />
           </Link>
           <div className="flex-1">
             <h1 className="text-2xl sm:text-3xl font-bold text-primary flex items-center gap-3">
               <Building className="h-7 w-7 sm:h-8 sm:w-8" /> Portail Entreprise
             </h1>
             <p className="text-muted-foreground mt-1 text-sm sm:text-base">
               Tableau de bord pour les partenaires Business SenPass.
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
          <AlertTitle className="text-blue-800">Espace de Démonstration</AlertTitle>
          <AlertDescription className="text-blue-700">
             Ce portail est destiné à la gestion de vos services partenaires. Les fonctionnalités sont simulées.
          </AlertDescription>
       </Alert>


      {/* Main Content Area */}
       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {/* Placeholder Card 1: Verification Requests */}
            <Card className="hover:shadow-lg transition-shadow duration-200 border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <FileCheck className="h-5 w-5 text-primary" /> Demandes de Vérification
                    </CardTitle>
                    <CardDescription>Gérer les demandes d'identité en attente.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-sm">Aucune demande en attente.</p>
                    {/* Placeholder for verification list or stats */}
                    <Button variant="link" className="p-0 h-auto mt-2 text-primary" onClick={() => toast({title: "Information", description: "Affichage de toutes les demandes."})}>Voir tout</Button>
                </CardContent>
            </Card>

            {/* Placeholder Card 2: Manage Users/Team */}
            <Card className="hover:shadow-lg transition-shadow duration-200 border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Users className="h-5 w-5 text-primary" /> Gérer l'Équipe
                    </CardTitle>
                    <CardDescription>Ajouter ou gérer les accès de vos collaborateurs.</CardDescription>
                </CardHeader>
                <CardContent>
                    <p className="text-muted-foreground text-sm">3 utilisateurs actifs.</p>
                    {/* Placeholder for user management actions */}
                    <Button variant="outline" size="sm" className="mt-2" onClick={() => toast({title: "Information", description: "Ouverture du panneau de gestion des accès."})}>Gérer les accès</Button>
                </CardContent>
            </Card>

            {/* Placeholder Card 3: Account Settings */}
            <Card className="hover:shadow-lg transition-shadow duration-200 border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2">
                        <Settings className="h-5 w-5 text-primary" /> Paramètres du Compte
                    </CardTitle>
                    <CardDescription>Configurer les informations de l'entreprise.</CardDescription>
                </CardHeader>
                <CardContent>
                     <p className="text-muted-foreground text-sm">Mettre à jour vos informations.</p>
                    {/* Placeholder for settings link */}
                    <Button variant="secondary" size="sm" className="mt-2" onClick={() => toast({title: "Information", description: "Ouverture des paramètres du compte."})}>Modifier les paramètres</Button>
                </CardContent>
            </Card>
       </div>

        <Separator />

        {/* Payment Section */}
        <section>
            <h2 className="text-2xl font-semibold mb-4">Paiement des Services</h2>
            <Card className="border shadow-sm">
                <CardHeader>
                    <CardTitle>Payer un Service</CardTitle>
                    <CardDescription>Sélectionnez un service ministériel ou autre à payer.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    <Button asChild size="lg" className="w-full sm:w-auto">
                        <Link href="/select-service">
                            <ShoppingCart className="mr-2 h-5 w-5" /> Sélectionner un service à payer
                        </Link>
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">
                        Vous serez redirigé pour choisir le service, puis la méthode de paiement.
                    </p>
                </CardContent>
            </Card>
        </section>

        <Separator />

        {/* Placeholder for specific business service integration examples */}
        <section>
            <h2 className="text-2xl font-semibold mb-4">Intégrations & Services</h2>
            <p className="text-muted-foreground">
                Ici, vous pourriez voir des sections spécifiques liées aux services que votre entreprise utilise via SenPass,
                par exemple, l'intégration avec votre système RH, la validation pour des services financiers, etc.
            </p>
            {/* Add more specific placeholder content as needed */}
        </section>

    </div>
  );
}
