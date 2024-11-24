'use client';
import {useUser} from '@auth0/nextjs-auth0/client';

const User = () => {

  const {user} = useUser();

  return (
    <>
      {user && (
        <div>
          <p>Hello, {user?.name}</p>
          {/* eslint-disable-next-line @next/next/no-html-link-for-pages */}
          <a href="/api/auth/logout">Logout</a>
        </div>
      )}
    </>
  );

  // console.log(user)
  //
  // return <div>Hello guest!</div>;
};

export default User;
