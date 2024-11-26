import { deleteStock } from '@/actions/stock';
import Link from 'next/link';
import React from 'react';

interface TableProps {
    overviewStocksData: OverviewStocks;
    sortKey: string;
    order: boolean;
    manageStock: boolean;
}

const sortData = (
    stocks: OverviewStocks,
    sortKey: keyof OverviewStock,
    ascending: boolean,
): OverviewStocks => {
    return [...stocks].sort((a, b) => {
        if (a[sortKey] < b[sortKey]) return ascending ? -1 : 1;
        if (a[sortKey] > b[sortKey]) return ascending ? 1 : -1;
        return 0;
    });
};

export const Table = ({ overviewStocksData, sortKey, order, manageStock }: TableProps) => {
    overviewStocksData = sortData(overviewStocksData, sortKey as keyof OverviewStock, order);

    return (
        <div className="mt-4 rounded-xl border-gray-400 bg-white shadow-lg">
            <div className="flex justify-between border-b border-gray-300">
                <div className="w-1/5 border-r border-gray-300 py-4 text-center font-bold">
                    Stock Symbol
                </div>
                <div className="w-1/5 border-r border-gray-300 py-4 text-center font-bold">
                    Current Price
                </div>
                <div className="w-1/5 border-r border-gray-300 py-4 text-center font-bold">
                    Volume
                </div>
                <div className="w-1/5 border-r border-gray-300 py-4 text-center font-bold">
                    Change
                </div>
                <div className="w-1/5 border-r py-4 text-center font-bold">Date</div>
                {manageStock && (
                    <>
                        <div className="w-1/5 border-r border-gray-300 py-4 text-center font-bold"></div>
                        <div className="w-1/5 border-gray-300 py-4 text-center font-bold"></div>
                    </>
                )}
            </div>

            {overviewStocksData.map((stock, index) => {
                return (
                    <div className="divide-y divide-gray-300" key={index}>
                        <div className="flex items-center justify-between">
                            <Link href={`stock/${stock.stockSymbol}`} className="flex w-full">
                                <div className="w-1/5 border-r border-gray-300 py-4 text-center font-bold text-primary">
                                    {stock.stockSymbol}
                                </div>
                                <div className="w-1/5 border-r border-gray-300 py-4 text-center">
                                    ${stock.currentPrice}
                                </div>
                                <div className="w-1/5 border-r border-gray-300 py-4 text-center">
                                    {stock.volume}M
                                </div>
                                <div
                                    className={`${stock.change >= 0 ? 'text-green-500' : 'text-red-500'} w-1/5 border-r border-gray-300 py-4 text-center`}
                                >
                                    ${stock.change}
                                </div>
                                <div className="w-1/5 border-r py-4 text-center">{stock.date}</div>
                            </Link>
                            {manageStock && (
                                <>
                                    <div className="w-1/5 border-r border-gray-300 py-4 text-center font-bold">
                                        <Link href={`/update/${stock.stockSymbol}`}>
                                            <div className="mx-auto w-[70%] rounded-xl bg-secondary py-2 text-white">
                                                Update
                                            </div>
                                        </Link>
                                    </div>
                                    <div className="w-1/5 border-gray-300 py-4 text-center font-bold">
                                        <form action={deleteStock} key={stock.stockSymbol}>
                                            <input
                                                type="hidden"
                                                name="id"
                                                value={stock.stockSymbol}
                                            />
                                            <button className="mx-auto w-[70%] rounded-xl bg-red-500 py-2 text-white">
                                                Delete
                                            </button>
                                        </form>
                                    </div>
                                </>
                            )}
                        </div>
                    </div>
                );
            })}
        </div>
    );
};
