
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, Building2, UserCircle, Briefcase, Mail, KeyRound } from "lucide-react"; // Icons for business registration
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

// Business Registration Form Schema
const businessRegistrationSchema = z.object({
  representativeName: z.string().min(2, "Le nom du représentant est requis."),
  companyName: z.string().min(2, "Le nom de l'entreprise est requis."),
  email: z.string().email("L'adresse e-mail est invalide."),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères."),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter les conditions.",
  }),
});

type BusinessRegistrationFormValues = z.infer<typeof businessRegistrationSchema>;

interface BusinessRegistrationDialogContentProps {
  onSuccess: () => void;
}

const BusinessRegistrationDialogContent: React.FC<BusinessRegistrationDialogContentProps> = React.memo(({ onSuccess }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<BusinessRegistrationFormValues>({
    resolver: zodResolver(businessRegistrationSchema),
    defaultValues: {
      representativeName: "",
      companyName: "",
      email: "",
      password: "",
      termsAccepted: false,
    },
  });

  async function onSubmit(data: BusinessRegistrationFormValues) {
    setIsSubmitting(true);
    console.log("Business Registration data:", data);

    await new Promise(resolve => setTimeout(resolve, 1800));

    const success = Math.random() > 0.15;
    setIsSubmitting(false);

    if (success) {
      toast({
        title: "Inscription Entreprise Réussie",
        description: "Votre compte a été créé. Un email de vérification a été envoyé.",
      });
      form.reset();
      onSuccess();
    } else {
      toast({
        title: "Échec de l'Inscription",
        description: "Une erreur s'est produite. Vérifiez vos informations et réessayez.",
        variant: "destructive",
      });
    }
  }

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-xl">
           <Building2 className="h-6 w-6" /> Inscription Entreprise
        </DialogTitle>
        <DialogDescription>
          Créez un compte partenaire pour votre organisation.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-muted-foreground"/> Nom de l'entreprise*</FormLabel>
                <FormControl>
                  <Input placeholder="Nom officiel de l'organisation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="representativeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1.5"><UserCircle className="h-4 w-4 text-muted-foreground"/> Nom du représentant*</FormLabel>
                <FormControl>
                  <Input placeholder="Prénom(s) Nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
           <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1.5"><Mail className="h-4 w-4 text-muted-foreground"/> Adresse e-mail*</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="contact@entreprise.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1.5"><KeyRound className="h-4 w-4 text-muted-foreground"/> Mot de passe*</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 pt-2">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-normal text-sm">
                     J'accepte les{" "}
                    <Link href="/terms" target="_blank" className="text-primary underline hover:no-underline">
                      Conditions
                    </Link>{" "}
                     & la {" "}
                    <Link href="/privacy" target="_blank" className="text-primary underline hover:no-underline">
                      Politique de Confidentialité
                    </Link>
                    .
                  </FormLabel>
                  <FormMessage />
                </div>
              </FormItem>
            )}
          />

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Annuler
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              S'inscrire
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
});

BusinessRegistrationDialogContent.displayName = 'BusinessRegistrationDialogContent';
export default BusinessRegistrationDialogContent;
