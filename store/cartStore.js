import { create } from 'zustand';

export const useCartStore = create((set, get) => ({
  items: [],

  // ➕ ADD TO CART
  addToCart: (product) =>
    set((state) => {
      const existingItem = state.items.find(item => item.id === product.id);

      if (existingItem) {
        return {
          items: state.items.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          ),
        };
      }

      return {
        items: [...state.items, { ...product, quantity: 1 }],
      };
    }),

  // ➖ REMOVE / DECREASE
  removeFromCart: (productId) =>
    set((state) => {
      const existingItem = state.items.find(item => item.id === productId);

      if (existingItem?.quantity > 1) {
        return {
          items: state.items.map(item =>
            item.id === productId
              ? { ...item, quantity: item.quantity - 1 }
              : item
          ),
        };
      }

      return {
        items: state.items.filter(item => item.id !== productId),
      };
    }),

  // 🧹 CLEAR CART
  clearCart: () => set({ items: [] }),

  // 🔢 QUANTITY OF SINGLE ITEM
  getItemQuantity: (productId) => {
    const item = get().items.find(i => i.id === productId);
    return item ? item.quantity : 0;
  },

  // 🧮 TOTAL ITEMS IN CART
  getTotalItems: () => {
    return get().items.reduce((sum, item) => sum + item.quantity, 0);
  },

  // 💰 TOTAL PRICE
  getCartTotal: () => {
    return get().items.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  },

  // ✅ CHECK IF ITEM EXISTS
  isInCart: (productId) => {
    return get().items.some(item => item.id === productId);
  },
}));
