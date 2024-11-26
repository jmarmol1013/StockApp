'use client';

import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';

export const HelloSection = () => {
    const [email, setEmail] = useState<string | null>(null);

    useEffect(() => {
        const cookies = parseCookies();
        const storedEmail = cookies.userEmail || null;
        setEmail(storedEmail);
    }, []);

    return email != null ? (
        <>
            Hello, <span className="text-primary">{email}</span>!{' '}
        </>
    ) : (
        <></>
    );
};
