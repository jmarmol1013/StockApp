import { editProfile } from '@/actions/stock';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '../ui/button';
import { useRouter } from 'next/navigation';
import { destroyCookie } from 'nookies';

interface PersonalInformation {
    firstName: string;
    lastName: string;
    email: string;
    isAdmin: boolean;
}
interface ProfileSectionProps {
    email: string;
}

export const ProfileSection = ({ email }: ProfileSectionProps) => {
    const router = useRouter();
    const [personalInformation, setPersonalInformation] = useState<PersonalInformation>();
    const [isEditing, setIsEditing] = useState<boolean>(false);

    useEffect(() => {
        const getPersonalInformation = async () => {
            const response = await fetch(
                `${process.env.NEXT_PUBLIC_BASIC_API_PATH}/Users/${email}`,
            );

            const data = await response.json();
            setPersonalInformation(data);
        };

        getPersonalInformation();
    }, [personalInformation]);

    const form = useForm<EditProfile>({
        defaultValues: {
            firstName: personalInformation?.firstName,
            lastName: personalInformation?.lastName,
        },
    });

    async function onSubmit(values: EditProfile) {
        const formData = new FormData();
        formData.append('firstName', values.firstName);
        formData.append('lastName', values.lastName);
        formData.append('email', email);

        await editProfile(formData);
        setIsEditing(false);
    }

    const handleDelete = async () => {
        await fetch(`${process.env.NEXT_PUBLIC_BASIC_API_PATH}/Users/${email}`, {
            method: 'DELETE',
        });

        destroyCookie(null, 'userEmail');
        destroyCookie(null, 'authToken');
        router.push('/login');
    };

    if (!email) return <></>;

    return (
        <div className="mt-4">
            <h3 className="text-2xl font-bold text-primary">Your personal Information</h3>
            <div className="mt-2 gap-y-6 text-xl">
                <p>
                    <span className="font-bold text-tertiary">First name:</span>{' '}
                    {personalInformation?.firstName}
                </p>
                <p>
                    <span className="font-bold text-tertiary">Last name:</span>{' '}
                    {personalInformation?.lastName}
                </p>
                <p>
                    <span className="font-bold text-tertiary">Email:</span> {email}
                </p>
            </div>
            <div className="flex gap-x-6">
                <button
                    className="mt-8 w-auto rounded-xl bg-secondary p-4 text-xl text-white"
                    onClick={() => setIsEditing(!isEditing)}
                >
                    Edit Profile
                </button>
                <button
                    onClick={() => handleDelete()}
                    className="mt-8 w-auto rounded-xl bg-red-500 p-4 text-xl text-white"
                >
                    Delete Profile
                </button>
            </div>
            {isEditing && (
                <div className="mt-4">
                    <h3 className="text-xl text-secondary">Edit Your Information</h3>
                    <Form {...form}>
                        <form
                            onSubmit={form.handleSubmit(onSubmit)}
                            className="mt-4 space-y-8 rounded-xl bg-white p-6"
                        >
                            <div className="flex flex-wrap items-center space-y-4">
                                <FormField
                                    control={form.control}
                                    name="firstName"
                                    render={({ field }) => (
                                        <FormItem className="w-1/3">
                                            <FormLabel>First Name:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Juan"
                                                    className="w-[30%] rounded-xl border-2 border-primary placeholder:text-gray-500"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="lastName"
                                    render={({ field }) => (
                                        <FormItem className="w-1/3">
                                            <FormLabel>Last name:</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    placeholder="Marmolejo"
                                                    className="w-[30%] rounded-xl border-2 border-primary placeholder:text-gray-500"
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex gap-x-4">
                                <Button type="submit" className="rounded-xl text-white">
                                    Edit
                                </Button>
                                <Button
                                    type="button"
                                    onClick={() => setIsEditing(!isEditing)}
                                    className="rounded-xl bg-secondary text-white hover:bg-secondary"
                                >
                                    Cancel
                                </Button>
                            </div>
                        </form>
                    </Form>
                </div>
            )}
        </div>
    );
};
