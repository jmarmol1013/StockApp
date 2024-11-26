'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import { addStock } from '@/actions/stock';
import { redirect } from 'next/navigation';
import Link from 'next/link';

export const StockForm = () => {
    const form = useForm<AddStock>({
        defaultValues: {
            stockSymbol: '',
            historicalData: {
                currentPrice: 0,
                openingPrice: 0,
                closingPrice: 0,
                highPrice: 0,
                lowPrice: 0,
                volume: 0,
            },
        },
    });

    async function onSubmit(values: AddStock) {
        const formData = new FormData();
        formData.append('stockSymbol', values.stockSymbol);
        formData.append('historicalData.currentPrice', String(values.historicalData.currentPrice));
        formData.append('historicalData.openingPrice', String(values.historicalData.openingPrice));
        formData.append('historicalData.closingPrice', String(values.historicalData.closingPrice));
        formData.append('historicalData.highPrice', String(values.historicalData.highPrice));
        formData.append('historicalData.lowPrice', String(values.historicalData.lowPrice));
        formData.append('historicalData.volume', String(values.historicalData.volume));

        await addStock(formData);
        redirect('/manage');
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="mt-4 space-y-8 rounded-xl bg-white p-6"
            >
                <div className="flex flex-wrap items-center space-y-4">
                    <FormField
                        control={form.control}
                        name="stockSymbol"
                        render={({ field }) => (
                            <FormItem className="w-1/3">
                                <FormLabel>Stock Symbol</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        placeholder="APPL"
                                        className="w-[30%] rounded-xl border-2 border-primary placeholder:text-gray-500"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="historicalData.currentPrice"
                        render={({ field }) => (
                            <FormItem className="w-1/3">
                                <FormLabel>Current Price</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="100"
                                        className="w-[30%] rounded-xl border-2 border-primary placeholder:text-gray-500"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="historicalData.openingPrice"
                        render={({ field }) => (
                            <FormItem className="w-1/3">
                                <FormLabel>Opening Price</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="100"
                                        className="w-[30%] rounded-xl border-2 border-primary placeholder:text-gray-500"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="historicalData.closingPrice"
                        render={({ field }) => (
                            <FormItem className="w-1/3">
                                <FormLabel>Closing Price</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="100"
                                        className="w-[30%] rounded-xl border-2 border-primary placeholder:text-gray-500"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="historicalData.highPrice"
                        render={({ field }) => (
                            <FormItem className="w-1/3">
                                <FormLabel>High Price</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="100"
                                        className="w-[30%] rounded-xl border-2 border-primary placeholder:text-gray-500"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="historicalData.lowPrice"
                        render={({ field }) => (
                            <FormItem className="w-1/3">
                                <FormLabel>Low Price</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="100"
                                        className="w-[30%] rounded-xl border-2 border-primary placeholder:text-gray-500"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="historicalData.volume"
                        render={({ field }) => (
                            <FormItem className="w-1/3">
                                <FormLabel>Volume</FormLabel>
                                <FormControl>
                                    <Input
                                        {...field}
                                        type="number"
                                        placeholder="100"
                                        className="w-[30%] rounded-xl border-2 border-primary placeholder:text-gray-500"
                                    />
                                </FormControl>
                            </FormItem>
                        )}
                    />
                </div>
                <div className="flex gap-x-4">
                    <Button type="submit" className="rounded-xl text-white">
                        Add
                    </Button>
                    <Link href={'/manage'}>
                        <Button
                            type="button"
                            className="rounded-xl bg-secondary text-white hover:bg-secondary"
                        >
                            Cancel
                        </Button>
                    </Link>
                </div>
            </form>
        </Form>
    );
};
