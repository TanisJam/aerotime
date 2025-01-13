import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { SavedGame, SortType } from '@/models/games.model';

interface GamesState {
  collectedGames: SavedGame[];
  sortType: SortType;
  addGame: (game: Omit<SavedGame, 'savedAt'>) => void;
  removeGame: (gameId: number) => void;
  setSortType: (type: SortType) => void;
}

const sortGames = (games: SavedGame[], sortType: SortType): SavedGame[] => {
  switch (sortType) {
    case SortType.LAST_ADDED:
      return [...games].sort((a, b) => b.savedAt - a.savedAt);
    case SortType.NEWEST:
      return [...games].sort(
        (a, b) => (b.first_release_date ?? 0) - (a.first_release_date ?? 0)
      );
    case SortType.OLDEST:
      return [...games].sort(
        (a, b) => (a.first_release_date ?? 0) - (b.first_release_date ?? 0)
      );
  }
};

export const useGamesStore = create(
  persist<GamesState>(
    (set) => ({
      collectedGames: [],
      sortType: SortType.LAST_ADDED,
      addGame: (game) =>
        set((state) => ({
          collectedGames: sortGames(
            [...state.collectedGames, { ...game, savedAt: Date.now() }],
            state.sortType
          ),
        })),
      removeGame: (gameId) =>
        set((state) => ({
          collectedGames: sortGames(
            state.collectedGames.filter((game) => game.id !== gameId),
            state.sortType
          ),
        })),
      setSortType: (type) =>
        set((state) => ({
          sortType: type,
          collectedGames: sortGames(state.collectedGames, type),
        })),
    }),
    {
      name: 'games-storage',
      partialize: (state) => {
        const { collectedGames, sortType } = state;
        return { collectedGames, sortType } as GamesState;
      },
    }
  )
);
