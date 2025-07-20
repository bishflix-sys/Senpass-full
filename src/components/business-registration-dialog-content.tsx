
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar as CalendarIcon, Loader2, Building2, UserCircle, Hash, Briefcase, Mail, KeyRound } from "lucide-react"; // Icons for business registration
import {
  Form,
  FormControl,
  FormDescription,
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
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Calendar } from "@/components/ui/calendar";
import { cn } from "@/lib/utils";
import { format } from "date-fns";
import { fr } from "date-fns/locale"; // French locale for date picker
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";

// Simple CAPTCHA simulation component (reuse or import if separate)
const CaptchaSimulation: React.FC<{ onChange: (isValid: boolean) => void }> = ({ onChange }) => {
    const [captchaText, setCaptchaText] = React.useState('');
    const [userInput, setUserInput] = React.useState('');
    const [isValid, setIsValid] = React.useState<boolean | null>(null);

    const generateCaptcha = React.useCallback(() => {
        const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
        let text = '';
        for (let i = 0; i < 6; i++) {
            text += chars.charAt(Math.floor(Math.random() * chars.length));
        }
        setCaptchaText(text);
        setUserInput(''); // Reset input on new captcha
        setIsValid(null); // Reset validation status
        onChange(false); // Notify parent that it's initially invalid
    }, [onChange]);

    React.useEffect(() => {
        generateCaptcha();
    }, [generateCaptcha]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setUserInput(value);
        const currentIsValid = value.toLowerCase() === captchaText.toLowerCase();
        setIsValid(currentIsValid);
        onChange(currentIsValid); // Notify parent of validity change
    };

    return (
        <div className="space-y-2">
            <div className="flex items-center gap-4">
                <div className="bg-muted p-3 rounded-md border shadow-inner flex-shrink-0">
                    <span className="font-mono text-xl tracking-widest select-none italic font-semibold text-foreground/80" style={{ textDecoration: 'line-through', textDecorationColor: 'rgba(120, 120, 120, 0.5)' }}>
                        {captchaText}
                    </span>
                </div>
                <Button type="button" variant="outline" size="sm" onClick={generateCaptcha}>Rafraîchir</Button>
            </div>
            <Input
                type="text"
                placeholder="Entrez le texte ci-dessus"
                value={userInput}
                onChange={handleInputChange}
                className={cn(
                    isValid === true && "border-green-500",
                    isValid === false && userInput.length > 0 && "border-destructive"
                )}
                maxLength={6}
            />
            {isValid === false && userInput.length > 0 && (
                 <p className="text-xs text-destructive">Le texte ne correspond pas.</p>
             )}
        </div>
    );
};


