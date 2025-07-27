
import { NextResponse } from 'next/server';
import { z } from 'zod';
import { getAuth } from 'firebase-admin/auth';
import { getFirestore } from 'firebase-admin/firestore';
import { adminApp } from '@/lib/firebase-admin';

// Initialize Firebase Admin SDK
adminApp();

// Schema for registration data validation
const registerSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
  fullName: z.string().min(2),
  cniOrPassport: z.string().min(5),
  issueDate: z.string().date(), // Expecting 'YYYY-MM-DD' string
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = registerSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json({ error: 'Invalid input', details: validation.error.formErrors }, { status: 400 });
    }

    const { email, password, fullName, cniOrPassport, issueDate } = validation.data;
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
      createdAt: new Date().toISOString(),
    });

    return NextResponse.json({ success: true, uid: userRecord.uid }, { status: 201 });

  } catch (error: any) {
    console.error('[REGISTER_API_ERROR]', error);

    // Handle specific Firebase errors
    if (error.code === 'auth/email-already-exists') {
        return NextResponse.json({ error: error.code }, { status: 409 }); // 409 Conflict
    }

    return NextResponse.json({ error: 'An internal error occurred' }, { status: 500 });
  }
}
