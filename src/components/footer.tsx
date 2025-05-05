
import Link from "next/link";
import { Separator } from "@/components/ui/separator"; // Import Separator

export default function Footer() {
  return (
    <footer className="mt-auto border-t bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/50">
      <Separator /> {/* Add Separator above footer content */}
      <div className="container mx-auto px-4 py-6 text-center text-sm text-muted-foreground">
        <p>&copy; {new Date().getFullYear()} SenPass (Simulation). Tous droits réservés.</p> {/* Changed from SenPass Lite */}
        <div className="mt-2 space-x-4">
           <Link href="/terms" className="hover:text-primary transition-colors">
             Conditions d'utilisation
           </Link>
           <span className="opacity-50">|</span>
           <Link href="/privacy" className="hover:text-primary transition-colors">
             Politique de confidentialité
           </Link>
        </div>
         <p className="mt-3 text-xs">
          Ceci est une application de démonstration à des fins éducatives et de simulation uniquement.
        </p>
      </div>
    </footer>
  );
}

