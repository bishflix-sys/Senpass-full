
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar as CalendarIcon, Loader2, UserPlus, Mail, KeyRound, UserCircle, Hash } from "lucide-react";
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
import { Separator } from "./ui/separator";

// Simple CAPTCHA simulation component
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


// Registration Form Schema
const registrationSchema = z.object({
  fullName: z.string().min(2, "Le nom complet est requis."),
  email: z.string().email("L'adresse e-mail est invalide."),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères."),
  cniOrPassport: z.string().min(5, "Le numéro de CNI ou Passeport est requis."),
  issueDate: z.date({
    required_error: "La date d'émission du document est requise.",
  }),
  captchaValid: z.boolean().refine(val => val === true, {
      message: "Veuillez résoudre le contrôle de sécurité.",
  }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter les conditions et la politique de confidentialité.",
  }),
});

type RegistrationFormValues = z.infer<typeof registrationSchema>;

interface RegistrationDialogContentProps {
  onSuccess: () => void;
}

const RegistrationDialogContent: React.FC<RegistrationDialogContentProps> = React.memo(({ onSuccess }) => {
  const { toast } = useToast();
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const form = useForm<RegistrationFormValues>({
    resolver: zodResolver(registrationSchema),
    defaultValues: {
      fullName: "",
      email: "",
      password: "",
      cniOrPassport: "",
      issueDate: undefined,
      captchaValid: false,
      termsAccepted: false,
    },
  });

  async function onSubmit(data: RegistrationFormValues) {
    setIsSubmitting(true);
    console.log("Registration data:", data);

    // API call for registration
    await new Promise(resolve => setTimeout(resolve, 1500));

    // success/failure (e.g., 90% success)
    const success = Math.random() > 0.1;
    setIsSubmitting(false);

    if (success) {
      toast({
        title: "Inscription Réussie",
        description: "Votre compte a été créé. Un email de vérification vous a été envoyé.",
      });
      form.reset(); // Reset form on success
      onSuccess(); // Call the success callback (e.g., close dialog)
    } else {
      toast({
        title: "Échec de l'Inscription",
        description: "Une erreur s'est produite. Veuillez réessayer.",
        variant: "destructive",
      });
       form.setValue('captchaValid', false);
    }
  }

  return (
    <DialogContent className="sm:max-w-lg">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-xl">
           <UserPlus className="h-6 w-6" /> S'inscrire
        </DialogTitle>
        <DialogDescription>
          Créez votre compte d'identité numérique en quelques étapes.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 py-4">
          {/* --- Section 1: Basic Info --- */}
          <div className="space-y-4">
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
            <FormField control={form.control} name="email" render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1.5"><Mail className="h-4 w-4 text-muted-foreground" /> Adresse e-mail*</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="exemple@email.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={form.control} name="password" render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1.5"><KeyRound className="h-4 w-4 text-muted-foreground" /> Mot de passe*</FormLabel>
                <FormControl>
                  <Input type="password" placeholder="••••••••" {...field} />
                </FormControl>
                <FormDescription>
                  8 caractères minimum.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )} />
          </div>

          <Separator />
          
          {/* --- Section 2: Identity Verification --- */}
           <div className="space-y-4">
             <h3 className="text-sm font-medium text-muted-foreground">Vérification d'Identité</h3>
             <FormField
              control={form.control}
              name="cniOrPassport"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1.5"><Hash className="h-4 w-4 text-muted-foreground"/> Numéro CNI ou Passeport*</FormLabel>
                  <FormControl>
                    <Input placeholder="Numéro d'identification officiel" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="issueDate"
              render={({ field }) => (
                <FormItem className="flex flex-col">
                  <FormLabel>Date d'émission du document*</FormLabel>
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
                          date > new Date() || date < new Date("1900-01-01")
                        }
                        initialFocus
                        locale={fr} // Use French locale
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Separator />

           {/* --- Section 3: Security & Terms --- */}
           <div className="space-y-6">
                <FormField
                    control={form.control}
                    name="captchaValid"
                    render={({ field }) => (
                    <FormItem>
                        <FormLabel>Contrôle de sécurité*</FormLabel>
                        <FormControl>
                            <CaptchaSimulation onChange={field.onChange} />
                        </FormControl>
                        <FormMessage />
                    </FormItem>
                    )}
                />
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
                            Je consens au traitement de mes données et j'accepte les{" "}
                            <Link href="/terms" target="_blank" className="text-primary underline hover:no-underline">
                            Conditions d'Utilisation
                            </Link> et la {" "}
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
           </div>

          <DialogFooter className="pt-4">
            <DialogClose asChild>
              <Button type="button" variant="outline">
                Annuler
              </Button>
            </DialogClose>
            <Button type="submit" disabled={isSubmitting}>
              {isSubmitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Créer mon compte
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
});

RegistrationDialogContent.displayName = 'RegistrationDialogContent';
export default RegistrationDialogContent;
