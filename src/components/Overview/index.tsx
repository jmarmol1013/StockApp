import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface OverviewProps {
    overviewStocksData: OverviewStocks;
}

export const Overview = ({ overviewStocksData }: OverviewProps) => {
    const numberOfStocks = overviewStocksData.length;

    const topGain = overviewStocksData.sort((a, b) => b.change - a.change).slice(0, 2)[0]; // Top gainer

    const topLosers = overviewStocksData.sort((a, b) => a.change - b.change).slice(0, 2)[0]; // Top loser

    const highVolume = overviewStocksData.sort((a, b) => b.volume - a.volume).slice(0, 2)[0]; // Top by volume

    const todayDate = new Date().toLocaleDateString();

    return (
        <>
            <h3 className="mt-10 text-2xl font-bold text-primary md:text-4xl">
                Stock Overview And Trends for {todayDate}
            </h3>
            <div className="mt-6 flex flex-wrap justify-center gap-6">
                <Card className="w-full bg-quanternary p-8 text-center md:w-[40%]">
                    <CardHeader>
                        <CardTitle className="text-2xl text-secondary">
                            Total Number Of Stocks
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-3xl">{numberOfStocks}</p>
                    </CardContent>
                </Card>
                <Card className="w-full bg-quanternary p-8 text-center md:w-[40%]">
                    <CardHeader>
                        <CardTitle className="text-2xl text-secondary">Top Gain Stock</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-2xl text-green-600">{topGain.change}</p>
                        <p className="text-xl text-black">{topGain.stockSymbol}</p>
                    </CardContent>
                </Card>
                <Card className="w-full bg-quanternary p-8 text-center md:w-[40%]">
                    <CardHeader>
                        <CardTitle className="text-2xl text-secondary">Top Loser Stock</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-2xl text-red-600">{topLosers.change}</p>
                        <p className="text-xl text-black">{topLosers.stockSymbol}</p>
                    </CardContent>
                </Card>
                <Card className="w-full bg-quanternary p-8 text-center md:w-[40%]">
                    <CardHeader>
                        <CardTitle className="text-2xl text-secondary">Top Volume Stock</CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-2xl text-tertiary">{highVolume.volume}</p>
                        <p className="text-xl text-black">{highVolume.stockSymbol}</p>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};
