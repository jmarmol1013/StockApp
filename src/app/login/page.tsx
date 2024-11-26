'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { setCookie } from 'nookies';
import Link from 'next/link';

export default function LoginPage() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASIC_API_PATH}${process.env.NEXT_PUBLIC_USERS_OVERVIEW}/login`,
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({ email: username, password }),
                },
            );

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Invalid credentials');
            }

            const contentType = response.headers.get('content-type');
            let data;
            if (contentType && contentType.includes('application/json')) {
                data = await response.json();
            } else {
                data = await response.text();
            }

            // Set the user's email in a cookie
            setCookie(null, 'userEmail', username, {
                maxAge: 30 * 24 * 60 * 60,
                path: '/',
            });

            router.push('/dashboard');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="flex min-h-screen items-center justify-center bg-quanternary">
            <div className="w-full max-w-2xl rounded-lg bg-white p-12 shadow-xl">
                <h1 className="mb-8 text-center text-4xl font-bold">Login</h1>
                <form className="mt-6" onSubmit={handleLogin}>
                    {error && <p className="text-center text-red-500">{error}</p>}
                    <div className="mb-6">
                        <label htmlFor="username" className="mb-2 block text-lg">
                            Username:
                        </label>
                        <input
                            type="text"
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
                        Login
                    </button>
                </form>

                <div className="mt-6 text-center">
                    <p className="text-lg">
                        Don't have an account? <br />
                        <Link href="/register" className="text-blue-500 hover:underline">
                            Register Here
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
