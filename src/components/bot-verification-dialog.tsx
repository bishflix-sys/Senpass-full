
"use client";

import * as React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogFooter,
} from "@/components/ui/dialog";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Loader2, ShieldCheck } from "lucide-react";

interface BotVerificationDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: () => void;
}

const BotVerificationDialog: React.FC<BotVerificationDialogProps> = ({ open, onOpenChange, onSuccess }) => {
  const [isChecked, setIsChecked] = React.useState(false);
  const [isVerifying, setIsVerifying] = React.useState(false);

  const handleVerify = () => {
    if (!isChecked) return;
    setIsVerifying(true);

    // Simulate verification delay
    setTimeout(() => {
      setIsVerifying(false);
      setIsChecked(false);
      onSuccess();
      onOpenChange(false);
    }, 1200);
  };
  
  // Reset state when dialog is closed
  React.useEffect(() => {
    if (!open) {
      setIsChecked(false);
      setIsVerifying(false);
    }
  }, [open]);

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-sm" onInteractOutside={(e) => e.preventDefault()}>
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2 text-xl">
             <ShieldCheck className="h-6 w-6 text-primary" /> Vérification de Sécurité
          </DialogTitle>
          <DialogDescription>
            Veuillez confirmer que vous n'êtes pas un robot pour continuer.
          </DialogDescription>
        </DialogHeader>

        <div className="flex items-center space-x-2 py-6 justify-center">
          <Checkbox 
            id="robot-check" 
            checked={isChecked}
            onCheckedChange={(checked) => setIsChecked(Boolean(checked))}
            aria-label="Je ne suis pas un robot"
          />
          <Label htmlFor="robot-check" className="text-base font-medium">
            Je ne suis pas un robot
          </Label>
        </div>

        <DialogFooter>
          <Button
            type="button"
            className="w-full"
            size="lg"
            onClick={handleVerify}
            disabled={!isChecked || isVerifying}
          >
            {isVerifying ? (
              <Loader2 className="mr-2 h-5 w-5 animate-spin" />
            ) : (
              "Vérifier et Continuer"
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default BotVerificationDialog;

    