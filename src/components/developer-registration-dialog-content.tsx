
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Loader2, CodeXml, UserCircle, Mail, Building, KeyRound, Target, ClipboardList } from "lucide-react";
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
import { Textarea } from "@/components/ui/textarea";

// Simplified Developer Registration Form Schema
const developerRegistrationSchema = z.object({
  fullName: z.string().min(2, "Le nom complet est requis."),
  email: z.string().email("L'adresse e-mail est invalide."),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères."),
  organizationName: z.string().optional(),
  useCase: z.string().min(10, "Veuillez décrire brièvement votre cas d'usage (min. 10 caractères)."),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter les conditions.",
  }),
});

type DeveloperRegistrationFormValues = z.infer<typeof developerRegistrationSchema>;

interface DeveloperRegistrationDialogContentProps {
  onSuccess: () => void;
}

const DeveloperRegistrationDialogContent: React.FC<DeveloperRegistrationDialogContentProps> = React.memo(({ onSuccess }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<DeveloperRegistrationFormValues>({
    resolver: zodResolver(developerRegistrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      organizationName: "",
      useCase: "",
      termsAccepted: false,
    },
  });

  async function onSubmit(data: DeveloperRegistrationFormValues) {
    setIsSubmitting(true);
    console.log("Developer Registration data:", data);

    await new Promise(resolve => setTimeout(resolve, 1800));

    const success = Math.random() > 0.1;
    setIsSubmitting(false);

    if (success) {
      toast({
        title: "Inscription Développeur Réussie",
        description: "Votre compte a été créé. Un email de vérification a été envoyé.",
      });
      form.reset();
      onSuccess();
    } else {
      toast({
        title: "Échec de l'Inscription",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  }

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-xl">
           <CodeXml className="h-6 w-6" /> Inscription Développeur
        </DialogTitle>
        <DialogDescription>
          Demandez l'accès à l'API et à l'environnement de test.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 py-4">
          
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1.5"><UserCircle className="h-4 w-4 text-muted-foreground"/> Nom complet*</FormLabel>
                <FormControl>
                  <Input placeholder="Prénom(s) Nom" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1.5"><Mail className="h-4 w-4 text-muted-foreground"/> Adresse e-mail*</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="nom@entreprise.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1.5"><KeyRound className="h-4 w-4 text-muted-foreground" /> Mot de passe*</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />

          <FormField
            control={form.control}
            name="organizationName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1.5"><Building className="h-4 w-4 text-muted-foreground"/> Organisation (optionnel)</FormLabel>
                <FormControl>
                  <Input placeholder="Nom de votre entreprise" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

            <FormField
              control={form.control}
              name="useCase"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1.5"><Target className="h-4 w-4 text-muted-foreground"/> Cas d'usage*</FormLabel>
                  <FormControl>
                     <Textarea
                        placeholder="Décrivez brièvement comment vous prévoyez d'utiliser notre API..."
                        className="resize-none"
                        rows={3}
                        {...field}
                      />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

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
                       Conditions d'Utilisation API
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
              Demander l'accès
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
});

DeveloperRegistrationDialogContent.displayName = 'DeveloperRegistrationDialogContent';
export default DeveloperRegistrationDialogContent;
