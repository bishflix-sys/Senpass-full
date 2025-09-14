
import type { LucideProps } from "lucide-react";
import * as React from "react"; // Import React for React.memo
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";

interface FeatureCardProps {
  icon: React.ElementType<LucideProps>;
  title: string;
  description: string;
  accentIcon?: boolean;
}

// Wrap the component with React.memo
const FeatureCard = React.memo(function FeatureCard({ icon: Icon, title, description, accentIcon = false }: FeatureCardProps) {
  return (
    <Card className="hover:shadow-lg transition-shadow duration-200 border h-full flex flex-col">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-3"> {/* Adjusted padding */}
         <div className={cn(
              "rounded-lg p-2.5 shadow-sm", // Slightly adjusted padding
              accentIcon ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground"
            )}>
           <Icon className="h-5 w-5" /> {/* Slightly smaller icon */}
         </div>
        <div className="space-y-1 flex-1">
          <CardTitle className="text-base font-semibold leading-tight">{title}</CardTitle> {/* Adjusted size/leading */}
        </div>
      </CardHeader>
      <CardContent className="pt-0 flex-grow"> {/* Remove top padding, allow content to grow */}
        <CardDescription className="text-sm leading-normal">{description}</CardDescription> {/* Adjusted leading */}
      </CardContent>
      {/* Optional: Add a footer or button if needed
      <CardFooter className="pt-4">
        <Button variant="link" size="sm" className="p-0 h-auto text-primary">En savoir plus</Button>
      </CardFooter>
      */}
    </Card>
  );
});

export default FeatureCard;
