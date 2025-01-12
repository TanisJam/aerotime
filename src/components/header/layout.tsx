import { useKeycapsStore } from '@/store/keycaps-store';
import { FloatingKeycaps } from './floating-keycaps';
import { cn } from '@/lib/utils';

export const Layout = () => {
  const { gamemode } = useKeycapsStore();

  return (
    <div
      className={cn(
        'absolute top-0 left-0 w-full h-96 overflow-hidden -z-[1] pointer-events-auto',
        {
          'z-40': gamemode,
        }
      )}
    >
      <div className="absolute w-full h-full top-0  bg-gradient-to-b from-typography-pinkLight to-transparent pointer-events-none"></div>
      <FloatingKeycaps />
    </div>
  );
};
