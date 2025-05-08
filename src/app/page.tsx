// src/app/page.tsx
import { redirect } from 'next/navigation';

export default function RootPage() {
  // This component will be server-rendered and will issue a redirect.
  redirect('/login');
  // Next.js documentation recommends not returning anything after a redirect
  // or returning null, as the redirect will interrupt rendering.
  // In practice, `redirect` throws an error that Next.js catches to perform the redirect.
}
