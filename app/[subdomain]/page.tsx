'use client'

import {useUser} from "@auth0/nextjs-auth0/client";


const Page = () => {

  const { user } = useUser()

  return (
    <div>
      Welcome {user?.name}
        {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
        <a href="/api/auth/logout">Logout</a>
    </div>
  );
};

export default Page;
