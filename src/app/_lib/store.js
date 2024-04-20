import { create } from "zustand";

export const useCoinStore = create((set) => ({
  coins: 50,
  increaseCoins: (byNumber) =>
    set((state) => ({ coins: state.coins + byNumber })),
  resetCoins: () => set({ coins: 0 }),
}));
