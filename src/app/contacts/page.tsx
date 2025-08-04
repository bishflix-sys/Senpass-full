
"use client";

import type { Metadata } from 'next';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import Link from "next/link";
import { BookUser, Phone, Mail, UserPlus, ArrowLeft } from "lucide-react";

// Mock data for contacts
const contacts = [
  {
    name: "Fatou Diop",
    phone: "+221771234567",
    email: "fatou.diop@example.com",
    avatar: "https://imgs.search.brave.com/5Yx482t7h0h2tO2aT9w-430c-Z8c6k63G6s_j6G1H5Q/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTA2/NTYyMzM3MC9mci9w/aG90by9wb3J0cmFp/dC1kZWNvbGxlLXVu/LWV4cGVydC1kYW5z/LWxlLXNlY3RldXIt/ZGVzLWFmZmFpcmVz/LW5vaXJlcy5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9eU9O/a1B1b0V4VXRzY2lI/ZkthdVB3SWhQdXNu/a0JJYUVxOUF6M1R1/TEVOOD0"
  },
  {
    name: "Mamadou Sow",
    phone: "+221781234568",
    email: "mamadou.sow@example.com",
    avatar: "https://imgs.search.brave.com/zHcf9-j0K1qgN_YjuR2k2E8s5v-xt5y1Emu4gwcjE1s/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTE3/ODc5MDY3OS9mci9w/aG90by9wb3J0cmFp/dC1kZWNvbGxlLWQu/anBnP3M9NjEyeDYx/MiZ3PTAmaz0yMCZj/PUE3N1B5bzE5WlE1/YjBfV0l0b2d4b29x/dFNlOWVrY0t0VzFG/TjdVc2ZFT3M9"
  },
  {
    name: "Aissatou Ndiaye",
    phone: "+221761234569",
    email: "aissatou.ndiaye@example.com",
    avatar: "https://imgs.search.brave.com/PZe3g6j3kGk_hUFUwZADc-b-eH62Qz2pWvxPzE5JjJc/rs:fit:860:0:0/g:ce/aHR0cHM6Ly9tZWRp/YS5pc3RvY2twaG90/by5jb20vaWQvMTMw/OTY5NTM5OC9mci9w/aG90by9wb3J0cmFp/dC1kZWNvbGxlLWQt/dW5lLWJlbGxlLWpl/dW5lLWZlbW1lLWFm/cmljYWluZS5qcGc_/cz02MTJ4NjEyJnc9/MCZrPTIwJmM9YklM/SlYwYnFDR3l2OWJz/M2x3RzF6Z010V3pT/aTctVm50N2R3QjRS/WjFZQT0"
  },
];

export default function ContactsPage() {
    const { toast } = useToast();
  
    const getInitials = (name: string) => name.split(" ").map((n) => n[0]).join("");

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between mb-6 gap-4">
        <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
          <BookUser className="h-8 w-8" /> Mon Répertoire de Contacts
        </h1>
        <Button variant="outline" asChild size="sm">
            <Link href="/dashboard">
                <ArrowLeft className="mr-2 h-4 w-4" /> Retour au tableau de bord
            </Link>
        </Button>
      </div>
      <p className="text-muted-foreground mb-8">
        Gérez vos contacts et initiez des communications sécurisées via votre identifiant Senpass.
      </p>

       <div className="flex justify-end mb-6">
          <Button onClick={() => toast({ title: "Fonctionnalité à venir", description: "L'ajout de nouveaux contacts sera bientôt disponible." })}>
              <UserPlus className="mr-2 h-5 w-5" /> Ajouter un Contact
          </Button>
       </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {contacts.map((contact) => (
          <Card key={contact.email} className="border hover:shadow-lg transition-shadow">
            <CardHeader className="flex flex-row items-center gap-4">
               <Avatar className="h-14 w-14 border-2 border-primary">
                 <AvatarImage src={contact.avatar} alt={contact.name} />
                 <AvatarFallback className="text-xl bg-secondary">{getInitials(contact.name)}</AvatarFallback>
               </Avatar>
              <div>
                <CardTitle>{contact.name}</CardTitle>
                <CardDescription className="text-xs truncate">{contact.email}</CardDescription>
              </div>
            </CardHeader>
            <CardContent className="space-y-3">
              <div className="flex items-center gap-3 text-sm">
                <Mail className="h-4 w-4 text-muted-foreground" />
                <a href={`mailto:${contact.email}`} className="text-primary hover:underline break-all">
                  {contact.email}
                </a>
              </div>
              <div className="flex items-center gap-3 text-sm">
                <Phone className="h-4 w-4 text-muted-foreground" />
                <a href={`tel:${contact.phone}`} className="text-primary hover:underline">
                  {contact.phone}
                </a>
              </div>
            </CardContent>
             <CardFooter className="flex justify-end gap-2">
                <Button variant="outline" asChild size="sm">
                    <a href={`mailto:${contact.email}`}>
                        <Mail className="mr-2 h-4 w-4"/> Email
                    </a>
                </Button>
                <Button asChild size="sm">
                    <a href={`tel:${contact.phone}`}>
                        <Phone className="mr-2 h-4 w-4"/> Appeler
                    </a>
                </Button>
            </CardFooter>
          </Card>
        ))}
      </div>
    </div>
  );
}
