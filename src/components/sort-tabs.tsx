import { cn } from '@/lib/utils';
import { SortType } from '@/models';
import { motion } from 'framer-motion';

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
  return (
    <div className="relative mb-6 mt-4">
      <div className="flex gap-2">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => handleSortChange(tab.id as SortType)}
            className={cn(
              'relative px-4 py-2 rounded-full transition-colors',
              activeTab === tab.id ? 'text-white' : 'text-violet-900'
            )}
          >
            <span className="relative" style={{ zIndex: 1 }}>
              {tab.label}
            </span>
            {activeTab === tab.id && (
              <motion.div
                layoutId="active-tab"
                className="absolute inset-0 bg-violet-900 rounded-full"
                transition={{
                  type: 'spring',
                  bounce: 0.2,
                  duration: 0.6,
                }}
              />
            )}
          </button>
        ))}
      </div>
    </div>
  );
};
