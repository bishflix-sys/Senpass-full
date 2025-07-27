
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card"; // Import CardContent
import { Button } from "@/components/ui/button";
import {
  GraduationCap,
  HeartPulse,
  Briefcase,
  Home as HomeIcon, // Renamed to avoid conflict with page component
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
  FolderArchive,  // Icon for Documents
} from "lucide-react";
import Link from "next/link";
import { cn } from "@/lib/utils"; // Import cn

const services = [
  // Existing Government/Social Services
  { title: "État Civil", icon: FileText, description: "Actes officiels...", href: "/services/etat-civil" },
  { title: "Scolarité", icon: GraduationCap, description: "Inscriptions...", href: "/services/scolarite" },
  { title: "Santé", icon: HeartPulse, description: "Carnet, RDV...", href: "/services/sante" },
  { title: "Sécu Sociale", icon: Briefcase, description: "Prestations...", href: "/services/secu" },
  { title: "Logement", icon: HomeIcon, description: "Demandes, aides...", href: "/services/logement" },
  { title: "Impôts/Domaines", icon: FileSpreadsheet, description: "Déclarations...", href: "/services/impots" },
  { title: "Justice", icon: Scale, description: "Procédures...", href: "/services/justice" },
  { title: "Transport", icon: Truck, description: "Permis, titres...", href: "/services/transport" },
  { title: "Mes Documents", icon: FolderArchive, description: "Coffre-fort...", href: "/documents" }, // Added Documents shortcut

  // Private/Utilities
  { title: "Énergie", icon: Zap, description: "Senelec...", href: "/services/energie" }, // Shortened title
  { title: "Eau", icon: Droplet, description: "Sen'Eau...", href: "/services/eau" }, // Shortened title
  { title: "Télécom", icon: Signal, description: "Opérateurs...", href: "/services/telecom" }, // Shortened title

  // Uniformed Services
  { title: "Police", icon: Shield, description: "Nationale...", href: "/services/police" }, // Shortened title
  { title: "Gendarmerie", icon: ShieldAlert, description: "Signalements...", href: "/services/gendarmerie" },
  { title: "Douanes", icon: Anchor, description: "Formalités...", href: "/services/douanes" },

  // Other Sectors
  { title: "Banques", icon: Landmark, description: "Comptes...", href: "/services/banque" }, // Shortened description
  { title: "ONGs", icon: Users, description: "Associations...", href: "/services/ongs" }, // Shortened description
];

export default function ServiceShortcuts() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Accès Rapide aux Services</h2>
      {/* Adjusted grid columns for better responsiveness with potentially more items */}
      <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-6 xl:grid-cols-9 gap-4"> {/* Increased xl cols */}
        {services.map((service) => (
          <Card
            key={service.title}
            className={cn(
              "hover:shadow-lg transition-all duration-200 text-center flex flex-col justify-between border", // Added border
              "hover:-translate-y-1 hover:border-primary" // Hover effect
            )}
          >
            <CardHeader className="items-center p-4 pb-2 flex-grow">
              <service.icon className="h-7 w-7 text-primary mb-2" /> {/* Slightly smaller icon */}
              <CardTitle className="text-sm font-medium leading-tight">{service.title}</CardTitle>
              {/* Optional: uncomment description if needed, kept short */}
              {/* <CardDescription className="text-xs hidden sm:block mt-1">{service.description}</CardDescription> */}
            </CardHeader>
             <CardContent className="p-4 pt-0"> {/* Use CardContent for button */}
              <Button variant="ghost" size="sm" asChild className="w-full h-8 text-xs text-primary hover:bg-primary/10">
                 {/* Link component handles the navigation */}
                 <Link href={service.href}>Accéder</Link>
               </Button>
             </CardContent>
          </Card>
        ))}
      </div>
    </section>
  );
}

    