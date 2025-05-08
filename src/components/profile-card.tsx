
import type { UserProfile } from "@/services/identity";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { User, Mail, Home, Calendar, Shield } from "lucide-react";
import { cn } from "@/lib/utils";

interface ProfileCardProps {
  user: UserProfile;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Card className="shadow-md hover:shadow-lg transition-shadow duration-200 border"> {/* Added border */}
      <CardHeader className="flex flex-col items-center gap-4 pb-4 text-center"> {/* Center content */}
         <Avatar className="h-20 w-20 border-4 border-primary shadow-sm"> {/* Larger avatar */}
          {/* Placeholder image - replace with actual user image if available */}
           <AvatarImage src={`https://picsum.photos/seed/${user.email}/120/120`} alt={user.name} data-ai-hint="black person tie" />
           <AvatarFallback className="text-2xl bg-secondary text-secondary-foreground">{initials}</AvatarFallback>
         </Avatar>
        <div>
          <CardTitle className="text-xl text-primary font-semibold">{user.name}</CardTitle>
           <CardDescription>Profil Utilisateur</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 pt-4">
        <div className="flex items-center gap-3 text-sm border-t pt-4"> {/* Add border-top */}
          <Mail className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          <span className="truncate">{user.email}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Home className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          <span>{user.address}</span>
        </div>
         <div className="flex items-center gap-3 text-sm">
          <Calendar className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          <span>Naissance: {user.dateOfBirth || 'Non spécifiée'}</span>
        </div>
         <div className="flex items-center gap-3 text-sm">
          <Shield className="h-5 w-5 text-muted-foreground flex-shrink-0" />
          <span className="font-medium">ID National:</span> <span className="font-mono">{user.nationalId || 'Non spécifié'}</span>
        </div>
        {/* Add more profile details as needed */}
      </CardContent>
    </Card>
  );
}
