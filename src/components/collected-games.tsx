import Link from 'next/link';
import CustomImage from '@/components/custom-image';
import { Button } from '@/components/ui/button';
import { generateSlug } from '@/lib/slugify.lib';
import { Trash2 } from 'lucide-react';
import { AnimatePresence, motion } from 'framer-motion';

import { SavedGame } from '@/models/games.model';

interface CollectedGameProps {
  collectedGames: SavedGame[];
  handleRemoveGame: (gameId: number, name: string) => void;
}

export const CollectedGames = ({
  collectedGames,
  handleRemoveGame,
}: CollectedGameProps) => {
  return (
    <div className="grid grid-cols-3 md:grid-cols-4  gap-4">
      <AnimatePresence>
        {collectedGames.map((game) => (
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
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};
