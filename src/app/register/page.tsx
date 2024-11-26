'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleRegister = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASIC_API_PATH}${process.env.NEXT_PUBLIC_USERS_OVERVIEW}/register`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        email: username,
                        password,
                        firstName,
                        lastName,
                    }),
                },
            );

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Registration failed');
            }

            const data = await response.json();

            router.push('/login');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-quanternary">
            <div className="w-full max-w-2xl rounded-lg bg-white p-12 shadow-xl">
                <h1 className="mb-8 text-center text-4xl font-bold">Register</h1>
                <form className="mt-6" onSubmit={handleRegister}>
                    {error && <p className="text-center text-red-500">{error}</p>}
                    <div className="mb-6">
                        <label htmlFor="firstName" className="mb-2 block text-lg">
                            First Name:
                        </label>
                        <input
                            type="text"
                            id="firstName"
                            value={firstName}
                            onChange={(e) => setFirstName(e.target.value)}
                            className="w-full rounded border p-4"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="lastName" className="mb-2 block text-lg">
                            Last Name:
                        </label>
                        <input
                            type="text"
                            id="lastName"
                            value={lastName}
                            onChange={(e) => setLastName(e.target.value)}
                            className="w-full rounded border p-4"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="username" className="mb-2 block text-lg">
                            Email:
                        </label>
                        <input
                            type="email"
                            id="username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full rounded border p-4"
                            required
                        />
                    </div>
                    <div className="mb-6">
                        <label htmlFor="password" className="mb-2 block text-lg">
                            Password:
                        </label>
                        <input
                            type="password"
                            id="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full rounded border p-4"
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="w-full rounded bg-primary p-4 text-lg text-white"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
