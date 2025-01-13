'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useGamesStore } from '@/store/game-store';
import { Trash2 } from 'lucide-react';
import { generateSlug } from '@/lib/slugify.lib';
import { Button } from '@/components/ui/button';
import CustomImage from '@/components/custom-image';
import { SortTabs } from '@/components/sort-tabs';
import { SortType } from '@/models/games.model';
import Typography from '@/components/typography';
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

      <div className="grid grid-cols-3 md:grid-cols-4  gap-4">
        {collectedGames.map((game) => (
          <Link
            href={`/games/${game.id}/${generateSlug(game.name)}`}
            key={game.id}
            className="relative group aspect-[3/4] rounded-2xl overflow-hidden  hover:scale-105 hover:shadow-lg transition-transform"
          >
            <CustomImage src={game.image} alt={game.name} size="cover_big" />

            <Button
              variant="secondary"
              size="icon"
              className="absolute bottom-2 right-2 bg-white/80 backdrop-blur-sm rounded-full"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                handleRemoveGame(game.id, game.name);
              }}
            >
              <Trash2 className="h-4 w-4" />
              <span className="sr-only">Remove {game.name}</span>
            </Button>
          </Link>
        ))}
      </div>
    </div>
  );
}
