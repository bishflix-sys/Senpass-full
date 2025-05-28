
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
  DialogDescription
} from "@/components/ui/dialog";
import { Alert, AlertTitle, AlertDescription } from "@/components/ui/alert";
import { Loader2, ScanFace, VideoOff } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { cn } from "@/lib/utils";

interface FacialRecognitionDialogContentProps {
    onAuthenticated: () => void;
}

const FacialRecognitionDialogContent: React.FC<FacialRecognitionDialogContentProps> = ({ onAuthenticated }) => {
  const videoRef = React.useRef<HTMLVideoElement>(null);
  const [hasCameraPermission, setHasCameraPermission] = React.useState<boolean | null>(null);
  const [isScanning, setIsScanning] = React.useState(false);
  const { toast } = useToast();
  const streamRef = React.useRef<MediaStream | null>(null);

  React.useEffect(() => {
    let mounted = true;
    const getCameraPermission = async () => {
      if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
          if (mounted) setHasCameraPermission(false);
           toast({ variant: 'destructive', title: 'Erreur Caméra', description: 'Votre navigateur ne supporte pas l\'accès à la caméra.'});
          return;
      }
      try {
        streamRef.current = await navigator.mediaDevices.getUserMedia({ video: true });
         if (mounted) {
            setHasCameraPermission(true);
            if (videoRef.current) videoRef.current.srcObject = streamRef.current;
        } else {
            // If component unmounted before permission resolved, stop tracks
            streamRef.current?.getTracks().forEach(track => track.stop());
        }
      } catch (error) {
        console.error('Error accessing camera:', error);
        if (mounted) {
            setHasCameraPermission(false);
            toast({
              variant: 'destructive',
              title: 'Accès Caméra Refusé',
              description: 'Veuillez autoriser l\'accès à la caméra dans les paramètres de votre navigateur.',
            });
        }
      }
    };

    getCameraPermission();

    return () => {
        mounted = false;
        if (streamRef.current) {
            streamRef.current.getTracks().forEach(track => track.stop());
            streamRef.current = null; // Clear the ref
        }
        if (videoRef.current) {
            videoRef.current.srcObject = null; // Release the video source
        }
    };
  }, [toast]);

  const handleSimulateScan = () => {
      setIsScanning(true);
      setTimeout(() => {
          const success = Math.random() > 0.3; // Simulate 70% success
          setIsScanning(false);
          if (success) {
              toast({ title: "Succès", description: "Reconnaissance faciale réussie ! Redirection..." });
              onAuthenticated();
          } else {
              toast({ title: "Échec", description: "Reconnaissance faciale échouée. Veuillez réessayer.", variant: "destructive" });
          }
      }, 2000); // Simulate scan duration
  };

  return (
    <DialogContent className="sm:max-w-md">
      <DialogHeader>
        <DialogTitle className="flex items-center gap-2 text-lg"><ScanFace className="h-5 w-5" /> Vérification Faciale</DialogTitle>
        <DialogDescription>Positionnez votre visage face à la caméra et cliquez sur Scanner.</DialogDescription>
      </DialogHeader>
      <div className="space-y-4 my-6">
        <div className="relative aspect-video w-full overflow-hidden rounded-lg border bg-muted flex items-center justify-center shadow-inner">
           {/* Always render video tag to prevent issues with ref, control visibility with cn */}
           <video ref={videoRef} className={cn("w-full h-full object-cover", { 'hidden': hasCameraPermission !== true })} autoPlay muted playsInline />

            {hasCameraPermission === null && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-muted-foreground space-y-2">
                    <Loader2 className="h-8 w-8 animate-spin" />
                    <p>Activation caméra...</p>
                </div>
            )}
             {hasCameraPermission === false && (
                <div className="absolute inset-0 flex flex-col items-center justify-center text-destructive p-4 space-y-2">
                    <VideoOff className="h-10 w-10" />
                    <p className="text-center font-semibold">Caméra non accessible</p>
                    <p className="text-center text-sm">Veuillez autoriser l'accès dans votre navigateur.</p>
                </div>
            )}
            {isScanning && (
                <div className="absolute inset-0 bg-background/80 flex flex-col items-center justify-center text-primary space-y-2 backdrop-blur-sm">
                    <Loader2 className="h-10 w-10 animate-spin" />
                    <p className="font-medium">Analyse en cours...</p>
                </div>
            )}
        </div>
        {hasCameraPermission === false && (
            <Alert variant="destructive" icon={VideoOff}>
              <AlertTitle>Accès Caméra Refusé</AlertTitle>
              <AlertDescription>L'accès à la caméra est nécessaire pour cette fonctionnalité. Veuillez l'autoriser dans les paramètres de votre navigateur.</AlertDescription>
            </Alert>
        )}
      </div>
      <DialogFooter className="sm:justify-center gap-2">
         <Button type="button" onClick={handleSimulateScan} disabled={hasCameraPermission !== true || isScanning} className="w-full sm:w-auto" size="lg">
            {isScanning ? <Loader2 className="mr-2 h-5 w-5 animate-spin" /> : <ScanFace className="mr-2 h-5 w-5" />} Scanner
          </Button>
         <DialogClose asChild><Button type="button" variant="outline" size="lg">Annuler</Button></DialogClose>
      </DialogFooter>
    </DialogContent>
  );
};

export default FacialRecognitionDialogContent;

    