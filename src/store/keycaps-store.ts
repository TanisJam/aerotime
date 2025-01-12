import { create } from 'zustand';

const WORD = ['a', 'e', 'r', 'o', 't', 'i', 'm', 'e'];
export const INTERACTIONS_MESSAGES = [
  'Keep going!',
  'Almost there!',
  'You can do it!',
  'Just a little more!',
  'You got this!',
  'You did it!',
];
const INTERACTIONS_NEEDED = 6;
const TIME_BETWEEN_INTERACTIONS = 2000;

interface KeycapsState {
  collectedKeycaps: string[];
  addKeycap: (keycap: string) => boolean;
  setGamemode: () => void;
  completed: boolean;
  gamemode: boolean;
  interactionsCount: number;
  lastInteraction: number;
}

export const useKeycapsStore = create<KeycapsState>((set) => ({
  collectedKeycaps: [],
  interactionsCount: 0,
  lastInteraction: 0,
  addKeycap: (keycap) => {
    let isCorrect = false;
    set((state) => {
      const nextKeycap = WORD[state.collectedKeycaps.length];
      if (keycap === nextKeycap) {
        isCorrect = true;
        const newCollectedKeycaps = [...state.collectedKeycaps, keycap];
        const completed = newCollectedKeycaps.length === WORD.length;
        return { collectedKeycaps: newCollectedKeycaps, completed };
      }
      return { collectedKeycaps: [], completed: false };
    });

    return isCorrect;
  },
  setGamemode: () => {
    set((state) => {
      if (state.gamemode) {
        return {
          gamemode: false,
          interactionsCount: 0,
          lastInteraction: 0,
        };
      }

      const now = Date.now();
      if (now - state.lastInteraction < TIME_BETWEEN_INTERACTIONS) {
        const newCount = state.interactionsCount + 1;
        if (newCount >= INTERACTIONS_NEEDED) {
          return {
            gamemode: true,
            interactionsCount: newCount,
            lastInteraction: now,
          };
        }
        return {
          interactionsCount: newCount,
          lastInteraction: now,
          gamemode: false,
        };
      }
      return {
        interactionsCount: 1,
        lastInteraction: now,
        gamemode: false,
      };
    });
  },
  completed: false,
  gamemode: false,
}));
