'use client';

import * as React from 'react';
import { Search, X, Loader } from 'lucide-react';
import CustomImage from '@/components/custom-image';
import { motion, AnimatePresence } from 'framer-motion';
import { cn } from '@/lib/utils';
import { useEffect, useRef } from 'react';

const BORDER_RADIUS = '20px';
const BORDER_COLOR = '#FF00AE33';

interface LayoutProps {
  query: string;
  loading?: boolean;
  onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  suggestions: {
    id: number;
    cover?: {
      id: number;
      url: string;
    };
    first_release_date: number;
    name: string;
  }[];
}

export const Layout = ({
  suggestions,
  query,
  loading,
  onChange,
}: LayoutProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const showResults = query.length > 0;

  const calculateHeight = () => {
    const ITEM_HEIGHT = 48;
    const PADDING = 16;
    return `${ITEM_HEIGHT * suggestions.length + PADDING}px`;
  };

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        containerRef.current &&
        !containerRef.current.contains(event.target as Node)
      ) {
        onChange({
          target: { value: '' },
        } as React.ChangeEvent<HTMLInputElement>);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [onChange]);

  return (
    <div ref={containerRef} className="relative w-full max-w-[400px]">
      <motion.div
        className="bg-white shadow-sm backdrop-blur-sm border border-pink-600/20"
        animate={{
          borderRadius: !showResults
            ? `${BORDER_RADIUS} ${BORDER_RADIUS} ${BORDER_RADIUS} ${BORDER_RADIUS}`
            : `${BORDER_RADIUS} ${BORDER_RADIUS} 0px 0px`,
          borderBottom: !showResults ? '1px solid ' + BORDER_COLOR : 'none',
          marginBottom: !showResults ? 0 : '1px',
        }}
        transition={{ duration: 0.1 }}
      >
        <div className="flex items-center px-4 py-2">
          {loading ? (
            <Loader
              className="mr-2 h-4 w-4 text-purple-700 animate-spin"
              size="1em"
            />
          ) : (
            <Search
              className={cn(
                'mr-2 h-4 w-4 transition-colors duration-500 ',
                query.length > 0 ? 'text-purple-700' : 'text-pink-200'
              )}
              size="1em"
            />
          )}

          <input
            ref={inputRef}
            type="text"
            value={query}
            onChange={onChange}
            placeholder="Search games..."
            className="flex-1 bg-transparent text-sm text-purple-900  placeholder-purple-900/50 outline-none"
          />
          <AnimatePresence>
            {query && (
              <motion.button
                onClick={() => {
                  onChange({
                    target: { value: '' },
                  } as React.ChangeEvent<HTMLInputElement>);
                  inputRef.current?.focus();
                }}
                className="ml-2 rounded-full hover:bg-purple-100"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
              >
                <X className="h-4 w-4 text-black" />
              </motion.button>
            )}
          </AnimatePresence>
        </div>
        <AnimatePresence>
          {showResults && (
            <motion.div
              className="absolute left-0 right-0 top-full bg-white rounded-b-[20px] outline outline-1 outline-pink-600/20 shadow-lg backdrop-blur-sm z-10 p-2"
              initial={{
                opacity: 0,
                height: 0,
                transformOrigin: 'top',
                borderRadius: `${BORDER_RADIUS} ${BORDER_RADIUS} ${BORDER_RADIUS} ${BORDER_RADIUS}`,
              }}
              animate={{
                opacity: 1,
                height: calculateHeight(),
                borderRadius: !showResults
                  ? `${BORDER_RADIUS} ${BORDER_RADIUS} ${BORDER_RADIUS} ${BORDER_RADIUS}`
                  : `0px 0px ${BORDER_RADIUS} ${BORDER_RADIUS}`,
              }}
              exit={{
                opacity: 0,
                height: 0,
                borderRadius: `${BORDER_RADIUS} ${BORDER_RADIUS} ${BORDER_RADIUS} ${BORDER_RADIUS}`,
              }}
              transition={{ duration: 0.2, ease: 'easeInOut' }}
            >
              {suggestions.map((game, index) => (
                <motion.button
                  key={game.id}
                  onClick={() => {
                    onChange({
                      target: { value: game.name },
                    } as React.ChangeEvent<HTMLInputElement>);
                    inputRef.current?.focus();
                  }}
                  className="flex w-full items-center gap-3 rounded-lg px-2 py-2 text-left hover:bg-purple-50"
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05 }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <div className="h-8 w-8 overflow-hidden rounded">
                    <CustomImage
                      src={game.cover?.url}
                      alt={game.name}
                      height={32}
                      width={32}
                      className="object-cover"
                    />
                  </div>
                  <span className="text-sm text-purple-900">{game.name}</span>
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>
    </div>
  );
};
