
"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Lock, QrCode, CreditCard, Smartphone, RadioTower } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Separator } from "@/components/ui/separator";
import { useRouter } from "next/navigation";
import Link from "next/link";


export default function SecurePaymentPage() {
    const { toast } = useToast();
    const router = useRouter(); // If navigation is needed after payment

    // Simulate payment action
    const handlePaymentSimulation = (method: string) => {
        toast({
            title: "Simulation de Paiement",
            description: `Tentative de paiement sécurisé via ${method}. (Simulation)`,
        });
        // Add further simulation logic if needed, e.g., redirecting after success
        // setTimeout(() => router.push('/payment-success'), 2000);
    };

  return (
    <div className="container mx-auto px-4 py-8 max-w-2xl"> {/* Constrain width */}
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
                <Lock className="h-7 w-7" /> Paiement Sécurisé
            </h1>
            <Link href="/" className="text-sm text-muted-foreground hover:text-primary">
                Retour à l'accueil
            </Link>
        </div>
        <p className="text-muted-foreground mb-8">
            Choisissez votre méthode de paiement préférée pour finaliser votre transaction (Simulation).
        </p>

        {/* Payment Options */}
        <div className="space-y-8">
            {/* Card Payment */}
            <Card className="shadow-lg border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><CreditCard className="h-5 w-5 text-accent" /> Payer par Carte Bancaire</CardTitle>
                    <CardDescription>Visa, Mastercard, American Express acceptées.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                     <div className="flex flex-wrap gap-4 items-center">
                         {/* Placeholder for Card Logos */}
                         <span className="text-sm font-semibold text-muted-foreground">Cartes acceptées:</span>
                         {/* Replace with actual logos if available */}
                         <span className="font-bold text-blue-600">VISA</span>
                         <span className="font-bold text-orange-500">MasterCard</span>
                         <span className="font-bold text-blue-800">Amex</span>
                     </div>
                    <Button onClick={() => handlePaymentSimulation('Carte Bancaire')} size="lg" className="w-full sm:w-auto">
                        Payer par Carte (Simulation)
                    </Button>
                     <p className="text-xs text-muted-foreground mt-1">Simule la redirection vers une page de paiement sécurisée.</p>
                </CardContent>
            </Card>

            {/* QR Code Payment */}
            <Card className="shadow-lg border">
                <CardHeader>
                    <CardTitle className="flex items-center gap-2"><QrCode className="h-5 w-5 text-accent" /> Payer par QR Code</CardTitle>
                    <CardDescription>Scannez le code avec votre application de paiement.</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                    {/* Placeholder for actual QR code */}
                    <div className="flex justify-center my-4">
                        {/* In a real app, display the actual QR code here */}
                        <div className="w-32 h-32 bg-muted rounded flex items-center justify-center text-muted-foreground text-sm">
                            [QR Code Placeholder]
                        </div>
                    </div>
                    <Button onClick={() => handlePaymentSimulation('QR Code')} size="lg" className="w-full sm:w-auto">
                        Afficher/Scanner QR (Simulation)
                    </Button>
                    <p className="text-xs text-muted-foreground mt-1">Simule l'affichage d'un QR code ou l'ouverture d'un scanner.</p>
                </CardContent>
            </Card>

             {/* Mobile Money Payment */}
             <Card className="shadow-lg border">
                 <CardHeader>
                     <CardTitle className="flex items-center gap-2"><Smartphone className="h-5 w-5 text-accent" /> Payer par Mobile Money</CardTitle>
                     <CardDescription>Utilisez votre compte Wave, Orange Money, etc.</CardDescription>
                 </CardHeader>
                 <CardContent className="space-y-4">
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
                     <Button onClick={() => handlePaymentSimulation('Mobile Money')} size="lg" className="w-full sm:w-auto">
                         Payer via Mobile (Simulation)
                     </Button>
                      <p className="text-xs text-muted-foreground mt-1">Simule la saisie d'un numéro ou une redirection vers l'opérateur.</p>
                 </CardContent>
             </Card>
        </div>

         {/* Footer Security Note */}
        <div className="mt-10 text-center text-xs text-muted-foreground flex items-center justify-center gap-1.5">
            <Lock className="h-3 w-3" /> Toutes les transactions sont simulées et sécurisées.
        </div>
    </div>
  );
}
