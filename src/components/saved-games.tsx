'use client';

import { useState } from 'react';
import { SortTabs } from '@/components/sort-tabs';
import { SortType } from '@/models/games.model';
import Typography from '@/components/typography';
import { EmptyState } from '@/components/empty-state';
import { CollectedGames } from '@/components/collected-games';
import { useGamesStore } from '@/store/game-store';
import { useGameToast } from '@/hooks';

export function SavedGames() {
  const { collectedGames, removeGame, setSortType } = useGamesStore();
  const [activeTab, setActiveTab] = useState(SortType.LAST_ADDED);
  const { showGameToast } = useGameToast();

  const handleRemoveGame = (gameId: number, name: string) => {
    removeGame(gameId);
    showGameToast(name, 'removed');
  };

  const handleSortChange = (type: SortType) => {
    setSortType(type);
    setActiveTab(type);
  };

  return (
    <div
      className="p-4 md:p-6 w-full max-w-6xl mx-auto "
      style={{
        zIndex: 0,
      }}
    >
      <Typography.H1>Saved games</Typography.H1>

      <SortTabs activeTab={activeTab} handleSortChange={handleSortChange} />
      {collectedGames.length === 0 ? (
        <EmptyState />
      ) : (
        <CollectedGames
          collectedGames={collectedGames}
          handleRemoveGame={handleRemoveGame}
        />
      )}
    </div>
  );
}
