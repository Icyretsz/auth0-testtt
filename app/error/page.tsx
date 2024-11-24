'use client'

import Link from "next/link";
import {useSearchParams} from "next/navigation";


const Page = () => {
    const searchParams = useSearchParams();
    const message = searchParams.get('message') || 'An unexpected error occurred. Please try again.';
    console.log('message:',message);

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