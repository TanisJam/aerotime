'use client';
import { Button } from '@/components/ui/button';
import { SavedGame } from '@/models/games.model';
import { useGamesStore } from '@/store/game-store';
import { useGameToast } from '@/hooks';
import { useMemo } from 'react';

export const CollectButton = ({
  id,
  name,
  image,
  first_release_date,
}: Omit<SavedGame, 'savedAt'>) => {
  const { collectedGames, addGame } = useGamesStore();
  const { showGameToast } = useGameToast();

  const isCollected = useMemo(
    () => collectedGames.some((game) => game.id === id),
    [collectedGames, id]
  );

  const handleAddGame = () => {
    if (!isCollected) {
      addGame({ id, name, image, first_release_date });
      showGameToast(name, 'collected');
    }
  };

  return (
    <Button
      variant={isCollected ? 'collected' : 'collect'}
      onClick={handleAddGame}
    >
      {isCollected ? 'Game collected' : 'Collect game'}
    </Button>
  );
};
