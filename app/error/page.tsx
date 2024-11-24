import React from 'react';
import {NextResponse} from "next/server";
import {useRouter} from "next/router";
import Link from "next/link";


const Page = () => {
    const router = useRouter();

    const { message } = router.query;

    if (message && message.includes('access-denied')) {
        return <>
        <div>Access denied, user does not belong to organization</div>
            <Link href='/'/>
        </>
    }

    return (
        <div>

        </div>
    );
};

export default Page;