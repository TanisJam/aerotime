import useSWR from 'swr';
import fetcher from '@/lib/fetcher.lib';

export const useGamesSuggestions = (query: string) => {
  const { data, error, isLoading } = useSWR(
    query ? `/api/games?query=${query}` : null,
    fetcher,
    { revalidateOnFocus: false }
  );

  return {
    suggestions: data || [],
    error,
    isLoading,
  };
};

export const useGamesSearch = (query: string) => {
  const { data, error, isLoading } = useSWR(
    query ? `/api/games/search?query=${query}` : null,
    fetcher
  );

  return {
    games: data || [],
    error,
    isLoading,
  };
};
