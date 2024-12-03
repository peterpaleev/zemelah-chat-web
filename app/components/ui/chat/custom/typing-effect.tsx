import { useEffect, useState } from 'react';

interface TypingEffectProps {
  text: string;
  onComplete?: () => void;
  className?: string;
}

const ASCII_CHARS = '...::/\\/\\/\\+=*abcdef01XYZ#';
const FLAME_FRAMES = 3; // Number of "flame" animation frames before showing the word
const FLAME_SPEED = 50; // Speed of flame animation (ms)

export function TypingEffect({ text, onComplete, className }: TypingEffectProps) {
  const [displayedText, setDisplayedText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [flameText, setFlameText] = useState('');
  const [flameCount, setFlameCount] = useState(0);
  const words = text.split(' ');

  // Generate random "flame" text of similar length to the target word
  const generateFlameText = (wordLength: number) => {
    return Array(wordLength)
      .fill(0)
      .map(() => ASCII_CHARS[Math.floor(Math.random() * ASCII_CHARS.length)])
      .join('');
  };

  useEffect(() => {
    if (currentIndex >= words.length) {
      if (onComplete) onComplete();
      return;
    }

    const currentWord = words[currentIndex];

    // Handle flame animation
    if (flameCount < FLAME_FRAMES) {
      const timeout = setTimeout(() => {
        setFlameText(generateFlameText(currentWord.length));
        setFlameCount(prev => prev + 1);
      }, FLAME_SPEED);
      return () => clearTimeout(timeout);
    }

    // Show actual word after flame animation
    const timeout = setTimeout(() => {
      setDisplayedText(prev => prev + (currentIndex > 0 ? ' ' : '') + currentWord);
      setCurrentIndex(prev => prev + 1);
      setFlameCount(0); // Reset flame counter for next word
      setFlameText(''); // Clear flame text
    }, 150); // Word appearance speed

    return () => clearTimeout(timeout);
  }, [currentIndex, words, onComplete, flameCount]);

  return (
    <div className={className}>
      {displayedText}
      {flameText && (
        <span style={{ color: '#464646' }}>{flameCount < FLAME_FRAMES ? flameText : ''}</span>
      )}
    </div>
  );
} 