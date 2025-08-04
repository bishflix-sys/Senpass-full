
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Label } from "@/components/ui/label";
import { ArrowLeft, Building, Zap, Droplet, Landmark, BookOpen, GraduationCap, HeartPulse, Palette, ShoppingCart, Globe, Car } from "lucide-react";

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

interface CountryServices {
  countryCode: string;
  countryName: string;
  flag: string;
  ministries: Ministry[];
}

const allCountryServices: CountryServices[] = [
  {
    countryCode: "SN",
    countryName: "Sénégal",
    flag: "🇸🇳",
    ministries: [
      {
        id: "energie_sn",
        name: "Ministère de l'Énergie (SENELEC)",
        icon: Zap,
        services: [
          { id: "sn_elec_res", name: "Facture d'électricité résidentielle", description: "Payer votre facture SENELEC pour votre domicile." },
          { id: "sn_elec_pro", name: "Facture d'électricité professionnelle", description: "Régler la facture SENELEC de votre entreprise." },
          { id: "sn_woyofal", name: "Achat de crédit prépayé Woyofal", description: "Recharger votre compteur Woyofal." },
        ],
      },
      {
        id: "hydraulique_sn",
        name: "Ministère de l'Hydraulique (SEN'EAU / OFOR)",
        icon: Droplet,
        services: [
          { id: "sn_eau_res", name: "Facture d'eau résidentielle", description: "Payer votre facture SEN'EAU pour votre domicile." },
          { id: "sn_eau_pro", name: "Facture d'eau professionnelle", description: "Régler la facture SEN'EAU de votre entreprise." },
        ],
      },
      {
        id: "finances_sn",
        name: "Ministère des Finances (Impôts et Domaines - DGID)",
        icon: Landmark,
        services: [
          { id: "sn_ir", name: "Paiement Impôt sur le Revenu", description: "Régler votre impôt sur le revenu." },
          { id: "sn_tva", name: "Paiement Taxe sur la Valeur Ajoutée (TVA)", description: "Déclarer et payer la TVA." },
        ],
      },
    ],
  },
  {
    countryCode: "CI",
    countryName: "Côte d'Ivoire",
    flag: "🇨🇮",
    ministries: [
      {
        id: "energie_ci",
        name: "Ministère de l'Énergie (CIE)",
        icon: Zap,
        services: [
          { id: "ci_elec_res", name: "Facture d'électricité (CIE)", description: "Payer votre facture d'électricité." },
          { id: "ci_cash_power", name: "Achat de crédit Cash Power", description: "Recharger votre compteur prépayé." },
        ],
      },
      {
        id: "finances_ci",
        name: "Ministère des Finances (DGI)",
        icon: Landmark,
        services: [
          { id: "ci_impot_foncier", name: "Paiement Impôt Foncier", description: "Régler votre impôt foncier." },
        ],
      },
    ],
  },
  {
    countryCode: "BJ",
    countryName: "Bénin",
    flag: "🇧🇯",
    ministries: [
      {
        id: "eau_bj",
        name: "Ministère de l'Eau (SONEB)",
        icon: Droplet,
        services: [
          { id: "bj_eau_facture", name: "Facture d'eau (SONEB)", description: "Payer votre facture d'eau." },
        ],
      },
       {
        id: "finances_bj",
        name: "Ministère des Finances (DGI)",
        icon: Landmark,
        services: [
          { id: "bj_taxe_tvm", name: "Paiement Taxe sur les Véhicules à Moteur (TVM)", description: "Régler la TVM pour votre véhicule." },
        ],
      },
    ],
  },
  {
    countryCode: "BF",
    countryName: "Burkina Faso",
    flag: "🇧🇫",
    ministries: [
      {
        id: "energie_bf",
        name: "Ministère de l'Énergie (SONABEL)",
        icon: Zap,
        services: [
          { id: "bf_elec_facture", name: "Facture d'électricité (SONABEL)", description: "Payer votre facture d'électricité." },
        ],
      },
    ],
  },
  {
    countryCode: "GW",
    countryName: "Guinée-Bissau",
    flag: "🇬🇼",
    ministries: [
      {
        id: "telecom_gw",
        name: "Autoridade Reguladora Nacional (ARN)",
        icon: Globe,
        services: [
          { id: "gw_telecom_tax", name: "Taxe sur les télécommunications", description: "Payer la taxe réglementaire." },
        ],
      },
    ],
  },
   {
    countryCode: "ML",
    countryName: "Mali",
    flag: "🇲🇱",
    ministries: [
      {
        id: "energie_ml",
        name: "Énergie du Mali (EDM-SA)",
        icon: Zap,
        services: [
          { id: "ml_elec_facture", name: "Facture d'électricité (EDM)", description: "Payer votre facture d'électricité." },
        ],
      },
    ],
  },
  {
    countryCode: "NE",
    countryName: "Niger",
    flag: "🇳🇪",
    ministries: [
      {
        id: "eau_ne",
        name: "Ministère de l'Hydraulique (SEEN)",
        icon: Droplet,
        services: [
          { id: "ne_eau_facture", name: "Facture d'eau (SEEN)", description: "Payer votre facture d'eau." },
        ],
      },
    ],
  },
  {
    countryCode: "TG",
    countryName: "Togo",
    flag: "🇹🇬",
    ministries: [
      {
        id: "transport_tg",
        name: "Ministère des Transports",
        icon: Car,
        services: [
          { id: "tg_taxe_vehicule", name: "Taxe sur les véhicules", description: "Payer la taxe annuelle sur les véhicules." },
        ],
      },
    ],
  },
];

