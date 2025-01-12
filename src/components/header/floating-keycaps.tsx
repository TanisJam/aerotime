'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DebugKeycaps } from './debug';
import { Keycap } from '@/models';
import {
  DEBUG,
  AUDIO_URL,
  TIRULIC_URL,
  MUSIC_URL,
  KEYCAPS_TO_SHOW,
  LETTERS,
} from '@/models/constants';
import { useKeycapsStore } from '@/store/keycaps-store';

// const KEYCAPS_TO_SHOW = 7;

export const FloatingKeycaps = () => {
  const { addKeycap, gamemode } = useKeycapsStore();
  const [activeKeycaps, setActiveKeycaps] = useState<Keycap[]>([]);
  const [inactiveKeycaps, setInactiveKeycaps] = useState<Keycap[]>([]);
  const musicRef = useRef<HTMLAudioElement | null>(null);

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
    sound.volume = 1;
    sound.play();
    if (keycapLetter) {
      const add = addKeycap(keycapLetter.toLocaleLowerCase());
      if (add) {
        const tirulic = new Audio(TIRULIC_URL);
        tirulic.play();
      }
    }
  };

  useEffect(() => {
    if (!musicRef.current) {
      musicRef.current = new Audio(MUSIC_URL);
      musicRef.current.volume = 0.3;
      musicRef.current.loop = true;
    }

    if (gamemode) {
      musicRef.current.play();
    } else {
      musicRef.current.pause();
    }

    return () => {
      if (musicRef.current) {
        musicRef.current.pause();
        musicRef.current = null;
      }
    };
  }, [gamemode]);

  return (
    <>
      <AnimatePresence>
        {activeKeycaps.map((keycap) => (
          <motion.div
            key={`${keycap.id}-${keycap.key}`}
            className="absolute"
            style={{ left: `${keycap.x}%` }}
            initial={{ y: '400px', rotate: 0, opacity: 0.3 }}
            animate={{
              y: '-120%',
              rotate: keycap.rotate,
              opacity: [0, 0, 1, 1, 1, 1],
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
