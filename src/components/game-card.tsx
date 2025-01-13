'use client';
import { SavedGame, SimilarGame } from '@/models';
import { motion } from 'framer-motion';
import Link from 'next/link';
import CustomImage from './custom-image';
import { Button } from './ui/button';
import { BookmarkCheck, Trash2 } from 'lucide-react';
import { generateSlug } from '@/lib/slugify.lib';
import { useGamesStore } from '@/store/game-store';

interface GameCardProps {
  game: SavedGame | SimilarGame;
  handleRemoveGame?: (gameId: number, name: string) => void;
  variant?: 'collection' | 'similar';
}

const getGameImage = (game: SavedGame | SimilarGame): string => {
  if ('image' in game) {
    return game.image;
  }
  return game.cover?.url || '';
};

export const GameCard = ({
  game,
  handleRemoveGame,
  variant = 'collection',
}: GameCardProps) => {
  const { collectedGames } = useGamesStore();

  const imageUrl = getGameImage(game);

  if (variant === 'similar') {
    return (
      <Link
        href={`/games/${game.id}/${generateSlug(game.name)}`}
        key={game.id}
        className="aspect-[3/4] relative hover:scale-105 hover:shadow-lg transition-transform"
      >
        <CustomImage
          src={imageUrl}
          alt={game.name}
          className="rounded-lg object-cover"
          size="cover_big"
        />
        {collectedGames.some((g) => g.id === game.id) && (
          <BookmarkCheck className="absolute bottom-2 left-2 text-violet-100 backdrop-blur-sm" />
        )}
      </Link>
    );
  }

  return (
    <motion.div
      key={game.id}
      layout
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.8 }}
      transition={{ duration: 0.3 }}
    >
      <Link
        href={`/games/${game.id}/${generateSlug(game.name)}`}
        className="relative group aspect-[3/4] rounded-2xl overflow-hidden  hover:scale-105 hover:shadow-lg transition-transform block"
      >
        <CustomImage src={imageUrl} alt={game.name} size="cover_big" />

        {handleRemoveGame && (
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
        )}
      </Link>
    </motion.div>
  );
};
