import { StockForm } from '@/components/StockForm';
import React from 'react';

export default async function Page() {
    return (
        <div className="min-h-screen bg-quanternary">
            <div className="mx-auto py-8 md:w-[70%]">
                <h1 className="text-4xl font-bold text-tertiary">Add Stock</h1>
                <h2 className="mt-2 text-lg">
                    Use this form to add a new stock to the system. Please ensure all required
                    fields are completed with accurate information.
                </h2>
                <StockForm />
            </div>
        </div>
    );
}
