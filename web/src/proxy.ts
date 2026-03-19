import createMiddleware from 'next-intl/middleware';
import { routing } from './routing';

export default createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: [
    '/',
    '/(en|ar|de|es|fr|id|it|no|pt|sv|uk|da|fi|hi|is|ja|pl|ru|th|zh)/:path*',
    '/((?!_next|_vercel|.*\\..*).*)'
  ]
};
