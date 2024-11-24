'use client'
import React from 'react';
import {useUser} from "@auth0/nextjs-auth0/client";
import {useParams} from "next/navigation";

const Page = () => {

  const params = useParams();
  const orgName = params.subdomain;

  const { user } = useUser()

  return (
      <div>
        <h1 style={{fontSize: 50}}>This is {orgName} page</h1>
        Welcome {user?.name}
        <div><a href='/api/auth/logout'>Logout</a></div>
      </div>
  );
};

export default Page;
