
"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function LogoutButton() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = () => {
    // Simulate logout process (clear tokens, session, etc.)
    toast({
      title: "Déconnexion",
      description: "Vous avez été déconnecté avec succès. Redirection...",
    });

    // Redirect to login page after a short delay, specifying the individuals tab
    setTimeout(() => {
      router.push("/login?tab=individuals");
    }, 1000);
  };

  return (
    <Button variant="outline" size="sm" onClick={handleLogout}>
      <LogOut className="mr-2 h-4 w-4" />
      Se déconnecter
    </Button>
  );
}

