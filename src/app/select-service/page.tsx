
"use client";

import * as React from "react";
import Link from "next/link";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";
import { ArrowLeft, Building, Zap, Droplet, Landmark, BookOpen, GraduationCap, HeartPulse, Palette, ShoppingCart } from "lucide-react"; // Palette for 'Autres Services'

interface Service {
  id: string;
  name: string;
  description?: string;
}

interface Ministry {
  id: string;
  name: string;
  icon: React.ElementType;
  services: Service[];
}

const ministriesData: Ministry[] = [
  {
    id: "energie",
    name: "Ministère de l'Énergie (SENELEC)",
    icon: Zap,
    services: [
      { id: "elec_res", name: "Facture d'électricité résidentielle", description: "Payer votre facture SENELEC pour votre domicile." },
      { id: "elec_pro", name: "Facture d'électricité professionnelle", description: "Régler la facture SENELEC de votre entreprise." },
      { id: "woyofal", name: "Achat de crédit prépayé Woyofal", description: "Recharger votre compteur Woyofal." },
    ],
  },
  {
    id: "hydraulique",
    name: "Ministère de l'Hydraulique (SEN'EAU / OFOR)",
    icon: Droplet,
    services: [
      { id: "eau_res", name: "Facture d'eau résidentielle", description: "Payer votre facture SEN'EAU pour votre domicile." },
      { id: "eau_pro", name: "Facture d'eau professionnelle", description: "Régler la facture SEN'EAU de votre entreprise." },
      { id: "assainissement", name: "Paiement service assainissement", description: "Contribution pour les services d'assainissement." },
    ],
  },
  {
    id: "finances",
    name: "Ministère des Finances (Impôts et Domaines - DGID)",
    icon: Landmark,
    services: [
      { id: "ir", name: "Paiement Impôt sur le Revenu", description: "Régler votre impôt sur le revenu." },
      { id: "tva", name: "Paiement Taxe sur la Valeur Ajoutée (TVA)", description: "Déclarer et payer la TVA." },
      { id: "patente", name: "Paiement Patente", description: "Payer votre patente annuelle." },
      { id: "timbre", name: "Achat Timbre fiscal", description: "Acheter des timbres fiscaux numériques." },
    ],
  },
  {
    id: "collectivites",
    name: "Ministère des Collectivités Territoriales (Mairies)",
    icon: Building,
    services: [
      { id: "taxe_mun", name: "Taxe municipale (enlèvement des ordures)", description: "Payer la taxe d'enlèvement des ordures ménagères." },
      { id: "droit_marche", name: "Droit de place (marché)", description: "Payer les droits de place pour les marchés." },
    ],
  },
  {
    id: "education",
    name: "Ministère de l'Éducation Nationale",
    icon: GraduationCap,
    services: [
      { id: "frais_sco", name: "Frais d'inscription scolaire/universitaire", description: "Payer les frais d'inscription." },
      { id: "cantine", name: "Paiement cantine scolaire", description: "Contribution pour la cantine scolaire." },
    ],
  },
  {
    id: "sante",
    name: "Ministère de la Santé et de l'Action Sociale",
    icon: HeartPulse,
    services: [
      { id: "frais_hop", name: "Paiement frais hospitaliers", description: "Régler des frais médicaux ou hospitaliers." },
      { id: "mutuelle", name: "Contribution mutuelle de santé", description: "Cotisation pour votre mutuelle de santé." },
    ],
  },
  {
    id: "autres",
    name: "Autres Services Publics",
    icon: Palette,
    services: [
      { id: "contravention", name: "Paiement contravention routière (ANASER)", description: "Régler une amende routière." },
      { id: "pass_reno", name: "Renouvellement documents (ex: Passeport)", description: "Payer les frais de renouvellement de documents." },
    ],
  },
];

export default function SelectServicePage() {
  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
          <ShoppingCart className="h-8 w-8" /> Sélectionner un Service à Payer
        </h1>
        <Button variant="outline" asChild size="sm">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour au tableau de bord
          </Link>
        </Button>
      </div>
      <p className="text-muted-foreground mb-8">
        Choisissez le ministère et le service pour lequel vous souhaitez effectuer un paiement.
      </p>

      <Accordion type="single" collapsible className="w-full space-y-4">
        {ministriesData.map((ministry) => (
          <AccordionItem value={ministry.id} key={ministry.id} className="border rounded-lg shadow-sm bg-card">
            <AccordionTrigger className="p-4 text-lg font-medium hover:bg-muted/50 rounded-t-lg">
              <div className="flex items-center gap-3">
                <ministry.icon className="h-6 w-6 text-primary" />
                <span>{ministry.name}</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="p-0">
              <div className="divide-y divide-border">
                {ministry.services.map((service) => (
                  <div key={service.id} className="p-4 hover:bg-muted/30">
                    <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-2">
                      <div>
                        <h4 className="font-semibold text-card-foreground">{service.name}</h4>
                        {service.description && (
                          <p className="text-sm text-muted-foreground mt-1">{service.description}</p>
                        )}
                      </div>
                      <Button asChild variant="secondary" size="sm" className="mt-2 sm:mt-0 flex-shrink-0">
                        <Link href={`/payment?service_id=${service.id}&ministry_id=${ministry.id}`}>
                          Payer ce service
                        </Link>
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>

      <div className="mt-10 text-center text-xs text-muted-foreground">
        Après avoir sélectionné un service, vous serez redirigé vers la page de choix de la méthode de paiement.
      </div>
    </div>
  );
}
