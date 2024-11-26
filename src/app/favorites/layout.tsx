import { Footer } from '@/components/Footer';
import NavBar from '@/components/NavBar';

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode;
}>) {
    return (
        <div className="flex flex-col min-h-screen bg-quaternary">
            <NavBar />
            <main className="flex-grow">{children}</main>
            <Footer />
        </div>
    );
}
