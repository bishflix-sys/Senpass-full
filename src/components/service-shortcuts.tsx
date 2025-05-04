import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  HeartPulse,
  Briefcase,
  Home,
  Landmark,
  FileText,
  FileSpreadsheet, // Impôts
  Scale,          // Justice
  Truck,          // Transport
  Zap,            // Énergie
  Droplet,        // Eau
  Signal,         // Télécom
  Shield,         // Police
  ShieldAlert,    // Gendarmerie
  Anchor,         // Douanes (Ship not available)
  Users,          // ONGs
} from "lucide-react";
import Link from "next/link";

const services = [
  // Existing Government/Social Services
  { title: "État Civil", icon: FileText, description: "Actes officiels...", href: "/services/etat-civil" },
  { title: "Scolarité", icon: GraduationCap, description: "Inscriptions...", href: "/services/scolarite" },
  { title: "Santé", icon: HeartPulse, description: "Carnet, RDV...", href: "/services/sante" },
  { title: "Sécu Sociale", icon: Briefcase, description: "Prestations...", href: "/services/secu" },
  { title: "Logement", icon: Home, description: "Demandes, aides...", href: "/services/logement" },
  { title: "Impôts/Domaines", icon: FileSpreadsheet, description: "Déclarations...", href: "/services/impots" },
  { title: "Justice", icon: Scale, description: "Procédures...", href: "/services/justice" },
  { title: "Transport", icon: Truck, description: "Permis, titres...", href: "/services/transport" },

  // Private/Utilities
  { title: "Énergie (Senelec)", icon: Zap, description: "Factures, suivi...", href: "/services/energie" },
  { title: "Eau (Sen'Eau)", icon: Droplet, description: "Factures, suivi...", href: "/services/eau" },
  { title: "Télécom (Orange...)", icon: Signal, description: "Abonnements...", href: "/services/telecom" },

  // Uniformed Services
  { title: "Police Nationale", icon: Shield, description: "Déclarations...", href: "/services/police" },
  { title: "Gendarmerie", icon: ShieldAlert, description: "Signalements...", href: "/services/gendarmerie" },
  { title: "Douanes", icon: Anchor, description: "Formalités...", href: "/services/douanes" },

  // Other Sectors
  { title: "Banques", icon: Landmark, description: "Comptes, virements...", href: "/services/banque" }, // Keep generic bank
  { title: "ONGs", icon: Users, description: "Enregistrement...", href: "/services/ongs" },
];

export default function ServiceShortcuts() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Accès aux Services (Simulation)</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 xl:grid-cols-8 gap-4">
        {services.map((service) => (
          <Card key={service.title} className="hover:shadow-lg transition-shadow duration-200 text-center flex flex-col justify-between">
            <CardHeader className="items-center p-4 pb-2 flex-grow">
              <service.icon className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-sm font-medium leading-tight">{service.title}</CardTitle>
              {/* <CardDescription className="text-xs hidden sm:block mt-1">{service.description}</CardDescription> */}
            </CardHeader>
             <div className="p-4 pt-2">
              <Button variant="outline" size="sm" asChild className="w-full">
                 <Link href={service.href}>Accéder</Link>
               </Button>
             </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
