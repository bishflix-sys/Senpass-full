
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { adminApp } from '@/lib/firebase-admin';

// Initialize Firebase Admin SDK
adminApp();

// Schema for registration data validation
const registerSchema = z.object({
  email: z.string().email({ message: "Adresse e-mail invalide." }),
  password: z.string().min(8, { message: "Le mot de passe doit contenir au moins 8 caractères." }),
  fullName: z.string().min(2, { message: "Le nom complet est requis." }),
  cniOrPassport: z.string().min(5, { message: "Le numéro CNI/Passeport est requis." }),
  issueDate: z.string().min(1, { message: "La date d'émission est requise." }), // Accept as string, as sent by client
  region: z.string().min(1, { message: "La région est requise." }),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      // Return a more detailed error response
      return NextResponse.json({ 
          error: 'Invalid input', 
          details: validation.error.flatten().fieldErrors 
      }, { status: 400 });
    }

    const { email, password, fullName, cniOrPassport, issueDate, region } = validation.data;
    const auth = getAuth();
    const db = getFirestore();

    // Create user in Firebase Authentication
    const userRecord = await auth.createUser({
      email,
      password,
      displayName: fullName,
    });

    // Store additional user info in Firestore
    await db.collection('users').doc(userRecord.uid).set({
      fullName,
      email,
      cniOrPassport,
      issueDate,
      region, // Save the region
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, uid: userRecord.uid }, { status: 201 });

  } catch (error: any) {
    console.error('[REGISTER_API_ERROR]', error);

    // Handle specific Firebase errors
    if (error.code === 'auth/email-already-exists') {
        return NextResponse.json({ error: 'Cet e-mail est déjà utilisé.', code: 'auth/email-already-exists' }, { status: 409 }); // 409 Conflict
    }

    return NextResponse.json({ error: 'Une erreur interne est survenue.' }, { status: 500 });
  }
}
