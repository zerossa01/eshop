/* eslint-disable @next/next/no-img-element */
'use client';

import Link from 'next/link';
import { useCartStore } from '@/store/cartStore';
import { Button } from '@/components/ui/button';
import { Trash2, Minus, Plus, ArrowRight, ShieldCheck } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function CartPage() {
  const { items, removeItem, updateQuantity, getTotals } = useCartStore();
  const [isClient, setIsClient] = useState(false);
  
  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    return <div className="container mx-auto px-4 py-8 h-64 flex items-center justify-center">Loading cart...</div>;
  }

  const { subtotal, count } = getTotals();
  const shipping = subtotal > 100 ? 0 : 15;
  const taxes = subtotal * 0.08; // 8% tax
  const total = subtotal + shipping + taxes;

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-16 flex flex-col items-center justify-center text-center">
        <h1 className="text-3xl font-bold tracking-tight mb-4">Your Cart is Empty</h1>
        <p className="text-muted-foreground mb-8">Looks like you haven&apos;t added anything to your cart yet.</p>
        <Link href="/products">
          <Button size="lg" className="h-12 px-8">Continue Shopping</Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 md:px-6 py-8">
      <h1 className="text-3xl font-bold tracking-tight mb-8">Shopping Cart ({count} items)</h1>
      
      <div className="flex flex-col lg:flex-row gap-12">
        {/* Cart Items List */}
        <div className="flex-1 space-y-6">
          <div className="hidden sm:grid grid-cols-12 gap-4 text-sm font-medium text-muted-foreground border-b pb-4">
            <div className="col-span-6">Product</div>
            <div className="col-span-3 text-center">Quantity</div>
            <div className="col-span-2 text-right">Total</div>
            <div className="col-span-1"></div>
          </div>
          
          <div className="space-y-6">
            {items.map((item) => (
              <div key={`${item.id}-${item.variant}`} className="grid grid-cols-1 sm:grid-cols-12 gap-4 sm:items-center py-4 border-b">
                <div className="col-span-1 sm:col-span-6 flex items-center gap-4">
                  <div className="w-20 h-20 bg-muted rounded-md overflow-hidden shrink-0">
                    {item.imageUrl && <img src={item.imageUrl} alt={item.name} className="w-full h-full object-cover" />}
                  </div>
                  <div>
                    <h3 className="font-semibold line-clamp-2">
                      <Link href={`/products/${item.id}`} className="hover:underline">{item.name}</Link>
                    </h3>
                    <p className="text-sm text-muted-foreground mt-1">${item.price.toFixed(2)}</p>
                    {item.variant && <p className="text-xs text-muted-foreground mt-1">Variant: {item.variant}</p>}
                  </div>
                </div>
                
                <div className="col-span-1 sm:col-span-3 flex sm:justify-center items-center mt-2 sm:mt-0">
                  <div className="flex items-center border rounded-md">
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity - 1, item.variant)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-muted"
                    >
                      <Minus className="w-3 h-3" />
                    </button>
                    <input 
                      type="number" 
                      value={item.quantity} 
                      readOnly
                      className="w-10 h-8 text-center bg-transparent focus:outline-none text-sm" 
                    />
                    <button 
                      onClick={() => updateQuantity(item.id, item.quantity + 1, item.variant)}
                      className="w-8 h-8 flex items-center justify-center hover:bg-muted"
                    >
                      <Plus className="w-3 h-3" />
                    </button>
                  </div>
                </div>
                
                <div className="col-span-1 sm:col-span-2 flex sm:justify-end items-center mt-2 sm:mt-0 font-medium">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
                
                <div className="col-span-1 flex justify-end items-center absolute sm:relative right-4 sm:right-0 mt-4 sm:mt-0">
                  <button 
                    onClick={() => removeItem(item.id, item.variant)}
                    className="text-muted-foreground hover:text-destructive transition-colors p-2"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
          
          <div className="pt-4 flex items-center gap-2">
            <Link href="/products">
              <Button variant="outline">Continue Shopping</Button>
            </Link>
          </div>
        </div>

        {/* Order Summary Sidebar */}
        <div className="w-full lg:w-[380px] shrink-0">
          <div className="bg-muted/30 rounded-2xl p-6 border">
            <h2 className="text-xl font-bold mb-6">Order Summary</h2>
            
            <div className="space-y-4 text-sm mb-6 pb-6 border-b">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Shipping estimate</span>
                <span className="font-medium">{shipping === 0 ? 'Free' : `$${shipping.toFixed(2)}`}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-muted-foreground">Tax estimate (8%)</span>
                <span className="font-medium">${taxes.toFixed(2)}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center mb-8">
              <span className="text-base font-bold">Total</span>
              <span className="text-2xl font-bold">${total.toFixed(2)}</span>
            </div>
            
            <div className="space-y-4">
              <Link href="/checkout" className="block w-full">
                <Button size="lg" className="w-full h-14 text-base font-bold flex items-center justify-center gap-2">
                  Proceed to Checkout <ArrowRight className="w-4 h-4" />
                </Button>
              </Link>
              
              <div className="flex items-center justify-center gap-2 text-xs text-muted-foreground pt-4">
                <ShieldCheck className="w-4 h-4" />
                <span>Secure Checkout powered by Stripe</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
