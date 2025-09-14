
"use client";

import * as React from "react";
import Image from "next/image";
import { QRCodeCanvas } from 'qrcode.react';
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
import { isValidPhoneNumber, type CountryCode } from 'libphonenumber-js';
import { getAuth, signInWithEmailAndPassword, getIdToken } from "firebase/auth";
import { auth } from "@/lib/firebase";

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
import { QrCode, ScanFace, LogIn, Building, Code, Loader2, User, Lock, UserPlus, Building2, CodeXml, ArrowLeft, Landmark, Mail, KeyRound, Smartphone, MessageSquare } from "lucide-react";
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
import { useToast } from "@/hooks/use-toast";
import { Skeleton } from "@/components/ui/skeleton";
import PhoneNumberInput from "@/components/phone-number-input"; // Import the component
import { ScrollArea } from "@/components/ui/scroll-area"; // Import ScrollArea

// Dynamically import dialog content components
const FacialRecognitionDialogContent = dynamic(() => import("@/components/facial-recognition-dialog-content"), {
  loading: () => <div className="p-6"><Skeleton className="h-64 w-full" /></div>,
  ssr: false
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


const VALID_LOGIN_TABS = ['individuals', 'business', 'developers', 'ministries'];

const ministries = [
  "Forces armées", "Intégration africaine et Affaires étrangères", "Justice, Garde des Sceaux", "Intérieur",
  "Finances et Budget", "Infrastructures et Transports", "Économie, Plan et Coopération", "Éducation nationale",
  "Enseignement supérieur, Recherche et Innovation", "Formation professionnelle", "Eau et Assainissement",
  "Santé et Action sociale", "Femme, Famille et Protection des enfants", "Fonction publique", "Urbanisme, Logement et Hygiène publique",
  "Commerce et PME", "Industrie et Mines", "Agriculture et Souveraineté alimentaire", "Pêche et Économie maritime",
  "Environnement et Développement durable", "Travail et Dialogue social", "Culture et Patrimoine historique",
  "Jeunesse, Sport et Entrepreneuriat", "Communication et Économie numérique"
];


// Generic Login Form Component for Business/Dev/Ministry (simulated)
const SimulatedLoginForm = ({
  userType,
  targetPath,
}: {
  userType: string;
  targetPath: string;
}) => {
  const { toast } = useToast();
  const router = useRouter();
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);

    toast({
      title: "Vérification en cours...",
      description: `Tentative de connexion au portail ${userType}.`,
    });

    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));

    // Simulate success
    toast({
      title: `Connexion ${userType} Réussie!`,
      description: "Redirection vers votre tableau de bord.",
    });

    router.push(targetPath);
    setIsLoading(false);
  };

  return (
    <form onSubmit={handleLogin} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor={`${userType}-email`} className="flex items-center gap-1.5"><Mail className="h-4 w-4"/> E-mail</Label>
        <Input 
          id={`${userType}-email`}
          type="email" 
          placeholder="exemple@email.com" 
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required 
          disabled={isLoading}
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor={`${userType}-password`} className="flex items-center gap-1.5"><KeyRound className="h-4 w-4"/> Mot de passe</Label>
        <Input 
          id={`${userType}-password`}
          type="password" 
          placeholder="••••••••"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          disabled={isLoading} 
        />
      </div>
      <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
        {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin"/> : <LogIn className="mr-2 h-5 w-5" />}
        Se connecter
      </Button>
    </form>
  );
};


