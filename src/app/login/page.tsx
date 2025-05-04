
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { QrCode, ScanFace, Phone, LogIn, Building, Code } from "lucide-react";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

// Schema for phone number validation
const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "Le numéro de téléphone est requis.")
    // Basic validation: starts with +221 and has a reasonable length (e.g., +221 followed by 9 digits)
    .regex(/^\+221\d{9}$/, "Format invalide. Utilisez +221 suivi de 9 chiffres (ex: +221771234567)."),
});

type PhoneFormValues = z.infer<typeof phoneSchema>;

export default function LoginPage() {
  const { toast } = useToast();

  const form = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber: "+221",
    },
  });

  function onSubmit(data: PhoneFormValues) {
    // Simulate login attempt
    toast({
      title: "Tentative de connexion (Simulation)",
      description: `Numéro de téléphone: ${data.phoneNumber}`,
    });
    console.log("Phone login attempt:", data);
    // Reset or navigate after successful simulation if needed
  }

  const handleQrLogin = () => {
    toast({
      title: "Connexion par QR Code (Simulation)",
      description: "Scan du QR Code initié.",
    });
    console.log("QR Code login initiated");
  };

  const handleFaceLogin = () => {
    toast({
      title: "Reconnaissance Faciale (Simulation)",
      description: "Scan facial initié.",
    });
    console.log("Facial recognition login initiated");
  };

  return (
    <div className="flex justify-center items-center py-12">
      <Tabs defaultValue="individuals" className="w-full max-w-lg">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="individuals">
            <UserSquare className="mr-2 h-4 w-4" /> Individus
          </TabsTrigger>
          <TabsTrigger value="business">
            <Building className="mr-2 h-4 w-4" /> Business
          </TabsTrigger>
          <TabsTrigger value="developers">
            <Code className="mr-2 h-4 w-4" /> Développeurs
          </TabsTrigger>
        </TabsList>

        {/* Individuals Tab */}
        <TabsContent value="individuals">
          <Card>
            <CardHeader>
              <CardTitle>Connexion Individu</CardTitle>
              <CardDescription>
                Choisissez votre méthode de connexion sécurisée.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Phone Number Login Form */}
              <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                  <FormField
                    control={form.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center">
                           <Phone className="mr-2 h-4 w-4" /> Numéro de téléphone
                        </FormLabel>
                        <FormControl>
                           <div className="flex items-center gap-2">
                             <span className="text-sm font-medium p-2 bg-muted rounded-l-md border border-r-0 border-input">+221</span>
                             <Input
                               placeholder="7X XXX XX XX"
                               {...field}
                               onChange={(e) => {
                                 // Ensure +221 prefix is maintained and only allow digits after
                                 const value = e.target.value;
                                 if (value.startsWith('+221')) {
                                    const numericPart = value.substring(4).replace(/\D/g, '');
                                    field.onChange(`+221${numericPart}`);
                                 } else if (value === '+22' || value === '+2' || value === '+') {
                                    field.onChange('+221'); // Handle partial prefix deletion
                                 } else if (value === '') {
                                    field.onChange('+221'); // Reset if empty
                                 } else {
                                     // If prefix is incorrect, reset or correct it. Here, reset.
                                     field.onChange('+221');
                                 }
                               }}
                               className="rounded-l-none flex-1"
                               maxLength={13} // +221 + 9 digits
                             />
                           </div>
                        </FormControl>
                        <FormDescription>
                          Entrez votre numéro de téléphone enregistré (Sénégal uniquement).
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <Button type="submit" className="w-full">
                     <LogIn className="mr-2 h-4 w-4" /> Se connecter par téléphone
                   </Button>
                </form>
              </Form>

              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-background px-2 text-muted-foreground">
                    Ou continuer avec
                  </span>
                </div>
              </div>

              {/* QR Code and Face Login Buttons */}
              <div className="grid grid-cols-2 gap-4">
                <Button variant="outline" onClick={handleQrLogin}>
                  <QrCode className="mr-2 h-4 w-4 text-accent" /> QR Code
                </Button>
                <Button variant="outline" onClick={handleFaceLogin}>
                  <ScanFace className="mr-2 h-4 w-4 text-accent" /> Reconnaissance Faciale
                </Button>
              </div>
            </CardContent>
             <CardFooter>
                <p className="text-xs text-muted-foreground text-center w-full">
                   Assurez-vous d'utiliser un appareil de confiance.
                </p>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Business Tab */}
        <TabsContent value="business">
          <Card>
            <CardHeader>
              <CardTitle>Connexion Business</CardTitle>
              <CardDescription>
                Accès sécurisé pour les entreprises et organisations.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Les options de connexion pour les comptes Business seront bientôt disponibles.
                Vous pourrez vous connecter via email/mot de passe ou intégration SSO.
              </p>
              {/* Placeholder for Business login form */}
               <Button disabled className="w-full">
                 <LogIn className="mr-2 h-4 w-4" /> Connexion Business (Bientôt)
               </Button>
            </CardContent>
             <CardFooter>
                 <p className="text-xs text-muted-foreground">Besoin d'aide ? Contactez le support.</p>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Developers Tab */}
        <TabsContent value="developers">
          <Card>
            <CardHeader>
              <CardTitle>Accès Développeur</CardTitle>
              <CardDescription>
                Portail pour les développeurs et intégrateurs.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <p className="text-muted-foreground">
                Connectez-vous avec votre compte développeur ou clé API. Documentation et outils disponibles après connexion.
              </p>
              {/* Placeholder for Developer login form */}
               <Button disabled className="w-full">
                 <LogIn className="mr-2 h-4 w-4" /> Connexion Développeur (Bientôt)
               </Button>
            </CardContent>
             <CardFooter>
                 <p className="text-xs text-muted-foreground">Consultez la documentation API.</p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}

// Need UserSquare icon, let's define a simple one if not available
const UserSquare = ({ className }: { className?: string }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className={cn("lucide lucide-user-square", className)}
  >
    <rect width="18" height="18" x="3" y="3" rx="2" />
    <circle cx="12" cy="10" r="3" />
    <path d="M7 21v-2a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v2" />
  </svg>
);

