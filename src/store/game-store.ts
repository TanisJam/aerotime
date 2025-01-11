/* eslint-disable @typescript-eslint/no-explicit-any */
import { create } from 'zustand';

interface GamesState {
  collectedGames: any[];
  addGame: (game: any) => void;
  removeGame: (gameId: number) => void;
}

export const useGamesStore = create<GamesState>((set) => ({
  collectedGames: [],
  addGame: (game) =>
    set((state) => ({ collectedGames: [...state.collectedGames, game] })),
  removeGame: (gameId) =>
    set((state) => ({
      collectedGames: state.collectedGames.filter((game) => game.id !== gameId),
    })),
}));
