'use client';

import { useState } from 'react';
import { useGamesStore } from '@/store/game-store';
import { Trash2 } from 'lucide-react';
import { motion } from 'framer-motion';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { generateSlug } from '@/lib/slugify.lib';
import CustomImage from '@/components/custom-image';
import { SortType } from '@/models/games.model';
import Link from 'next/link';

const tabs = [
  { id: SortType.LAST_ADDED, label: 'Last added' },
  { id: SortType.NEWEST, label: 'Newest' },
  { id: SortType.OLDEST, label: 'Oldest' },
];

export function SavedGames() {
  const { collectedGames, removeGame, setSortType } = useGamesStore();
  const [activeTab, setActiveTab] = useState('last-added');

  const handleRemoveGame = (gameId: number) => {
    console.log('Removing game:', gameId);
    removeGame(gameId);
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
      <h1 className="text-2xl font-semibold text-purple-900 mb-6">
        Saved games
      </h1>

      <div className="relative mb-6">
        <div className="flex gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => handleSortChange(tab.id as SortType)}
              className={cn(
                'relative px-4 py-2 rounded-full transition-colors',
                activeTab === tab.id ? 'text-white' : 'text-purple-900'
              )}
            >
              <span className="relative" style={{ zIndex: 1 }}>
                {tab.label}
              </span>
              {activeTab === tab.id && (
                <motion.div
                  layoutId="active-tab"
                  className="absolute inset-0 bg-purple-900 rounded-full"
                  transition={{
                    type: 'spring',
                    bounce: 0.2,
                    duration: 0.6,
                  }}
                />
              )}
            </button>
          ))}
        </div>
      </div>

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
                handleRemoveGame(game.id);
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
