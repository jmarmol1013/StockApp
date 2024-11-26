'use client';

import { HelloSection } from '@/components/HelloSection';
import { ProfileSection } from '@/components/ProfileSection';
import { parseCookies } from 'nookies';
import { useEffect, useState } from 'react';

export default function Page() {
    const [email, setEmail] = useState<string>('');

    useEffect(() => {
        const cookies = parseCookies();
        const storedEmail = cookies.userEmail;
        setEmail(storedEmail);
    }, []);

    return (
        <div className="min-h-screen bg-quanternary">
            <div className="mx-auto pt-8 md:w-[70%]">
                <h1 className="text-4xl font-bold text-tertiary">Your profile</h1>
                <h2 className="mt-2 text-lg">
                    <HelloSection />
                </h2>
                <ProfileSection email={email} />
            </div>
        </div>
    );
}
