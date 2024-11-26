'use client';

import React from 'react';
import { Button } from '@/components/ui/button';
import { Form, FormControl, FormField, FormItem, FormLabel } from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { useForm } from 'react-hook-form';
import Link from 'next/link';
import { redirect } from 'next/navigation';
import { updateStock } from '@/actions/stock';

interface UpdateStockProps {
    id: string;
}

export const UpdateStock = ({ id }: UpdateStockProps) => {
    const form = useForm<UpdateStock>({
        defaultValues: {
            currentPrice: 0,
            openingPrice: 0,
            closingPrice: 0,
            highPrice: 0,
            lowPrice: 0,
            volume: 0,
        },
    });

    async function onSubmit(values: UpdateStock) {
        const formData = new FormData();
        formData.append('id', id);
        formData.append('currentPrice', String(values.currentPrice));
        formData.append('openingPrice', String(values.openingPrice));
        formData.append('closingPrice', String(values.closingPrice));
        formData.append('highPrice', String(values.highPrice));
        formData.append('lowPrice', String(values.lowPrice));
        formData.append('volume', String(values.volume));

        await updateStock(formData);
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
                        name="currentPrice"
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
                        name="openingPrice"
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
                        name="closingPrice"
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
                        name="highPrice"
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
                        name="lowPrice"
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
                        name="volume"
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
                        Update
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
