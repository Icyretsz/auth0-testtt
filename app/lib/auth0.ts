import {initAuth0} from '@auth0/nextjs-auth0';
import {NextApiRequest} from 'next'
import {headers} from "next/headers";
import {NextRequest} from "next/server";

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

export const initializeAuth0 = (req: NextRequest): ReturnType<typeof initAuth0> => {
    const host = getHost()
    return initAuth0({
        baseURL: `https://${host}`,
        secret: process.env.AUTH0_SECRET,
        issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        transactionCookie: {
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production',
            domain: process.env.NODE_ENV === 'production' ? `.aicrm.club` : undefined,
        },
        session: {
            cookie: {
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                secure: process.env.NODE_ENV === 'production',
                domain: process.env.NODE_ENV === 'production' ? `.aicrm.club` : undefined,
            }
        }
    })

}