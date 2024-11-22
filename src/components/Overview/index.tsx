import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card';

interface OverviewProps {
    overviewStocksData: OverviewStocks;
}

export const Overview = ({ overviewStocksData }: OverviewProps) => {
    const numberOfStocks = overviewStocksData.length;

    const topGain = overviewStocksData.sort((a, b) => b.Change - a.Change).slice(0, 5); // Top 5 gainers

    const topLosers = overviewStocksData.sort((a, b) => a.Change - b.Change).slice(0, 5); // Top 5 losers

    const highVolume = overviewStocksData.sort((a, b) => b.Volume - a.Volume).slice(0, 5); // Top 5 by volume

    const todayDate = new Date().toLocaleDateString();
    return (
        <>
            <h3 className="text-primary mt-10 text-2xl font-bold">
                Stock Overview And Trends for {todayDate}
            </h3>
            <div className="mt-4 flex flex-wrap justify-center gap-x-6">
                <Card className="bg-quanternary p-8">
                    <CardHeader>
                        <CardTitle className="text-secondary text-xl">
                            Total Number Of Stocks
                        </CardTitle>
                    </CardHeader>
                    <CardContent className="text-center">
                        <p className="text-xl">{numberOfStocks}</p>
                    </CardContent>
                </Card>
            </div>
        </>
    );
};
