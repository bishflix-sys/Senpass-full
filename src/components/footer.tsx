
import Link from "next/link";
import { Separator } from "@/components/ui/separator"; // Import Separator
import { ShieldCheck } from "lucide-react"; // Import a security icon

export default function Footer() {
  // Note: Displaying user's actual IP is a privacy concern.
  // Instead, we display a generic security message.
  const securityMessage = "Pour votre sécurité, toutes les activités de session sont surveillées.";

  return (
    <footer className="mt-auto border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <Separator /> {/* Add Separator above footer content */}
      <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} SenPass (Simulation). Tous droits réservés.</p>
        <div className="mt-2 space-x-4">
           <Link href="/terms" className="hover:text-primary transition-colors">
             Conditions d'utilisation
           </Link>
           <span className="opacity-50">|</span>
           <Link href="/privacy" className="hover:text-primary transition-colors">
             Politique de confidentialité
           </Link>
        </div>
         <div className="mt-4 flex items-center justify-center gap-2 text-xs">
            <ShieldCheck className="h-4 w-4 text-green-600" />
            <span>{securityMessage}</span>
        </div>
         <p className="mt-3 text-xs">
          Ceci est une application de démonstration à des fins éducatives et de simulation uniquement.
        </p>
      </div>
    </footer>
  );
}
