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
                }
            );

            if (!response.ok) {
                const errorData = await response.text();
                throw new Error(errorData || 'Registration failed');
            }

            const data = await response.json();
            console.log('Registration successful:', data);

            
            router.push('/login');
        } catch (err: any) {
            setError(err.message);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-quanternary">
            <div className="w-full max-w-2xl p-12 bg-white rounded-lg shadow-xl">
                <h1 className="text-4xl font-bold text-center mb-8">Register</h1>
                <form className="mt-6" onSubmit={handleRegister}>
                    {error && <p className="text-red-500 text-center">{error}</p>}
                    <div className="mb-6">
                        <label htmlFor="firstName" className="block text-lg mb-2">
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
                        <label htmlFor="lastName" className="block text-lg mb-2">
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
                        <label htmlFor="username" className="block text-lg mb-2">
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
                        <label htmlFor="password" className="block text-lg mb-2">
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
                        className="w-full rounded bg-primary p-4 text-white text-lg"
                    >
                        Register
                    </button>
                </form>
            </div>
        </div>
    );
}
