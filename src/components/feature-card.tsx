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
    <Card className="hover:shadow-md transition-shadow duration-200">
      <CardHeader className="flex flex-row items-start gap-4 space-y-0 pb-3">
         <div className={cn("rounded-md p-2", accentIcon ? "bg-accent text-accent-foreground" : "bg-primary text-primary-foreground")}>
           <Icon className="h-6 w-6" />
         </div>
        <div className="space-y-1">
          <CardTitle>{title}</CardTitle>
           <CardDescription className="text-sm">{description}</CardDescription>
        </div>
      </CardHeader>
      {/* <CardContent>
        <Button variant="link" className="p-0 h-auto">Learn More</Button>
      </CardContent> */}
    </Card>
  );
}
