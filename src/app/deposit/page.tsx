
"use client";

import * as React from "react";
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { ArrowDownToLine, Smartphone, Loader2 } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import PhoneNumberInput from "@/components/phone-number-input"; // Import the new component

// Schema for deposit validation
const depositSchema = z.object({
  amount: z.coerce
    .number()
    .min(500, "Le montant minimum est de 500 FCFA.")
    .max(500000, "Le montant maximum est de 500 000 FCFA."),
  method: z.enum(["wave", "orange_money"], {
    required_error: "Veuillez sélectionner une méthode de dépôt.",
  }),
  phoneNumber: z.string()
    .min(9, "Le numéro de téléphone est requis.") // Adjusted for international format
    .refine(phone => /^\+\d{10,}$/.test(phone), "Format de numéro de téléphone invalide.")
}).refine((data) => {
    if ((data.method === "wave" || data.method === "orange_money") && !data.phoneNumber) {
        return false;
    }
    return true;
}, {
    message: "Le numéro de téléphone est requis pour cette méthode.",
    path: ["phoneNumber"],
});


type DepositFormValues = z.infer<typeof depositSchema>;


export default function DepositPage() {
    const { toast } = useToast();
    const router = useRouter();
    const [isSubmitting, setIsSubmitting] = React.useState(false);

    const form = useForm<DepositFormValues>({
        resolver: zodResolver(depositSchema),
        defaultValues: {
            amount: 500,
            phoneNumber: "+221",
            method: undefined,
        },
    });

    const onSubmit = async (data: DepositFormValues) => {
        setIsSubmitting(true);
        const methodDisplay = data.method === 'wave' ? 'Wave' : 'Orange Money';
        toast({
            title: "Traitement du Dépôt...",
            description: `Tentative de dépôt de ${data.amount.toLocaleString('fr-FR')} FCFA via ${methodDisplay} sur le numéro ${data.phoneNumber}.`,
        });

        console.log("Deposit attempt:", data);

        await new Promise(resolve => setTimeout(resolve, 2000));
        const success = Math.random() > 0.1;
        setIsSubmitting(false);

        if (success) {
            toast({
                title: "Dépôt Réussi",
                description: `${data.amount.toLocaleString('fr-FR')} FCFA ont été ajoutés à votre portefeuille. Redirection...`,
            });
            setTimeout(() => router.push('/dashboard'), 1500);
        } else {
            toast({
                title: "Échec du Dépôt",
                description: "Impossible de traiter le dépôt pour le moment. Veuillez réessayer.",
                variant: "destructive",
            });
        }
    };

  return (
    <div className="container mx-auto px-4 py-8 max-w-lg">
        <div className="flex items-center justify-between mb-6">
            <h1 className="text-3xl font-bold text-primary flex items-center gap-3">
                <ArrowDownToLine className="h-7 w-7" /> Effectuer un Dépôt
            </h1>
            <Link href="/dashboard" className="text-sm text-muted-foreground hover:text-primary">
                Retour au tableau de bord
            </Link>
        </div>
        <p className="text-muted-foreground mb-8">
            Ajoutez des fonds à votre portefeuille via Mobile Money.
        </p>

        <Card className="shadow-lg border">
            <CardHeader>
                <CardTitle>Déposer des fonds</CardTitle>
                <CardDescription>Entrez le montant et choisissez votre opérateur.</CardDescription>
            </CardHeader>
            <CardContent>
                <Form {...form}>
                    <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                        <FormField
                            control={form.control}
                            name="amount"
                            render={({ field }) => (
                                <FormItem>
                                    <FormLabel>Montant (FCFA)</FormLabel>
                                    <FormControl>
                                        <Input type="number" placeholder="Ex: 5000" {...field} min="500" step="100" />
                                    </FormControl>
                                    <FormDescription>
                                        Minimum 500 FCFA.
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />

                        <FormField
                          control={form.control}
                          name="method"
                          render={({ field }) => (
                            <FormItem>
                              <FormLabel>Méthode de Dépôt</FormLabel>
                              <Select onValueChange={field.onChange} defaultValue={field.value}>
                                <FormControl>
                                  <SelectTrigger>
                                    <SelectValue placeholder="Sélectionnez un opérateur..." />
                                  </SelectTrigger>
                                </FormControl>
                                <SelectContent>
                                  <SelectItem value="wave">
                                       <span className="flex items-center gap-2">
                                          <Smartphone className="h-4 w-4 text-purple-600"/> Wave
                                       </span>
                                  </SelectItem>
                                  <SelectItem value="orange_money">
                                      <span className="flex items-center gap-2">
                                          <Smartphone className="h-4 w-4 text-orange-600"/> Orange Money
                                       </span>
                                  </SelectItem>
                                </SelectContent>
                              </Select>
                              <FormMessage />
                            </FormItem>
                          )}
                        />

                         {(form.watch("method") === "wave" || form.watch("method") === "orange_money") && (
                           <FormField
                              control={form.control}
                              name="phoneNumber"
                              render={({ field }) => (
                                <FormItem>
                                  <FormLabel className="flex items-center gap-1.5"><Smartphone className="h-4 w-4 text-muted-foreground"/> Numéro de téléphone Mobile Money</FormLabel>
                                  <FormControl>
                                      <PhoneNumberInput
                                        value={field.value}
                                        onChange={field.onChange}
                                      />
                                  </FormControl>
                                  <FormMessage />
                                </FormItem>
                              )}
                            />
                         )}


                        <Button type="submit" disabled={isSubmitting} className="w-full" size="lg">
                            {isSubmitting ? (
                                <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            ) : (
                                <ArrowDownToLine className="mr-2 h-5 w-5" />
                            )}
                            Confirmer le Dépôt
                        </Button>
                    </form>
                </Form>
            </CardContent>
        </Card>

        <div className="mt-6 text-center text-xs text-muted-foreground">
            Les dépôts sont traités de manière sécurisée.
        </div>
    </div>
  );
}
