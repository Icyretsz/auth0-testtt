import { NextApiRequest, NextApiResponse } from 'next';
import {headers} from 'next/headers';
import { initializeAuth0 } from '@/app/lib/auth0';
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

export const GET = (req: NextRequest, res: NextResponse) => {
    const auth0 = initializeAuth0(req);
    return auth0.handleAuth({
        async login(req: NextApiRequest, res: NextApiResponse) {
            const host = getHost();
            if (host) {
                const orgName = getOrg(host);
                const hostParts = host?.split('.')
                if (orgName) {
                    return await auth0.handleLogin(req, res, {
                        authorizationParams: { organization: `${orgName}` },
                        returnTo: `https://aicrm.club/${orgName}`,
                    });
                }
                return await auth0.handleLogin(req, res);
            }
        },
    })(req, res);
};