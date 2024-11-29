'use client'
import React from 'react';
import {UserProfile, useUser} from "@auth0/nextjs-auth0/client";

interface UserProfileWithOrgName extends UserProfile {
    org_name: string;
}

const Page = () => {

    const {user} = useUser()
    const userWithOrg = user as UserProfileWithOrgName | undefined

    return (
        <div>
            <h1 style={{fontSize: 50}}>This is {userWithOrg?.org_name} page</h1>
            Welcome {userWithOrg?.name}
            <div><a href='/api/auth/logout'>Logout</a></div>
        </div>
    );
};

export default Page;
