
'use server';

import { WorkOS } from '@workos-inc/node';
import { redirect } from 'next/navigation';

// Initialize WorkOS
const workos = new WorkOS(process.env.WORKOS_API_KEY);
const clientId = process.env.WORKOS_CLIENT_ID;

if (!clientId) {
  throw new Error('WORKOS_CLIENT_ID is not set');
}

/**
 * Sends a one-time password (OTP) to the user's phone number using WorkOS.
 * @param phoneNumber The phone number to send the OTP to (must be in E.164 format).
 * @returns An object containing the authentication session ID.
 */
export async function sendOtp(phoneNumber: string): Promise<{ sessionId: string }> {
  try {
    const { id, type } = await workos.userManagement.sendMagicAuthCode({
      type: 'sms',
      phoneNumber,
    });

    console.log(`WorkOS passwordless session (${type}) created with ID: ${id}`);
    return { sessionId: id };
  } catch (error: any) {
    console.error('WorkOS sendOtp error:', error);
    // You might want to map specific WorkOS errors to user-friendly messages
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

    