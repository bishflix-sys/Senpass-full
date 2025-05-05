
import Link from "next/link";
import { Lock } from "lucide-react"; // Import the Lock icon

// SVG representation of the Senpass logo
const SenpassLogo = () => (
  <svg
    width="160" // Adjusted width to better accommodate text
    height="40" // Kept height proportional
    viewBox="0 0 160 40"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    aria-label="Senpass Logo"
    className="h-8 w-auto" // Use Tailwind for responsive sizing
  >
    {/* Simplified Fingerprint Icon with Senegal Colors */}
    <g transform="translate(5, 0)"> {/* Shift icon slightly right */}
      {/* Outer Circle (Thin Gray) */}
      <circle cx="20" cy="20" r="19" stroke="#D1D5DB" strokeWidth="0.5" />

      {/* Green Section (Left) - Simplified representation */}
      <path d="M10 30 Q15 10 20 5" stroke="#00853F" strokeWidth="1.5" fill="none" />
      <path d="M5 25 Q15 5 25 5" stroke="#00853F" strokeWidth="1.5" fill="none" />
      <path d="M8 35 Q18 15 28 10" stroke="#00853F" strokeWidth="1.5" fill="none" />
       {/* Connecting dots simulation */}
      <circle cx="6" cy="28" r="1" fill="#00853F" />
      <circle cx="9" cy="33" r="1" fill="#00853F" />

      {/* Yellow Section (Center) - Simplified representation */}
      <path d="M15 35 Q20 10 25 5" stroke="#FDEF42" strokeWidth="1.5" fill="none" />
      <path d="M20 38 Q25 15 30 10" stroke="#FDEF42" strokeWidth="1.5" fill="none" />
      <path d="M25 35 Q30 20 35 15" stroke="#FDEF42" strokeWidth="1.5" fill="none" />

      {/* Red Section (Right) - Simplified representation */}
      <path d="M30 30 Q25 10 20 5" stroke="#E31B23" strokeWidth="1.5" fill="none" />
      <path d="M35 25 Q25 5 15 5" stroke="#E31B23" strokeWidth="1.5" fill="none" />
      <path d="M32 35 Q22 15 12 10" stroke="#E31B23" strokeWidth="1.5" fill="none" />
       {/* Connecting dots simulation */}
       <circle cx="34" cy="28" r="1" fill="#E31B23" />
       <circle cx="31" cy="33" r="1" fill="#E31B23" />

    </g>

    {/* Text: SENPASS */}
    <text
      x="50" // Positioned next to the icon
      y="20" // Vertically centered
      fontFamily="Arial, sans-serif" // Generic sans-serif
      fontSize="16" // Adjusted font size
      fontWeight="bold"
      fill="hsl(var(--foreground))" // Use theme color
      dominantBaseline="middle"
    >
      SENPASS
    </text>

    {/* Text: LE SÉNÉGAL FUTUR */}
    <text
       x="50"
       y="34" // Positioned below SENPASS
       fontFamily="Arial, sans-serif"
       fontSize="8" // Smaller font size
       fill="hsl(var(--muted-foreground))" // Use muted theme color
       dominantBaseline="middle"
    >
      LE SÉNÉGAL FUTUR
    </text>
  </svg>
);


export default function Header() {
  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 shadow-sm"> {/* Added shadow-sm */}
      <div className="container flex h-16 items-center justify-between"> {/* Use justify-between */}
        {/* Left side: Logo */}
        <Link href="/" className="flex items-center space-x-2">
           <SenpassLogo />
           {/* Removed the text span */}
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
