'use client';

import { FC, ReactNode } from 'react';
import { FloatingKeycaps } from './floating-keycaps';

interface LayoutProps {
  children: ReactNode;
}

export const Layout: FC<LayoutProps> = ({ children }) => {
  return (
    <header className="relative h-96 overflow-hidden ">
      <div className="absolute z-50 top-0 left-0 w-full h-full flex flex-col justify-center items-center pointer-events-none">
        <div className="text-4xl font-bold text-center w-min h-min pointer-events-auto">
          {children}
        </div>
      </div>
      <div className="absolute w-full top-0 h-full bg-gradient-to-b from-typography-pinkLight to-transparent"></div>
      <FloatingKeycaps />
      <div className="absolute bottom-0 w-full h-full bg-gradient-to-b from-transparent from-80% to-white to-100% pointer-events-none"></div>
    </header>
  );
};
