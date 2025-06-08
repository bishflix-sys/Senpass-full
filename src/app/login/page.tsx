
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { QRCodeCanvas } from 'qrcode.react';
import { useRouter, useSearchParams } from "next/navigation"; // Import useSearchParams
import Link from "next/link"; // Import Link
import dynamic from "next/dynamic"; // Import dynamic
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
import { QrCode, ScanFace, Phone, LogIn, Building, Code, Loader2, VideoOff, User, Lock, UserPlus, KeyRound, CaseSensitive, Building2, CodeXml, ArrowLeft, Landmark, ShieldCheck, MessageCircle } from "lucide-react"; // Added ShieldCheck for OTP
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
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"; // Import Select
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose,
  DialogDescription
} from "@/components/ui/dialog";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

// Dynamically import dialog content components
const FacialRecognitionDialogContent = dynamic(() => import("@/components/facial-recognition-dialog-content").then(mod => mod.default), {
  loading: () => <div className="p-6"><Skeleton className="h-64 w-full" /></div>,
  ssr: false // Typically, camera interactions are client-side only
});
const RegistrationDialogContent = dynamic(() => import("@/components/registration-dialog-content"), {
  loading: () => <div className="p-6"><Skeleton className="h-96 w-full" /></div>,
});
const BusinessRegistrationDialogContent = dynamic(() => import("@/components/business-registration-dialog-content"), {
  loading: () => <div className="p-6"><Skeleton className="h-[500px] w-full" /></div>,
});
const DeveloperRegistrationDialogContent = dynamic(() => import("@/components/developer-registration-dialog-content"), {
  loading: () => <div className="p-6"><Skeleton className="h-[600px] w-full" /></div>,
});


const SIMULATED_OTP = "000000"; // Standard OTP for demonstration
const VALID_LOGIN_TABS = ['individuals', 'business', 'developers', 'ministries'];

// Schema for phone number validation (Individuals)
const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "Le numéro de téléphone est requis.")
    .regex(/^\+221\d{9}$/, "Format invalide. Utilisez +221 suivi de 9 chiffres (ex: +221771234567)."),
});
type PhoneFormValues = z.infer<typeof phoneSchema>;

// Schema for business/developer login validation
const orgLoginSchema = z.object({
  registrationNumber: z.string().min(5, "NINEA ou RCCM requis (min 5 caractères)."),
  password: z.string().min(6, "Mot de passe requis (min 6 caractères)."),
});
type OrgLoginValues = z.infer<typeof orgLoginSchema>;

// Schema for ministry login validation
const ministryLoginSchema = z.object({
  ministryName: z.string().min(1, "Veuillez sélectionner un ministère."),
  password: z.string().min(6, "Mot de passe requis (min 6 caractères)."),
});
type MinistryLoginValues = z.infer<typeof ministryLoginSchema>;

const senegalMinistries = [
  "Ministère de l'Économie, du Plan et de la Coopération",
  "Ministère des Affaires Étrangères et des Sénégalais de l'Extérieur",
  "Ministère de la Justice", "Ministère de l'Intérieur", "Ministère des Forces Armées",
  "Ministère de la Santé et de l'Action Sociale", "Ministère de l'Éducation Nationale",
  "Ministère de l'Enseignement Supérieur, de la Recherche et de l'Innovation",
  "Ministère de l'Agriculture, de la Souveraineté Alimentaire et de l'Élevage",
  "Ministère des Finances et du Budget",
  "Ministère des Infrastructures, des Transports Terrestres et du Désenclavement",
  "Ministère de l'Eau et de l'Assainissement", "Ministère de l'Environnement et du Développement Durable",
  "Ministère de la Femme, de la Famille et de la Protection des Enfants",
  "Ministère de la Jeunesse, de l'Emploi et de la Construction Citoyenne",
];


