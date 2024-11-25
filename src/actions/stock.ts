'use server';

import { revalidatePath } from 'next/cache';

export async function deleteStock(formData: FormData) {
    try {
        const data = {
            id: formData.get('id'),
        };

        await fetch(
            `${process.env.NEXT_PUBLIC_BASIC_API_PATH}${process.env.NEXT_PUBLIC_STOCKS_OVERVIEW}/${data.id}`,
            {
                method: 'DELETE',
                cache: 'no-store',
            },
        );

        revalidatePath('/stocks');
    } catch (err) {
        console.log(err);
    }
}

export async function addStock(formData: FormData) {
    try {
        const data: AddStock = {
            stockSymbol: formData.get('stockSymbol') as string,
            historicalData: {
                currentPrice: parseFloat(formData.get('historicalData.currentPrice') as string),
                openingPrice: parseFloat(formData.get('historicalData.openingPrice') as string),
                closingPrice: parseFloat(formData.get('historicalData.closingPrice') as string),
                highPrice: parseFloat(formData.get('historicalData.highPrice') as string),
                lowPrice: parseFloat(formData.get('historicalData.lowPrice') as string),
                volume: parseInt(formData.get('historicalData.volume') as string, 10),
                date: '',
                change: 0,
            },
        };

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASIC_API_PATH}${process.env.NEXT_PUBLIC_STOCKS_OVERVIEW}`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            },
        );

        if (!response.ok) {
            throw new Error('Failed to add stock');
        }

        revalidatePath('/manage');
    } catch (err) {
        console.log(err);
    }
}

export async function updateStock(formData: FormData) {
    try {
        const id = formData.get('id');
        const data: UpdateStock = {
            currentPrice: parseFloat(formData.get('currentPrice') as string),
            openingPrice: parseFloat(formData.get('openingPrice') as string),
            closingPrice: parseFloat(formData.get('closingPrice') as string),
            highPrice: parseFloat(formData.get('highPrice') as string),
            lowPrice: parseFloat(formData.get('lowPrice') as string),
            volume: parseInt(formData.get('volume') as string, 10),
        };

        const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASIC_API_PATH}${process.env.NEXT_PUBLIC_STOCKS_OVERVIEW}/${id}`,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(data),
            },
        );

        if (!response.ok) {
            throw new Error('Failed to edit stock');
        }

        revalidatePath('/manage');
    } catch (err) {
        console.log(err);
    }
}
