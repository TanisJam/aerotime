import { CircleCheck, CircleAlert } from 'lucide-react';
import Typography from './typography';
import { cn } from '@/lib/utils';

interface GameToastProps {
  variant: 'collected' | 'removed';
  gameName: string;
}

export const GameToast = ({ variant, gameName }: GameToastProps) => {
  const isCollected = variant === 'collected';

  return (
    <div
      className={cn(
        "flex flex-col gap-2 bg-white rounded-lg border p-4 max-w-[358px] mx-auto shadow-xl",
        isCollected ? "border-green-600" : "border-red-600"
      )}
    >
      <div className="flex gap-2 align-center">
        {isCollected ? (
          <CircleCheck className="h-4 w-4 my-auto text-green-600" />
        ) : (
          <CircleAlert className="h-4 w-4 my-auto text-red-600" />
        )}
        <Typography.H2>
          Game {isCollected ? "collected" : "removed"}
        </Typography.H2>
      </div>
      <Typography.H4>
        {gameName} has been {isCollected ? "added to" : "removed from"} your collection
      </Typography.H4>
    </div>
  );
};
