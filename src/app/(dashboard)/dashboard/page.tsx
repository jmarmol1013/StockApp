import Image from 'next/image';
import stock2 from '../../../../public/stock2.jpg';
import { Overview } from '@/components/Overview';

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
            </div>
        </div>
    );
}
