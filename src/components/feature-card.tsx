
import type { LucideProps } from "lucide-react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ElementType<LucideProps>;
  title: string;
  description: string;
  accentIcon?: boolean;
}

export default function FeatureCard({ icon: Icon, title, description, accentIcon = false }: FeatureCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border h-full flex flex-col"> {/* Added border and height */}
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-2"> {/* Reduced bottom padding */}
         <div className={cn(
              "rounded-lg p-3 shadow-sm", // Slightly larger padding and added shadow
              accentIcon ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
            )}>
           <Icon className="h-6 w-6" /> {/* Icon size remains the same */}
         </div>
        <div className="space-y-1 flex-1"> {/* Allow title/desc to take remaining space */}
          <CardTitle className="text-md font-semibold">{title}</CardTitle> {/* Adjusted font size/weight */}
        </div>
      </CardHeader>
      <CardContent className="pt-2 flex-grow"> {/* Added top padding, allow content to grow */}
        <CardDescription className="text-sm leading-relaxed">{description}</CardDescription>
      </CardContent>
      {/* Optional: Add a footer or button if needed
      <CardFooter className="pt-4">
        <Button variant="link" size="sm" className="p-0 h-auto text-primary">En savoir plus</Button>
      </CardFooter>
      */}
    </Card>
  );
}
