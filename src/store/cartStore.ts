import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface CartItem {
  id: string; // product id
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
  variant?: string;
}

interface CartStore {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (id: string, variant?: string) => void;
  updateQuantity: (id: string, quantity: number, variant?: string) => void;
  clearCart: () => void;
  getTotals: () => { subtotal: number; count: number };
}

export const useCartStore = create<CartStore>()(
  persist(
    (set, get) => ({
      items: [],
      addItem: (item) => set((state) => {
        const existingItemIndex = state.items.findIndex(
          i => i.id === item.id && i.variant === item.variant
        );
        
        if (existingItemIndex >= 0) {
          const newItems = [...state.items];
          newItems[existingItemIndex].quantity += item.quantity;
          return { items: newItems };
        }
        
        return { items: [...state.items, item] };
      }),
      removeItem: (id, variant) => set((state) => ({
        items: state.items.filter(i => !(i.id === id && i.variant === variant))
      })),
      updateQuantity: (id, quantity, variant) => set((state) => ({
        items: state.items.map(i => 
          (i.id === id && i.variant === variant) ? { ...i, quantity: Math.max(1, quantity) } : i
        )
      })),
      clearCart: () => set({ items: [] }),
      getTotals: () => {
        const items = get().items;
        return items.reduce(
          (acc, item) => ({
            subtotal: acc.subtotal + (item.price * item.quantity),
            count: acc.count + item.quantity
          }),
          { subtotal: 0, count: 0 }
        );
      }
    }),
    {
      name: 'ecommerce-cart',
    }
  )
);
