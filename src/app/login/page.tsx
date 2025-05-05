
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { QRCodeCanvas } from 'qrcode.react';
import { useRouter } from "next/navigation";
import Link from "next/link"; // Import Link
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
import { QrCode, ScanFace, Phone, LogIn, Building, Code, Loader2, VideoOff, User, Lock, UserPlus, KeyRound, CaseSensitive, Building2, CodeXml } from "lucide-react"; // Added CodeXml icon
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
  DialogClose
} from "@/components/ui/dialog";
import {
  Alert,
  AlertTitle,
  AlertDescription,
} from "@/components/ui/alert";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";
import RegistrationDialogContent from "@/components/registration-dialog-content"; // Import RegistrationDialogContent
import BusinessRegistrationDialogContent from "@/components/business-registration-dialog-content"; // Import BusinessRegistrationDialogContent
import DeveloperRegistrationDialogContent from "@/components/developer-registration-dialog-content"; // Import DeveloperRegistrationDialogContent

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
  registrationNumber: z.string().min(5, "NINEA ou RCCM requis (min 5 caractères)."), // Basic validation
  password: z.string().min(6, "Mot de passe requis (min 6 caractères)."),
});

type OrgLoginValues = z.infer<typeof orgLoginSchema>;

// Component for Facial Recognition Dialog Content
const FacialRecognitionDialogContent: React.FC<{ onAuthenticated: () => void }> = ({ onAuthenticated }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = React.useState<boolean | null>(null);
  const [isScanning, setIsScanning] = React.useState(false);
  const { toast } = useToast();
  const streamRef = React.useRef<MediaStream | null>(null);

  React.useEffect(() => {
    let mounted = true; // Track component mount state

    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          console.error('Camera API not supported.');
           if (mounted) setHasCameraPermission(false);
           toast({
              variant: 'destructive',
              title: 'Erreur Caméra',
              description: 'Votre navigateur ne supporte pas l\'accès à la caméra.',
          });
          return;
      }
      try {
        streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
         if (mounted) {
            setHasCameraPermission(true);
            if (videoRef.current) {
            videoRef.current.srcObject = streamRef.current;
            }
        } else {
             // If component unmounted before permission granted, stop the stream
            streamRef.current?.getTracks().forEach(track => track.stop());
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
         if (mounted) setHasCameraPermission(false);
        // Toast is shown below in the UI
      }
    };

    getCameraPermission();

    // Cleanup function
    return () => {
        mounted = false; // Mark as unmounted
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
             console.log("Camera stream stopped"); // Log cleanup
        }
        if(videoRef.current) videoRef.current.srcObject = null; // Clear video source
    };
  }, [toast]); // Added toast dependency

  const handleSimulateScan = () => {
      setIsScanning(true);
      // Simulate API call for facial recognition
      setTimeout(() => {
          const success = Math.random() > 0.3; // Simulate 70% success rate
          setIsScanning(false);
          if (success) {
              toast({
                  title: "Succès",
                  description: "Reconnaissance faciale réussie ! Redirection...",
              });
              onAuthenticated(); // Call the callback to handle redirection
          } else {
              toast({
                  title: "Échec",
                  description: "Reconnaissance faciale échouée. Veuillez réessayer.", // Simplified message
                  variant: "destructive",
              });
          }
      }, 2000); // Simulate 2 seconds scan
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-lg"> {/* Adjusted size */}
            <ScanFace className="h-5 w-5" /> Vérification Faciale
        </DialogTitle>
        <DialogDescription>
          Positionnez votre visage face à la caméra et cliquez sur Scanner. (Simulation)
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4 my-6"> {/* Added margin */}
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted flex items-center justify-center shadow-inner"> {/* Added shadow */}
           <video ref={videoRef} className={cn("w-full h-full object-cover", { 'hidden': hasCameraPermission === false })} autoPlay muted playsInline />
            {hasCameraPermission === null && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground space-y-2">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p>Activation caméra...</p>
                </div>
            )}
             {hasCameraPermission === false && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-destructive p-4 space-y-2">
                     <VideoOff className="h-10 w-10" />
                     <p className="text-center font-semibold">Caméra non accessible</p>
                     <p className="text-center text-sm">Veuillez autoriser l'accès dans votre navigateur.</p>
                 </div>
             )}
              {isScanning && (
                 <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center text-primary space-y-2 backdrop-blur-sm"> {/* Added blur */}
                     <Loader2 className="h-10 w-10 animate-spin" />
                     <p className="font-medium">Analyse en cours...</p>
                 </div>
             )}
        </div>

        {hasCameraPermission === false && (
          <Alert variant="destructive">
             <VideoOff className="h-4 w-4" /> {/* Add icon directly */}
            <AlertTitle>Accès Caméra Refusé</AlertTitle>
            <AlertDescription>
              L'accès à la caméra est nécessaire. Veuillez l'autoriser dans les paramètres de votre navigateur.
            </AlertDescription>
          </Alert>
        )}
      </div>
      <DialogFooter className="sm:justify-center gap-2"> {/* Added gap */}
         <Button
            type="button"
            onClick={handleSimulateScan}
            disabled={!hasCameraPermission || isScanning}
            className="w-full sm:w-auto"
            size="lg" // Larger button
          >
            {isScanning ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" /> // Larger icon
            ) : (
              <ScanFace className="mr-2 h-5 w-5" /> // Larger icon
            )}
            Scanner (Simulation)
          </Button>
         <DialogClose asChild>
           <Button type="button" variant="outline" size="lg"> {/* Use outline, larger size */}
             Annuler
           </Button>
         </DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};