// Business Registration Form Schema
const businessRegistrationSchema = z.object({
  representativeName: z.string().min(2, "Le nom du représentant est requis."),
  representativeId: z.string().min(5, "Le numéro d'identification (NIN/CNIB) est requis."),
  companyName: z.string().min(2, "Le nom de l'entreprise est requis."),
  ninea: z.string().min(5, "Le NINEA est requis."), // Add specific NINEA format later if needed
  idIssueDate: z.date({
    required_error: "La date d'émission de la pièce d'identité est requise.",
  }),
  email: z.string().email("L'adresse e-mail est invalide."),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères."),
  captchaValid: z.boolean().refine(val => val === true, {
      message: "Veuillez résoudre le contrôle de sécurité.",
  }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter les conditions et la politique de confidentialité.",
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
      representativeId: "",
      companyName: "",
      ninea: "",
      idIssueDate: undefined,
      email: "",
      password: "",
      captchaValid: false,
      termsAccepted: false,
    },
  });

  async function onSubmit(data: BusinessRegistrationFormValues) {
    setIsSubmitting(true);
    console.log("Business Registration data:", {
        ...data,
        idIssueDate: data.idIssueDate.toISOString().split('T')[0] // Format date for logging
    });

    // Simulate API call for business registration
    await new Promise(resolve => setTimeout(resolve, 1800)); // Slightly longer delay

    // Simulate success/failure
    const success = Math.random() > 0.15;
    setIsSubmitting(false);

    if (success) {
      toast({
        title: "Inscription Entreprise Réussie",
        description: "Votre compte entreprise/institution a été créé. Un email de vérification a été envoyé.",
      });
      form.reset(); // Reset form on success
      onSuccess(); // Call the success callback
    } else {
      toast({
        title: "Échec de l'Inscription Entreprise",
        description: "Une erreur s'est produite. Vérifiez vos informations et réessayez.",
        variant: "destructive",
      });
       // Reset captcha validity state on failure
       form.setValue('captchaValid', false);
    }
  }

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-xl">
           <Building2 className="h-6 w-6" /> Inscription Entreprise / Institution
        </DialogTitle>
        <DialogDescription>
          Créez un compte partenaire pour votre organisation.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
          {/* Representative Name */}
          <FormField
            control={form.control}
            name="representativeName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1.5"><UserCircle className="h-4 w-4 text-muted-foreground"/> Nom complet du représentant légal*</FormLabel>
                <FormControl>
                  <Input placeholder="Prénom(s) Nom" {...field} />
                </FormControl>
                <FormDescription className="text-xs">
                  Tel qu'indiqué sur la pièce d'identité officielle.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Representative ID */}
          <FormField
            control={form.control}
            name="representativeId"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1.5"><Hash className="h-4 w-4 text-muted-foreground"/> Numéro d'identification national (NIN ou CNIB)*</FormLabel>
                <FormControl>
                  <Input placeholder="Numéro d'identification personnel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Company Name */}
          <FormField
            control={form.control}
            name="companyName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1.5"><Briefcase className="h-4 w-4 text-muted-foreground"/> Nom de l'entreprise / Institution*</FormLabel>
                <FormControl>
                  <Input placeholder="Nom officiel de l'organisation" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* NINEA */}
          <FormField
            control={form.control}
            name="ninea"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1.5"><Hash className="h-4 w-4 text-muted-foreground"/> NINEA*</FormLabel>
                <FormControl>
                  <Input placeholder="Numéro d'identification national des entreprises" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* ID Issue Date */}
          <FormField
            control={form.control}
            name="idIssueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Date d'émission de la pièce d'identité*</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={cn(
                          "w-full pl-3 text-left font-normal",
                          !field.value && "text-muted-foreground"
                        )}
                      >
                        {field.value ? (
                          format(field.value, "dd/MM/yyyy", { locale: fr })
                        ) : (
                          <span>JJ / MM / AAAA</span>
                        )}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={field.value}
                      onSelect={field.onChange}
                      disabled={(date) =>
                        date > new Date() || date < new Date("1950-01-01") // Adjusted min date
                      }
                      initialFocus
                      locale={fr} // Use French locale
                    />
                  </PopoverContent>
                </Popover>
                 <FormDescription className="text-xs">
                    Date d'émission de la pièce d'identité du représentant légal.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

           {/* Email */}
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1.5"><Mail className="h-4 w-4 text-muted-foreground"/> Adresse e-mail du représentant*</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="contact@entreprise.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

            {/* Password */}
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1.5"><KeyRound className="h-4 w-4 text-muted-foreground"/> Mot de passe*</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />

           {/* CAPTCHA */}
            <FormField
                control={form.control}
                name="captchaValid"
                render={({ field }) => (
                <FormItem>
                    <FormLabel>Contrôle de sécurité*</FormLabel>
                    <FormControl>
                         {/* Pass field.onChange to update form state */}
                        <CaptchaSimulation onChange={field.onChange} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
                )}
            />

          {/* Terms and Conditions */}
          <FormField
            control={form.control}
            name="termsAccepted"
            render={({ field }) => (
              <FormItem className="flex flex-row items-start space-x-3 space-y-0 rounded-md border p-4 shadow-sm">
                <FormControl>
                  <Checkbox
                    checked={field.value}
                    onCheckedChange={field.onChange}
                    aria-label="Accepter les conditions et la politique de confidentialité"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-normal">
                    Je consens au traitement des données de mon organisation et j'accepte les{" "}
                    <Link href="/terms" target="_blank" className="text-primary underline hover:no-underline">
                      Conditions d'Utilisation
                    </Link>{" "}
                     et la {" "}
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
