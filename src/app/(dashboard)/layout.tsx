import { Footer } from '@/components/Footer';
import NavBar from '@/components/NavBar';
import { Metadata } from 'next';

export const metadata: Metadata = {
    title: 'Stock App',
};

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <>
            <NavBar />
            {children}
            <Footer />
        </>
    );
}