export default function SelectServicePage() {
  const [selectedCountry, setSelectedCountry] = React.useState<string>("SN");
  const [servicesForCountry, setServicesForCountry] = React.useState<Ministry[]>(
    allCountryServices.find(c => c.countryCode === "SN")?.ministries || []
  );

  const handleCountryChange = (countryCode: string) => {
    setSelectedCountry(countryCode);
    setServicesForCountry(
      allCountryServices.find(c => c.countryCode === countryCode)?.ministries || []
    );
  };

  return (
    <div className="container mx-auto px-4 py-8 max-w-3xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
          <ShoppingCart className="h-8 w-8" /> Sélectionner un Service
        </h1>
        <Button variant="outline" asChild size="sm">
          <Link href="/dashboard">
            <ArrowLeft className="mr-2 h-4 w-4" /> Retour au tableau de bord
          </Link>
        </Button>
      </div>
      <p className="text-muted-foreground mb-8">
        Choisissez d'abord le pays, puis le service pour lequel vous souhaitez effectuer un paiement.
      </p>

      {/* Country Selector */}
      <Card className="mb-8 shadow-sm border">
        <CardContent className="p-6">
            <div className="flex flex-col space-y-2">
                <Label htmlFor="country-select" className="flex items-center gap-2 font-semibold">
                    <Globe className="h-5 w-5 text-primary" />
                    Pays
                </Label>
                <Select value={selectedCountry} onValueChange={handleCountryChange}>
                    <SelectTrigger id="country-select">
                        <SelectValue placeholder="Sélectionnez un pays..." />
                    </SelectTrigger>
                    <SelectContent>
                        {allCountryServices.map((country) => (
                            <SelectItem key={country.countryCode} value={country.countryCode}>
                                <div className="flex items-center gap-2">
                                    <span>{country.flag}</span>
                                    <span>{country.countryName}</span>
                                </div>
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>
            </div>
        </CardContent>
      </Card>


      {/* Services List */}
      <Accordion type="single" collapsible className="w-full space-y-4">
        {servicesForCountry.length > 0 ? (
          servicesForCountry.map((ministry) => (
            <AccordionItem value={ministry.id} key={ministry.id} className="border rounded-lg shadow-sm bg-card">
              <AccordionTrigger className="p-4 text-lg font-medium hover:bg-muted/50 rounded-t-lg">
                <div className="flex items-center gap-3 text-left">
                  <ministry.icon className="h-6 w-6 text-primary flex-shrink-0" />
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
                          <Link href={`/payment?service_id=${service.id}&country_code=${selectedCountry}`}>
                            Payer ce service
                          </Link>
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </AccordionContent>
            </AccordionItem>
          ))
        ) : (
            <div className="text-center text-muted-foreground py-10">
                <p>Aucun service disponible pour le pays sélectionné.</p>
            </div>
        )}
      </Accordion>

      <div className="mt-10 text-center text-xs text-muted-foreground">
        Après avoir sélectionné un service, vous serez redirigé vers la page de choix de la méthode de paiement.
      </div>
    </div>
  );
}
