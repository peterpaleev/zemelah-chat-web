import { useEffect, useState } from 'react';

interface TypingEffectProps {
  text: string;
  onComplete?: () => void;
  className?: string;
}

export function TypingEffect({ text, onComplete, className }: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [shouldStart, setShouldStart] = useState(false);
  const words = text.split(' ');

  useEffect(() => {
    const startDelay = setTimeout(() => {
      setShouldStart(true);
    }, 1500);

    const fallbackTimer = setTimeout(() => {
      if (currentIndex === -1) {
        setDisplayedText(text);
        setCurrentIndex(words.length);
        if (onComplete) onComplete();
      }
    }, 5000);

    return () => {
      clearTimeout(startDelay);
      clearTimeout(fallbackTimer);
    };
  }, []);

  useEffect(() => {
    if (!shouldStart || currentIndex >= words.length) return;

    if (currentIndex === -1) {
      setCurrentIndex(0);
      return;
    }

    const timeout = setTimeout(() => {
      setDisplayedText(prev => prev + (currentIndex > 0 ? ' ' : '') + words[currentIndex]);
      setCurrentIndex(prev => prev + 1);
    }, 150);

    return () => clearTimeout(timeout);
  }, [currentIndex, words, shouldStart]);

  return <div className={className}>{displayedText}</div>;
} 