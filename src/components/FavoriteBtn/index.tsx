'use client';
import { parseCookies } from 'nookies';
import React, { useEffect, useState } from 'react';
import { FaHeart } from 'react-icons/fa';

interface FavoriteStock {
    stockSymbol: string;
    currentPrice: number;
}
interface FavoriteBtnProps {
    stockSymbol: string;
}

export const FavoriteBtn = ({ stockSymbol }: FavoriteBtnProps) => {
    const [email, setEmail] = useState<string | null>(null);
    const [favorites, setFavorites] = useState<FavoriteStock[]>([]);
    const [isFavorite, setIsFavorite] = useState<boolean>(false);

    useEffect(() => {
        const cookies = parseCookies();
        const storedEmail = cookies.userEmail || null;
        setEmail(storedEmail);
    }, []);

    useEffect(() => {
        if (email) {
            const fetchFavorites = async () => {
                try {
                    const response = await fetch(
                        `${process.env.NEXT_PUBLIC_BASIC_API_PATH}/Users/${email}/favorites`,
                    );
                    if (!response.ok) {
                        throw new Error('Failed to fetch favorite stocks');
                    }
                    const data = await response.json();
                    setFavorites(data);
                } catch (error) {
                    console.log(error);
                }
            };
            fetchFavorites();
            console.log(favorites);

            favorites != null &&
                favorites.map((favorite) => {
                    if (favorite.stockSymbol == stockSymbol) setIsFavorite(true);
                });
        }
    }, [email, favorites]);

    const handleFavorite = async (stockSymbol: string) => {
        if (!email) return;

        try {
            if (isFavorite) {
                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BASIC_API_PATH}/Users/${email}/favorites/${stockSymbol}`,
                    {
                        method: 'DELETE',
                    },
                );

                if (!response.ok) {
                    throw new Error('Failed to remove stock from favorites');
                }

                setFavorites((prevFavorites) =>
                    prevFavorites.filter((stock) => stock.stockSymbol !== stockSymbol),
                );

                setIsFavorite(false);
            } else {
                const data = {
                    stockSymbol: stockSymbol,
                };

                const response = await fetch(
                    `${process.env.NEXT_PUBLIC_BASIC_API_PATH}/Users/${email}/favorites`,
                    {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                        },
                        body: JSON.stringify(data),
                    },
                );

                if (!response.ok) {
                    throw new Error('Failed to add stock from favorites');
                }

                setIsFavorite(true);
            }
        } catch (error) {
            console.log('Error modifying the stock from favorites');
        }
    };

    if (!email) return <></>;

    return (
        <button onClick={() => handleFavorite(stockSymbol)}>
            <FaHeart
                size={24}
                className={`${
                    isFavorite
                        ? 'text-red-500 hover:text-red-700'
                        : 'text-gray-500 hover:text-gray-700'
                }`}
            />
        </button>
    );
};
