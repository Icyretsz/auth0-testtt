'use client'

import Link from "next/link";
import {useParams} from "next/navigation";


const Page = () => {
    const searchParams = useParams();
    const message = searchParams.message;
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