
import {NextResponse} from 'next/server';
import {z} from 'zod';
import {getAuth} from 'firebase-admin/auth';
import {adminApp} from '@/lib/firebase-admin';

// Initialize Firebase Admin SDK
adminApp();

const sessionLoginSchema = z.object({
  idToken: z.string().min(1, {message: 'ID token is required'}),
});

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validation = sessionLoginSchema.safeParse(body);

    if (!validation.success) {
      return NextResponse.json(
        {error: 'Invalid input', details: validation.error.flatten()},
        {status: 400}
      );
    }

    const {idToken} = validation.data;
    const auth = getAuth();

    // Set session expiration to 5 days.
    const expiresIn = 60 * 60 * 24 * 5 * 1000;

    // Create the session cookie. This will also verify the ID token.
    const sessionCookie = await auth.createSessionCookie(idToken, {expiresIn});

    // Set cookie policy for session cookie.
    const options = {
      name: 'session',
      value: sessionCookie,
      maxAge: expiresIn,
      httpOnly: true,
      secure: true,
    };

    const response = NextResponse.json({success: true}, {status: 200});
    response.cookies.set(options);

    return response;
  } catch (error: any) {
    console.error('[SESSION_LOGIN_API_ERROR]', error);
     // Handle specific Firebase auth errors
    if (error.code && error.code.startsWith('auth/')) {
       return NextResponse.json({ error: 'Failed to verify token', code: error.code }, { status: 401 });
    }
    return NextResponse.json(
      {error: 'An internal server error occurred'},
      {status: 500}
    );
  }
}
