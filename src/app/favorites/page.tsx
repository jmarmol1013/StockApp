'use client';

import { useEffect, useState } from 'react';
import { parseCookies } from 'nookies';
import { FaTrashAlt } from 'react-icons/fa';

interface FavoriteStock {
  stockSymbol: string;
  currentPrice: number;
}

export default function FavoritesPage() {
  const [email, setEmail] = useState<string | null>(null);
  const [favorites, setFavorites] = useState<FavoriteStock[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

 
  useEffect(() => {
    const cookies = parseCookies();
    const storedEmail = cookies.userEmail || null;
    setEmail(storedEmail);
  }, []);

  
  useEffect(() => {
    if (email) {
      const fetchFavorites = async () => {
        setLoading(true);
        try {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_BASIC_API_PATH}/Users/${email}/favorites`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch favorite stocks');
          }
          const data = await response.json();
          setFavorites(data);
        } catch (error) {
          setError('Error fetching favorite stocks');
        } finally {
          setLoading(false);
        }
      };

      fetchFavorites();
    }
  }, [email]);

  
  const handleDeleteFavorite = async (stockSymbol: string) => {
    if (!email) return;

    const confirmDelete = window.confirm(`Are you sure you want to remove ${stockSymbol} from your favorites?`);
    if (confirmDelete) {
      try {
        
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BASIC_API_PATH}/Users/${email}/favorites/${stockSymbol}`,
          {
            method: 'DELETE',
          }
        );

        if (!response.ok) {
          throw new Error('Failed to remove stock from favorites');
        }

       
        setFavorites((prevFavorites) =>
          prevFavorites.filter((stock) => stock.stockSymbol !== stockSymbol)
        );
      } catch (error) {
        setError('Error deleting the stock from favorites');
      }
    }
  };

  if (loading) {
    return <div className="text-center text-xl">Loading your favorite stocks...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500 text-xl">{error}</div>;
  }

  return (
    <div className="mx-[10%] mt-10 max-w-[80%] md:mx-[15%] md:max-w-[70%]">
      <h1 className="text-6xl font-bold text-center text-purple-600">Your Favorite Stocks</h1>
      {favorites.length === 0 ? (
        <p className="text-xl text-center mt-4">You have no favorite stocks yet.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-6">
          {favorites.map((stock, index) => (
            <div
              key={index}
              className="bg-white p-4 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300"
            >
              <div className="flex justify-between items-center">
                <h2 className="text-xl font-semibold text-gray-800">{stock.stockSymbol}</h2>
                <button
                  onClick={() => handleDeleteFavorite(stock.stockSymbol)}
                  className="text-red-500 hover:text-red-700"
                >
                  <FaTrashAlt size={20} />
                </button>
              </div>
              <p className="text-lg text-primary">${stock.currentPrice.toFixed(2)}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
