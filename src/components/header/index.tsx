'use client';

import { useEffect } from 'react';
import { SearchBar } from '@/components/search-bar';
import Typography from '@/components/typography';
import { Logo } from '@/components/icons/logo';
import { useKeycapsStore } from '@/store/keycaps-store';
import { TITLE, INTERACTIONS_MESSAGES } from '@/models/constants';

import { motion } from 'framer-motion';
import Tooltip from '../tooltip';
import Confetti from 'react-confetti';

export const Header = () => {
  const {
    collectedKeycaps,
    gamemode,
    setGamemode,
    restartGame,
    interactionsCount,
    completed,
  } = useKeycapsStore();

  const animateEffect = {
    textShadow: [
      '0px 0px 8px rgba(255, 0, 255, .8)',
      '0px 0px 8px rgba(255, 30, 255, .5)',
      '0px 0px 8px rgba(255, 15, 255, .3)',
      '0px 0px 8px rgba(255, 40, 255, .3)',
      '0px 0px 8px rgba(255, 10, 255, .4)',
      '0px 0px 8px rgba(255, 0, 255, .6)',
      '0px 0px 8px rgba(255, 0, 255, .3)',
    ],
  };

  const defaultEffect = {
    textShadow: ['none', 'none', 'none', 'none', 'none', 'none', 'none'],
  };

  const isCorrect = (i: number) =>
    collectedKeycaps[i] === Array.from(TITLE)[i].toLowerCase();

  const transitionEffect = {
    duration: 1,
    repeat: Infinity,
    repeatType: 'mirror' as const,
  };

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
      <div className="flex gap-2 pt-8 mb-5">
        <Logo />
        <Tooltip message={INTERACTIONS_MESSAGES[interactionsCount]}>
          <Typography.H1 className="my-auto" onClick={() => setGamemode()}>
            {Array.from(TITLE).map((letter, i) => (
              <motion.span
                key={`${letter}-${i}`}
                animate={isCorrect(i) ? animateEffect : defaultEffect}
                transition={transitionEffect}
                className={isCorrect(i) ? 'letter-underline' : ''}
              >
                {letter}
              </motion.span>
            ))}
          </Typography.H1>
        </Tooltip>
      </div>
      <SearchBar />
    </div>
  );
};

export { Layout } from './layout';
