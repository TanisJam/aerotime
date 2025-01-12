'use client';
import { useState } from 'react';
import { Layout } from './layout';
import { useGamesSuggestions, useDebounce } from '@/hooks';
import { generateSlug } from '@/lib/slugify.lib';
import { useRouter } from 'next/navigation';

export const SearchBar = () => {
  const router = useRouter();
  const [searchQuery, setSearchQuery] = useState('');
  const debouncedSearch = useDebounce(searchQuery, 500);
  const { suggestions, error, isLoading } =
    useGamesSuggestions(debouncedSearch);

  if (error) {
    console.error('Error fetching games:', error);
  }

  const onSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };
  const onSelection = (name: string, id: number) => {
    setSearchQuery('');
    router.push(`/games/${id}/${generateSlug(name)}`);
  };

  return (
    <Layout
      suggestions={suggestions}
      query={searchQuery}
      onChange={onSearch}
      loading={isLoading}
      onSelection={onSelection}
    />
  );
};
