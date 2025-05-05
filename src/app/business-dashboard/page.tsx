
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Building, Users, FileCheck, Settings, LogOut, QrCode, CreditCard, Smartphone, RadioTower } from "lucide-react"; // Added payment icons
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import Link from "next/link"; // Import Link for logo


export default function BusinessDashboardPage() {
    const router = useRouter();
    const { toast } = useToast();

    const handleLogout = () => {
        // Simulate logout process
        toast({
          title: "Déconnexion Business",
          description: "Vous avez été déconnecté du portail entreprise.",
        });

        // Redirect to login page after a short delay
        setTimeout(() => {
          router.push("/login");
        }, 1000);
      };

    // Simulate payment action
    const handlePaymentSimulation = (method: string) => {
        toast({
            title: "Simulation de Paiement",
            description: `Tentative de paiement via ${method}. (Simulation)`,
        });
        // Add further simulation logic if needed
    };

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header Section with Text Logo */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-4">
           <Link href="/" className="flex-shrink-0"> {/* Link text logo to home */}
             <span className="text-2xl font-bold text-foreground tracking-tight">SENPASS</span>
           </Link>
           <div className="flex-1">
             <h1 className="text-2xl sm:text-3xl font-bold text-primary flex items-center gap-3">
               <Building className="h-7 w-7 sm:h-8 sm:w-8" /> Portail Entreprise
             </h1>
             <p className="text-muted-foreground mt-1 text-sm sm:text-base">
               Tableau de bord pour les partenaires Business SenPass (Simulation).
             </p>
           </div>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout} className="flex-shrink-0 mt-2 sm:mt-0">
            <LogOut className="mr-2 h-4 w-4" />
            Se déconnecter
        </Button>
      </div>


      <Separator />

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
                    <p className="text-muted-foreground text-sm">Aucune demande en attente (Simulation).</p>
                    {/* Placeholder for verification list or stats */}
                    <Button variant="link" className="p-0 h-auto mt-2 text-primary" onClick={() => toast({title: "Simulation", description: "Affichage de toutes les demandes."})}>Voir tout</Button>
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
                    <p className="text-muted-foreground text-sm">3 utilisateurs actifs (Simulation).</p>
                    {/* Placeholder for user management actions */}
                    <Button variant="outline" size="sm" className="mt-2" onClick={() => toast({title: "Simulation", description: "Ouverture du panneau de gestion des accès."})}>Gérer les accès</Button>
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
                    <Button variant="secondary" size="sm" className="mt-2" onClick={() => toast({title: "Simulation", description: "Ouverture des paramètres du compte."})}>Modifier les paramètres</Button>
                </CardContent>
            </Card>
       </div>

        <Separator />

        {/* Payment Simulation Section */}
        <section>
            <h2 className="text-2xl font-semibold mb-4">Paiement des Services (Simulation)</h2>
            <Card className="border shadow-sm">
                <CardHeader>
                    <CardTitle>Effectuer un Paiement</CardTitle>
                    <CardDescription>Simulez un paiement en utilisant l'une des méthodes ci-dessous.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                    {/* QR Code Payment */}
                    <div>
                        <h3 className="text-lg font-medium mb-2 flex items-center gap-2"><QrCode className="h-5 w-5 text-accent" /> Payer par QR Code</h3>
                        <Button onClick={() => handlePaymentSimulation('QR Code')}>
                            Scanner le QR Code (Simulation)
                        </Button>
                        <p className="text-xs text-muted-foreground mt-1">Simule l'ouverture d'un scanner ou l'affichage d'un code à scanner.</p>
                    </div>

                    <Separator />

                    {/* Card Payment */}
                    <div>
                        <h3 className="text-lg font-medium mb-2 flex items-center gap-2"><CreditCard className="h-5 w-5 text-accent" /> Payer par Carte Bancaire</h3>
                         <div className="flex flex-wrap gap-4 items-center">
                             {/* Placeholder for Card Logos */}
                             <span className="text-sm font-semibold text-muted-foreground">Cartes acceptées:</span>
                             {/* Replace with actual logos if available */}
                             <span className="font-bold text-blue-600">VISA</span>
                             <span className="font-bold text-orange-500">MasterCard</span>
                             <span className="font-bold text-blue-800">Amex</span>
                         </div>
                        <Button onClick={() => handlePaymentSimulation('Carte Bancaire')} className="mt-3">
                            Payer par Carte (Simulation)
                        </Button>
                         <p className="text-xs text-muted-foreground mt-1">Simule la redirection vers une page de paiement par carte.</p>
                    </div>

                    <Separator />

                     {/* Mobile Money Payment */}
                     <div>
                         <h3 className="text-lg font-medium mb-2 flex items-center gap-2"><Smartphone className="h-5 w-5 text-accent" /> Payer par Mobile Money</h3>
                         <div className="flex flex-wrap gap-4 items-center mb-3">
                             {/* Placeholder for Mobile Money Logos */}
                             <span className="text-sm font-semibold text-muted-foreground">Opérateurs:</span>
                             {/* Replace with actual logos/better representations */}
                             <span className="font-semibold text-purple-600">Wave</span>
                             <span className="font-semibold text-orange-600">Orange Money</span>
                             <span className="font-semibold text-yellow-500">Yas Money</span>
                             <span className="font-semibold text-cyan-600">Payer</span>
                             <span className="font-semibold text-gray-500">Autres...</span>
                         </div>
                         <Button onClick={() => handlePaymentSimulation('Mobile Money')} className="mt-3">
                             Payer via Mobile (Simulation)
                         </Button>
                          <p className="text-xs text-muted-foreground mt-1">Simule la saisie d'un numéro ou une redirection.</p>
                     </div>
                </CardContent>
            </Card>
        </section>

        <Separator />

        {/* Placeholder for specific business service integration examples */}
        <section>
            <h2 className="text-2xl font-semibold mb-4">Intégrations & Services</h2>
            <p className="text-muted-foreground">
                Ici, vous pourriez voir des sections spécifiques liées aux services que votre entreprise utilise via SenPass,
                par exemple, l'intégration avec votre système RH, la validation pour des services financiers, etc. (Simulation)
            </p>
            {/* Add more specific placeholder content as needed */}
        </section>

    </div>
  );
}
