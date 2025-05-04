import type { UserProfile } from "@/services/identity";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { User, Mail, Home, Calendar, Shield } from "lucide-react";

interface ProfileCardProps {
  user: UserProfile;
}

export default function ProfileCard({ user }: ProfileCardProps) {
  const initials = user.name
    .split(" ")
    .map((n) => n[0])
    .join("");

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center gap-4 pb-2">
         <Avatar className="h-16 w-16 border-2 border-primary">
          {/* Placeholder image - replace with actual user image if available */}
           <AvatarImage src={`https://picsum.photos/seed/${user.email}/100/100`} alt={user.name} data-ai-hint="person portrait" />
           <AvatarFallback className="text-xl bg-secondary text-secondary-foreground">{initials}</AvatarFallback>
         </Avatar>
        <div>
          <CardTitle className="text-xl text-primary">{user.name}</CardTitle>
           <CardDescription>Profil Utilisateur</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="space-y-3 pt-4">
        <div className="flex items-center gap-3 text-sm">
          <Mail className="h-4 w-4 text-muted-foreground" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center gap-3 text-sm">
          <Home className="h-4 w-4 text-muted-foreground" />
          <span>{user.address}</span>
        </div>
         <div className="flex items-center gap-3 text-sm">
          <Calendar className="h-4 w-4 text-muted-foreground" />
          <span>Date de naissance: {user.dateOfBirth || 'Non spécifiée'}</span>
        </div>
         <div className="flex items-center gap-3 text-sm">
          <Shield className="h-4 w-4 text-muted-foreground" />
          <span>ID National: {user.nationalId || 'Non spécifié'}</span>
        </div>
        {/* Add more profile details as needed */}
      </CardContent>
    </Card>
  );
}
