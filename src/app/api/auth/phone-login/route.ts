
import {NextResponse} from 'next/server';
import {z} from 'zod';
import { isValidPhoneNumber } from 'libphonenumber-js';

// Schéma de validation pour le login par téléphone
const phoneLoginSchema = z.object({
  phoneNumber: z.string().refine(isValidPhoneNumber, { message: 'Numéro de téléphone invalide.' }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = phoneLoginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {error: validation.error.flatten().fieldErrors.phoneNumber?.[0] || 'Données invalides'},
        {status: 400}
      );
    }

    const { phoneNumber } = validation.data;
    
    // --- Logique d'envoi d'OTP (simulée) ---
    // Dans une vraie application, vous appelleriez un service comme Twilio ou Firebase Auth
    // pour envoyer un SMS OTP à `phoneNumber`.
    
    console.log(`[PHONE_LOGIN] Simulation d'envoi d'OTP au ${phoneNumber}`);
    
    // Simuler un OTP pour la démonstration
    const simulatedOtp = "123456"; 
    
    return NextResponse.json(
        {
            success: true, 
            message: `Un code de vérification a été envoyé au ${phoneNumber}.`,
            // NE PAS renvoyer l'OTP en production. Ceci est uniquement pour la démo.
            otp: simulatedOtp 
        },
        {status: 200}
    );

  } catch (error) {
    console.error('[PHONE_LOGIN_API_ERROR]', error);
    return NextResponse.json(
      {error: 'Une erreur interne est survenue'},
      {status: 500}
    );
  }
}
