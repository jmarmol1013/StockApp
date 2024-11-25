'use client';

import { useRouter } from 'next/navigation';
import React from 'react';

interface SortControlsProps {
    currentSortKey: string;
    currentAscOrder: boolean;
}

export const SortControls = ({ currentSortKey, currentAscOrder }: SortControlsProps) => {
    const router = useRouter();

    const handleSortKeyChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newSortKey = e.target.value;
        router.push(`?sortKey=${newSortKey}&order=${currentAscOrder ? 'asc' : 'desc'}`);
    };

    const toggleOrder = () => {
        router.push(`?sortKey=${currentSortKey}&order=${!currentAscOrder ? 'asc' : 'desc'}`);
    };

    return (
        <div className="flex items-center justify-between pt-4">
            <div className="flex items-center gap-x-3">
                <p className="text-lg">Sort by:</p>
                <select
                    value={currentSortKey}
                    onChange={handleSortKeyChange}
                    className="rounded-xl border border-gray-300 bg-tertiary px-2 py-2 text-white shadow-sm focus:border-primary focus:ring-1 focus:ring-primary"
                >
                    <option value="stockSymbol">Stock</option>
                    <option value="currentPrice">Price</option>
                    <option value="volume">Volume</option>
                    <option value="change">Change</option>
                    <option value="date">Date</option>
                </select>
            </div>

            <div className="flex items-center gap-x-1">
                <p className="text-lg">Order by:</p>
                <button
                    onClick={toggleOrder}
                    className="ml-4 rounded-xl bg-secondary px-4 py-2 text-white shadow-md"
                >
                    {currentAscOrder ? 'Ascending' : 'Descending'}
                </button>
            </div>
        </div>
    );
};
