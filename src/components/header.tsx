
import Link from "next/link";
import { Lock } from "lucide-react"; // Import the Lock icon

export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"> {/* Added shadow-sm */}
      <div className="container flex h-16 items-center justify-between"> {/* Use justify-between */}
        {/* Left side: Large Text Logo */}
        <Link href="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold text-foreground tracking-tight">SENPASS</span>
        </Link>

        {/* Right side: Security Indicator */}
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <Lock className="h-4 w-4" />
          <span>Sécurisé</span>
        </div>
      </div>
    </header>
  );
}
