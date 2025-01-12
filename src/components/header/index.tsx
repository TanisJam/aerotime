'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';
import Confetti from 'react-confetti';
import { SearchBar } from '@/components/search-bar';
import { Logo } from '@/components/icons/logo';
import { useKeycapsStore } from '@/store/keycaps-store';
import { Title } from './title';
import { ArrowLeft } from 'lucide-react';
import { Button } from '../ui/button';
import Typography from '../typography';

export const Header = () => {
  const pathname = usePathname();
  const { gamemode, restartGame, completed } = useKeycapsStore();

  useEffect(() => {
    if (completed) {
      console.log('completed');
      setTimeout(() => restartGame(), 10000);
    }
  }, [completed, restartGame]);

  return (
    <div className="mx-4 pointer-events-auto">
      {completed && (
        <Confetti width={window.innerWidth} height={window.innerHeight} />
      )}
      {gamemode && (
        <div className="absolute top-0 left-0 w-full  pointer-events-none animate-pulse glow-border" />
      )}
      <div className="flex items-center gap-2 pt-8 mb-5">
        {pathname === '/' ? (
          <>
            <Logo />
            <Title />
          </>
        ) : (
          <>
            <Button
              variant={'icon'}
              size={'iconSm'}
              asChild
              onClick={() => window.history.back()}
              className="text-violet-900"
            >
              <ArrowLeft size={20} />
            </Button>
            <Typography.H1 className="text-base">Back</Typography.H1>
          </>
        )}
      </div>
      <SearchBar />
    </div>
  );
};

export { Background } from './background';
