import { useEffect, useState } from 'react';

interface TypingEffectProps {
  text: string;
  onComplete?: () => void;
  className?: string;
}

export function TypingEffect({ text, onComplete, className }: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const words = text.split(' ');

  useEffect(() => {
    if (currentIndex < words.length) {
      const timeout = setTimeout(() => {
        setDisplayedText(prev => prev + (currentIndex > 0 ? ' ' : '') + words[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 150); // Adjust speed here (lower number = faster)

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, words, onComplete]);

  return <div className={className}>{displayedText}</div>;
} 