import {withMiddlewareAuthRequired} from '@auth0/nextjs-auth0/edge';
export default withMiddlewareAuthRequired()

// import { NextRequest, NextResponse } from 'next/server';
//
// export default async function middleware(req: NextRequest) {
//
//   const hostHeader = req.headers.get('host');
//
//   const hostnameParts = hostHeader?.split('.');
//
//   const hasSubdomain = hostnameParts && hostnameParts.length > 2;
//
//   if (hasSubdomain && req.nextUrl.pathname !== '/api/auth/callback') {
//
//     const orgName = hostnameParts[0];
//
//     const auth0Url = new URL(`${process.env.AUTH0_ISSUER_BASE_URL}/authorize`);
//     auth0Url.searchParams.append('client_id', `${process.env.AUTH0_CLIENT_ID}`);
//     auth0Url.searchParams.append('response_type', 'code');
//     auth0Url.searchParams.append('redirect_uri', `https://${hostHeader}/api/auth/callback`);
//     auth0Url.searchParams.append('scope', 'openid profile email');
//     auth0Url.searchParams.append('organization', `${orgName}`);
//
//     return NextResponse.redirect(auth0Url.toString());
//   }
//
//   return NextResponse.next();
// }