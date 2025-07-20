
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm, Controller } from "react-hook-form";
import * as z from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea"; // Import Textarea
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import {
  Loader2,
  CodeXml,
  UserCircle,
  Mail,
  Building,
  UserSquare,
  Phone,
  Target,
  ClipboardList,
  Key,
  KeyRound,
} from "lucide-react";
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
import { cn } from "@/lib/utils";
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


// Developer Registration Form Schema
const developerRegistrationSchema = z.object({
  fullName: z.string().min(2, "Le nom complet est requis."),
  email: z.string().email("L'adresse e-mail est invalide."),
  password: z.string().min(8, "Le mot de passe doit contenir au moins 8 caractères."),
  organizationName: z.string().optional(),
  role: z.string().min(2, "Le rôle/fonction est requis."),
  phoneNumber: z.string().regex(/^\+?\d{7,}$/, "Numéro de téléphone invalide.").optional(), // Basic validation
  mainObjective: z.string().min(1, "L'objectif principal est requis."),
  requestedAccess: z.array(z.string()).refine((value) => value.some((item) => item), {
    message: "Vous devez sélectionner au moins un accès API.",
  }),
  publicKey: z.string().optional(),
  captchaValid: z.boolean().refine(val => val === true, {
      message: "Veuillez résoudre le contrôle de sécurité.",
  }),
  termsAccepted: z.boolean().refine(val => val === true, {
    message: "Vous devez accepter les conditions et la politique de confidentialité.",
  }),
});

type DeveloperRegistrationFormValues = z.infer<typeof developerRegistrationSchema>;