const PhoneLoginForm = () => {
  const { toast } = useToast();
  const router = useRouter();
  const [phoneNumber, setPhoneNumber] = React.useState("+221"); // Default to Senegal
  const [otp, setOtp] = React.useState("");
  const [isLoading, setIsLoading] = React.useState(false);
  const [otpSent, setOtpSent] = React.useState(false);
  const [expectedOtp, setExpectedOtp] = React.useState("");

  const handleSendOtp = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isValidPhoneNumber(phoneNumber)) {
        toast({ title: "Erreur", description: "Veuillez entrer un numéro de téléphone valide.", variant: "destructive" });
        return;
    }
    setIsLoading(true);
    try {
        const response = await fetch('/api/auth/phone-login', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ phoneNumber }),
        });
        const data = await response.json();
        if (response.ok) {
            toast({ title: "Code envoyé", description: data.message });
            setOtpSent(true);
            setExpectedOtp(data.otp); // For demo purpose only
        } else {
            toast({ title: "Erreur", description: data.error, variant: "destructive" });
        }
    } catch (error) {
        toast({ title: "Erreur", description: "Impossible d'envoyer le code. Réessayez.", variant: "destructive" });
    } finally {
        setIsLoading(false);
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setTimeout(() => {
        if (otp === expectedOtp && otp !== "") {
            toast({ title: "Connexion Réussie!", description: "Redirection vers votre tableau de bord." });
            router.push('/dashboard');
        } else {
            toast({ title: "Échec", description: "Le code est incorrect.", variant: "destructive" });
        }
        setIsLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={otpSent ? handleVerifyOtp : handleSendOtp} className="space-y-4">
        {!otpSent ? (
            <>
                <div className="space-y-2">
                    <Label htmlFor="phone" className="flex items-center gap-1.5"><Smartphone className="h-4 w-4"/> Numéro de téléphone</Label>
                    <PhoneNumberInput id="phone" value={phoneNumber} onChange={setPhoneNumber} disabled={isLoading} />
                </div>
                <Button type="submit" className="w-full h-11 text-base" disabled={isLoading || !isValidPhoneNumber(phoneNumber)}>
                    {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin"/> : <MessageSquare className="mr-2 h-5 w-5" />}
                    Envoyer le code
                </Button>
            </>
        ) : (
            <>
                <div className="space-y-2">
                    <Label htmlFor="otp" className="flex items-center gap-1.5"><KeyRound className="h-4 w-4"/> Code de vérification (OTP)</Label>
                    <Input id="otp" type="text" placeholder="123456" value={otp} onChange={(e) => setOtp(e.target.value)} required disabled={isLoading} inputMode="numeric" />
                </div>
                <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                    {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin"/> : <LogIn className="mr-2 h-5 w-5" />}
                    Se connecter
                </Button>
                <Button variant="link" size="sm" onClick={() => setOtpSent(false)} className="w-full">Changer de numéro</Button>
            </>
        )}
    </form>
  );
};


export default function LoginPage() {
  const { toast } = useToast();
  const router = useRouter();
  const searchParams = useSearchParams();

  const [qrCodeData, setQrCodeData] = React.useState<string | null>(null);
  const [isQrDialogOpen, setIsQrDialogOpen] = React.useState(false);
  const [showFacialRecognitionDialog, setShowFacialRecognitionDialog] = React.useState(false);
  const [isRegistrationDialogOpen, setIsRegistrationDialogOpen] = React.useState(false);
  const [isBusinessRegistrationDialogOpen, setIsBusinessRegistrationDialogOpen] = React.useState(false);
  const [isDeveloperRegistrationDialogOpen, setIsDeveloperRegistrationDialogOpen] = React.useState(false);
  
  // State for the individuals login form
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [isLoading, setIsLoading] = React.useState(false);

  // Determine active tab from URL query parameter
  const requestedTab = searchParams.get('tab');
  const activeTab = VALID_LOGIN_TABS.includes(requestedTab ?? '') ? requestedTab : 'individuals';
  const [activeIndividualTab, setActiveIndividualTab] = React.useState('email');


   const handleAuthenticationSuccess = React.useCallback((targetPath: string = '/dashboard') => {
      setShowFacialRecognitionDialog(false);
      setIsQrDialogOpen(false);
      setQrCodeData(null);
      setTimeout(() => { router.push(targetPath); }, 300);
   }, [router]);

   const handleRegistrationSuccess = React.useCallback(() => {
      setIsRegistrationDialogOpen(false);
      setIsBusinessRegistrationDialogOpen(false);
      setIsDeveloperRegistrationDialogOpen(false);
      toast({ title: "Inscription Réussie!", description: "Vous pouvez maintenant vous connecter.", variant: "default" });
   }, [toast]);

  const generateQrData = () => `platform-login-${Date.now()}-${Math.random().toString(16).slice(2)}`;

  React.useEffect(() => {
    let intervalId: NodeJS.Timeout | null = null;
    if (isQrDialogOpen) {
      setQrCodeData(generateQrData()); // Initial generation
      intervalId = setInterval(() => { setQrCodeData(generateQrData()); console.log("Refreshing QR Code..."); }, 10000);
    }
    return () => { if (intervalId) clearInterval(intervalId); };
  }, [isQrDialogOpen]);
  
  const handleLoginSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const idToken = await getIdToken(userCredential.user);

      // Now, exchange the ID token for a session cookie
      const response = await fetch('/api/auth/session-login', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ idToken }),
      });

      if (response.ok) {
        toast({
          title: "Connexion Réussie!",
          description: "Redirection vers votre tableau de bord.",
        });
        router.push('/dashboard');
      } else {
        const errorData = await response.json();
        throw new Error(errorData.error || "La création de la session a échoué.");
      }
    } catch (error: any) {
      console.error("Login error:", error);
      let errorMessage = "Les informations de connexion sont incorrectes.";
      if (error.code === 'auth/user-not-found' || error.code === 'auth/wrong-password' || error.code === 'auth/invalid-credential') {
        errorMessage = "L'e-mail ou le mot de passe est incorrect.";
      } else if (error.message) {
        errorMessage = error.message;
      }
      toast({
        title: "Échec de la Connexion",
        description: errorMessage,
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleMinistryLogin = (ministry: string) => {
    toast({
      title: "Accès au portail",
      description: `Connexion simulée pour le Ministère de ${ministry}. Redirection...`,
    });
    router.push(`/ministry-dashboard?name=${encodeURIComponent(ministry)}`);
  };


  return (
    <div className="flex flex-col justify-center items-center py-12 min-h-screen bg-background">
       <div className="flex flex-col items-center gap-4 mb-8">
          <Image src="https://media.licdn.com/dms/image/v2/D4E0BAQEZqb1Jwm5tDQ/company-logo_100_100/B4EZa0hKR.HoAQ-/0/1746785314889?e=1756339200&v=beta&t=Jd6PipGqCyUUvYcM_sEpCtQb_OHUtNBtVYBTk9K2Khw" alt="SenPass Logo" width={60} height={60} className="rounded-xl" />
          <div className="text-center">
             <h1 className="text-2xl font-bold text-foreground">SenPass</h1>
             <p className="text-muted-foreground">Accès Sécurisé à votre Identité Numérique</p>
          </div>
       </div>
      <Tabs defaultValue={activeTab} className="w-full max-w-md">
        <TabsList className="grid w-full grid-cols-4 h-12">
          <TabsTrigger value="individuals" className="text-xs sm:text-sm"><User className="mr-1 sm:mr-2 h-4 w-4" /> Particuliers</TabsTrigger>
          <TabsTrigger value="business" className="text-xs sm:text-sm"><Building className="mr-1 sm:mr-2 h-4 w-4" /> Entreprises</TabsTrigger>
          <TabsTrigger value="developers" className="text-xs sm:text-sm"><Code className="mr-1 sm:mr-2 h-4 w-4" /> Développeurs</TabsTrigger>
          <TabsTrigger value="ministries" className="text-xs sm:text-sm"><Landmark className="mr-1 sm:mr-2 h-4 w-4" /> Ministères</TabsTrigger>
        </TabsList>

        {/* Individuals Tab */}
        <TabsContent value="individuals">
          <Card className="shadow-lg border">
            <CardHeader>
              <CardTitle className="text-xl">Connexion Particulier</CardTitle>
              <CardDescription>
                Accédez à votre espace personnel sécurisé.
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
                <Tabs value={activeIndividualTab} onValueChange={setActiveIndividualTab} className="w-full">
                    <TabsList className="grid w-full grid-cols-2">
                        <TabsTrigger value="email">E-mail</TabsTrigger>
                        <TabsTrigger value="phone">Téléphone</TabsTrigger>
                    </TabsList>
                    <TabsContent value="email" className="pt-4">
                        <form onSubmit={handleLoginSubmit} className="space-y-4">
                            <div className="space-y-2">
                            <Label htmlFor="email" className="flex items-center gap-1.5"><Mail className="h-4 w-4"/> E-mail</Label>
                            <Input 
                                id="email" 
                                type="email" 
                                placeholder="exemple@email.sn" 
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required 
                                disabled={isLoading}
                            />
                            </div>
                            <div className="space-y-2">
                            <Label htmlFor="password" className="flex items-center gap-1.5"><KeyRound className="h-4 w-4"/> Mot de passe</Label>
                            <Input 
                                id="password" 
                                type="password" 
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                disabled={isLoading} 
                            />
                            </div>
                            <Button type="submit" className="w-full h-11 text-base" disabled={isLoading}>
                            {isLoading ? <Loader2 className="mr-2 h-5 w-5 animate-spin"/> : <LogIn className="mr-2 h-5 w-5" />}
                            Se connecter
                            </Button>
                        </form>
                    </TabsContent>
                    <TabsContent value="phone" className="pt-4">
                        <PhoneLoginForm />
                    </TabsContent>
                </Tabs>
              
              <div className="text-center pt-2">
                <Dialog open={isRegistrationDialogOpen} onOpenChange={setIsRegistrationDialogOpen}>
                  <DialogTrigger asChild>
                    <Button variant="link" className="text-primary h-auto p-0 text-sm flex items-center gap-1.5">
                      <UserPlus className="h-4 w-4" /> Pas encore de compte ? S'inscrire
                    </Button>
                  </DialogTrigger>
                  {isRegistrationDialogOpen && <RegistrationDialogContent onSuccess={handleRegistrationSuccess} />}
                </Dialog>
              </div>

              <div className="relative my-6"><div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-3 text-muted-foreground">Ou utiliser une autre méthode</span></div></div>
              
              <div className="grid grid-cols-2 gap-4">
                <Dialog open={isQrDialogOpen} onOpenChange={setIsQrDialogOpen}><DialogTrigger asChild><Button variant="outline" className="h-12 text-base"><QrCode className="mr-2 h-5 w-5 text-accent" /> QR Code</Button></DialogTrigger>
                  <DialogContent className="sm:max-w-xs"><DialogHeader><DialogTitle className="text-lg">Scanner le QR Code</DialogTitle><DialogDescription>Scannez avec l'application. Se rafraîchit toutes les 10s.</DialogDescription></DialogHeader><div className="flex items-center justify-center p-6">{qrCodeData ? <div className="p-2 bg-white rounded-md shadow-md"><QRCodeCanvas value={qrCodeData} size={200} bgColor={"#FFFFFF"} fgColor={"#00853F"} level={"H"} includeMargin={true} /></div> : <div className="flex flex-col items-center justify-center text-muted-foreground h-[200px] space-y-2"><Loader2 className="h-8 w-8 animate-spin" /><p>Génération...</p></div>}</div><DialogFooter className="sm:justify-center"><DialogClose asChild><Button type="button" variant="outline">Fermer</Button></DialogClose></DialogFooter></DialogContent>
                </Dialog>
                <Dialog open={showFacialRecognitionDialog} onOpenChange={setShowFacialRecognitionDialog}><DialogTrigger asChild><Button variant="outline" className="h-12 text-base"><ScanFace className="mr-2 h-5 w-5 text-accent" /> Visage</Button></DialogTrigger>{showFacialRecognitionDialog && <FacialRecognitionDialogContent onAuthenticated={() => handleAuthenticationSuccess()} />}</Dialog>
              </div>

            </CardContent>
            <CardFooter><p className="text-xs text-muted-foreground text-center w-full flex items-center justify-center gap-1.5"><Lock className="h-3 w-3"/> Connexion sécurisée.</p></CardFooter>
          </Card>
        </TabsContent>

        {/* Business Tab */}
        <TabsContent value="business">
          <Card className="shadow-lg border">
            <CardHeader>
              <CardTitle className="text-xl">Connexion Entreprise</CardTitle>
              <CardDescription>Accès sécurisé pour les organisations partenaires.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
                 <SimulatedLoginForm userType="Entreprise" targetPath="/business-dashboard" />
                 <div className="text-center pt-4"><Dialog open={isBusinessRegistrationDialogOpen} onOpenChange={setIsBusinessRegistrationDialogOpen}><DialogTrigger asChild><Button variant="link" className="text-primary h-auto p-0 text-sm flex items-center gap-1.5"><Building2 className="h-4 w-4" /> S'inscrire en tant qu'entreprise</Button></DialogTrigger>{isBusinessRegistrationDialogOpen && <BusinessRegistrationDialogContent onSuccess={handleRegistrationSuccess} />}</Dialog></div>
            </CardContent>
            <CardFooter><p className="text-xs text-muted-foreground text-center w-full">Besoin d'aide ? <Link href="#" className="text-primary underline hover:no-underline">Contactez le support</Link>.</p></CardFooter>
          </Card>
        </TabsContent>

        {/* Developers Tab */}
        <TabsContent value="developers">
          <Card className="shadow-lg border">
            <CardHeader>
              <CardTitle className="text-xl">Portail Développeur</CardTitle>
              <CardDescription>Accès aux APIs et outils d'intégration.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
                 <SimulatedLoginForm userType="Développeur" targetPath="/developer-dashboard" />
                 <div className="text-center pt-4"><Dialog open={isDeveloperRegistrationDialogOpen} onOpenChange={setIsDeveloperRegistrationDialogOpen}><DialogTrigger asChild><Button variant="link" className="text-primary h-auto p-0 text-sm flex items-center gap-1.5"><CodeXml className="h-4 w-4" /> S'inscrire en tant que développeur</Button></DialogTrigger>{isDeveloperRegistrationDialogOpen && <DeveloperRegistrationDialogContent onSuccess={handleRegistrationSuccess} />}</Dialog></div>
            </CardContent>
            <CardFooter><p className="text-xs text-muted-foreground text-center w-full"><Link href="#" className="text-primary underline hover:no-underline">Consultez la documentation API</Link>.</p></CardFooter>
          </Card>
        </TabsContent>

        {/* Ministries Tab */}
        <TabsContent value="ministries">
           <Card className="shadow-lg border">
             <CardHeader>
               <CardTitle className="text-xl">Accès Institutionnel</CardTitle>
               <CardDescription>Sélectionnez votre ministère pour accéder au portail.</CardDescription>
             </CardHeader>
             <CardContent>
                <ScrollArea className="h-[350px] w-full pr-4">
                    <div className="space-y-2">
                        {ministries.map((ministry) => (
                            <Button
                                key={ministry}
                                variant="outline"
                                className="w-full justify-start text-left h-auto py-2.5"
                                onClick={() => handleMinistryLogin(ministry)}
                            >
                                <Landmark className="mr-3 h-5 w-5 text-muted-foreground flex-shrink-0" />
                                <span className="flex-1">Ministère de {ministry}</span>
                            </Button>
                        ))}
                    </div>
                </ScrollArea>
             </CardContent>
             <CardFooter>
                 <p className="text-xs text-muted-foreground text-center w-full">Accès réservé aux personnels autorisés.</p>
             </CardFooter>
           </Card>
         </TabsContent>
      </Tabs>
      <div className="mt-4 text-center">
        <a href="http://127.0.0.1:8000/" className="text-sm text-primary hover:underline flex items-center justify-center gap-1.5" target="_blank" rel="noopener noreferrer">
          <ArrowLeft className="h-4 w-4" /> Retour au site principal
        </a>
      </div>
    </div>
  );
}

    