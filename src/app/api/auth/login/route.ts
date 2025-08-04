

import {NextResponse} from 'next/server';
import {z} from 'zod';
import { getAuth } from 'firebase-admin/auth';
import { adminApp } from '@/lib/firebase-admin'; // Import adminApp

// Initialize Firebase Admin SDK
adminApp();

// This entire route is now deprecated in favor of the session-login flow.
// The logic has been moved to the client-side login page and the /api/auth/session-login route.
// It is kept here to avoid breaking changes if any old client is still using it,
// but it should not be used for new implementations.

export async function POST(request: Request) {
  console.warn("[DEPRECATED] /api/auth/login is deprecated. Use client-side sign-in and /api/auth/session-login instead.");
  
  return NextResponse.json(
    { error: 'This login endpoint is deprecated. Please update your client application.' },
    { status: 410 } // 410 Gone
  );
}
