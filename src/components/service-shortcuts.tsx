import { Card, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { GraduationCap, HeartPulse, Briefcase, Home, Landmark, FileText } from "lucide-react";
import Link from "next/link";

const services = [
  { title: "État Civil", icon: FileText, description: "Actes de naissance, mariage...", href: "#etat-civil" },
  { title: "Scolarité", icon: GraduationCap, description: "Inscriptions, résultats...", href: "#scolarite" },
  { title: "Santé", icon: HeartPulse, description: "Carnet de santé, RDV...", href: "#sante" },
  { title: "Sécurité Sociale", icon: Briefcase, description: "Prestations, cotisations...", href: "#secu" },
  { title: "Logement", icon: Home, description: "Demandes, aides...", href: "#logement" },
  { title: "Services Bancaires", icon: Landmark, description: "Comptes, virements...", href: "#banque" },
];

export default function ServiceShortcuts() {
  return (
    <section>
      <h2 className="text-2xl font-semibold mb-4">Accès aux Services (Simulation)</h2>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
        {services.map((service) => (
          <Card key={service.title} className="hover:shadow-lg transition-shadow duration-200 text-center flex flex-col justify-between">
            <CardHeader className="items-center p-4">
              <service.icon className="h-8 w-8 text-primary mb-2" />
              <CardTitle className="text-base font-medium">{service.title}</CardTitle>
              <CardDescription className="text-xs hidden sm:block">{service.description}</CardDescription>
            </CardHeader>
             <div className="p-4 pt-0">
              <Button variant="outline" size="sm" asChild>
                 <Link href={service.href}>Accéder</Link>
               </Button>
             </div>
          </Card>
        ))}
      </div>
    </section>
  );
}
