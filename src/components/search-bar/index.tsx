'use client';
import { useState } from 'react';
import { Layout } from './layout';
import { useGamesSuggestions, useDebounce } from '@/hooks';

export const SearchBar = () => {
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

  return (
    <Layout
      suggestions={suggestions}
      query={searchQuery}
      onChange={onSearch}
      loading={isLoading}
    />
  );
};
