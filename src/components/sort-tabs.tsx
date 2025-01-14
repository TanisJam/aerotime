import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';
import { SortType } from '@/models';
import { motion } from 'framer-motion';
import { useState } from 'react';

interface SortTabProps {
  activeTab: SortType;
  handleSortChange: (type: SortType) => void;
}

const tabs = [
  { id: SortType.LAST_ADDED, label: 'Last added' },
  { id: SortType.NEWEST, label: 'Newest' },
  { id: SortType.OLDEST, label: 'Oldest' },
];

export const SortTabs = ({ activeTab, handleSortChange }: SortTabProps) => {
  const [selected, setSelected] = useState(activeTab);
  const [buttonRefs] = useState(() => new Map<string, HTMLButtonElement>());
  const { targetRef, isIntersecting } = useIntersectionObserver({
    threshold: 1,
    rootMargin: '-1px 0px 0px 0px',
  });
  const [containerRef, setContainerRef] = useState<HTMLDivElement | null>(null);

  const getSelectedDimensions = () => {
    const selectedButton = buttonRefs.get(selected);
    if (!selectedButton) return { width: 0, left: 0 };

    const rect = selectedButton.getBoundingClientRect();
    const parentRect = selectedButton.parentElement?.getBoundingClientRect();

    return {
      width: rect.width - 8,
      left: parentRect ? rect.left - parentRect.left : 0,
    };
  };

  const getCenterOffset = () => {
    if (!containerRef) return 0;
    const containerWidth = containerRef.offsetWidth;
    const parentWidth = containerRef.parentElement?.offsetWidth || 0;
    return (parentWidth - containerWidth) / 2;
  };

  const handleSelect = (tab: SortType) => {
    setSelected(tab);
    handleSortChange(tab);
  };

  return (
    <div className="sticky top-0 mb-6 mt-4 z-10" ref={targetRef}>
      <div className="flex overflow-hidden relative">
        <motion.div
          ref={setContainerRef}
          className={cn(
            'relative flex rounded-full',
            !isIntersecting && 'bg-white/80 backdrop-blur-sm mt-4'
          )}
          animate={{
            x: !isIntersecting ? getCenterOffset() : 0,
          }}
          transition={{
            type: 'spring',
            stiffness: 300,
            damping: 30,
          }}
        >
          <motion.div
            className="absolute bg-violet-900 rounded-full mx-1"
            initial={false}
            animate={{
              width: getSelectedDimensions().width,
              x: getSelectedDimensions().left,
            }}
            transition={{
              type: 'spring',
              stiffness: 400,
              damping: 30,
            }}
            style={{
              height: 'calc(100% - 8px)',
              top: '4px',
            }}
          />

          {tabs.map((tab) => (
            <button
              key={tab.id}
              ref={(el) => {
                if (el) buttonRefs.set(tab.id, el);
              }}
              onClick={() => handleSelect(tab.id)}
              className={cn(
                'relative p-3 rounded-full transition-colors text-sm font-medium',
                activeTab === tab.id ? 'text-white' : 'text-violet-900'
              )}
            >
              <motion.span
                animate={{
                  opacity: activeTab === tab.id ? 1 : 0.7,
                }}
                transition={{ duration: 0.2 }}
              >
                {tab.label}
              </motion.span>
            </button>
          ))}
        </motion.div>
      </div>
    </div>
  );
};
