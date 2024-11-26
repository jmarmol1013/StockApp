import { SortControls } from '@/components/SortControls';
import { Table } from '@/components/Table';
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
                <h1 className="text-4xl font-bold text-tertiary">Track The Stocks</h1>
                <h2 className="mt-2 text-lg">
                    Explore comprehensive stock data with options to sort, filter, and manage your
                    portfolio effortlessly.
                </h2>
                <SortControls currentSortKey={sortKey} currentAscOrder={order} />
                <Table
                    overviewStocksData={data}
                    sortKey={sortKey}
                    order={order}
                    manageStock={false}
                />
            </div>
        </div>
    );
}
