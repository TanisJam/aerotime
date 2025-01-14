import { useEffect, useRef, useState } from 'react';

interface UseIntersectionObserverProps {
  threshold?: number;
  root?: Element | null;
  rootMargin?: string;
}

export const useIntersectionObserver = ({
  threshold = 0,
  root = null,
  rootMargin = '0px',
}: UseIntersectionObserverProps = {}) => {
  const [isIntersecting, setIsIntersecting] = useState(true);
  const [distance, setDistance] = useState<number>(0);
  const targetRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const calculateDistance = () => {
      if (targetRef.current) {
        const rect = targetRef.current.getBoundingClientRect();
        setDistance(rect.top);
      }
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting);
        calculateDistance();
      },
      {
        threshold,
        root,
        rootMargin,
      }
    );

    const currentTarget = targetRef.current;
    if (currentTarget) {
      observer.observe(currentTarget);
    }

    window.addEventListener('scroll', calculateDistance);

    return () => {
      if (currentTarget) {
        observer.unobserve(currentTarget);
      }
      window.removeEventListener('scroll', calculateDistance);
    };
  }, [threshold, root, rootMargin]);

  return { targetRef, isIntersecting, distance };
};
