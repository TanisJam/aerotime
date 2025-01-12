'use client';
import { SearchBar } from '@/components/search-bar';
import Typography from '@/components/typography';
import { Layout } from './layout';
import { Logo } from '@/components/icons/logo';
import { useKeycapsStore } from '@/store/keycaps-store';
import { motion } from 'framer-motion';

export const Header = () => {
  const { collectedKeycaps } = useKeycapsStore();

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

  const transitionEffect = {
    duration: 1,
    repeat: Infinity,
    repeatType: 'mirror' as const,
  };

  return (
    <Layout>
      <div className="flex gap-2 mt-8 mb-5">
        <Logo />
        <Typography.H1 className="my-auto">
          {Array.from('AeroTime').map((letter, i) => (
            <motion.span
              key={`${letter}-${i}`}
              animate={
                collectedKeycaps[i] === letter.toLowerCase()
                  ? animateEffect
                  : {}
              }
              transition={transitionEffect}
            >
              {letter}
            </motion.span>
          ))}
        </Typography.H1>
      </div>
      <SearchBar />
    </Layout>
  );
};
