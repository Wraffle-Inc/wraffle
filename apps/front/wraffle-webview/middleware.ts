import type {NextRequest} from 'next/server';
import {NextResponse} from 'next/server';
import {auth} from '@/shared/util/auth';

const PUBLIC_ROUTES = ['/login', '/join'];
const LOGIN = '/login';
const MAIN = '/';

export async function middleware(req: NextRequest) {
  const {nextUrl} = req;
  const session = await auth();

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
  matcher: ['/((?!_next/static|_next/image|favicon.ico|api).*)'],
};
