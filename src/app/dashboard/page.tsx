
"use client"; // Add 'use client' directive for useState and useEffect

import * as React from "react"; // Import React for hooks
import Link from "next/link"; // Import Link for navigation
import dynamic from "next/dynamic"; // Import dynamic
import { getUserProfile, type UserProfile } from "@/services/identity";
import ProfileCard from "@/components/profile-card";
import ServiceShortcuts from "@/components/service-shortcuts";
import FeatureCard from "@/components/feature-card";
import LogoutButton from "@/components/logout-button";
import IdCardDisplay from "@/components/id-card-display"; // Import the new IdCardDisplay
// import BishopChat from "@/components/bishop-chat"; // Import BishopChat - will be dynamically imported
import {
  Fingerprint,
  ScanFace,
  KeyRound,
  FileSignature,
  UserCheck,
  User,
  Hash,
  Loader2,
  Activity,
  AlertTriangle,
  ShieldAlert, // Added for Security Monitoring
  Wallet,         // Icon for E-Wallet
  ShieldCheck,    // Icon for Data Protection
  FolderArchive,  // Icon for Document Management
  LockKeyhole,    // Icon for Strong Authentication
  Bot, // Icon for Chatbot
  Eye, // Icon for visibility on
  EyeOff, // Icon for visibility off
  CreditCard, // Icon for Pay button
  MessageSquare, // Icon for Chat Trigger
  ArrowDownToLine // Icon for Deposit button
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card"; // Import Card components
import { Separator } from "@/components/ui/separator"; // Import Separator
import { Button } from "@/components/ui/button"; // Import Button for toggle
import { cn } from "@/lib/utils"; // Import cn
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"; // Import Sheet components
import { useToast } from "@/hooks/use-toast"; // Import useToast

// Dynamically import BishopChat
const BishopChat = dynamic(() => import("@/components/bishop-chat"), {
  loading: () => (
    <div className="flex flex-col h-full">
      <Skeleton className="h-16 w-full border-b" />
      <div className="flex-grow p-4 space-y-4">
        <Skeleton className="h-10 w-3/4" />
        <Skeleton className="h-10 w-1/2 self-end" />
        <Skeleton className="h-10 w-3/4" />
      </div>
      <Skeleton className="h-16 w-full border-t" />
    </div>
  ),
  ssr: false // Chat is client-side interactive
});


// Helper function to generate a simple alphanumeric ID
const generateAlphanumericId = (length = 12) => {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let result = '';
  for (let i = 0; i < length; i++) {
    result += characters.charAt(Math.floor(Math.random() * characters.length));
  }
  return result;
};

// Helper function to generate QR code data
const generateQrData = (nationalId?: string) => `senpass-profile:${nationalId || 'unknown'}:${Date.now()}`;


export default function DashboardPage() { // Renamed from Home to DashboardPage
  // State for user profile, QR data, unique ID, balance, and visibility
  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null);
  const [qrData, setQrData] = React.useState<string | null>(null);
  const [uniqueId, setUniqueId] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [walletBalance, setWalletBalance] = React.useState<number | null>(null); // balance
  const [isBalanceVisible, setIsBalanceVisible] = React.useState(false); // Balance visibility state
  const { toast } = useToast(); // Get toast function

  // Fetch user profile data and simulate balance on component mount
  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const profile = await getUserProfile("user123"); // Using a placeholder ID
        setUserProfile(profile);
        setQrData(generateQrData(profile.nationalId)); // Initial QR data generation
        setUniqueId(generateAlphanumericId()); // Generate unique ID once
        // fetch wallet balance
        setWalletBalance(Math.floor(Math.random() * 50000) + 5000); // Random balance between 5000 and 55000 FCFA
      } catch (error) {
        console.error("Failed to fetch user profile:", error);
        // Handle error appropriately, e.g., show a toast message
      } finally {
         setIsLoading(false);
      }
    };
    fetchProfile();
  }, []);

   // Effect to refresh QR code every 10 seconds
   React.useEffect(() => {
     const intervalId = setInterval(() => {
       if (userProfile) {
         const newData = generateQrData(userProfile.nationalId);
         console.log("Refreshing dashboard page QR Code:", newData); // Updated log message
         setQrData(newData);
       }
     }, 10000); // Refresh every 10 seconds

     // Cleanup function to clear the interval
     return () => clearInterval(intervalId);
   }, [userProfile]); // Re-run if userProfile changes (though unlikely here)

  // Loading state UI
  if (isLoading) {
    return (
      <div className="space-y-8 animate-pulse">
         <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
           <div className="flex-1 space-y-2">
             <Skeleton className="h-8 w-3/4" />
             <Skeleton className="h-4 w-1/2" />
           </div>
           <Skeleton className="h-9 w-32 rounded-md" />
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <Skeleton className="md:col-span-1 h-64 rounded-lg" />
           <div className="md:col-span-2 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                 {/* Skeleton for ID Card */}
                 <Skeleton className="h-60 rounded-lg" /> {/* Adjusted height for ID Card */}
                 <div className="space-y-4">
                     {/* Skeleton for Unique ID Card */}
                     <Skeleton className="h-24 rounded-lg" /> {/* Adjusted height */}
                     {/* Skeleton for Wallet Card */}
                     <Skeleton className="h-36 rounded-lg" />
                 </div>
              </div>
              {/* Skeleton for Activity and Alerts row */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                 <Skeleton className="h-32 rounded-lg" /> {/* Activity Card Skeleton */}
                 <Skeleton className="h-32 rounded-lg" /> {/* Alerts Card Skeleton */}
                 <Skeleton className="h-32 rounded-lg" /> {/* Security Monitoring Card Skeleton */}
              </div>
           </div>
         </div>
          <Separator className="my-6" />
          <Skeleton className="h-10 w-40 mb-4" /> {/* Service Shortcuts Title Skeleton */}
          {/* Simplified skeleton for Service Shortcuts grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-36 rounded-lg" />
            ))}
          </div>
          <Separator className="my-6" />
          <Skeleton className="h-10 w-40 mb-4" /> {/* Features Title Skeleton */}
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {Array.from({ length: 7 }).map((_, i) => ( // Adjusted to 7 for the new feature card count
             <Skeleton key={i} className="h-28 rounded-lg" />
           ))}
         </div>
          {/* Chat skeleton removed from main flow */}
      </div>
    );
  }

   // Ensure userProfile is loaded before rendering dependent components
  if (!userProfile) {
      return <div className="text-center text-muted-foreground py-10">Erreur lors du chargement du profil.</div>;
  }

  return (
    // Added relative positioning context if needed, though fixed positioning usually doesn't require it.
    <div className="relative pb-20"> {/* Added padding-bottom to prevent overlap with fixed chat button */}
      <div className="space-y-8">
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
           <div className="flex-1">
              <h1 className="text-3xl font-bold text-primary">
                Bienvenue, {userProfile.name} !
              </h1>
              <p className="text-muted-foreground mt-1">
                Votre tableau de bord centralisé pour votre identité numérique unique.
              </p>
           </div>
           <LogoutButton />
        </div>


        {/* Main Content Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Profile Section (Left Column) */}
          <div className="md:col-span-1">
            <ProfileCard user={userProfile} />
          </div>

          {/* ID Card, Wallet, Unique ID, Activity/Alerts Section (Right Column) */}
          <div className="md:col-span-2 space-y-6">
               {/* Container for ID Card, Unique ID and Wallet */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                  {/* ID Card Display */}
                  <IdCardDisplay
                    user={userProfile}
                    qrData={qrData}
                    className="shadow-md border h-full" // Added h-full
                  />

                  {/* Container for Unique ID and Wallet */}
                  <div className="space-y-6">
                      {/* Unique Alphanumeric ID Card */}
                      <Card className="shadow-md border">
                      <CardHeader className="pb-3"> {/* Reduced bottom padding */}
                          <CardTitle className="text-lg font-semibold flex items-center gap-2">
                              <Hash className="h-5 w-5 text-primary" /> ID Unique
                          </CardTitle>
                           <CardDescription className="text-xs">Votre identifiant numérique personnel.</CardDescription>
                      </CardHeader>
                      <CardContent>
                          <Badge variant="secondary" className="text-lg font-mono tracking-wider p-2 break-all">
                              {uniqueId || <Loader2 className="h-5 w-5 animate-spin"/>}
                          </Badge>
                      </CardContent>
                      </Card>

                      {/* Wallet Balance Card */}
                      <Card className="shadow-md border">
                          <CardHeader className="pb-3">
                              <CardTitle className="text-lg font-semibold flex items-center gap-2">
                                  <Wallet className="h-5 w-5 text-primary" /> Solde Portefeuille
                              </CardTitle>
                              <CardDescription className="text-xs">Votre balance e-wallet.</CardDescription>
                          </CardHeader>
                          <CardContent className="flex items-center justify-between flex-wrap gap-4"> {/* Added flex-wrap */}
                             <span className="text-2xl font-bold tracking-tight">
                              {walletBalance === null ? (
                                  <Loader2 className="h-6 w-6 animate-spin inline-block mr-2" />
                              ) : isBalanceVisible ? (
                                  `${walletBalance.toLocaleString('fr-FR')} FCFA`
                              ) : (
                                  '**** FCFA'
                              )}
                             </span>
                             <div className="flex items-center gap-2 flex-wrap"> {/* Group toggle and action buttons, added flex-wrap */}
                                 <Button
                                   variant="ghost"
                                   size="icon"
                                   onClick={() => setIsBalanceVisible(!isBalanceVisible)}
                                   aria-label={isBalanceVisible ? "Masquer le solde" : "Afficher le solde"}
                                   className="text-muted-foreground hover:text-primary"
                                 >
                                   {isBalanceVisible ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
                                 </Button>
                                 <Button asChild variant="outline" size="sm">
                                     <Link href="/deposit">
                                         <ArrowDownToLine className="mr-2 h-4 w-4" /> Déposer
                                     </Link>
                                 </Button>
                                 <Button asChild variant="outline" size="sm">
                                     <Link href="/select-service">
                                         <CreditCard className="mr-2 h-4 w-4" /> Payer
                                     </Link>
                                 </Button>
                             </div>
                          </CardContent>
                      </Card>
                  </div>
              </div>

              {/* Grid for Recent Activity, Important Alerts, and Security Monitoring */}
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                 {/* Recent Activity Card */}
                  <Card className="shadow-sm border">
                    <CardHeader>
                       <CardTitle className="text-lg font-semibold flex items-center gap-2">
                          <Activity className="h-5 w-5 text-primary" /> Activité récente
                       </CardTitle>
                    </CardHeader>
                    <CardContent>
                       <p className="text-sm text-muted-foreground">Aucune activité récente à afficher.</p>
                       {/* Future: List recent logins, verifications etc. */}
                    </CardContent>
                  </Card>

                  {/* Important Alerts Card */}
                  <Card className="shadow-sm border">
                     <CardHeader>
                       <CardTitle className="text-lg font-semibold flex items-center gap-2">
                          <AlertTriangle className="h-5 w-5 text-destructive" /> Alertes importantes
                       </CardTitle>
                    </CardHeader>
                     <CardContent className="space-y-1">
                       <p className="text-sm text-muted-foreground">Aucune alerte urgente pour le moment.</p>
                       <p className="text-xs text-muted-foreground mt-2">SenPass vous notifiera des échéances importantes et des services pertinents à venir.</p>
                     </CardContent>
                  </Card>

                  {/* Security Monitoring Card */}
                  <Card className="shadow-sm border">
                     <CardHeader>
                       <CardTitle className="text-lg font-semibold flex items-center gap-2">
                          <ShieldAlert className="h-5 w-5 text-primary" /> Surveillance Sécurité Active
                       </CardTitle>
                    </CardHeader>
                     <CardContent className="space-y-2">
                       <p className="text-sm text-muted-foreground">Nos systèmes, incluant une supervision par IA, analysent en continu les activités et l'état de la plateforme pour protéger votre compte et assurer la stabilité des services.</p>
                       <p className="text-sm font-medium text-green-600">Statut : Protégé et Opérationnel</p>
                       <Button variant="link" size="sm" className="p-0 h-auto text-xs text-primary" onClick={() => toast({title: "Information", description:"Les journaux de sécurité et de performance ne sont pas disponibles pour cette démonstration."})} disabled>
                         Voir les journaux
                       </Button>
                     </CardContent>
                  </Card>
              </div>
          </div>
        </div>

        {/* Separator */}
        <Separator className="my-8" />

        {/* Service Shortcuts Section */}
        <ServiceShortcuts />

         {/* Separator */}
        <Separator className="my-8" />

        {/* Features Section */}
        <section>
          <h2 className="text-2xl font-semibold mb-4">Fonctionnalités Principales</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
             {/* Reordered and added new features */}
             <FeatureCard
                icon={LockKeyhole} // New icon for strong auth
                title="Authentification Sécurisée"
                description="Accès aux services via biométrie, PIN, OTP."
                accentIcon
             />
             <FeatureCard
                icon={UserCheck}
                title="Vérification Simplifiée"
                description="Validation d'identité sécurisée et rapide, sans documents physiques."
             />
             <FeatureCard
                icon={FileSignature}
                title="Signature Électronique"
                description="Signature de documents administratifs avec valeur légale."
             />
             <FeatureCard
                icon={Wallet} // New icon for e-wallet
                title="Portefeuille Numérique"
                description="Paiement intégré de taxes et factures via e-wallet."
             />
             <FeatureCard
                icon={FolderArchive} // New icon for document management
                title="Documents Dématérialisés"
                description="Accès et stockage sécurisé de vos documents dans le cloud."
             />
             <FeatureCard
                icon={ShieldCheck} // New icon for data protection
                title="Protection des Données"
                description="Contrôle sur vos informations personnelles, respect de la confidentialité."
             />
             <FeatureCard
                icon={User}
                title="MonProfil Connect"
                description="Remplissage intelligent et automatisé des formulaires avec vos données. Apprend de vos habitudes pour simplifier vos démarches."
             />
          </div>
        </section>

         {/* BISHOP Chatbot Section - Now within a Sheet */}
         {/* The trigger button is fixed */}

      </div>

      {/* Fixed Position Chatbot Trigger Button */}
      <Sheet>
         <SheetTrigger asChild>
            <Button
              variant="secondary" // Use secondary or adjust styling
              size="lg" // Larger button
              className="fixed right-6 bottom-6 z-50 rounded-full shadow-lg flex items-center gap-2 px-5 py-3 h-auto"
              aria-label="Ouvrir l'assistant BISHOP"
            >
               <Bot className="h-6 w-6" />
               <span className="text-base font-semibold hidden sm:inline">BISHOP</span>
            </Button>
         </SheetTrigger>
         <SheetContent
            side="right"
            className="w-full max-w-md p-0 border-l border-border" // Set max width, remove padding
            onOpenAutoFocus={(e) => e.preventDefault()} // Prevent focus trap issues
         >
            <React.Suspense fallback={<div className="flex flex-col h-full"><Skeleton className="h-16 w-full border-b" /><div className="flex-grow p-4 space-y-4"><Skeleton className="h-10 w-3/4" /><Skeleton className="h-10 w-1/2 self-end" /><Skeleton className="h-10 w-3/4" /></div><Skeleton className="h-16 w-full border-t" /></div>}>
              <BishopChat />
            </React.Suspense>
         </SheetContent>
      </Sheet>
    </div>
  );
}


    