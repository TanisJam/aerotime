import { HTMLAttributes } from 'react';

import { cn } from '@/lib/utils';

const Typography = {
  H1: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h1
      className={cn(
        'text-xl md:text-2xl font-semibold bg-gradient-to-l from-violet-600 to-violet-900 bg-clip-text text-transparent',
        className
      )}
      {...props}
    />
  ),

  H2: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h2
      className={cn('text-base font-semibold text-black', className)}
      {...props}
    />
  ),

  H3: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h3
      className={cn('text-sm font-medium text-typography-purple', className)}
      {...props}
    />
  ),

  H4: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h4
      className={cn(
        'text-sm md:text-base font-medium text-typography-gray',
        className
      )}
      {...props}
    />
  ),

  H5: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h5 className={cn('text-sm text-typography-gray', className)} {...props} />
  ),

  H6: ({ className, ...props }: HTMLAttributes<HTMLHeadingElement>) => (
    <h6 className={cn('text-xs text-typography-gray', className)} {...props} />
  ),

  P: ({ className, ...props }: HTMLAttributes<HTMLParagraphElement>) => (
    <p className={cn('text-sm text-typography-gray', className)} {...props} />
  ),
};

export default Typography;
