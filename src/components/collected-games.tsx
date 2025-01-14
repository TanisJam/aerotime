import { AnimatePresence } from 'framer-motion';

import { SavedGame } from '@/models';
import { GameCard } from './game-card';

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
          <GameCard
            key={game.id}
            game={game}
            handleRemoveGame={handleRemoveGame}
          />
        ))}
      </AnimatePresence>
    </div>
  );
};