export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams(); // Get search params

  const [qrCodeData, setQrCodeData] = React.useState<string | null>(null);
  const [isQrDialogOpen, setIsQrDialogOpen] = React.useState(false);
  const [showFacialRecognitionDialog, setShowFacialRecognitionDialog] = React.useState(false);
  const [isRegistrationDialogOpen, setIsRegistrationDialogOpen] = React.useState(false);
  const [isBusinessRegistrationDialogOpen, setIsBusinessRegistrationDialogOpen] = React.useState(false);
  const [isDeveloperRegistrationDialogOpen, setIsDeveloperRegistrationDialogOpen] = React.useState(false);

  // OTP States
  const [otpInput, setOtpInput] = React.useState("");
  const [isOtpLoading, setIsOtpLoading] = React.useState(false);

  // Login Step States
  const [individualsLoginStep, setIndividualsLoginStep] = React.useState<'phone' | 'otp'>('phone');
  const [businessLoginStep, setBusinessLoginStep] = React.useState<'credentials' | 'otp'>('credentials');
  const [developerLoginStep, setDeveloperLoginStep] = React.useState<'credentials' | 'otp'>('credentials');
  const [ministryLoginStep, setMinistryLoginStep] = React.useState<'credentials' | 'otp'>('credentials');

  // Store submitted identifiers for OTP step
  const [submittedPhoneNumber, setSubmittedPhoneNumber] = React.useState<string | null>(null);
  const [submittedOrgIdentifier, setSubmittedOrgIdentifier] = React.useState<string | null>(null);
  const [submittedMinistryName, setSubmittedMinistryName] = React.useState<string | null>(null);

  // Determine active tab from URL query parameter
  const requestedTab = searchParams.get('tab');
  const activeTab = VALID_LOGIN_TABS.includes(requestedTab ?? '') ? requestedTab : 'individuals';


  const phoneForm = useForm<PhoneFormValues>({ resolver: zodResolver(phoneSchema), defaultValues: { phoneNumber: "+221" }});
  const businessForm = useForm<OrgLoginValues>({ resolver: zodResolver(orgLoginSchema), defaultValues: { registrationNumber: "", password: "" }});
  const developerForm = useForm<OrgLoginValues>({ resolver: zodResolver(orgLoginSchema), defaultValues: { registrationNumber: "", password: "" }});
  const ministryForm = useForm<MinistryLoginValues>({ resolver: zodResolver(ministryLoginSchema), defaultValues: { ministryName: undefined, password: "" }});

   const handleAuthenticationSuccess = React.useCallback((targetPath: string = '/dashboard') => {
      setShowFacialRecognitionDialog(false); setIsQrDialogOpen(false); setIsRegistrationDialogOpen(false);
      setIsBusinessRegistrationDialogOpen(false); setIsDeveloperRegistrationDialogOpen(false);
      setQrCodeData(null);
      // Reset OTP states
      setOtpInput("");
      setIndividualsLoginStep('phone'); setBusinessLoginStep('credentials');
      setDeveloperLoginStep('credentials'); setMinistryLoginStep('credentials');
      setSubmittedPhoneNumber(null); setSubmittedOrgIdentifier(null); setSubmittedMinistryName(null);

      setTimeout(() => { router.push(targetPath); }, 300);
   }, [router]);

   const handleRegistrationSuccess = React.useCallback(() => {
      setIsRegistrationDialogOpen(false); setIsBusinessRegistrationDialogOpen(false); setIsDeveloperRegistrationDialogOpen(false);
      toast({ title: "Inscription Réussie!", description: "Vous pouvez maintenant vous connecter.", variant: "default" });
   }, [toast]);

  function onPhoneSubmit(data: PhoneFormValues) {
    toast({ title: "Numéro Vérifié", description: `OTP envoyé à ${data.phoneNumber}. (Code: ${SIMULATED_OTP})` });
    setSubmittedPhoneNumber(data.phoneNumber);
    setIndividualsLoginStep('otp');
    setOtpInput(""); // Clear previous OTP input
  }

  function onBusinessSubmit(data: OrgLoginValues) {
    // Simulate business credential verification
    const success = Math.random() > 0.2; // 80% success rate
    if (success) {
        toast({ title: "Identifiants Business Vérifiés", description: `OTP envoyé pour ${data.registrationNumber}. (Code: ${SIMULATED_OTP})` });
        setSubmittedOrgIdentifier(data.registrationNumber);
        setBusinessLoginStep('otp');
        setOtpInput("");
    } else {
        toast({ title: "Échec de la Connexion Business", description: "Identifiants incorrects. Veuillez réessayer.", variant: "destructive" });
        businessForm.resetField("password");
    }
  }

  function onDeveloperSubmit(data: OrgLoginValues) {
    const success = Math.random() > 0.3; // 70% success rate
    if (success) {
        toast({ title: "Identifiants Développeur Vérifiés", description: `OTP envoyé pour ${data.registrationNumber}. (Code: ${SIMULATED_OTP})` });
        setSubmittedOrgIdentifier(data.registrationNumber);
        setDeveloperLoginStep('otp');
        setOtpInput("");
    } else {
        toast({ title: "Échec de la Connexion Développeur", description: "Identifiants incorrects. Veuillez réessayer.", variant: "destructive" });
        developerForm.resetField("password");
    }
  }

  function onMinistrySubmit(data: MinistryLoginValues) {
    const success = Math.random() > 0.2; // 80% success rate
    if (success) {
        toast({ title: "Identifiants Ministère Vérifiés", description: `OTP envoyé pour ${data.ministryName}. (Code: ${SIMULATED_OTP})` });
        setSubmittedMinistryName(data.ministryName);
        setMinistryLoginStep('otp');
        setOtpInput("");
    } else {
        toast({ title: "Échec de la Connexion Ministère", description: "Identifiants incorrects. Veuillez réessayer.", variant: "destructive" });
        ministryForm.resetField("password");
    }
  }

  const handleOtpVerification = (targetPath: string) => {
    setIsOtpLoading(true);
    setTimeout(() => {
        setIsOtpLoading(false);
        if (otpInput === SIMULATED_OTP) {
            toast({ title: "OTP Vérifié!", description: "Connexion réussie. Redirection...", variant: "default" });
            handleAuthenticationSuccess(targetPath);
        } else {
            toast({ title: "OTP Incorrect", description: "Veuillez vérifier le code et réessayer.", variant: "destructive" });
            setOtpInput(""); // Clear OTP input on failure
        }
    }, 1000);
  };

  const generateQrData = () => `platform-login-${Date.now()}-${Math.random().toString(16).slice(2)}`;
  const isQrDialogOpenRef = React.useRef(isQrDialogOpen);
  React.useEffect(() => { isQrDialogOpenRef.current = isQrDialogOpen; }, [isQrDialogOpen]);
  React.useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (isQrDialogOpen) {
      setQrCodeData(generateQrData()); // Initial generation
      intervalId = setInterval(() => { setQrCodeData(generateQrData()); console.log("Refreshing QR Code..."); }, 10000);
    }
    return () => { if (intervalId) clearInterval(intervalId); };
  }, [isQrDialogOpen]);


  const commonOtpInputSection = (
    loginStepSetter: React.Dispatch<React.SetStateAction<any>>,
    credentialStepValue: string,
    identifierForOtpMessage: string | null,
    verificationHandler: () => void
  ) => (
    <div className="space-y-4 pt-4">
      <p className="text-sm text-muted-foreground">
        Un code OTP a été envoyé {identifierForOtpMessage ? `à ${identifierForOtpMessage}` : 'à votre contact enregistré'}. Entrez le code ci-dessous (Code: ${SIMULATED_OTP}).
      </p>
      <div className="space-y-2">
        <Label htmlFor="otp" className="flex items-center gap-1.5">
          <ShieldCheck className="h-4 w-4 text-muted-foreground" /> Code OTP
        </Label>
        <Input
          id="otp"
          type="text"
          value={otpInput}
          onChange={(e) => setOtpInput(e.target.value.replace(/\D/g, ''))}
          maxLength={6}
          placeholder="000000"
          className="w-full tabular-nums tracking-widest text-lg h-12"
          disabled={isOtpLoading}
        />
      </div>
      <div className="flex flex-col sm:flex-row gap-2 pt-2">
        <Button
          onClick={() => { loginStepSetter(credentialStepValue); setOtpInput(""); }}
          variant="outline"
          className="w-full sm:w-auto"
          disabled={isOtpLoading}
        >
          <ArrowLeft className="mr-2 h-4 w-4" /> Retour
        </Button>
        <Button
          onClick={verificationHandler}
          className="w-full sm:flex-1"
          disabled={otpInput.length !== 6 || isOtpLoading}
        >
          {isOtpLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <LogIn className="mr-2 h-5 w-5" />}
          Vérifier OTP et Se Connecter
        </Button>
      </div>
       <Button variant="link" size="sm" className="text-xs p-0 h-auto" onClick={() => toast({description: `Nouveau code OTP envoyé (Code: ${SIMULATED_OTP})`})} disabled={isOtpLoading}>
            Renvoyer le code OTP
       </Button>
    </div>
  );


  return (
    <div className="flex flex-col justify-center items-center py-12 min-h-[calc(100vh-10rem)]">
      <div className="flex items-center gap-2 mb-8 text-xl font-semibold text-foreground">
        <Lock className="h-6 w-6 text-primary" /><span>Accès Sécurisé</span>
      </div>
      <Tabs defaultValue={activeTab} className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-4 h-12">
          <TabsTrigger value="individuals" className="text-sm sm:text-base"><User className="mr-1 sm:mr-2 h-4 sm:h-5 w-4 sm:w-5" /> Individus</TabsTrigger>
          <TabsTrigger value="business" className="text-sm sm:text-base"><Building className="mr-1 sm:mr-2 h-4 sm:h-5 w-4 sm:w-5" /> Business</TabsTrigger>
          <TabsTrigger value="developers" className="text-sm sm:text-base"><Code className="mr-1 sm:mr-2 h-4 sm:h-5 w-4 sm:w-5" /> Développeurs</TabsTrigger>
          <TabsTrigger value="ministries" className="text-sm sm:text-base"><Landmark className="mr-1 sm:mr-2 h-4 sm:h-5 w-4 sm:w-5" /> Ministères</TabsTrigger>
        </TabsList>

        {/* Individuals Tab */}
        <TabsContent value="individuals">
          <Card className="shadow-lg border">
            <CardHeader>
              <CardTitle className="text-xl">Connexion Individu</CardTitle>
              <CardDescription>
                {individualsLoginStep === 'phone'
                  ? "Connectez-vous de manière sécurisée avec votre compte."
                  : "Veuillez entrer le code OTP reçu."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              {individualsLoginStep === 'phone' ? (
                <>
                  <Form {...phoneForm}>
                    <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
                      <FormField control={phoneForm.control} name="phoneNumber" render={({ field }) => (
                        <FormItem>
                          <FormLabel className="flex items-center text-sm"><Phone className="mr-2 h-4 w-4 text-muted-foreground" /> Numéro de téléphone (+221)</FormLabel>
                          <FormControl>
                            <div className="flex items-center">
                              <span className="text-base font-medium p-2.5 bg-muted rounded-l-md border border-r-0 border-input h-11 flex items-center text-muted-foreground">+221</span>
                              <Input type="tel" placeholder="7X XXX XX XX" {...field} onChange={(e) => { const digits = e.target.value.replace(/\D/g, ''); const numberPart = digits.startsWith('221') ? digits.substring(3, 12) : digits.substring(0, 9); field.onChange(`+221${numberPart}`); }} className="rounded-l-none flex-1 h-11 text-base tracking-wider" maxLength={13} />
                            </div>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )} />
                      <Button type="submit" className="w-full h-11 text-base" disabled={phoneForm.formState.isSubmitting}>
                        {phoneForm.formState.isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <MessageCircle className="mr-2 h-5 w-5" />} Envoyer OTP
                      </Button>
                    </form>
                  </Form>
                  <div className="relative my-6"><div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-3 text-muted-foreground">Ou utiliser</span></div></div>
                  <div className="grid grid-cols-2 gap-4">
                    <Dialog open={isQrDialogOpen} onOpenChange={setIsQrDialogOpen}><DialogTrigger asChild><Button variant="outline" className="h-12 text-base"><QrCode className="mr-2 h-5 w-5 text-accent" /> QR Code</Button></DialogTrigger>
                      <DialogContent className="sm:max-w-xs"><DialogHeader><DialogTitle className="text-lg">Scanner le QR Code</DialogTitle><DialogDescription>Scannez avec l'application. Se rafraîchit toutes les 10s.</DialogDescription></DialogHeader><div className="flex items-center justify-center p-6">{qrCodeData ? <div className="p-2 bg-white rounded-md shadow-md"><QRCodeCanvas value={qrCodeData} size={200} bgColor={"#FFFFFF"} fgColor={"#00853F"} level={"H"} includeMargin={true} /></div> : <div className="flex flex-col items-center justify-center text-muted-foreground h-[200px] space-y-2"><Loader2 className="h-8 w-8 animate-spin" /><p>Génération...</p></div>}</div><DialogFooter className="sm:justify-center"><DialogClose asChild><Button type="button" variant="outline">Fermer</Button></DialogClose></DialogFooter></DialogContent>
                    </Dialog>
                    <Dialog open={showFacialRecognitionDialog} onOpenChange={setShowFacialRecognitionDialog}><DialogTrigger asChild><Button variant="outline" className="h-12 text-base"><ScanFace className="mr-2 h-5 w-5 text-accent" /> Visage</Button></DialogTrigger>{showFacialRecognitionDialog && <FacialRecognitionDialogContent onAuthenticated={() => handleAuthenticationSuccess('/dashboard')} />}</Dialog>
                  </div>
                  <div className="text-center pt-4"><Dialog open={isRegistrationDialogOpen} onOpenChange={setIsRegistrationDialogOpen}><DialogTrigger asChild><Button variant="link" className="text-primary h-auto p-0 text-sm flex items-center gap-1.5"><UserPlus className="h-4 w-4" /> S'inscrire</Button></DialogTrigger>{isRegistrationDialogOpen && <RegistrationDialogContent onSuccess={handleRegistrationSuccess} />}</Dialog></div>
                </>
              ) : (
                commonOtpInputSection(setIndividualsLoginStep, 'phone', submittedPhoneNumber, () => handleAuthenticationSuccess('/dashboard'))
              )}
            </CardContent>
            <CardFooter><p className="text-xs text-muted-foreground text-center w-full flex items-center justify-center gap-1.5"><Lock className="h-3 w-3"/> Connexion sécurisée.</p></CardFooter>
          </Card>
        </TabsContent>

        {/* Business Tab */}
        <TabsContent value="business">
          <Card className="shadow-lg border">
            <CardHeader>
              <CardTitle className="text-xl">Connexion Entreprise</CardTitle>
              <CardDescription>
                {businessLoginStep === 'credentials'
                  ? "Accès sécurisé pour les organisations partenaires via NINEA/RCCM."
                  : "Veuillez entrer le code OTP reçu."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              {businessLoginStep === 'credentials' ? (
                <>
                  <Form {...businessForm}>
                    <form onSubmit={businessForm.handleSubmit(onBusinessSubmit)} className="space-y-4">
                      <FormField control={businessForm.control} name="registrationNumber" render={({ field }) => (<FormItem><FormLabel className="flex items-center text-sm"><CaseSensitive className="mr-2 h-4 w-4 text-muted-foreground" /> NINEA / RCCM</FormLabel><FormControl><Input placeholder="Ex: 001234567 ou SN.DKR.2023.A.12345" {...field} className="h-11 text-base" /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={businessForm.control} name="password" render={({ field }) => (<FormItem><FormLabel className="flex items-center text-sm"><KeyRound className="mr-2 h-4 w-4 text-muted-foreground" /> Mot de passe</FormLabel><FormControl><Input type="password" placeholder="••••••••" {...field} className="h-11 text-base" /></FormControl><FormMessage /></FormItem>)} />
                      <Button type="submit" className="w-full h-11 text-base" disabled={businessForm.formState.isSubmitting}>
                        {businessForm.formState.isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <MessageCircle className="mr-2 h-5 w-5" />} Envoyer OTP
                      </Button>
                    </form>
                  </Form>
                  <div className="text-center pt-4"><Dialog open={isBusinessRegistrationDialogOpen} onOpenChange={setIsBusinessRegistrationDialogOpen}><DialogTrigger asChild><Button variant="link" className="text-primary h-auto p-0 text-sm flex items-center gap-1.5"><Building2 className="h-4 w-4" /> S'inscrire en tant qu'entreprise/institution</Button></DialogTrigger>{isBusinessRegistrationDialogOpen && <BusinessRegistrationDialogContent onSuccess={handleRegistrationSuccess} />}</Dialog></div>
                </>
              ) : (
                commonOtpInputSection(setBusinessLoginStep, 'credentials', submittedOrgIdentifier, () => handleAuthenticationSuccess('/business-dashboard'))
              )}
            </CardContent>
            <CardFooter><p className="text-xs text-muted-foreground text-center w-full">Besoin d'aide ? <Link href="#" className="text-primary underline hover:no-underline">Contactez le support</Link>.</p></CardFooter>
          </Card>
        </TabsContent>

        {/* Developers Tab */}
        <TabsContent value="developers">
          <Card className="shadow-lg border">
            <CardHeader>
              <CardTitle className="text-xl">Portail Développeur</CardTitle>
              <CardDescription>
                {developerLoginStep === 'credentials'
                  ? "Accès aux APIs et outils d'intégration via NINEA/RCCM."
                  : "Veuillez entrer le code OTP reçu."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              {developerLoginStep === 'credentials' ? (
                <>
                  <Form {...developerForm}>
                    <form onSubmit={developerForm.handleSubmit(onDeveloperSubmit)} className="space-y-4">
                      <FormField control={developerForm.control} name="registrationNumber" render={({ field }) => (<FormItem><FormLabel className="flex items-center text-sm"><CaseSensitive className="mr-2 h-4 w-4 text-muted-foreground" /> NINEA / RCCM</FormLabel><FormControl><Input placeholder="N° organisation développeur" {...field} className="h-11 text-base" /></FormControl><FormMessage /></FormItem>)} />
                      <FormField control={developerForm.control} name="password" render={({ field }) => (<FormItem><FormLabel className="flex items-center text-sm"><KeyRound className="mr-2 h-4 w-4 text-muted-foreground" /> Mot de passe (API Key / Secret)</FormLabel><FormControl><Input type="password" placeholder="••••••••" {...field} className="h-11 text-base" /></FormControl><FormMessage /></FormItem>)} />
                      <Button type="submit" className="w-full h-11 text-base" disabled={developerForm.formState.isSubmitting}>
                        {developerForm.formState.isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <MessageCircle className="mr-2 h-5 w-5" />} Envoyer OTP
                      </Button>
                    </form>
                  </Form>
                  <div className="text-center pt-4"><Dialog open={isDeveloperRegistrationDialogOpen} onOpenChange={setIsDeveloperRegistrationDialogOpen}><DialogTrigger asChild><Button variant="link" className="text-primary h-auto p-0 text-sm flex items-center gap-1.5"><CodeXml className="h-4 w-4" /> S'inscrire en tant que développeur</Button></DialogTrigger>{isDeveloperRegistrationDialogOpen && <DeveloperRegistrationDialogContent onSuccess={handleRegistrationSuccess} />}</Dialog></div>
                </>
              ) : (
                commonOtpInputSection(setDeveloperLoginStep, 'credentials', submittedOrgIdentifier, () => handleAuthenticationSuccess('/developer-dashboard'))
              )}
            </CardContent>
            <CardFooter><p className="text-xs text-muted-foreground text-center w-full"><Link href="#" className="text-primary underline hover:no-underline">Consultez la documentation API</Link>.</p></CardFooter>
          </Card>
        </TabsContent>

        {/* Ministries Tab */}
        <TabsContent value="ministries">
          <Card className="shadow-lg border">
            <CardHeader>
              <CardTitle className="text-xl">Accès Ministères</CardTitle>
              <CardDescription>
                {ministryLoginStep === 'credentials'
                  ? "Portail sécurisé pour les institutions ministérielles."
                  : "Veuillez entrer le code OTP reçu."}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              {ministryLoginStep === 'credentials' ? (
                <Form {...ministryForm}>
                  <form onSubmit={ministryForm.handleSubmit(onMinistrySubmit)} className="space-y-4">
                    <FormField control={ministryForm.control} name="ministryName" render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-sm"><Landmark className="mr-2 h-4 w-4 text-muted-foreground" /> Ministère</FormLabel>
                        <Select onValueChange={field.onChange} defaultValue={field.value}>
                          <FormControl><SelectTrigger className="h-11 text-base"><SelectValue placeholder="Sélectionnez un ministère..." /></SelectTrigger></FormControl>
                          <SelectContent>{senegalMinistries.map((ministry) => (<SelectItem key={ministry} value={ministry} className="text-sm">{ministry}</SelectItem>))}</SelectContent>
                        </Select><FormMessage />
                      </FormItem>)} />
                    <FormField control={ministryForm.control} name="password" render={({ field }) => (<FormItem><FormLabel className="flex items-center text-sm"><KeyRound className="mr-2 h-4 w-4 text-muted-foreground" /> Mot de passe</FormLabel><FormControl><Input type="password" placeholder="••••••••" {...field} className="h-11 text-base" /></FormControl><FormMessage /></FormItem>)} />
                    <Button type="submit" className="w-full h-11 text-base" disabled={ministryForm.formState.isSubmitting}>
                      {ministryForm.formState.isSubmitting ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <MessageCircle className="mr-2 h-5 w-5" />} Envoyer OTP
                    </Button>
                  </form>
                </Form>
              ) : (
                commonOtpInputSection(setMinistryLoginStep, 'credentials', submittedMinistryName, () => handleAuthenticationSuccess('/ministry-dashboard'))
              )}
            </CardContent>
            <CardFooter><p className="text-xs text-muted-foreground text-center w-full">Accès réservé aux personnels autorisés des ministères.</p></CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
      <p className="mt-8 text-xs text-center text-muted-foreground/80 px-4">Toute tentative d'intrusion suspecte votre IP sera tracée par Le Regard Maudit.</p>
      <div className="mt-4 text-center">
        <a href="http://127.0.0.1:8000/" className="text-sm text-primary hover:underline flex items-center justify-center gap-1.5" target="_blank" rel="noopener noreferrer">
          <ArrowLeft className="h-4 w-4" /> Retour au site principal
        </a>
      </div>
    </div>
  );
}

