import React, { useState, ReactNode } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface TooltipProps {
  children: ReactNode;
  message: string;
}

const Tooltip: React.FC<TooltipProps> = ({ children, message }) => {
  const [showTooltip, setShowTooltip] = useState(false);

  const onAnimateComplete = () => {
    setShowTooltip(false);
  };

  return (
    <div className="relative inline-block">
      <div onClick={() => setShowTooltip(!showTooltip)}>{children}</div>
      <AnimatePresence>
        {showTooltip && message && (
          <motion.div
            initial={{ opacity: 0, y: -5 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 5 }}
            transition={{ duration: 0.2 }}
            onAnimationComplete={onAnimateComplete}
            className="absolute top-full left-1/2 transform -translate-x-1/2 mt-2 px-3 py-1 bg-gray-800 text-white text-sm rounded shadow-lg z-50 w-full max-w-xs"
          >
            {message}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Tooltip;
