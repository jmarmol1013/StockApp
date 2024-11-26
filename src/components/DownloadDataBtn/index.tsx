'use client';
import React from 'react';
import { saveAs } from 'file-saver';
import { unparse } from 'papaparse';

interface DownloadDataBtnProps {
    stockSymbol: string;
    data: HistoricalData[];
}

export const DownloadDataBtn = ({ stockSymbol, data }: DownloadDataBtnProps) => {
    const handleDownloadCSV = () => {
        const csvData = data.map((stock) => ({
            Date: stock.date,
            'Current Price': stock.currentPrice,
            'Opening Price': stock.openingPrice,
            'Closing Price': stock.closingPrice,
            'High Price': stock.highPrice,
            'Low Price': stock.lowPrice,
            Volume: `${stock.volume}M`,
            Change: stock.change,
        }));

        const csv = unparse(csvData);
        const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
        saveAs(blob, `${stockSymbol}_historical_data.csv`);
    };
    return (
        <button className="my-2 rounded-xl bg-tertiary p-3 text-white" onClick={handleDownloadCSV}>
            Download CSV
        </button>
    );
};
