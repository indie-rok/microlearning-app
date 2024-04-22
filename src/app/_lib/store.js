import { create } from "zustand";

export const useCoinStore = create((set) => ({
  coins: 50,
  increaseCoins: (byNumber) =>
    set((state) => ({ coins: state.coins + byNumber })),
  decreaseCoins: (byNumber) =>
    set((state) => ({ coins: state.coins - byNumber })),
  resetCoins: () => set({ coins: 0 }),
}));

export const useGardenStore = create((set) => ({
  grid: Array(5)
    .fill(null)
    .map(() => Array(5).fill(null)),
  setGrid: (grid) => set((grid) => ({ grid })),
}));