const apiAccessOptions = [
    { id: "auth", label: "API Authentification" },
    { id: "signature", label: "API Signature numérique" },
    { id: "verification", label: "API Vérification ID" },
    { id: "monprofil", label: "API MonProfil Connect" },
    // Add more APIs as needed
];

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
      role: "",
      phoneNumber: "",
      mainObjective: "",
      requestedAccess: [],
      publicKey: "",
      captchaValid: false,
      termsAccepted: false,
    },
  });

  async function onSubmit(data: DeveloperRegistrationFormValues) {
    setIsSubmitting(true);
    console.log("Developer Registration data:", data);

    // Simulate API call for developer registration
    await new Promise(resolve => setTimeout(resolve, 1800));

    // Simulate success/failure
    const success = Math.random() > 0.1; // 90% success rate
    setIsSubmitting(false);

    if (success) {
      toast({
        title: "Inscription Développeur Réussie",
        description: "Votre compte développeur a été créé. Un email de vérification a été envoyé.",
      });
      form.reset(); // Reset form on success
      onSuccess(); // Call the success callback
    } else {
      toast({
        title: "Échec de l'Inscription Développeur",
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
           <CodeXml className="h-6 w-6" /> Inscription Espace Développeur
        </DialogTitle>
        <DialogDescription>
          Demandez l'accès aux APIs de la plateforme.
        </DialogDescription>
      </DialogHeader>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5 py-4"> {/* Adjusted spacing */}
          {/* Full Name */}
          <FormField
            control={form.control}
            name="fullName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1.5"><UserCircle className="h-4 w-4 text-muted-foreground"/> Nom complet*</FormLabel>
                <FormControl>
                  <Input placeholder="Prénom(s) Nom" {...field} />
                </FormControl>
                 <FormDescription className="text-xs">
                    Comme sur votre pièce d'identité.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Email */}
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1.5"><Mail className="h-4 w-4 text-muted-foreground"/> Adresse e-mail professionnelle*</FormLabel>
                <FormControl>
                  <Input type="email" placeholder="nom@entreprise.com" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          
          {/* Password */}
          <FormField control={form.control} name="password" render={({ field }) => (
            <FormItem>
              <FormLabel className="flex items-center gap-1.5"><KeyRound className="h-4 w-4 text-muted-foreground" /> Mot de passe*</FormLabel>
              <FormControl>
                <Input type="password" placeholder="••••••••" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )} />


          {/* Organization Name */}
          <FormField
            control={form.control}
            name="organizationName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1.5"><Building className="h-4 w-4 text-muted-foreground"/> Nom de l'organisation / entreprise (si applicable)</FormLabel>
                <FormControl>
                  <Input placeholder="Nom officiel" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          {/* Role */}
          <FormField
            control={form.control}
            name="role"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1.5"><UserSquare className="h-4 w-4 text-muted-foreground"/> Rôle / Fonction*</FormLabel>
                <FormControl>
                  <Input placeholder="Ex: Développeur back-end, Intégrateur..." {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

           {/* Phone Number */}
          <FormField
            control={form.control}
            name="phoneNumber"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="flex items-center gap-1.5"><Phone className="h-4 w-4 text-muted-foreground"/> Numéro de téléphone</FormLabel>
                <FormControl>
                  <Input type="tel" placeholder="+221 XX XXX XX XX" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

           {/* Main Objective */}
           <FormField
              control={form.control}
              name="mainObjective"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1.5"><Target className="h-4 w-4 text-muted-foreground"/> Objectif principal*</FormLabel>
                  <Select onValueChange={field.onChange} defaultValue={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Sélectionnez un objectif..." />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="test_api">Tester l’API de la plateforme</SelectItem>
                      <SelectItem value="integration">Intégration avec une app</SelectItem>
                      <SelectItem value="sandbox">Utilisation en Sandbox</SelectItem>
                      <SelectItem value="proof_of_concept">Preuve de concept (POC)</SelectItem>
                      <SelectItem value="other">Autre (précisez si possible)</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

             {/* Requested Access */}
            <FormField
              control={form.control}
              name="requestedAccess"
              render={() => (
                <FormItem>
                  <div className="mb-2">
                    <FormLabel className="text-base flex items-center gap-1.5"><ClipboardList className="h-4 w-4 text-muted-foreground"/> Accès API demandés*</FormLabel>
                    <FormDescription>
                      Sélectionnez les API dont vous avez besoin.
                    </FormDescription>
                  </div>
                  {apiAccessOptions.map((item) => (
                    <FormField
                      key={item.id}
                      control={form.control}
                      name="requestedAccess"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={item.id}
                            className="flex flex-row items-start space-x-3 space-y-0 mb-2" // Added margin-bottom
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(item.id)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([...(field.value || []), item.id])
                                    : field.onChange(
                                        (field.value || []).filter(
                                          (value) => value !== item.id
                                        )
                                      )
                                }}
                              />
                            </FormControl>
                            <FormLabel className="font-normal">
                              {item.label}
                            </FormLabel>
                          </FormItem>
                        )
                      }}
                    />
                  ))}
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Public Key */}
            <FormField
              control={form.control}
              name="publicKey"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="flex items-center gap-1.5"><Key className="h-4 w-4 text-muted-foreground"/> Clé publique (optionnelle)</FormLabel>
                  <FormControl>
                     <Textarea
                        placeholder="Collez votre clé publique ici (ex: format PEM)"
                        className="resize-none" // Disable resizing
                        rows={3} // Set default rows
                        {...field}
                      />
                  </FormControl>
                  <FormDescription>
                    Utile pour certaines méthodes d'authentification API (RSA, etc.).
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />

           {/* CAPTCHA */}
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
                    aria-label="Accepter les conditions d'utilisation des API et la politique de confidentialité"
                  />
                </FormControl>
                <div className="space-y-1 leading-none">
                  <FormLabel className="font-normal">
                    Je consens au traitement de mes données et j'accepte les{" "}
                    <Link href="/terms" target="_blank" className="text-primary underline hover:no-underline">
                       Conditions d'Utilisation des APIs
                    </Link>
                    {" "} et la {" "}
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
              Créer un compte développeur
            </Button>
          </DialogFooter>
        </form>
      </Form>
    </DialogContent>
  );
});

DeveloperRegistrationDialogContent.displayName = 'DeveloperRegistrationDialogContent';
export default DeveloperRegistrationDialogContent;
