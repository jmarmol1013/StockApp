'use client';

import React from 'react';
import { Line } from 'react-chartjs-2';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    PointElement,
    LineElement,
    Title,
    Tooltip,
    Legend,
    ChartOptions,
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

interface StockChartProps {
    stockSymbol: string;
    data: HistoricalData[];
}

const StockChart = ({ stockSymbol, data }: StockChartProps) => {
    const chartData = {
        labels: data.map((item) => item.date),
        datasets: [
            {
                label: 'Current Price ($)',
                data: data.map((item) => item.currentPrice), // Y-axis data
                borderColor: 'rgba(75, 192, 192, 1)',
                backgroundColor: 'rgba(75, 192, 192, 0.2)',
                tension: 0.4,
            },
        ],
    };

    const options: ChartOptions = {
        responsive: true,
        plugins: {
            legend: {
                position: 'top',
            },
            title: {
                display: false,
                text: 'Stock Price Trends',
            },
        },
        scales: {
            x: {
                type: 'category',
                title: {
                    display: true,
                    text: 'Date',
                },
            },
            y: {
                type: 'linear',
                title: {
                    display: true,
                    text: 'Price ($)',
                },
            },
        },
    };

    return <Line data={chartData} options={options} />;
};

export default StockChart;
