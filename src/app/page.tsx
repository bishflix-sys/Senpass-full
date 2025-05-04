
"use client"; // Add 'use client' directive for useState and useEffect

import * as React from "react"; // Import React for hooks
import { getUserProfile, type UserProfile } from "@/services/identity";
import ProfileCard from "@/components/profile-card";
import ServiceShortcuts from "@/components/service-shortcuts";
import FeatureCard from "@/components/feature-card";
import LogoutButton from "@/components/logout-button";
import QRCodeDisplay from "@/components/qr-code-display";
import {
  Fingerprint,
  ScanFace,
  KeyRound,
  FileSignature,
  UserCheck,
  User, // Use User icon
  Hash,
  Loader2, // Import Loader2 for loading state
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton"; // Import Skeleton

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


export default function Home() {
  // State for user profile, QR data, and unique ID
  const [userProfile, setUserProfile] = React.useState<UserProfile | null>(null);
  const [qrData, setQrData] = React.useState<string | null>(null);
  const [uniqueId, setUniqueId] = React.useState<string | null>(null);
  const [isLoading, setIsLoading] = React.useState(true);

  // Fetch user profile data on component mount
  React.useEffect(() => {
    const fetchProfile = async () => {
      try {
        setIsLoading(true);
        const profile = await getUserProfile("user123"); // Using a placeholder ID
        setUserProfile(profile);
        setQrData(generateQrData(profile.nationalId)); // Initial QR data generation
        setUniqueId(generateAlphanumericId()); // Generate unique ID once
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
         console.log("Refreshing home page QR Code:", newData);
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
           <Skeleton className="h-9 w-32" />
         </div>
         <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
           <Skeleton className="md:col-span-1 h-64 rounded-lg" />
           <div className="md:col-span-2 space-y-6">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                 <Skeleton className="h-48 rounded-lg" />
                 <div className="space-y-2">
                     <Skeleton className="h-6 w-24" />
                     <Skeleton className="h-4 w-3/4" />
                     <Skeleton className="h-8 w-40" />
                 </div>
              </div>
             <Skeleton className="h-24 rounded-lg" />
             <Skeleton className="h-24 rounded-lg" />
           </div>
         </div>
          <Skeleton className="h-10 w-40" />
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
            {Array.from({ length: 16 }).map((_, i) => (
              <Skeleton key={i} className="h-32 rounded-lg" />
            ))}
          </div>
          <Skeleton className="h-10 w-40" />
         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
           {Array.from({ length: 6 }).map((_, i) => (
             <Skeleton key={i} className="h-28 rounded-lg" />
           ))}
         </div>
      </div>
    );
  }

   // Ensure userProfile is loaded before rendering dependent components
  if (!userProfile) {
      return <div className="text-center text-muted-foreground py-10">Erreur lors du chargement du profil.</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
         <div className="flex-1">
            <h1 className="text-3xl font-bold text-primary">
              Bienvenue sur SenPass Lite, {userProfile.name} !
            </h1>
            <p className="text-muted-foreground mt-1">
              Votre tableau de bord d'identité numérique nationale simulée.
            </p>
         </div>
         <LogoutButton />
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className="md:col-span-1">
          <ProfileCard user={userProfile} />
        </div>

        {/* QR Code, Unique ID, and Activity/Alerts Section */}
        <div className="md:col-span-2 space-y-6">
             {/* Container for QR Code and Unique ID */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 items-start">
                {/* Integrate QR Code Display */}
                <QRCodeDisplay
                  data={qrData || ''} // Pass current QR data, fallback to empty string
                  title="Votre Identifiant QR SenPass"
                  description="Ce code se met à jour toutes les 10s (Simulation)."
                  size={160}
                  className="shadow-md"
                  isLoading={!qrData} // Indicate loading if qrData is null
                />

                {/* Display Unique Alphanumeric ID */}
                <div className="space-y-2">
                    <h3 className="text-lg font-semibold flex items-center gap-2">
                        <Hash className="h-5 w-5 text-primary" /> Votre ID Unique
                    </h3>
                    <p className="text-sm text-muted-foreground">Identifiant unique associé à votre profil SenPass.</p>
                    <Badge variant="secondary" className="text-lg font-mono tracking-wider p-2">
                        {uniqueId || <Loader2 className="h-5 w-5 animate-spin"/>}
                    </Badge>
                </div>
            </div>


           {/* Placeholder for potential future content like recent activity or important alerts */}
            <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Activité récente</h3>
              <p className="text-sm text-muted-foreground">Aucune activité récente à afficher (Simulation).</p>
            </div>
            <div className="p-6 border rounded-lg bg-card text-card-foreground shadow-sm">
              <h3 className="text-lg font-semibold mb-2">Alertes importantes</h3>
              <p className="text-sm text-muted-foreground">Aucune alerte importante (Simulation).</p>
            </div>
        </div>
      </div>


      {/* Service Shortcuts */}
      <ServiceShortcuts />

      {/* Features Section */}
      <section>
        <h2 className="text-2xl font-semibold mb-4">Fonctionnalités</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          <FeatureCard
            icon={User} // Use User icon
            title="MonProfil"
            description="Remplissage automatique simulé des formulaires avec vos données officielles."
          />
          <FeatureCard
            icon={UserCheck}
            title="Vérification d'identité"
            description="Simulation de vérification sécurisée de l'identité sans documents physiques."
          />
          <FeatureCard
            icon={FileSignature}
            title="Signature numérique"
            description="Simulation de signature électronique légale pour documents."
          />
           <FeatureCard
            icon={Fingerprint}
            title="Authentification Biométrique"
            description="Simulation d'authentification via empreinte digitale."
            accentIcon
          />
           <FeatureCard
            icon={ScanFace}
            title="Reconnaissance Faciale"
            description="Simulation d'authentification via reconnaissance faciale."
            accentIcon
          />
           <FeatureCard
            icon={KeyRound}
            title="Code PIN"
            description="Simulation d'authentification via code PIN sécurisé."
            accentIcon
          />
        </div>
      </section>
    </div>
  );
}
