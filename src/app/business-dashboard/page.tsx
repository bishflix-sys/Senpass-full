
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Building, Users, FileCheck, Settings, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";

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

  return (
    <div className="container mx-auto px-4 py-8 space-y-8">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex-1">
          <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
            <Building className="h-8 w-8" /> Portail Entreprise (Simulation)
          </h1>
          <p className="text-muted-foreground mt-1">
            Tableau de bord pour les partenaires Business SenPass.
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={handleLogout}>
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
                    <Button variant="link" className="p-0 h-auto mt-2 text-primary">Voir tout</Button>
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
                    <Button variant="outline" size="sm" className="mt-2">Gérer les accès</Button>
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
                    <Button variant="secondary" size="sm" className="mt-2">Modifier les paramètres</Button>
                </CardContent>
            </Card>
       </div>

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
