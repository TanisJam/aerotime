import { toast } from 'sonner';
import { GameToast } from '@/components/game-toast';

type GameToastVariant = 'collected' | 'removed';

export const useGameToast = () => {
  const showGameToast = (gameName: string, variant: GameToastVariant) => {
    toast(<GameToast variant={variant} gameName={gameName} />, {
      duration: 2000,
    });
  };

  return { showGameToast };
};
