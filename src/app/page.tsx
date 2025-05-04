
import { getUserProfile, type UserProfile } from "@/services/identity";
import ProfileCard from "@/components/profile-card";
import ServiceShortcuts from "@/components/service-shortcuts";
import FeatureCard from "@/components/feature-card";
import LogoutButton from "@/components/logout-button"; // Import the LogoutButton
import QRCodeDisplay from "@/components/qr-code-display"; // Import the QRCodeDisplay component
import {
  Fingerprint,
  ScanFace,
  KeyRound,
  FileSignature,
  UserCheck,
  UserSquare,
} from "lucide-react";

export default async function Home() {
  // Fetch user profile data on the server
  const userProfile: UserProfile = await getUserProfile("user123"); // Using a placeholder ID

  // Data for the QR code (e.g., user's national ID or a link to their profile)
  // Using nationalId as an example
  const qrData = `senpass-profile:${userProfile.nationalId || 'unknown'}`;

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
         <LogoutButton /> {/* Add the logout button here */}
      </div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className="md:col-span-1">
          <ProfileCard user={userProfile} />
        </div>

        {/* QR Code and Activity/Alerts Section */}
        <div className="md:col-span-2 space-y-6">
            {/* Integrate QR Code Display */}
            <QRCodeDisplay
              data={qrData}
              title="Votre Identifiant QR SenPass"
              description="Utilisez ce code pour partager votre identifiant (Simulation)."
              size={160} // Adjust size as needed
              className="shadow-md"
            />

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
            icon={UserSquare}
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
