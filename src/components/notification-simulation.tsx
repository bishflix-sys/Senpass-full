
"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"; // Added CardFooter
import { Bell, AlertTriangle, CheckCircle, Info, Loader2, Trash2, Eye } from "lucide-react"; // Added Trash2, Eye
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale'; // Import French locale
import { cn } from "@/lib/utils"; // Import cn

type NotificationType = 'login' | 'verification' | 'update' | 'security' | 'info'; // Added 'info' type

interface Notification {
  id: string;
  type: NotificationType;
  title: string; // Added title field
  message: string;
  timestamp: Date;
  read: boolean;
  details?: string;
}

// Simulate generating notifications
const generateRandomNotification = (): Notification => {
  const types: NotificationType[] = ['login', 'verification', 'update', 'security', 'info'];
  const randomType = types[Math.floor(Math.random() * types.length)];
  const now = new Date();
  let title = "";
  let message = "";
  let details: string | undefined;

  switch (randomType) {
    case 'login':
      title = "Nouvelle Connexion";
      message = `Connexion détectée depuis ${['Dakar', 'Paris', 'New York'][Math.floor(Math.random() * 3)]}.`;
      details = `Appareil: ${['Chrome', 'Firefox', 'Safari'][Math.floor(Math.random()*3)]} sur ${['Windows', 'macOS', 'Linux'][Math.floor(Math.random()*3)]}. Si ce n'était pas vous, sécurisez votre compte.`;
      break;
    case 'verification':
      title = "Demande de Vérification";
      message = `Demande d'identité par ${['Gouvernement SN', 'Orange Money', 'Wave'][Math.floor(Math.random() * 3)]}.`;
      details = `Cliquez pour approuver ou rejeter. Valide 5 min.`;
      break;
    case 'update':
      title = "Mise à Jour du Profil";
      message = `Votre ${['adresse', 'numéro de téléphone', 'email'][Math.floor(Math.random() * 3)]} a été modifié${Math.random() > 0.5 ? '.' : 'e.'}`;
      details = `La modification a eu lieu le ${now.toLocaleDateString('fr-FR')} à ${now.toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}`;
      break;
    case 'security':
       title = "Alerte Sécurité";
      message = `Tentative de connexion suspecte bloquée.`;
      details = `Une tentative depuis un emplacement inhabituel a été détectée et bloquée.`;
      break;
     case 'info':
        title = "Information";
        message = `Bienvenue sur la simulation SenPass Lite!`;
        details = `Explorez les fonctionnalités simulées de votre identité numérique.`;
        break;
  }

  return {
    id: `notif-${Date.now()}-${Math.random().toString(36).substring(7)}`,
    type: randomType,
    title,
    message,
    timestamp: now,
    read: Math.random() > 0.7, // Start some as read
    details,
  };
};


export default function NotificationSimulation() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

   // Effect to load initial and generate new notifications
   useEffect(() => {
      // Load initial notifications (simulated)
      setIsLoading(true);
      setTimeout(() => {
         setNotifications(Array.from({ length: 5 }, generateRandomNotification).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())); // Sort initial by date
         setIsLoading(false);
      }, 1200); // Simulate initial loading delay

      // Simulate receiving new notifications periodically
      const intervalId = setInterval(() => {
         setNotifications(prev => [generateRandomNotification(), ...prev]
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()) // Keep sorted
            .slice(0, 15)); // Keep max 15 notifs
      }, 20000); // New notification every 20 seconds

      return () => clearInterval(intervalId); // Cleanup on unmount
   }, []);

  const markAsRead = (id: string) => {
    setNotifications(prev =>
      prev.map(n => (n.id === id ? { ...n, read: true } : n))
    );
  };

  const markAllAsRead = () => {
    setNotifications(prev => prev.map(n => ({ ...n, read: true })));
  };

  const deleteAllNotifications = () => {
      setNotifications([]);
  }

   const getIcon = (type: NotificationType) => {
     const iconProps = "h-5 w-5 flex-shrink-0"; // Common props
     switch (type) {
       case 'login': return <Info className={cn(iconProps, "text-blue-500")} />;
       case 'verification': return <CheckCircle className={cn(iconProps, "text-green-600")} />;
       case 'update': return <Info className={cn(iconProps, "text-purple-500")} />;
       case 'security': return <AlertTriangle className={cn(iconProps, "text-red-600")} />;
       case 'info': return <Bell className={cn(iconProps, "text-gray-500")} />;
       default: return <Bell className={cn(iconProps, "text-gray-500")} />;
     }
   };

   const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card className="shadow-md border"> {/* Added border */}
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b"> {/* Added border-b */}
        <div className="space-y-0.5">
            <CardTitle className="flex items-center gap-2 text-lg"> {/* Adjusted text size */}
                <Bell className="h-5 w-5 text-primary"/> Notifications
                 {unreadCount > 0 && <Badge variant="destructive" className="ml-1">{unreadCount}</Badge>}
            </CardTitle>
            <CardDescription>Alertes et informations importantes.</CardDescription>
        </div>
         <Button variant="ghost" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <Eye className="mr-2 h-4 w-4"/> Tout marquer comme lu
         </Button>
      </CardHeader>
      <CardContent className="p-0"> {/* Remove default padding */}
        <ScrollArea className="h-[250px] w-full"> {/* Increased height */}
          {isLoading ? (
            <div className="flex justify-center items-center h-full p-6">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : notifications.length === 0 ? (
             <p className="text-center text-muted-foreground py-10 px-6">Aucune notification pour le moment.</p>
          ) : (
            <ul className="divide-y divide-border"> {/* Use divide for separation */}
              {notifications.map(notif => (
                <li
                  key={notif.id}
                  className={cn(
                    "flex items-start gap-4 p-4 transition-colors", // Increased gap and padding
                    !notif.read && "bg-primary/5 hover:bg-primary/10" // Subtle background for unread
                  )}
                >
                 <span className="mt-0.5">{getIcon(notif.type)}</span>
                  <div className="flex-1 space-y-1">
                     <p className={cn(
                         "font-medium text-sm",
                         !notif.read ? "text-foreground" : "text-muted-foreground"
                       )}>
                       {notif.title}
                     </p>
                    <p className={cn(
                       "text-sm",
                       !notif.read ? "text-foreground/90" : "text-muted-foreground/80"
                    )}>
                       {notif.message}
                    </p>
                    {notif.details && (
                        <p className="text-xs text-muted-foreground/70">{notif.details}</p>
                    )}
                    <p className="text-xs text-muted-foreground/60 pt-1">
                       {formatDistanceToNow(notif.timestamp, { addSuffix: true, locale: fr })}
                    </p>
                  </div>
                  {!notif.read && (
                    <Button
                      variant="ghost"
                      size="icon" // Use icon size for smaller button
                      className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                      onClick={() => markAsRead(notif.id)}
                      aria-label="Marquer comme lu"
                      title="Marquer comme lu" // Tooltip text
                    >
                       <Eye className="h-4 w-4" />
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </CardContent>
      { notifications.length > 0 && !isLoading && (
          <CardFooter className="border-t pt-3 pb-3 justify-end">
               <Button variant="outline" size="sm" onClick={deleteAllNotifications} className="text-destructive hover:bg-destructive/10 hover:text-destructive">
                  <Trash2 className="mr-2 h-4 w-4" /> Supprimer tout
               </Button>
          </CardFooter>
      )}
    </Card>
  );
}
