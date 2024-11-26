import { StockDetails } from '@/components/StockDetails';
import Link from 'next/link';
import { FaArrowLeft } from 'react-icons/fa';

export default async function Page({ params }: { params: Promise<{ id: string }> }) {
    const id = (await params).id;

    const responseStockDetail = await fetch(
        `${process.env.NEXT_PUBLIC_BASIC_API_PATH}${process.env.NEXT_PUBLIC_STOCKS_OVERVIEW}/${id}`,
        {
            cache: 'no-store',
        },
    );

    const dataStockDetail: StockDetail = await responseStockDetail.json();
    const stockHistory = await dataStockDetail.stockHistory;

    return (
        <div className="min-h-screen bg-quanternary">
            <div className="mx-auto py-8 md:w-[70%]">
                <Link href={'/stocks'}>
                    <button className="rounded-xl bg-secondary p-4 text-white">
                        <FaArrowLeft size={18} />
                    </button>
                </Link>
                <h1 className="mt-6 text-4xl text-tertiary">
                    Stock Detail For<span className="font-bold text-tertiary">{id}</span>
                </h1>
                <h2 className="mt-2 text-lg">
                    Use this form to update the stock on the system for date. Please ensure all
                    required fields are completed with accurate information.
                </h2>
                <StockDetails stockSymbol={id} stockData={stockHistory} />
            </div>
        </div>
    );
}
