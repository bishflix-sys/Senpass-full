
import {NextResponse} from 'next/server';
import {cookies} from 'next/headers';

export async function POST() {
  try {
    // Clear the session cookie
    const options = {
      name: 'session',
      value: '',
      maxAge: -1, // Expire the cookie immediately
    };

    const response = NextResponse.json({success: true}, {status: 200});
    response.cookies.set(options);

    return response;
  } catch (error) {
    console.error('[LOGOUT_API_ERROR]', error);
    return NextResponse.json(
      {error: 'An internal server error occurred'},
      {status: 500}
    );
  }
}
