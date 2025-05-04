
"use client";

import * as React from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { QRCodeCanvas } from 'qrcode.react';
import { useRouter } from "next/navigation";
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
import { QrCode, ScanFace, Phone, LogIn, Building, Code, Loader2, Video, VideoOff, User } from "lucide-react"; // Added User icon
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

// Schema for phone number validation
const phoneSchema = z.object({
  phoneNumber: z
    .string()
    .min(1, "Le numéro de téléphone est requis.")
    .regex(/^\+221\d{9}$/, "Format invalide. Utilisez +221 suivi de 9 chiffres (ex: +221771234567)."),
});

type PhoneFormValues = z.infer<typeof phoneSchema>;

// Component for Facial Recognition Dialog Content
const FacialRecognitionDialogContent: React.FC<{ onAuthenticated: () => void }> = ({ onAuthenticated }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = React.useState<boolean | null>(null);
  const [isScanning, setIsScanning] = React.useState(false);
  const { toast } = useToast();
  const streamRef = React.useRef<MediaStream | null>(null);

  React.useEffect(() => {
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          console.error('Camera API not supported.');
          setHasCameraPermission(false);
          toast({
              variant: 'destructive',
              title: 'Erreur Caméra',
              description: 'Votre navigateur ne supporte pas l\'accès à la caméra.',
          });
          return;
      }
      try {
        streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
        setHasCameraPermission(true);
        if (videoRef.current) {
          videoRef.current.srcObject = streamRef.current;
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        setHasCameraPermission(false);
        // Toast is shown below in the UI
      }
    };

    getCameraPermission();

    // Cleanup function to stop the stream when the component unmounts or dialog closes
    return () => {
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null;
            if(videoRef.current) videoRef.current.srcObject = null; // Clear video source
        }
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
                  description: "Échec de la reconnaissance faciale. Essayez de vous rapprocher ou d'améliorer l'éclairage.",
                  variant: "destructive",
              });
          }
      }, 2000); // Simulate 2 seconds scan
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2">
            <ScanFace className="h-5 w-5" /> Reconnaissance Faciale
        </DialogTitle>
        <DialogDescription>
          Positionnez votre visage face à la caméra. (Simulation)
        </DialogDescription>
      </DialogHeader>
      <div className="space-y-4">
        <div className="relative aspect-video w-full overflow-hidden rounded-md border bg-muted flex items-center justify-center">
           <video ref={videoRef} className={cn("w-full h-full object-cover", { 'hidden': hasCameraPermission === false })} autoPlay muted playsInline />
            {hasCameraPermission === null && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground">
                    <Loader2 className="h-8 w-8 animate-spin mb-2" />
                    <p>Demande d'accès caméra...</p>
                </div>
            )}
             {hasCameraPermission === false && (
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-destructive p-4">
                     <VideoOff className="h-10 w-10 mb-2" />
                     <p className="text-center font-semibold">Caméra non accessible</p>
                     <p className="text-center text-sm">Veuillez autoriser l'accès dans les paramètres de votre navigateur.</p>
                 </div>
             )}
              {isScanning && (
                 <div className="absolute inset-0 bg-background/70 flex flex-col items-center justify-center text-primary">
                     <Loader2 className="h-10 w-10 animate-spin mb-2" />
                     <p>Scan en cours...</p>
                 </div>
             )}
        </div>

        {hasCameraPermission === false && (
          <Alert variant="destructive" icon={VideoOff}> {/* Use icon prop */}
            {/* <VideoOff className="h-4 w-4" /> Replaced by icon prop */}
            <AlertTitle>Accès Caméra Refusé</AlertTitle>
            <AlertDescription>
              Veuillez autoriser l'accès à la caméra dans les paramètres de votre navigateur pour utiliser cette fonctionnalité.
            </AlertDescription>
          </Alert>
        )}
      </div>
      <DialogFooter className="sm:justify-center">
         <Button
            type="button"
            onClick={handleSimulateScan}
            disabled={!hasCameraPermission || isScanning}
            className="w-full sm:w-auto"
          >
            {isScanning ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              <ScanFace className="mr-2 h-4 w-4" />
            )}
            Scanner mon visage (Simulation)
          </Button>
         <DialogClose asChild>
           <Button type="button" variant="secondary">
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

  const form = useForm<PhoneFormValues>({
    resolver: zodResolver(phoneSchema),
    defaultValues: {
      phoneNumber: "+221",
    },
  });

   const handleAuthenticationSuccess = () => {
      setShowFacialRecognitionDialog(false);
      setIsQrDialogOpen(false); // Close QR dialog if open
      setQrCodeData(null); // Clear QR data

      setTimeout(() => {
        router.push('/'); // Redirect to home page
      }, 500);
   };

  function onSubmit(data: PhoneFormValues) {
    toast({
      title: "Vérification OTP (Simulation)",
      description: `Un code a été envoyé au ${data.phoneNumber}. Entrez le code pour continuer.`,
    });
    console.log("Phone login attempt:", data);
    setTimeout(() => {
      toast({
        title: "Connexion réussie!",
        description: "Redirection vers l'accueil...",
      });
       handleAuthenticationSuccess();
    }, 2000);
  }

  // Function to generate new QR data
  const generateQrData = () => `senpass-lite-login-simulation-${Date.now()}`;

  const handleOpenQrDialog = () => {
    const initialQrData = generateQrData();
    setQrCodeData(initialQrData);
    setIsQrDialogOpen(true); // Open the dialog
    toast({
      title: "QR Code Généré (Simulation)",
      description: "Scannez le code pour une connexion simulée.",
    });
    console.log("QR Code login initiated, data:", initialQrData);
     // Simulate successful scan after a while (longer than refresh interval)
     // In a real app, this would be event-driven from the scanning device
     setTimeout(() => {
        // Check if the dialog is still open before declaring success
        if (isQrDialogOpen) {
             toast({
                title: "QR Code Scanné!",
                description: "Connexion réussie via QR Code. Redirection...",
             });
             handleAuthenticationSuccess();
        }
     }, 25000); // Simulate 25 seconds for scanning to allow refreshes
  };

  // Effect to refresh QR code every 10 seconds when the dialog is open
  React.useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;

    if (isQrDialogOpen && qrCodeData !== null) { // Check qrCodeData is not null to avoid unnecessary initial interval
      intervalId = setInterval(() => {
        const newData = generateQrData();
        console.log("Refreshing QR Code:", newData); // Log refresh
        setQrCodeData(newData);
      }, 10000); // Refresh every 10 seconds
    }

    // Cleanup function to clear the interval
    return () => {
      if (intervalId) {
        clearInterval(intervalId);
        console.log("Cleared QR Code refresh interval.");
      }
    };
  }, [isQrDialogOpen, qrCodeData]); // Depend on dialog state and data presence

  return (
    <div className="flex justify-center items-center py-12">
      <Tabs defaultValue="individuals" className="w-full max-w-lg">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="individuals">
            <User className="mr-2 h-4 w-4" /> Individus {/* Replaced UserSquare with User */}
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
                             <span className="text-sm font-medium p-2 bg-muted rounded-l-md border border-r-0 border-input h-10 flex items-center">+221</span>
                             <Input
                               placeholder="7X XXX XX XX"
                               {...field}
                               onChange={(e) => {
                                 const value = e.target.value;
                                 if (!value.startsWith('+221')) {
                                      field.onChange('+221');
                                 } else {
                                      const numericPart = value.substring(4).replace(/\D/g, '');
                                      field.onChange(`+221${numericPart}`);
                                 }
                               }}
                               className="rounded-l-none flex-1"
                               maxLength={13}
                             />
                           </div>
                        </FormControl>
                        <FormDescription>
                          Entrez votre numéro de téléphone enregistré (Sénégal uniquement). Un code sera envoyé.
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                   <Button type="submit" className="w-full" disabled={form.formState.isSubmitting}>
                     {form.formState.isSubmitting ? (
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                     ) : (
                        <LogIn className="mr-2 h-4 w-4" />
                     )}
                      Se connecter par téléphone
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
                {/* QR Code Dialog */}
                <Dialog open={isQrDialogOpen} onOpenChange={(open) => {
                    setIsQrDialogOpen(open);
                    if (open) { // Only generate new QR data when opening
                        const initialQrData = generateQrData();
                        setQrCodeData(initialQrData);
                        console.log("QR Code login initiated, data:", initialQrData);
                        // Re-add simulation of successful scan if needed for testing
                         setTimeout(() => {
                            if (isQrDialogOpen) { // Re-check if dialog still open
                                toast({
                                    title: "QR Code Scanné! (Simulé)",
                                    description: "Connexion réussie via QR Code. Redirection...",
                                });
                                handleAuthenticationSuccess();
                            }
                         }, 25000);
                    } else {
                        setQrCodeData(null); // Clear data on close
                    }
                 }}>
                    <DialogTrigger asChild>
                        <Button variant="outline" onClick={handleOpenQrDialog}>
                           <QrCode className="mr-2 h-4 w-4 text-accent" /> QR Code
                        </Button>
                    </DialogTrigger>
                    <DialogContent className="sm:max-w-md">
                        <DialogHeader>
                           <DialogTitle>Scanner le QR Code</DialogTitle>
                           <DialogDescription>
                              Utilisez l'application mobile SenPass pour scanner ce code. Il se met à jour toutes les 10 secondes. (Simulation)
                           </DialogDescription>
                        </DialogHeader>
                        <div className="flex items-center justify-center p-4">
                           {qrCodeData ? (
                              <QRCodeCanvas
                                 value={qrCodeData}
                                 size={256}
                                 bgColor={"#FFFFFF"} // White background
                                 fgColor={"#00853F"} // Senegal Green
                                 level={"H"}
                                 includeMargin={true}
                              />
                           ) : (
                              <div className="flex flex-col items-center justify-center text-muted-foreground h-[256px]">
                                 <Loader2 className="h-8 w-8 animate-spin mb-2" />
                                 <p>Génération du QR code...</p>
                              </div>
                           )}
                        </div>
                        <DialogFooter className="sm:justify-center">
                            <DialogClose asChild>
                                <Button type="button" variant="secondary">
                                Fermer
                                </Button>
                            </DialogClose>
                        </DialogFooter>
                    </DialogContent>
                </Dialog>

                 {/* Facial Recognition Dialog */}
                 <Dialog open={showFacialRecognitionDialog} onOpenChange={setShowFacialRecognitionDialog}>
                     <DialogTrigger asChild>
                         <Button variant="outline" onClick={() => setShowFacialRecognitionDialog(true)}>
                             <ScanFace className="mr-2 h-4 w-4 text-accent" /> Reconnaissance Faciale
                         </Button>
                     </DialogTrigger>
                     {showFacialRecognitionDialog && <FacialRecognitionDialogContent onAuthenticated={handleAuthenticationSuccess} />}
                 </Dialog>
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
