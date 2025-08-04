
"use client";

import { useRouter } from "next/navigation";
import { LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";

export default function LogoutButton() {
  const router = useRouter();
  const { toast } = useToast();

  const handleLogout = async () => {
    try {
      // Call the API route to clear the session cookie
      await fetch('/api/auth/logout', { method: 'POST' });
      
      toast({
        title: "Déconnexion",
        description: "Vous avez été déconnecté avec succès. Redirection...",
      });

      // Redirect to login page after a short delay
      setTimeout(() => {
        router.push("/login?tab=individuals");
        router.refresh(); // Force a refresh to ensure logged-out state is reflected
      }, 1000);

    } catch (error) {
      console.error("Logout failed:", error);
      toast({
        title: "Erreur de Déconnexion",
        description: "Une erreur est survenue. Veuillez réessayer.",
        variant: "destructive",
      });
    }
  };

  return (
    <Button variant="outline" size="sm" onClick={handleLogout}>
      <LogOut className="mr-2 h-4 w-4" />
      Se déconnecter
    </Button>
  );
}
