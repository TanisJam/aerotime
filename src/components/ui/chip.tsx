import { cn } from '@/lib/utils';

interface ChipProps {
  icon: React.ReactNode;
  label: string;
  value: string | number;
  className?: string;
}

export function Chip({ icon, label, value, className }: ChipProps) {
  return (
    <div
      className={cn(
        'inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white border border-violet-50',
        className
      )}
    >
      <span className="text-violet-600">{icon}</span>
      <span className="text-sm font-medium">
        <span className="text-violet-600">{label}:</span>
        <span className="ml-1 text-violet-900">{value}</span>
      </span>
    </div>
  );
}
