import { useKeycapsStore } from '@/store/keycaps-store';
import Typography from '@/components/typography';
import Tooltip from '@/components/tooltip';
import { TITLE, INTERACTIONS_MESSAGES } from '@/models/constants';
import { motion } from 'framer-motion';

export const Title = () => {
  const { collectedKeycaps, setGamemode, interactionsCount } =
    useKeycapsStore();

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

  return (
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
  );
};
