
import { NextRequest, NextResponse } from 'next/server';
import { WorkOS } from '@workos-inc/node';

const workos = new WorkOS(process.env.WORKOS_API_KEY);
const clientId = process.env.WORKOS_CLIENT_ID;

export async function GET(req: NextRequest) {
  const code = req.nextUrl.searchParams.get('code');

  if (code) {
    try {
      // Use the code to get the user's profile from WorkOS
      const { user } = await workos.userManagement.authenticateWithCode({
        code,
        clientId: clientId!,
      });

      // Here, you would typically:
      // 1. Check if the user exists in your database.
      // 2. If not, create a new user record.
      // 3. Create a session for the user (e.g., using a JWT or another session mechanism).
      // For this demonstration, we'll just log the user and redirect to the dashboard.
      
      console.log('WorkOS user authenticated:', user);

      // In a real app, you would set a session cookie here.
      // const session = await createSession(user.id);
      // const response = NextResponse.redirect(new URL('/dashboard', req.url));
      // response.cookies.set('session', session, { httpOnly: true, secure: process.env.NODE_ENV === 'production' });
      // return response;

      // For now, just redirect to the dashboard on success.
      return NextResponse.redirect(new URL('/dashboard', req.url));

    } catch (error) {
      console.error('WorkOS authentication error:', error);
      const errorResponse = {
        message: error instanceof Error ? error.message : 'An unknown error occurred',
      };
      // Redirect to login page with an error message
      const loginUrl = new URL('/login', req.url);
      loginUrl.searchParams.set('error', 'workos_auth_failed');
      loginUrl.searchParams.set('message', errorResponse.message);
      return NextResponse.redirect(loginUrl);
    }
  }

  // If no code is present, something went wrong with the initial redirect.
  const loginUrl = new URL('/login', req.url);
  loginUrl.searchParams.set('error', 'workos_missing_code');
  return NextResponse.redirect(loginUrl);
}