export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const [qrCodeData, setQrCodeData] = React.useState<string | null>(null);
  const [isQrDialogOpen, setIsQrDialogOpen] = React.useState(false);
  const [showFacialRecognitionDialog, setShowFacialRecognitionDialog] = React.useState(false);
  const [isRegistrationDialogOpen, setIsRegistrationDialogOpen] = React.useState(false); // State for individual registration dialog
  const [isBusinessRegistrationDialogOpen, setIsBusinessRegistrationDialogOpen] = React.useState(false); // State for business registration dialog
  const [isDeveloperRegistrationDialogOpen, setIsDeveloperRegistrationDialogOpen] = React.useState(false); // State for developer registration dialog

  // Form for Individuals (Phone Login)
  const phoneForm = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber: "+221",
    },
  });

  // Form for Business Login
  const businessForm = useForm<OrgLoginValues>({
    resolver: zodResolver(orgLoginSchema),
    defaultValues: {
      registrationNumber: "",
      password: "",
    },
  });

  // Form for Developer Login
  const developerForm = useForm<OrgLoginValues>({
    resolver: zodResolver(orgLoginSchema),
    defaultValues: {
      registrationNumber: "",
      password: "",
    },
  });

   const handleAuthenticationSuccess = React.useCallback((targetPath: string = '/') => {
      // Close dialogs first
      setShowFacialRecognitionDialog(false);
      setIsQrDialogOpen(false);
      setIsRegistrationDialogOpen(false); // Close individual registration dialog
      setIsBusinessRegistrationDialogOpen(false); // Close business registration dialog
      setIsDeveloperRegistrationDialogOpen(false); // Close developer registration dialog
      setQrCodeData(null); // Clear QR data

      // Use a slight delay to allow dialogs to close visually before redirecting
      setTimeout(() => {
        router.push(targetPath); // Redirect to the specified path
      }, 300); // 300ms delay
   }, [router]); // Add router to dependency array

   const handleRegistrationSuccess = React.useCallback(() => {
      setIsRegistrationDialogOpen(false); // Close the individual registration dialog
      setIsBusinessRegistrationDialogOpen(false); // Close the business registration dialog
      setIsDeveloperRegistrationDialogOpen(false); // Close the developer registration dialog
      // Optionally redirect or show another message
      toast({
          title: "Inscription Réussie!",
          description: "Vous pouvez maintenant vous connecter.",
          variant: "default" // Use default variant for success
      });
   }, [toast]);

  // Submit handler for Phone Login (Individuals)
  function onPhoneSubmit(data: PhoneFormValues) {
    toast({
      title: "Vérification en cours... (Simulation)",
      description: `Un code OTP simulé est envoyé à ${data.phoneNumber}.`,
    });
    console.log("Phone login attempt:", data);
    // Simulate OTP verification and login
    setTimeout(() => {
      toast({
        title: "Connexion réussie!",
        description: "Redirection vers l'accueil...",
      });
       handleAuthenticationSuccess('/'); // Redirect to individual home
    }, 1500); // Shorter delay for phone login simulation
  }

  // Submit handler for Business Login
  function onBusinessSubmit(data: OrgLoginValues) {
    toast({
      title: "Vérification Business en cours... (Simulation)",
      description: `Tentative de connexion pour ${data.registrationNumber}.`,
    });
    console.log("Business login attempt:", data);
    // Simulate business credential verification and login
    setTimeout(() => {
      // Simulate success/failure
      const success = Math.random() > 0.2; // 80% success rate simulation
      if (success) {
        toast({
          title: "Connexion Business réussie!",
          description: "Redirection vers le portail entreprise...",
        });
        handleAuthenticationSuccess('/business-dashboard'); // Redirect to business dashboard
      } else {
         toast({
            title: "Échec de la Connexion Business",
            description: "Identifiants incorrects. Veuillez réessayer.",
            variant: "destructive",
         });
         // Reset password field on failure
         businessForm.resetField("password");
      }
    }, 1500);
  }

  // Submit handler for Developer Login
  function onDeveloperSubmit(data: OrgLoginValues) {
    toast({
      title: "Vérification Développeur en cours... (Simulation)",
      description: `Tentative de connexion pour ${data.registrationNumber}.`,
    });
    console.log("Developer login attempt:", data);
    // Simulate developer credential verification and login
    setTimeout(() => {
      // Simulate success/failure (e.g., 70% success rate)
      const success = Math.random() > 0.3;
      if (success) {
        toast({
          title: "Connexion Développeur réussie!",
          description: "Redirection vers le portail développeur...",
        });
        handleAuthenticationSuccess('/developer-dashboard'); // Redirect to developer dashboard
      } else {
         toast({
            title: "Échec de la Connexion Développeur",
            description: "Identifiants incorrects. Veuillez réessayer.",
            variant: "destructive",
         });
         // Reset password field on failure
         developerForm.resetField("password");
      }
    }, 1500);
  }


  // Function to generate new QR data
  const generateQrData = () => `senpass-login-simulation-${Date.now()}-${Math.random().toString(16).slice(2)}`; // Changed from senpass-lite-login-simulation

  const handleOpenQrDialog = () => {
    const initialQrData = generateQrData();
    setQrCodeData(initialQrData);
    setIsQrDialogOpen(true); // Open the dialog
    console.log("QR Code login initiated, data:", initialQrData);
     // Simulate successful scan after a while (longer than refresh interval)
     // In a real app, this would be event-driven from the scanning device
     const scanTimeout = setTimeout(() => {
        // Check if the dialog is still open before declaring success
        if (isQrDialogOpenRef.current) { // Use ref to check current state
             console.log("Simulating successful QR scan...");
             toast({
                title: "QR Code Scanné!",
                description: "Connexion réussie via QR Code. Redirection...",
             });
             handleAuthenticationSuccess('/'); // Redirect to individual home
        } else {
            console.log("QR scan simulation cancelled, dialog closed.");
        }
     }, 25000); // Simulate 25 seconds for scanning to allow refreshes

     // Store timeout ID to clear it if dialog closes early
     // Note: This simple approach doesn't use refs, relies on closure
     // A more robust solution might use a ref to store the timeout ID
  };

  // Ref to track if the QR dialog is open for the timeout callback
  const isQrDialogOpenRef = React.useRef(isQrDialogOpen);
  React.useEffect(() => {
      isQrDialogOpenRef.current = isQrDialogOpen;
  }, [isQrDialogOpen]);

  // Effect to refresh QR code every 10 seconds when the dialog is open
  React.useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isQrDialogOpen) { // Only run if dialog is open
      intervalId = setInterval(() => {
        setQrCodeData(generateQrData());
        console.log("Refreshing QR Code..."); // Log refresh
      }, 10000); // Refresh every 10 seconds
      console.log("QR Code refresh interval started.");
    }

    // Cleanup function to clear the interval when dialog closes or component unmounts
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        console.log("Cleared QR Code refresh interval.");
      }
    };
  }, [isQrDialogOpen]); // Only depend on dialog state

  return (
    <div className="flex justify-center items-start py-12 min-h-[calc(100vh-10rem)]"> {/* Adjust padding/min-height */}
      <Tabs defaultValue="individuals" className="w-full max-w-md"> {/* Slightly narrower max-width */}
        <TabsList className="grid w-full grid-cols-3 h-12"> {/* Increased height */}
          <TabsTrigger value="individuals" className="text-base"> {/* Base text size */}
            <User className="mr-2 h-5 w-5" /> Individus
          </TabsTrigger>
          <TabsTrigger value="business" className="text-base">
            <Building className="mr-2 h-5 w-5" /> Business
          </TabsTrigger>
          <TabsTrigger value="developers" className="text-base">
            <Code className="mr-2 h-5 w-5" /> Développeurs
          </TabsTrigger>
        </TabsList>

        {/* Individuals Tab */}
        <TabsContent value="individuals">
          <Card className="shadow-lg border"> {/* Added border and shadow */}
            <CardHeader>
              <CardTitle className="text-xl">Connexion Individu</CardTitle> {/* Adjusted size */}
              <CardDescription>
                Connectez-vous de manière sécurisée avec votre compte SenPass.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-2"> {/* Added top padding */}
              {/* Phone Number Login Form */}
              <Form {...phoneForm}>
                <form onSubmit={phoneForm.handleSubmit(onPhoneSubmit)} className="space-y-4">
                  <FormField
                    control={phoneForm.control}
                    name="phoneNumber"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="flex items-center text-sm"> {/* Adjusted size */}
                           <Phone className="mr-2 h-4 w-4 text-muted-foreground" /> Numéro de téléphone (+221)
                        </FormLabel>
                        <FormControl>
                           <div className="flex items-center"> {/* Removed gap, relying on input/span styles */}
                             <span className="text-base font-medium p-2.5 bg-muted rounded-l-md border border-r-0 border-input h-11 flex items-center text-muted-foreground"> {/* Adjusted size/style */}
                               +221
                              </span>
                             <Input
                               type="tel" // Use tel type
                               placeholder="7X XXX XX XX"
                               {...field}
                               onChange={(e) => {
                                 // Keep only digits after +221
                                 const digits = e.target.value.replace(/\D/g, '');
                                 // Ensure it starts with 221, then take the next 9 digits
                                 const numberPart = digits.startsWith('221') ? digits.substring(3, 12) : digits.substring(0, 9);
                                 field.onChange(`+221${numberPart}`);
                               }}
                               className="rounded-l-none flex-1 h-11 text-base tracking-wider" // Adjusted size/style
                               maxLength={13} // +221 plus 9 digits
                             />
                           </div>
                        </FormControl>
                        {/* <FormDescription>
                          Un code OTP sera envoyé pour vérification (Simulation).
                        </FormDescription> */}
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <Button type="submit" className="w-full h-11 text-base" disabled={phoneForm.formState.isSubmitting}> {/* Adjusted size/text */}
                     {phoneForm.formState.isSubmitting ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" /> // Larger icon
                     ) : (
                        <LogIn className="mr-2 h-5 w-5" /> // Larger icon
                     )}
                      Continuer par téléphone
                   </Button>
                </form>
              </Form>

              {/* Separator */}
              <div className="relative my-6"> {/* Added margin */}
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-3 text-muted-foreground"> {/* Use card background */}
                    Ou utiliser
                  </span>
                </div>
              </div>

              {/* QR Code and Face Login Buttons */}
              <div className="grid grid-cols-2 gap-4">
                {/* QR Code Dialog */}
                <Dialog open={isQrDialogOpen} onOpenChange={(open) => {
                    setIsQrDialogOpen(open);
                    if (open) {
                        setQrCodeData(generateQrData()); // Generate fresh QR on open
                        handleOpenQrDialog(); // Start the login simulation timeout
                    } else {
                        setQrCodeData(null); // Clear data on close
                        // The timeout check logic remains the same (uses ref)
                    }
                 }}>
                    <DialogTrigger asChild>
                        <Button variant="outline" className="h-12 text-base" > {/* Adjusted size/text */}
                           <QrCode className="mr-2 h-5 w-5 text-accent" /> QR Code
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-xs"> {/* Smaller dialog */}
                        <DialogHeader>
                           <DialogTitle className="text-lg">Scanner le QR Code</DialogTitle> {/* Adjusted size */}
                           <DialogDescription>
                              Scannez avec l'app SenPass. Se rafraîchit toutes les 10s. (Simulation)
                           </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center justify-center p-6"> {/* Increased padding */}
                           {qrCodeData ? (
                              <div className="p-2 bg-white rounded-md shadow-md"> {/* White background container */}
                                <QRCodeCanvas
                                    value={qrCodeData}
                                    size={200} // Slightly smaller QR
                                    bgColor={"#FFFFFF"}
                                    fgColor={"#00853F"} // Senegal Green
                                    level={"H"}
                                    includeMargin={true}
                                />
                              </div>
                           ) : (
                              <div className="flex flex-col items-center justify-center text-muted-foreground h-[200px] space-y-2">
                                 <Loader2 className="h-8 w-8 animate-spin" />
                                 <p>Génération...</p>
                              </div>
                           )}
                        </div>
                        <DialogFooter className="sm:justify-center">
                            <DialogClose asChild>
                                <Button type="button" variant="outline"> {/* Use outline */}
                                Fermer
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                 {/* Facial Recognition Dialog */}
                 <Dialog open={showFacialRecognitionDialog} onOpenChange={setShowFacialRecognitionDialog}>
                     <DialogTrigger asChild>
                         <Button variant="outline" className="h-12 text-base"> {/* Adjusted size/text */}
                             <ScanFace className="mr-2 h-5 w-5 text-accent" /> Visage
                         </Button>
                     </DialogTrigger>
                     {/* Conditionally render content to ensure useEffect runs on open */}
                     {showFacialRecognitionDialog && <FacialRecognitionDialogContent onAuthenticated={() => handleAuthenticationSuccess('/')} />}
                 </Dialog>
              </div>

              {/* Registration Link/Dialog */}
               <div className="text-center pt-4">
                   <Dialog open={isRegistrationDialogOpen} onOpenChange={setIsRegistrationDialogOpen}>
                       <DialogTrigger asChild>
                           <Button variant="link" className="text-primary h-auto p-0 text-sm flex items-center gap-1.5">
                               <UserPlus className="h-4 w-4" /> S'inscrire à SenPass
                           </Button>
                       </DialogTrigger>
                       {/* Registration Dialog Content */}
                       {isRegistrationDialogOpen && <RegistrationDialogContent onSuccess={handleRegistrationSuccess} />}
                   </Dialog>
               </div>

            </CardContent>
             <CardFooter>
                <p className="text-xs text-muted-foreground text-center w-full flex items-center justify-center gap-1.5">
                   <Lock className="h-3 w-3"/> Connexion sécurisée.
                </p>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Business Tab */}
        <TabsContent value="business">
          <Card className="shadow-lg border">
            <CardHeader>
              <CardTitle className="text-xl">Connexion Entreprise</CardTitle>
              <CardDescription>
                Accès sécurisé pour les organisations partenaires via NINEA/RCCM.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              {/* Business Login Form */}
              <Form {...businessForm}>
                 <form onSubmit={businessForm.handleSubmit(onBusinessSubmit)} className="space-y-4">
                   <FormField
                     control={businessForm.control}
                     name="registrationNumber"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel className="flex items-center text-sm">
                           <CaseSensitive className="mr-2 h-4 w-4 text-muted-foreground" /> NINEA / RCCM
                         </FormLabel>
                         <FormControl>
                           <Input
                             placeholder="Ex: 001234567 ou SN.DKR.2023.A.12345"
                             {...field}
                             className="h-11 text-base"
                           />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                     )}
                   />
                    <FormField
                     control={businessForm.control}
                     name="password"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel className="flex items-center text-sm">
                           <KeyRound className="mr-2 h-4 w-4 text-muted-foreground" /> Mot de passe
                         </FormLabel>
                         <FormControl>
                           <Input
                             type="password"
                             placeholder="••••••••"
                             {...field}
                             className="h-11 text-base"
                           />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                     )}
                   />
                    <Button type="submit" className="w-full h-11 text-base" disabled={businessForm.formState.isSubmitting}>
                      {businessForm.formState.isSubmitting ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      ) : (
                        <LogIn className="mr-2 h-5 w-5" />
                      )}
                      Se Connecter (Business)
                    </Button>
                 </form>
              </Form>

               {/* Business Registration Link/Dialog */}
               <div className="text-center pt-4">
                 <Dialog open={isBusinessRegistrationDialogOpen} onOpenChange={setIsBusinessRegistrationDialogOpen}>
                   <DialogTrigger asChild>
                     <Button variant="link" className="text-primary h-auto p-0 text-sm flex items-center gap-1.5">
                       <Building2 className="h-4 w-4" /> S'inscrire en tant qu'entreprise/institution
                     </Button>
                   </DialogTrigger>
                   {/* Business Registration Dialog Content */}
                   {isBusinessRegistrationDialogOpen && <BusinessRegistrationDialogContent onSuccess={handleRegistrationSuccess} />}
                 </Dialog>
               </div>

            </CardContent>
            <CardFooter>
              <p className="text-xs text-muted-foreground text-center w-full">
                Besoin d'aide ?{" "}
                 <Link href="#" className="text-primary underline hover:no-underline"> {/* Add link target later */}
                  Contactez le support
                 </Link>.
              </p>
            </CardFooter>
          </Card>
        </TabsContent>

        {/* Developers Tab */}
        <TabsContent value="developers">
          <Card className="shadow-lg border">
            <CardHeader>
              <CardTitle className="text-xl">Portail Développeur</CardTitle>
              <CardDescription>
                Accès aux APIs et outils d'intégration SenPass via NINEA/RCCM.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
              {/* Developer Login Form */}
               <Form {...developerForm}>
                 <form onSubmit={developerForm.handleSubmit(onDeveloperSubmit)} className="space-y-4">
                   <FormField
                     control={developerForm.control}
                     name="registrationNumber"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel className="flex items-center text-sm">
                           <CaseSensitive className="mr-2 h-4 w-4 text-muted-foreground" /> NINEA / RCCM (Développeur)
                         </FormLabel>
                         <FormControl>
                           <Input
                             placeholder="N° organisation développeur"
                             {...field}
                             className="h-11 text-base"
                           />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                     )}
                   />
                    <FormField
                     control={developerForm.control}
                     name="password"
                     render={({ field }) => (
                       <FormItem>
                         <FormLabel className="flex items-center text-sm">
                           <KeyRound className="mr-2 h-4 w-4 text-muted-foreground" /> Mot de passe (API Key / Secret)
                         </FormLabel>
                         <FormControl>
                           <Input
                             type="password"
                             placeholder="••••••••"
                             {...field}
                             className="h-11 text-base"
                           />
                         </FormControl>
                         <FormMessage />
                       </FormItem>
                     )}
                   />
                    <Button type="submit" className="w-full h-11 text-base" disabled={developerForm.formState.isSubmitting}>
                      {developerForm.formState.isSubmitting ? (
                        <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                      ) : (
                        <LogIn className="mr-2 h-5 w-5" />
                      )}
                      Se Connecter (Développeur)
                    </Button>
                 </form>
               </Form>

                {/* Developer Registration Link/Dialog */}
                <div className="text-center pt-4">
                 <Dialog open={isDeveloperRegistrationDialogOpen} onOpenChange={setIsDeveloperRegistrationDialogOpen}>
                   <DialogTrigger asChild>
                     <Button variant="link" className="text-primary h-auto p-0 text-sm flex items-center gap-1.5">
                       <CodeXml className="h-4 w-4" /> S'inscrire en tant que développeur
                     </Button>
                   </DialogTrigger>
                   {/* Developer Registration Dialog Content */}
                   {isDeveloperRegistrationDialogOpen && <DeveloperRegistrationDialogContent onSuccess={handleRegistrationSuccess} />}
                 </Dialog>
               </div>

            </CardContent>
             <CardFooter>
                 <p className="text-xs text-muted-foreground text-center w-full">
                     <Link href="#" className="text-primary underline hover:no-underline"> {/* Add link target later */}
                       Consultez la documentation API
                     </Link>.
                 </p>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
}


