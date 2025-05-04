import { getUserProfile, type UserProfile } from "@/services/identity";
import ProfileCard from "@/components/profile-card";
import ServiceShortcuts from "@/components/service-shortcuts";
import FeatureCard from "@/components/feature-card";
import LoginSimulation from "@/components/login-simulation";
import NotificationSimulation from "@/components/notification-simulation";
import {
  Fingerprint,
  ScanFace,
  KeyRound,
  FileSignature,
  UserCheck,
  Bell,
  UserSquare,
} from "lucide-react";

export default async function Home() {
  // Fetch user profile data on the server
  const userProfile: UserProfile = await getUserProfile("user123"); // Using a placeholder ID

  return (
    <div className="space-y-8">
      <h1 className="text-3xl font-bold text-primary">
        Bienvenue sur SenPass Lite
      </h1>
      <p className="text-muted-foreground">
        Votre identité numérique nationale simulée.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Profile Section */}
        <div className="md:col-span-1">
          <ProfileCard user={userProfile} />
        </div>

        {/* Login & Notifications */}
        <div className="md:col-span-2 space-y-6">
           <LoginSimulation />
           <NotificationSimulation />
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
