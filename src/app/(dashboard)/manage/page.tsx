import { SortControls } from '@/components/SortControls';
import { Table } from '@/components/Table';
import Link from 'next/link';
import React from 'react';

export default async function Page({ searchParams }: { searchParams: { [key: string]: string } }) {
    const sortKey = (await searchParams).sortKey || 'stockSymbol';
    const order = (await searchParams).order === 'asc';

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
            <div className="mx-auto pt-8 md:w-[70%]">
                <h1 className="text-4xl font-bold text-tertiary">Manage The Stocks</h1>
                <h2 className="mt-2 text-lg">
                    Welcome to the stock management page. Here, you can add new stock entries or
                    update details for existing stocks in the system. Please ensure all required
                    fields are filled out accurately.
                </h2>
                <SortControls currentSortKey={sortKey} currentAscOrder={order} />
                <Link href={'/add'}>
                    <button className="my-6 w-[20%] rounded-xl bg-purple-700 p-4 text-white">
                        Add Stock
                    </button>
                </Link>
                <Table
                    overviewStocksData={data}
                    sortKey={sortKey}
                    order={order}
                    manageStock={true}
                />
            </div>
        </div>
    );
}
