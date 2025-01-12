import { create } from 'zustand';
import { SavedGame, SortType } from '@/models/games.model';

const gamesInitialState: SavedGame[] = [
  {
    id: 732,
    name: 'Grand Theft Auto: San Andreas',
    image: '//images.igdb.com/igdb/image/upload/t_thumb/co2lb9.jpg',
    first_release_date: 1098748800,
    savedAt: 1736723337917,
  },
  {
    id: 1020,
    name: 'Grand Theft Auto V',
    image: '//images.igdb.com/igdb/image/upload/t_thumb/co2lbd.jpg',
    first_release_date: 1379376000,
    savedAt: 1736723345035,
  },
  {
    id: 19441,
    name: 'Watch Dogs 2',
    image: '//images.igdb.com/igdb/image/upload/t_thumb/co2p3j.jpg',
    first_release_date: 1479168000,
    savedAt: 1736723347895,
  },
  {
    id: 6801,
    name: 'Far Cry 4',
    image: '//images.igdb.com/igdb/image/upload/t_thumb/co2npa.jpg',
    first_release_date: 1416268800,
    savedAt: 1736723352035,
  },
  {
    id: 2031,
    name: 'Wolfenstein: The New Order',
    image: '//images.igdb.com/igdb/image/upload/t_thumb/co21c0.jpg',
    first_release_date: 1400544000,
    savedAt: 1736723355329,
  },
  {
    id: 538,
    name: 'BioShock Infinite',
    image: '//images.igdb.com/igdb/image/upload/t_thumb/co2n12.jpg',
    first_release_date: 1361836800,
    savedAt: 1736723359000,
  },
  {
    id: 569,
    name: 'Wolfenstein',
    image: '//images.igdb.com/igdb/image/upload/t_thumb/co1y02.jpg',
    first_release_date: 1250553600,
    savedAt: 1736723369437,
  },
  {
    id: 564,
    name: 'Rogue Warrior',
    image: '//images.igdb.com/igdb/image/upload/t_thumb/co4ugi.jpg',
    first_release_date: 1259193600,
    savedAt: 1736723382963,
  },
  {
    id: 571,
    name: 'Singularity',
    image: '//images.igdb.com/igdb/image/upload/t_thumb/co1r7l.jpg',
    first_release_date: 1277424000,
    savedAt: 1736723385661,
  },
  {
    id: 7351,
    name: 'Doom',
    image: '//images.igdb.com/igdb/image/upload/t_thumb/co1nc7.jpg',
    first_release_date: 1463011200,
    savedAt: 1736723389167,
  },
  {
    id: 9727,
    name: 'Soma',
    image: '//images.igdb.com/igdb/image/upload/t_thumb/co2a20.jpg',
    first_release_date: 1442793600,
    savedAt: 1736723393995,
  },
  {
    id: 960,
    name: 'Max Payne 3',
    image: '//images.igdb.com/igdb/image/upload/t_thumb/co2mjo.jpg',
    first_release_date: 1337040000,
    savedAt: 1736723437133,
  },
  {
    id: 109,
    name: 'L.A. Noire',
    image: '//images.igdb.com/igdb/image/upload/t_thumb/co2ldn.jpg',
    first_release_date: 1305590400,
    savedAt: 1736723440069,
  },
  {
    id: 40,
    name: 'Mafia II',
    image: '//images.igdb.com/igdb/image/upload/t_thumb/co2n13.jpg',
    first_release_date: 1282608000,
    savedAt: 1736723448472,
  },
  {
    id: 1985,
    name: 'Metal Gear Solid V: The Phantom Pain',
    image: '//images.igdb.com/igdb/image/upload/t_thumb/co1v85.jpg',
    first_release_date: 1441065600,
    savedAt: 1736723452973,
  },
  {
    id: 621,
    name: 'Call of Duty',
    image: '//images.igdb.com/igdb/image/upload/t_thumb/co2n19.jpg',
    first_release_date: 1067385600,
    savedAt: 1736723466236,
  },
];

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

export const useGamesStore = create<GamesState>((set) => ({
  collectedGames: sortGames(gamesInitialState, SortType.LAST_ADDED),
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
}));
