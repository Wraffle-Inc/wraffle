import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';
import {getSession} from '@/shared/util/auth/server';

const PUBLIC_ROUTES = ['/login', '/join'];
const LOGIN = '/login';
const MAIN = '/';

export async function middleware(req: NextRequest) {
  const {nextUrl} = req;
  const session = await getSession();

  const isAuthenticated = !!session;

  const isPublicRoute = PUBLIC_ROUTES.find(route =>
    nextUrl.pathname.startsWith(route),
  );

  if (isAuthenticated && isPublicRoute) {
    return NextResponse.redirect(new URL(MAIN, req.url));
  }

  if (!isAuthenticated && !isPublicRoute) {
    return NextResponse.redirect(new URL(LOGIN, nextUrl));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|.*\\.png$).*)'],
};
