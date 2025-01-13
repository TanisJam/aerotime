import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';
import { cn } from '@/lib/utils';
import { SortType } from '@/models';
import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';

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
  const { targetRef, isIntersecting, distance } = useIntersectionObserver({
    threshold: 1,
    rootMargin: '-1px 0px 0px 0px',
  });

  const getSelectedDimensions = () => {
    const selectedButton = buttonRefs.get(selected);
    if (!selectedButton) return { width: 0, left: 0 };

    const rect = selectedButton.getBoundingClientRect();
    const parentRect = selectedButton.parentElement?.getBoundingClientRect();

    return {
      width: rect.width,
      left: parentRect ? rect.left - parentRect.left : 0,
    };
  };

  const handleSelect = (tab: SortType) => {
    setSelected(tab);
    handleSortChange(tab);
  };

  useEffect(() => {
    console.log('isIntersecting', isIntersecting);
  }, [isIntersecting]);

  useEffect(() => {
    console.log('distance', distance);
  }, [distance]);

  return (
    <div className="sticky top-0 mb-6 mt-4 z-10" ref={targetRef}>
      <div className="flex">
        <motion.div
          className="absolute bg-violet-900 rounded-full"
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
      </div>
    </div>
  );
};
