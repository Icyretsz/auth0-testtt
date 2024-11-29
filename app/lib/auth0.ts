import { initAuth0 } from '@auth0/nextjs-auth0';
import {NextRequest} from "next/server";
import { headers } from 'next/headers';

export const getHost = () => {
    return headers().get('host');
};

export const hasSubdomain = (host: string) => {
    if (!host) return false;
    const segments = host.split('.');
    return host.includes('localhost') ? segments.length > 1 : segments.length > 2;
};

export const getOrg = (host: string) => {
    if (!host) return undefined;
    return hasSubdomain(host) ? host.split('.')[0] : undefined;
};

export const getDomain = (host: string) => {
    //if (!host) return null;

    const segments = host.split('.');

    if (host.includes('localhost')) {
        return 'localhost'
    }

    return segments.slice(-2).join('.');
};



export const initializeAuth0 = (req : NextRequest): ReturnType<typeof initAuth0> => {
    const host = getHost()
    const domain = getDomain(host!)

    return initAuth0({
        baseURL: process.env.NODE_ENV === 'production' ? `https://${host}` : `http://${host}`,
        secret: process.env['AUTH0_SECRET'],
        issuerBaseURL: process.env['AUTH0_ISSUER_BASE_URL'],
        clientID: process.env['AUTH0_CLIENT_ID'],
        clientSecret: process.env['AUTH0_CLIENT_SECRET'],
        transactionCookie: {
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production',
            domain: process.env.NODE_ENV === 'production' ? `.${domain}` : undefined,
        },
        session: {
            cookie: {
                httpOnly: true,
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                secure: process.env.NODE_ENV === 'production',
                domain: process.env.NODE_ENV === 'production' ? `.${domain}` : undefined,
            },
        },
    });
};

export default initializeAuth0
