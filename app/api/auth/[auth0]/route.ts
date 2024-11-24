import {
    AfterCallbackAppRoute,
    AppRouteHandlerFnContext,
    Session
} from '@auth0/nextjs-auth0';
import {NextApiRequest, NextApiResponse} from 'next';
import {headers} from 'next/headers';
import {initializeAuth0} from '@/app/lib/auth0';
import {NextRequest, NextResponse} from "next/server";

const getHost = () => {
    return headers().get('host');
};

const hasSubdomain = (host: string) => {
    if (host.includes('localhost')) {
        return host.split('.').length > 1;
    } else {
        return host.split('.').length > 2;
    }
};

const getOrg = (host: string) => {
    if (hasSubdomain(host)) {
        return host.split('.')[0];
    } else {
        return undefined;
    }
};

const afterCallback: AfterCallbackAppRoute = (req: NextRequest, session: Session) => {
    if (session.user) {
        return session;
    }
};

export const GET = (req: NextRequest, res: NextResponse) => {
    const auth0 = initializeAuth0(req);
    return auth0.handleAuth({
            async login(req: NextApiRequest, res: NextApiResponse) {
                const host = getHost();
                if (host) {
                    const orgName = getOrg(host);
                    if (orgName) {
                        return await auth0.handleLogin(req, res, {
                            authorizationParams: {organization: `${orgName}`},
                        });
                    }
                    return await auth0.handleLogin(req, res);
                }
            },
        // @ts-ignore
        async callback(req: NextRequest, ctx: AppRouteHandlerFnContext) {
            try {
                // Attempt to handle the callback
                const res = await auth0.handleCallback(req, ctx, { afterCallback });
                // @ts-ignore
                const session = await auth0.getSession(req, res);

                const host = getHost();
                if (host) {
                    const orgName = getOrg(host);
                    if (session && orgName) {
                        return NextResponse.redirect(`https://${host}/${orgName}`, res);
                    } else if (session && session.user.org_name) {
                        return NextResponse.redirect(`https://${host}/${session.user.org_name}`, res);
                    }
                }
                return auth0.handleCallback();
            } catch (error) {
                // Custom error handling
                if (error instanceof Error) {
                    if (error.message.includes('access_denied')) {
                        const host = getHost();
                        return NextResponse.redirect(`https://${host}/error?message=${encodeURIComponent(error.message)}`);
                    }
                }
                // Fallback: rethrow the error if not handled
                throw error;
            }
        },
        },
    )(req, res);
};

