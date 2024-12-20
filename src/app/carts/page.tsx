'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardHeader } from '@/components/ui/card';
import { Cart, CartPagedQueryResponse } from '@commercetools/platform-sdk';


export default function CartsPage() {
  const [carts, setCarts] = useState<Cart[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCarts = async () => {
      try {
        const response = await fetch('/api/carts');
        if (!response.ok) {
          throw new Error('Failed to fetch carts');
        }
        const data: CartPagedQueryResponse = await response.json();
        console.log(data);
        
        setCarts(data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCarts();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading carts...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-2xl font-bold mb-6">All Carts</h1>
      <div className="grid gap-4">
        {carts.map((cart) => (
          <Link 
            key={cart.id} 
            href={`/carts/${cart.id}`}
            className="block hover:no-underline"
          >
            <Card className="hover:bg-gray-50 transition-colors">
              <CardHeader>
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-semibold">Cart ID: {cart.id}</h2>
                  <span className="text-blue-500">→</span>
                </div>
              </CardHeader>
            </Card>
          </Link>
        ))}
        {carts.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No carts found
          </div>
        )}
      </div>
    </div>
  );
}