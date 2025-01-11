'use client';

import { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

class Keycap {
  public style = {
    boxShadow:
      '0px 2px 4px 0px rgba(227, 193, 216, 0.6),2px -2px 2px 0px rgba(249, 236, 253, 1) inset',
  };
  public x: number = 0;
  public delay: number = 0;
  public speed: number = 0;
  public rotate: number = 0;
  public key: number;

  constructor(public id: number, public letter: string) {
    this.regenerateProperties();
    this.key = 0;
  }

  regenerateProperties() {
    this.x = Math.random() * 80 + 10;
    this.delay = Math.random() * 2;
    this.speed = Math.random() * 5 + 5;
    this.rotate = Math.random() * 360;
    this.key++;
  }
}

export const FloatingKeycaps = () => {
  const [keycaps, setKeycaps] = useState<Keycap[]>([]);

  useEffect(() => {
    const letters = ['W', 'A', 'S', 'D', 'E', 'Q', 'R', 'F'];
    const newKeycaps = letters.map(
      (letter, index) => new Keycap(index, letter)
    );
    setKeycaps(newKeycaps);
  }, []);

  const handleAnimationComplete = (id: number) => {
    setKeycaps((prevKeycaps) => {
      return prevKeycaps.map((keycap) => {
        if (keycap.id === id) {
          keycap.regenerateProperties();
        }
        return keycap;
      });
    });
  };

  const handleKeycapClick = (event: React.MouseEvent<HTMLDivElement>) => {
    const keycap = event.currentTarget;

    const keycapLetter = keycap.textContent;

    console.log(`Keycap clicked: ${keycapLetter}`);
  };

  return (
    <AnimatePresence>
      {keycaps.map((keycap) => (
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
  );
};
