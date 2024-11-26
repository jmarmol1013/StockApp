import React from 'react';
import StockChart from './StockChart';

import { DownloadDataBtn } from '../DownloadDataBtn';

interface StockDetailsProps {
    stockSymbol: string;
    stockData: HistoricalData[];
}

export const StockDetails = ({ stockSymbol, stockData }: StockDetailsProps) => {
    const stockDataSorted = [...stockData].sort((a, b) => {
        return new Date(b.date).getTime() - new Date(a.date).getTime();
    });

    return (
        <div className="mt-4">
            <h2 className="text-2xl text-secondary">Stock Price Trend</h2>
            <StockChart stockSymbol={stockSymbol} data={stockData} />
            <div className="mt-4">
                <h2 className="text-2xl text-secondary">Historical Data</h2>
                <DownloadDataBtn stockSymbol={stockSymbol} data={stockDataSorted} />
                <div className="mt-4 rounded-xl bg-white">
                    <div className="flex justify-between border-b border-gray-300">
                        <div className="w-1/5 border-r border-gray-300 py-4 text-center font-bold">
                            Date
                        </div>
                        <div className="w-1/5 border-r border-gray-300 py-4 text-center font-bold">
                            Current Price
                        </div>
                        <div className="w-1/5 border-r border-gray-300 py-4 text-center font-bold">
                            Opening Price
                        </div>
                        <div className="w-1/5 border-r border-gray-300 py-4 text-center font-bold">
                            Closing Price
                        </div>
                        <div className="w-1/5 border-r border-gray-300 py-4 text-center font-bold">
                            High Price
                        </div>
                        <div className="w-1/5 border-r border-gray-300 py-4 text-center font-bold">
                            Low Price
                        </div>
                        <div className="w-1/5 border-r border-gray-300 py-4 text-center font-bold">
                            Volume
                        </div>
                        <div className="w-1/5 border-gray-300 py-4 text-center font-bold">
                            Change
                        </div>
                    </div>
                    {stockDataSorted.map((stock, index) => {
                        return (
                            <div className="divide-y divide-gray-300" key={index}>
                                <div className="flex items-center justify-between">
                                    <div className="w-1/5 border-r border-gray-300 py-4 text-center font-bold text-primary">
                                        {stock.date}
                                    </div>
                                    <div className="w-1/5 border-r border-gray-300 py-4 text-center">
                                        ${stock.currentPrice}
                                    </div>
                                    <div className="w-1/5 border-r border-gray-300 py-4 text-center">
                                        ${stock.openingPrice}
                                    </div>
                                    <div className="w-1/5 border-r border-gray-300 py-4 text-center">
                                        ${stock.closingPrice}
                                    </div>
                                    <div className="w-1/5 border-r border-gray-300 py-4 text-center">
                                        ${stock.highPrice}
                                    </div>
                                    <div className="w-1/5 border-r border-gray-300 py-4 text-center">
                                        ${stock.lowPrice}
                                    </div>
                                    <div className="w-1/5 border-r border-gray-300 py-4 text-center">
                                        {stock.volume}M
                                    </div>
                                    <div
                                        className={`${stock.change >= 0 ? 'text-green-500' : 'text-red-500'} w-1/5 border-r border-gray-300 py-4 text-center`}
                                    >
                                        ${stock.change}
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </div>
    );
};
