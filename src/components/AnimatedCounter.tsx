import React, { useEffect, useRef, useState } from 'react';

interface AnimatedCounterProps {
  value: number;
  duration?: number; // duration in ms, default 1400ms
  prefix?: string;
  suffix?: string;
  decimals?: number;
  className?: string;
  locale?: string;
}

export const AnimatedCounter: React.FC<AnimatedCounterProps> = ({
  value,
  duration = 1400,
  prefix = '',
  suffix = '',
  decimals = 0,
  className = '',
  locale = 'en-IN',
}) => {
  const [displayValue, setDisplayValue] = useState<number>(0);
  const [hasStarted, setHasStarted] = useState<boolean>(false);
  const prevValueRef = useRef<number>(0);
  const elementRef = useRef<HTMLSpanElement>(null);

  // Trigger when scrolled into viewport
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setHasStarted(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => observer.disconnect();
  }, []);

  // Animate count with smooth easeOutExpo curve, handles initial scroll + value changes
  useEffect(() => {
    if (!hasStarted) return;

    const startVal = prevValueRef.current;
    const targetVal = value;
    const diff = targetVal - startVal;

    let startTime: number | null = null;
    let animationFrameId: number;

    const easeOutExpo = (t: number): number => {
      return t === 1 ? 1 : 1 - Math.pow(2, -10 * t);
    };

    const animate = (timestamp: number) => {
      if (!startTime) startTime = timestamp;
      const progress = Math.min((timestamp - startTime) / duration, 1);
      const easedProgress = easeOutExpo(progress);
      
      const currentVal = startVal + diff * easedProgress;
      setDisplayValue(currentVal);

      if (progress < 1) {
        animationFrameId = requestAnimationFrame(animate);
      } else {
        setDisplayValue(targetVal);
        prevValueRef.current = targetVal;
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrameId);
  }, [hasStarted, value, duration]);

  const formattedNumber = decimals > 0 
    ? displayValue.toLocaleString(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals })
    : Math.round(displayValue).toLocaleString(locale);

  return (
    <span ref={elementRef} className={`tabular-nums inline-block transition-transform duration-75 ${className}`}>
      {prefix}
      {formattedNumber}
      {suffix}
    </span>
  );
};
