import { create } from 'zustand';

const WORD = ['a', 'e', 'r', 'o', 't', 'i', 'm', 'e'];

interface KeycapsState {
  collectedKeycaps: string[];
  addKeycap: (keycap: string) => void;
  completed: boolean;
}

export const useKeycapsStore = create<KeycapsState>((set) => ({
  collectedKeycaps: [],
  addKeycap: (keycap) =>
    set((state) => {
      const nextKeycap = WORD[state.collectedKeycaps.length];
      console.log(`Keycap clicked: ${keycap}`);
      console.log(`Next keycap: ${nextKeycap}`);
      if (keycap === nextKeycap) {
        const newCollectedKeycaps = [...state.collectedKeycaps, keycap];
        const completed = newCollectedKeycaps.length === WORD.length;
        return { collectedKeycaps: newCollectedKeycaps, completed };
      }
      return { collectedKeycaps: [], completed: false };
    }),
  completed: false,
}));
