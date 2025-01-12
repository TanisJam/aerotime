'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DebugKeycaps } from './debug';
import { Keycap } from '@/models';
import { useKeycapsStore } from '@/store/keycaps-store';

const DEBUG = false;

const AUDIO_URL = './key-press.mp3';
const LETTERS = [
  'W',
  'A',
  'S',
  'D',
  'E',
  'Q',
  'R',
  'T',
  'O',
  'I',
  'M',
  'L',
  'B',
];
const KEYCAPS_TO_SHOW = 7;

export const FloatingKeycaps = () => {
  const { addKeycap } = useKeycapsStore();
  const [activeKeycaps, setActiveKeycaps] = useState<Keycap[]>([]);
  const [inactiveKeycaps, setInactiveKeycaps] = useState<Keycap[]>([]);

  useEffect(() => {
    const allKeycaps = LETTERS.map(
      (letter, index) => new Keycap(index, letter)
    );

    const active = allKeycaps.slice(0, KEYCAPS_TO_SHOW);
    const inactive = allKeycaps.slice(KEYCAPS_TO_SHOW);

    setActiveKeycaps(active);
    setInactiveKeycaps(inactive);
  }, []);

  const handleAnimationComplete = (id: number) => {
    const completedIndex = activeKeycaps.findIndex((k) => k.id === id);
    if (completedIndex === -1) return;

    const randomIndex = Math.floor(Math.random() * inactiveKeycaps.length);

    const completedKeycap = activeKeycaps[completedIndex];
    const newActiveKeycap = inactiveKeycaps[randomIndex];

    newActiveKeycap.regenerateProperties();

    const newActive = [...activeKeycaps];
    const newInactive = [...inactiveKeycaps];

    newActive[completedIndex] = newActiveKeycap;
    newInactive[randomIndex] = completedKeycap;

    setActiveKeycaps(newActive);
    setInactiveKeycaps(newInactive);
  };

  const handleKeycapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const keycap = event.currentTarget;
    const keycapLetter = keycap.textContent;
    const sound = new Audio(AUDIO_URL);
    sound.play();
    if (keycapLetter) {
      addKeycap(keycapLetter.toLocaleLowerCase());
    }
  };

  return (
    <>
      <AnimatePresence>
        {activeKeycaps.map((keycap) => (
          <motion.div
            key={`${keycap.id}-${keycap.key}`}
            className="absolute"
            style={{ left: `${keycap.x}%` }}
            initial={{ y: '400px', rotate: 0 }}
            animate={{
              y: '-120%',
              rotate: keycap.rotate,
            }}
            transition={{
              duration: keycap.speed,
              repeat: 0,
              delay: keycap.delay,
              ease: 'easeIn',
            }}
            onAnimationComplete={() => handleAnimationComplete(keycap.id)}
          >
            <div
              className="flex items-center justify-center w-12 h-12 bg-white rounded-lg active:!shadow-sm cursor-pointer"
              style={keycap.style}
              onClick={handleKeycapClick}
            >
              <span className="text-lg font-medium text-pink-600/40 pointer-events-none">
                {keycap.letter}
              </span>
            </div>
          </motion.div>
        ))}
      </AnimatePresence>
      {DEBUG && (
        <DebugKeycaps
          activeKeycaps={activeKeycaps}
          inactiveKeycaps={inactiveKeycaps}
        />
      )}
    </>
  );
};
