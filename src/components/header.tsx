
import { ShieldCheck } from "lucide-react";
import Link from "next/link";

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"> {/* Added shadow-sm */}
      <div className="container flex h-16 items-center"> {/* Increased height slightly */}
        <Link href="/" className="mr-6 flex items-center space-x-2">
          <ShieldCheck className="h-7 w-7 text-primary" /> {/* Slightly larger icon */}
          <span className="font-bold sm:inline-block text-xl"> {/* Increased text size */}
            SenPass Lite
          </span>
        </Link>
        {/* Add navigation items here if needed */}
        {/* Example:
        <nav className="ml-auto flex items-center space-x-4">
          <Link href="/about" className="text-sm font-medium text-muted-foreground hover:text-primary">À propos</Link>
          <Link href="/contact" className="text-sm font-medium text-muted-foreground hover:text-primary">Contact</Link>
        </nav>
        */}
      </div>
    </header>
  );
}
