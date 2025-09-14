"use client";

import { useState, useEffect } from 'react';
import { Card, CardHeader, CardTitle, CardContent, CardDescription, CardFooter } from "@/components/ui/card"; // Added CardFooter
import { FileText, Loader2, Trash2, Eye, CheckCircle, AlertTriangle, Info, Bell, Activity } from "lucide-react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress"; // Import Progress
import { formatDistanceToNow } from 'date-fns';
import { fr } from 'date-fns/locale'; // Import French locale
import { cn } from "@/lib/utils"; // Import cn

type NotificationType = 'cni' | 'passport' | 'tax' | 'scholarship' | 'security' | 'login';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  status: 'En cours' | 'Validé' | 'Rejeté' | 'Information';
  progress?: number;
  timestamp: Date;
  read: boolean;
  details?: string;
}

// Simulate generating notifications for administrative tasks
const generateRandomNotification = (): Notification => {
  const types: NotificationType[] = ['cni', 'passport', 'tax', 'scholarship', 'security', 'login'];
  const randomType = types[Math.floor(Math.random() * types.length)];
  const now = new Date();
  
  const statuses = ['En cours', 'Validé', 'Rejeté', 'Information'] as const;
  let status = statuses[Math.floor(Math.random() * statuses.length)];

  let title = "";
  let details: string | undefined;
  let progress: number | undefined;

  switch (randomType) {
    case 'cni':
      title = "Demande de CNI";
      details = "Votre demande de Carte Nationale d'Identité est en cours de traitement.";
      progress = status === 'Validé' ? 100 : (status === 'Rejeté' ? 50 : Math.floor(Math.random() * 60) + 20);
      if (status === 'Information') status = 'En cours';
      break;
    case 'passport':
      title = "Demande de Passeport";
      details = "Votre demande de passeport est en cours.";
      progress = status === 'Validé' ? 100 : (status === 'Rejeté' ? 70 : Math.floor(Math.random() * 80) + 10);
       if (status === 'Information') status = 'En cours';
      break;
    case 'tax':
      title = "Déclaration d'impôts";
      details = "Votre déclaration fiscale a été reçue.";
      progress = status === 'Validé' ? 100 : (status === 'Rejeté' ? 100 : 90);
       if (status === 'Information') status = 'En cours';
      break;
    case 'scholarship':
      title = "Bourse Scolaire";
      details = "Le dossier de bourse pour votre enfant a été soumis.";
      progress = status === 'Validé' ? 100 : (status === 'Rejeté' ? 40 : 30);
      if (status === 'Information') status = 'En cours';
      break;
    case 'security':
       title = "Alerte Sécurité";
       status = 'Information';
       details = `Une tentative de connexion suspecte depuis Paris a été bloquée.`;
      break;
    case 'login':
        title = "Nouvelle Connexion";
        status = 'Information';
        details = `Appareil: Chrome sur Windows. Si ce n'était pas vous, sécurisez votre compte.`;
        break;
  }

  return {
    id: `notif-${Date.now()}-${Math.random().toString(36).substring(7)}`,
    type: randomType,
    title,
    status,
    progress,
    timestamp: now,
    read: Math.random() > 0.7,
    details,
  };
};


export default function NotificationSimulation() {
  const [notifications, setNotifications] = useState<Notification[]>([]);
  const [isLoading, setIsLoading] = useState(true);

   // Effect to load initial and generate new notifications
   useEffect(() => {
      setIsLoading(true);
      setTimeout(() => {
         setNotifications(Array.from({ length: 5 }, generateRandomNotification).sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime()));
         setIsLoading(false);
      }, 1200);

      const intervalId = setInterval(() => {
         setNotifications(prev => [generateRandomNotification(), ...prev]
            .sort((a, b) => b.timestamp.getTime() - a.timestamp.getTime())
            .slice(0, 15));
      }, 25000);

      return () => clearInterval(intervalId);
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
     const iconProps = { className: "h-5 w-5 flex-shrink-0 text-primary" };
     switch (type) {
       case 'cni':
       case 'passport':
         return <FileText {...iconProps} />;
       case 'tax':
         return <FileText {...iconProps} />;
       case 'scholarship':
         return <FileText {...iconProps} />;
       case 'security':
         return <AlertTriangle className="h-5 w-5 flex-shrink-0 text-destructive" />;
       case 'login':
         return <Info className="h-5 w-5 flex-shrink-0 text-blue-500" />;
       default:
         return <Bell {...iconProps} />;
     }
   };
   
   const getStatusBadgeVariant = (status: Notification['status']) => {
       switch (status) {
           case 'Validé': return 'default';
           case 'En cours': return 'secondary';
           case 'Rejeté': return 'destructive';
           default: return 'outline';
       }
   }

   const unreadCount = notifications.filter(n => !n.read).length;

  return (
    <Card className="shadow-md border">
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-3 border-b">
        <div className="space-y-0.5">
            <CardTitle className="flex items-center gap-2 text-lg">
                <Activity className="h-5 w-5 text-primary"/> Suivi des Démarches
                 {unreadCount > 0 && <Badge variant="destructive" className="ml-1">{unreadCount}</Badge>}
            </CardTitle>
            <CardDescription>Suivez l'état d'avancement de vos demandes en temps réel.</CardDescription>
        </div>
         <Button variant="ghost" size="sm" onClick={markAllAsRead} disabled={unreadCount === 0}>
            <Eye className="mr-2 h-4 w-4"/> Tout marquer comme lu
         </Button>
      </CardHeader>
      <CardContent className="p-0">
        <ScrollArea className="h-[250px] w-full">
          {isLoading ? (
            <div className="flex justify-center items-center h-full p-6">
              <Loader2 className="h-8 w-8 animate-spin text-primary" />
            </div>
          ) : notifications.length === 0 ? (
             <p className="text-center text-muted-foreground py-10 px-6">Aucune démarche en cours.</p>
          ) : (
            <ul className="divide-y divide-border">
              {notifications.map(notif => (
                <li
                  key={notif.id}
                  className={cn(
                    "flex items-start gap-4 p-4 transition-colors",
                    !notif.read && "bg-primary/5 hover:bg-primary/10"
                  )}
                >
                 <span className="mt-1">{getIcon(notif.type)}</span>
                  <div className="flex-1 space-y-2">
                     <div className="flex justify-between items-start">
                        <p className={cn("font-medium text-sm", !notif.read ? "text-foreground" : "text-muted-foreground")}>
                          {notif.title}
                        </p>
                        <Badge variant={getStatusBadgeVariant(notif.status)}>{notif.status}</Badge>
                     </div>
                    <p className={cn("text-sm", !notif.read ? "text-foreground/90" : "text-muted-foreground/80")}>
                       {notif.details}
                    </p>
                    {notif.progress !== undefined && (
                        <Progress value={notif.progress} className="h-2" />
                    )}
                    <p className="text-xs text-muted-foreground/60 pt-1">
                       {formatDistanceToNow(notif.timestamp, { addSuffix: true, locale: fr })}
                    </p>
                  </div>
                  {!notif.read && (
                    <Button
                      variant="ghost"
                      size="icon"
                      className="h-8 w-8 text-muted-foreground hover:text-primary hover:bg-primary/10"
                      onClick={() => markAsRead(notif.id)}
                      aria-label="Marquer comme lu"
                      title="Marquer comme lu"
                    >
                       <CheckCircle className="h-4 w-4" />
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
                  <Trash2 className="mr-2 h-4 w-4" /> Vider l'historique
               </Button>
          </CardFooter>
      )}
    </Card>
  );
}
