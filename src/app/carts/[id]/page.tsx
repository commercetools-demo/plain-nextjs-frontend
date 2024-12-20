'use client';
import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Card, CardHeader, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';

interface CartDetails {
  id: string;
  items: Array<{
    id: string;
    productId: string;
    quantity: number;
    price: number;
  }>;
  totalAmount: number;
  // Add other cart detail properties
}

export default function CartDetailsPage({ 
  params 
}: { 
  params: { id: string } 
}) {
  const router = useRouter();
  const [cart, setCart] = useState<CartDetails | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchCartDetails = async () => {
      try {
        const response = await fetch(`/api/cart?cartId=${params.id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch cart details');
        }
        const data = await response.json();
        setCart(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'An error occurred');
      } finally {
        setLoading(false);
      }
    };

    fetchCartDetails();
  }, [params.id]);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Loading cart details...</div>
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

  if (!cart) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-lg">Cart not found</div>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-8">
      <div className="mb-6 flex items-center justify-between">
        <h1 className="text-2xl font-bold">Cart Details</h1>
        <Button
          onClick={() => router.push('/carts')}
          variant="outline"
        >
          Back to Carts
        </Button>
      </div>

      <Card className="mb-6">
        <CardHeader>
          <h2 className="text-lg font-semibold">Cart ID: {cart.id}</h2>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div>
              <h3 className="font-medium mb-2">Items</h3>
              <div className="space-y-2">
                {cart.items.map((item) => (
                  <div 
                    key={item.id}
                    className="flex justify-between items-center p-3 bg-gray-50 rounded"
                  >
                    <div>
                      <div>Product ID: {item.productId}</div>
                      <div className="text-sm text-gray-500">
                        Quantity: {item.quantity}
                      </div>
                    </div>
                    <div className="font-medium">
                      ${item.price.toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-medium">Total Amount:</span>
                <span className="text-lg font-bold">
                  ${cart.totalAmount.toFixed(2)}
                </span>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}