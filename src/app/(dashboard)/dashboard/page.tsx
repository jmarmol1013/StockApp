import Image from 'next/image';
import stock2 from '../../../../public/stock2.jpg';
import { Overview } from '@/components/Overview';
import Link from 'next/link';

export default async function Page() {
    const responseStocksOverview = await fetch(
        `${process.env.NEXT_PUBLIC_BASIC_API_PATH}${process.env.NEXT_PUBLIC_STOCKS_OVERVIEW}`,
        {
            cache: 'no-store',
        },
    );

    const dataStocksOverview = await responseStocksOverview.json();
    const data: OverviewStocks = await dataStocksOverview.stocksData;

    return (
        <div className="min-h-screen bg-quanternary">
            <div className="relative h-[35rem] w-full overflow-hidden">
                <Image src={stock2} alt="stock image" fill priority className="object-cover" />
            </div>
            <div className="mx-[10%] mt-10 max-w-[80%] md:mx-[15%] md:max-w-[70%]">
                <h1 className="text-6xl font-bold">
                    Welcome to <span className="text-primary">Stockify</span>
                </h1>
                <h2 className="mt-2 text-xl">
                    Track, analyze, and stay ahead in the stock market with our comprehensive stock
                    management platform. Whether you're monitoring your investments or exploring new
                    market trends, our tools offer the insights you need to make informed decisions.
                </h2>
                <Overview overviewStocksData={data} />
                <h3 className="mt-10 text-2xl font-bold text-primary md:text-4xl">
                    View All Stocks
                </h3>
                <p className="mt-2 text-xl">
                    Browse a comprehensive list of all stocks currently tracked. Use advanced
                    filtering and sorting options to focus on the stocks that matter most to you.
                    Whether you&apos;re looking for specific symbols, analyzing recent changes, or
                    comparing volumes, this section has everything you need to explore your
                    portfolio.
                </p>
                <div className="mt-8 flex justify-center">
                    <Link
                        href={'/stocks'}
                        className="hover:cursor-pointers w-full rounded-xl bg-tertiary p-4 text-center text-xl text-white md:w-[20%]"
                    >
                        <button>Browse Stocks</button>
                    </Link>
                </div>
                <h3 className="mt-10 text-2xl font-bold text-primary md:text-4xl">Manage Stocks</h3>
                <p className="mt-2 text-xl">
                    Keep your stock portfolio accurate and up-to-date. Add new stocks to your
                    tracking list or update the data of existing stocks to reflect recent changes.
                    This functionality ensures you always have access to the latest information.
                </p>
                <div className="flex justify-center py-8">
                    <Link
                        href={'/manage'}
                        className="hover:cursor-pointers w-full rounded-xl bg-secondary p-4 text-center text-xl text-white md:w-[20%]"
                    >
                        <button>Add or Update Stock</button>
                    </Link>
                </div>
            </div>
        </div>
    );
}
