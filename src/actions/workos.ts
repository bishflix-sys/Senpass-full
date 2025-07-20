
'use server';

import { WorkOS } from '@workos-inc/node';
import { redirect } from 'next/navigation';

// Initialize WorkOS
const workos = new WorkOS(process.env.WORKOS_API_KEY);
const clientId = process.env.WORKOS_CLIENT_ID;

if (!clientId) {
  throw new Error('WORKOS_CLIENT_ID is not set');
}

interface SignInParams {
  email: string;
  password?: string; // Password might not be needed for all auth types
}

/**
 * Authenticates a user with their email and password using WorkOS.
 * On success, it will redirect the user to the dashboard.
 * @param params Object containing the email and password.
 */
export async function signInWithEmailPassword({ email, password }: SignInParams): Promise<void> {
  if (!password) {
    throw new Error('Password is required for this sign-in method.');
  }
  
  try {
    const { user, accessToken, refreshToken } = await workos.userManagement.authenticateWithPassword({
      email,
      password,
      clientId,
    });

    console.log('WorkOS user authenticated with password:', user.id);

    // IMPORTANT: In a real application, you would handle session management here.
    // This typically involves:
    // 1. Encrypting the accessToken and refreshToken.
    // 2. Setting them in secure, httpOnly cookies.
    // 3. Creating a user session in your database if one doesn't exist.

    // For this demonstration, we are skipping robust session management and just redirecting.

  } catch (error: any) {
    console.error('WorkOS password authentication error:', error);
    // Provide a more generic error to the user for security.
    if (error.code === 'invalid_credentials' || error.status === 401) {
        throw new Error('Les informations de connexion sont incorrectes.');
    }
    throw new Error('La connexion a échoué. Veuillez réessayer.');
  }

  // Redirect to the dashboard on successful authentication.
  // This must be called outside the try/catch block.
  redirect('/dashboard');
}

/**
 * Sends a one-time password (OTP) to the user's email address using WorkOS.
 * @param email The email address to send the OTP to.
 * @returns An object containing the authentication session ID.
 */
export async function sendOtp(email: string): Promise<{ sessionId: string }> {
  try {
    const { id, type } = await workos.userManagement.sendMagicAuthCode({
      type: 'email',
      email,
    });

    console.log(`WorkOS passwordless session (${type}) created with ID: ${id}`);
    return { sessionId: id };
  } catch (error: any) {
    console.error('WorkOS sendOtp error:', error);
    // You might want to map specific WorkOS errors to user-friendly messages
    if (error.code === 'email_is_invalid') {
        throw new Error("L'adresse e-mail fournie est invalide.");
    }
    throw new Error(error.message || 'Failed to send OTP via WorkOS.');
  }
}

interface VerifyOtpAndSignInParams {
  code: string;
  sessionId: string;
}

/**
 * Verifies the OTP and signs the user in by creating a session.
 * On success, it will redirect the user to the dashboard.
 * @param params Object containing the OTP code and the session ID.
 */
export async function verifyOtpAndSignIn({ code, sessionId }: VerifyOtpAndSignInParams): Promise<void> {
  try {
    const { user, accessToken, refreshToken } = await workos.userManagement.authenticateWithPasswordlessSession({
      code,
      sessionId,
      clientId,
    });

    console.log('WorkOS user authenticated with OTP:', user.id);

    // IMPORTANT: In a real application, you would handle session management here.
    // This typically involves:
    // 1. Encrypting the accessToken and refreshToken.
    // 2. Setting them in secure, httpOnly cookies.
    // 3. Creating a user session in your database if one doesn't exist.

    // For this demonstration, we are skipping robust session management and just redirecting.
    
  } catch (error: any) {
    console.error('WorkOS verifyOtp error:', error);
    // Provide a more generic error to the user for security.
    if (error.code === 'magic_auth_invalid_code' || error.code === 'magic_auth_rate_limited') {
        throw new Error('Le code de vérification est invalide ou a expiré.');
    }
    throw new Error('Failed to verify OTP.');
  }

  // Redirect to the dashboard on successful authentication.
  // This must be called outside the try/catch block.
  redirect('/dashboard');
}
