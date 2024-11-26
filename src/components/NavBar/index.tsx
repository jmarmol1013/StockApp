'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Sheet, SheetTrigger, SheetContent } from '@/components/ui/sheet';
import { IconType } from 'react-icons';
import { FaHome } from 'react-icons/fa';
import { FaHeart } from 'react-icons/fa';
import { IoIosAddCircle } from 'react-icons/io';
import { AiOutlineStock, AiOutlineLogout, AiOutlineLogin } from 'react-icons/ai'; // Import the LogOut icon
import { usePathname, useRouter } from 'next/navigation';
import { MenuIcon } from 'lucide-react';
import { cn } from '@/lib/utils';
import { parseCookies, destroyCookie } from 'nookies'; // Import nookies to manage cookies
import { useEffect, useState } from 'react';

interface NavBarItem {
    name: string;
    path: string;
    Icon: IconType;
    loginRequired: boolean;
}

interface NavBarItemsProps {
    path: string;
    navBarItems: NavBarItem[];
    className: string;
    email: string | null;
}

export default function NavBar() {
    const [email, setEmail] = useState<string | null>(null);
    const pathName = usePathname();
    const router = useRouter();

    const handleSignOut = () => {
        destroyCookie(null, 'userEmail');
        destroyCookie(null, 'authToken');
        router.push('/login');
    };

    useEffect(() => {
        const cookies = parseCookies();
        const storedEmail = cookies.userEmail || null;
        setEmail(storedEmail);
    }, []);

    const navBarItems: NavBarItem[] = [
        {
            name: 'Dashboard',
            path: '/dashboard',
            Icon: FaHome,
            loginRequired: false,
        },
        {
            name: 'Stocks',
            path: '/stocks',
            Icon: AiOutlineStock,
            loginRequired: false,
        },
        {
            name: 'Favorites',
            path: '/favorites',
            Icon: FaHeart,
            loginRequired: true,
        },
        {
            name: 'Manage stocks',
            path: '/manage',
            Icon: IoIosAddCircle,
            loginRequired: false,
        },
    ];

    return (
        <header className="sticky top-0 z-50 w-full items-center border-b bg-primary py-2 text-white">
            <div className="max-w-8xl container mx-auto flex h-16 items-center justify-between px-4 md:px-6">
                <Link href="/dashboard" className="items-center" prefetch={false}>
                    <span className="text-xl font-bold lg:text-3xl">Stockify</span>
                    <br></br>
                    <span className="lg:text-lg">Simplifying your stock management journey.</span>
                </Link>
                <nav className="hidden items-center gap-6 text-lg md:flex">
                    <NavBarItem
                        path={pathName}
                        navBarItems={navBarItems}
                        className="flex items-center gap-x-2"
                        email={email}
                    />
                    {email != null ? (
                        <Button
                            onClick={handleSignOut}
                            variant="ghost"
                            className="flex items-center gap-2 font-medium text-white hover:bg-transparent"
                        >
                            <AiOutlineLogout className="h-5 w-5" />
                            Sign Out
                        </Button>
                    ) : (
                        <Link href={'/login'}>
                            <Button
                                variant="ghost"
                                className="flex items-center gap-2 font-medium text-white hover:bg-transparent"
                            >
                                <AiOutlineLogin className="h-5 w-5" />
                                Login
                            </Button>
                        </Link>
                    )}
                </nav>
                <div className="flex items-center gap-4 lg:hidden">
                    <Sheet>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon" className="rounded-full md:hidden">
                                <MenuIcon className="h-5 w-5" />
                                <span className="sr-only">Toggle navigation menu</span>
                            </Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="md:hidden">
                            <div className="grid gap-4 p-4">
                                <NavBarItem
                                    path={pathName}
                                    navBarItems={navBarItems}
                                    className="flex items-center gap-x-4 text-lg font-medium text-white"
                                    email={email}
                                />
                            </div>
                        </SheetContent>
                    </Sheet>
                </div>
            </div>
        </header>
    );
}

const NavBarItem = ({ path, navBarItems, className, email }: NavBarItemsProps) => {
    return (
        <>
            {navBarItems.map((item, index) => {
                if (item.loginRequired && email == null) return;
                return (
                    <Link
                        key={index}
                        href={item.path}
                        className={cn(`${item.path == path ? 'font-bold' : ''}`, className)}
                    >
                        {item.name} {<item.Icon />}
                    </Link>
                );
            })}
        </>
    );
};
