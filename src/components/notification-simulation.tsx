"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from "@/components/ui/card";
import { Bell, AlertTriangle, CheckCircle, Info, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale'; // Import French locale

type NotificationType = 'login' | 'verification' | 'update' | 'security';

interface Notification {
  id: string;
  type: NotificationType;
  message: string;
  timestamp: Date;
  read: boolean;
  details?: string;
}

// Simulate generating notifications
const generateRandomNotification = (): Notification => {
  const types: NotificationType[] = ['login', 'verification', 'update', 'security'];
  const randomType = types[Math.floor(Math.random() * types.length)];
  const now = new Date();
  let message = "";
  let details: string | undefined;

  switch (randomType) {
    case 'login':
      message = `Nouvelle connexion détectée depuis ${['Dakar', 'Paris', 'New York'][Math.floor(Math.random() * 3)]}.`;
      details = `Appareil: Chrome sur Windows 10. Si ce n'était pas vous, sécurisez votre compte.`;
      break;
    case 'verification':
      message = `Demande de vérification d'identité par ${['Gouvernement SN', 'Orange Money', 'Wave'][Math.floor(Math.random() * 3)]}.`;
      details = `Cliquez pour approuver ou rejeter la demande. Valide pendant 5 minutes.`;
      break;
    case 'update':
      message = `Votre ${['adresse', 'numéro de téléphone', 'email'][Math.floor(Math.random() * 3)]} a été mis à jour.`;
      details = `La mise à jour a été effectuée le ${now.toLocaleDateString('fr-FR')}.`;
      break;
    case 'security':
      message = `Alerte de sécurité : Tentative de connexion suspecte bloquée.`;
      details = `Une tentative depuis un emplacement inconnu a été détectée et bloquée.`;
      break;
  }

  return {
    id: `notif-${Date.now()}-${Math.random().toString(36).substring(7)}`,
    type: randomType,
    message,
    timestamp: now,
    read: false,
    details,
  };
};


export default function NotificationSimulation() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

   // Effect to load initial and generate new notifications
   useEffect(() => {
      // Load initial notifications (simulated)
      setTimeout(() => {
         setNotifications(Array.from({ length: 3 }, generateRandomNotification));
         setIsLoading(false);
      }, 1000); // Simulate initial loading delay

      // Simulate receiving new notifications periodically
      const intervalId = setInterval(() => {
         setNotifications(prev => [generateRandomNotification(), ...prev].slice(0, 10)); // Keep max 10 notifs
      }, 15000); // New notification every 15 seconds

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

   const getIcon = (type: NotificationType) => {
     switch (type) {
       case 'login': return <Info className="h-4 w-4 text-blue-500" />;
       case 'verification': return <CheckCircle className="h-4 w-4 text-green-500" />;
       case 'update': return <Info className="h-4 w-4 text-purple-500" />;
       case 'security': return <AlertTriangle className="h-4 w-4 text-red-500" />;
       default: return <Bell className="h-4 w-4 text-gray-500" />;
     }
   };

   const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card className="shadow-md">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <div className="space-y-1">
            <CardTitle className="flex items-center gap-2">
                Notifications en temps réel
                 {unreadCount > 0 && <Badge variant="destructive">{unreadCount}</Badge>}
            </CardTitle>
            <CardDescription>Alertes d'activité sur votre compte.</CardDescription>
        </div>
         <Button variant="ghost" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
             Marquer tout comme lu
         </Button>
      </CardHeader>
      <CardContent>
        <ScrollArea className="h-[200px] w-full pr-4">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Loader2 className="h-6 w-6 animate-spin text-primary" />
            </div>
          ) : notifications.length === 0 ? (
             <p className="text-center text-muted-foreground py-8">Aucune notification.</p>
          ) : (
            <ul className="space-y-3">
              {notifications.map(notif => (
                <li
                  key={notif.id}
                  className={`flex items-start gap-3 p-3 rounded-md border ${
                    notif.read ? 'bg-background text-muted-foreground' : 'bg-secondary text-secondary-foreground font-medium'
                  }`}
                >
                 <span className="mt-1">{getIcon(notif.type)}</span>
                  <div className="flex-1">
                    <p className="text-sm">{notif.message}</p>
                    {notif.details && <p className="text-xs mt-1 opacity-80">{notif.details}</p>}
                    <p className="text-xs mt-1 opacity-60">
                       {formatDistanceToNow(notif.timestamp, { addSuffix: true, locale: fr })}
                    </p>
                  </div>
                  {!notif.read && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-auto p-1 text-xs"
                      onClick={() => markAsRead(notif.id)}
                    >
                      Marquer lu
                    </Button>
                  )}
                </li>
              ))}
            </ul>
          )}
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
