import { initAuth0 } from '@auth0/nextjs-auth0';
import {NextApiRequest} from 'next'
import {headers} from "next/headers";

const getHost = () => {
    return headers().get('host');
};

export const initializeAuth0 = (req : NextApiRequest): ReturnType<typeof initAuth0> => {
    const host = getHost()
    const hostParts = host?.split('.')
    return initAuth0({
        baseURL: `http://${host}`,
        secret: process.env.AUTH0_SECRET,
        issuerBaseURL: process.env.AUTH0_ISSUER_BASE_URL,
        clientID: process.env.AUTH0_CLIENT_ID,
        clientSecret: process.env.AUTH0_CLIENT_SECRET,
        transactionCookie: {
            sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
            secure: process.env.NODE_ENV === 'production',
            domain: process.env.NODE_ENV === 'production' && hostParts ? `.${hostParts[1]}.${hostParts[2]}` : undefined,
        },
        session: {
            cookie: {
                sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
                secure: process.env.NODE_ENV === 'production',
                domain: process.env.NODE_ENV === 'production' && hostParts ? `.${hostParts[1]}.${hostParts[2]}` : undefined,
            }
        }
    })
}