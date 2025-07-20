
"use client";

import * as React from "react";
import { QRCodeCanvas } from 'qrcode.react';
import { useRouter, useSearchParams } from "next/navigation";
import Link from "next/link";
import dynamic from "next/dynamic";
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
import { QrCode, ScanFace, LogIn, Building, Code, Loader2, User, Lock, UserPlus, Building2, CodeXml, ArrowLeft, Landmark } from "lucide-react";
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

  // Determine active tab from URL query parameter
  const requestedTab = searchParams.get('tab');
  const activeTab = VALID_LOGIN_TABS.includes(requestedTab ?? '') ? requestedTab : 'individuals';

   const handleAuthenticationSuccess = React.useCallback((targetPath: string = '/dashboard') => {
      setShowFacialRecognitionDialog(false);
      setIsQrDialogOpen(false);
      setIsRegistrationDialogOpen(false);
      setIsBusinessRegistrationDialogOpen(false);
      setIsDeveloperRegistrationDialogOpen(false);
      setQrCodeData(null);
      setTimeout(() => { router.push(targetPath); }, 300);
   }, [router]);

   const handleRegistrationSuccess = React.useCallback(() => {
      setIsRegistrationDialogOpen(false);
      setIsBusinessRegistrationDialogOpen(false);
      setIsDeveloperRegistrationDialogOpen(false);
      toast({ title: "Inscription Réussie!", description: "Vous pouvez maintenant vous connecter (simulation).", variant: "default" });
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


  const createSimulatedLoginHandler = (path: string) => () => {
    toast({
        title: "Connexion en cours...",
        description: `Redirection vers le portail ${path.split('-')[0]}.`
    });
    setTimeout(() => {
        router.push(path);
    }, 800);
  };

  return (
    <div className="flex flex-col justify-center items-center py-12 min-h-screen bg-background">
      <div className="flex items-center gap-2 mb-8 text-xl font-semibold text-foreground">
        <Lock className="h-6 w-6 text-primary" /><span>Accès Sécurisé SenPass</span>
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
              {/* Main Login Action */}
              <Button onClick={createSimulatedLoginHandler('/dashboard')} className="w-full h-11 text-base">
                 <LogIn className="mr-2 h-5 w-5" /> Accéder à mon espace
              </Button>

              <div className="relative my-6"><div className="absolute inset-0 flex items-center"><span className="w-full border-t" /></div><div className="relative flex justify-center text-xs uppercase"><span className="bg-card px-3 text-muted-foreground">Ou utiliser</span></div></div>
              
              <div className="grid grid-cols-2 gap-4">
                <Dialog open={isQrDialogOpen} onOpenChange={setIsQrDialogOpen}><DialogTrigger asChild><Button variant="outline" className="h-12 text-base"><QrCode className="mr-2 h-5 w-5 text-accent" /> QR Code</Button></DialogTrigger>
                  <DialogContent className="sm:max-w-xs"><DialogHeader><DialogTitle className="text-lg">Scanner le QR Code</DialogTitle><DialogDescription>Scannez avec l'application. Se rafraîchit toutes les 10s.</DialogDescription></DialogHeader><div className="flex items-center justify-center p-6">{qrCodeData ? <div className="p-2 bg-white rounded-md shadow-md"><QRCodeCanvas value={qrCodeData} size={200} bgColor={"#FFFFFF"} fgColor={"#00853F"} level={"H"} includeMargin={true} /></div> : <div className="flex flex-col items-center justify-center text-muted-foreground h-[200px] space-y-2"><Loader2 className="h-8 w-8 animate-spin" /><p>Génération...</p></div>}</div><DialogFooter className="sm:justify-center"><DialogClose asChild><Button type="button" variant="outline">Fermer</Button></DialogClose></DialogFooter></DialogContent>
                </Dialog>
                <Dialog open={showFacialRecognitionDialog} onOpenChange={setShowFacialRecognitionDialog}><DialogTrigger asChild><Button variant="outline" className="h-12 text-base"><ScanFace className="mr-2 h-5 w-5 text-accent" /> Visage</Button></DialogTrigger>{showFacialRecognitionDialog && <FacialRecognitionDialogContent onAuthenticated={() => handleAuthenticationSuccess()} />}</Dialog>
              </div>

              <div className="text-center pt-4"><Dialog open={isRegistrationDialogOpen} onOpenChange={setIsRegistrationDialogOpen}><DialogTrigger asChild><Button variant="link" className="text-primary h-auto p-0 text-sm flex items-center gap-1.5"><UserPlus className="h-4 w-4" /> S'inscrire</Button></DialogTrigger>{isRegistrationDialogOpen && <RegistrationDialogContent onSuccess={handleRegistrationSuccess} />}</Dialog></div>
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
                 <Button onClick={createSimulatedLoginHandler('/business-dashboard')} className="w-full h-11 text-base">
                    <LogIn className="mr-2 h-5 w-5" /> Accéder au portail Entreprise
                 </Button>
                 <div className="text-center pt-4"><Dialog open={isBusinessRegistrationDialogOpen} onOpenChange={setIsBusinessRegistrationDialogOpen}><DialogTrigger asChild><Button variant="link" className="text-primary h-auto p-0 text-sm flex items-center gap-1.5"><Building2 className="h-4 w-4" /> S'inscrire en tant qu'entreprise/institution</Button></DialogTrigger>{isBusinessRegistrationDialogOpen && <BusinessRegistrationDialogContent onSuccess={handleRegistrationSuccess} />}</Dialog></div>
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
                <Button onClick={createSimulatedLoginHandler('/developer-dashboard')} className="w-full h-11 text-base">
                    <LogIn className="mr-2 h-5 w-5" /> Accéder au portail Développeur
                 </Button>
                 <div className="text-center pt-4"><Dialog open={isDeveloperRegistrationDialogOpen} onOpenChange={setIsDeveloperRegistrationDialogOpen}><DialogTrigger asChild><Button variant="link" className="text-primary h-auto p-0 text-sm flex items-center gap-1.5"><CodeXml className="h-4 w-4" /> S'inscrire en tant que développeur</Button></DialogTrigger>{isDeveloperRegistrationDialogOpen && <DeveloperRegistrationDialogContent onSuccess={handleRegistrationSuccess} />}</Dialog></div>
            </CardContent>
            <CardFooter><p className="text-xs text-muted-foreground text-center w-full"><Link href="#" className="text-primary underline hover:no-underline">Consultez la documentation API</Link>.</p></CardFooter>
          </Card>
        </TabsContent>

        {/* Ministries Tab */}
        <TabsContent value="ministries">
          <Card className="shadow-lg border">
            <CardHeader>
              <CardTitle className="text-xl">Accès Ministères</CardTitle>
              <CardDescription>Portail sécurisé pour les institutions ministérielles.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6 pt-2">
                 <Button onClick={createSimulatedLoginHandler('/ministry-dashboard')} className="w-full h-11 text-base">
                    <LogIn className="mr-2 h-5 w-5" /> Accéder au portail Ministère
                 </Button>
            </CardContent>
            <CardFooter><p className="text-xs text-muted-foreground text-center w-full">Accès réservé aux personnels autorisés des ministères.</p></CardFooter>
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
