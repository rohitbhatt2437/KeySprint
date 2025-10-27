"use client";

import { useState, useEffect, useRef, useCallback } from 'react';
import { RefreshCw, CheckSquare } from 'lucide-react';
import { adaptiveTextGeneration } from '@/ai/flows/adaptive-text-generation';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';
import { typingTexts } from '@/lib/words';

type CharState = 'default' | 'correct' | 'incorrect';

type Char = {
  char: string;
  state: CharState;
};

export default function TypingTest() {
  const [text, setText] = useState<Char[]>([]);
  const [userInput, setUserInput] = useState('');
  const [startTime, setStartTime] = useState<number | null>(null);
  const [endTime, setEndTime] = useState<number | null>(null);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [resultsShown, setResultsShown] = useState(false);

  const inputRef = useRef<HTMLInputElement | null>(null);
  const textContainerRef = useRef<HTMLDivElement | null>(null);
  const caretRef = useRef<HTMLSpanElement | null>(null);
  const { toast } = useToast();

  const calculateResults = useCallback(() => {
    const finalEndTime = endTime || Date.now();
    if (!startTime) return;

    const durationInMinutes = (finalEndTime - startTime) / 1000 / 60;
    if (durationInMinutes === 0) return;
    
    const wordsTyped = userInput.trim().split(/\s+/).length;
    const calculatedWpm = Math.round(wordsTyped / durationInMinutes);

    let correctChars = 0;
    userInput.split('').forEach((char, index) => {
        if (text[index] && text[index].char === char) {
            correctChars++;
        }
    });
    const calculatedAccuracy = Math.round((correctChars / userInput.length) * 100);

    setWpm(calculatedWpm);
    setAccuracy(calculatedAccuracy || 0);
    setIsFinished(true);
    setResultsShown(true);
  }, [startTime, endTime, text, userInput]);

  const resetTest = useCallback(async (isRestart = false) => {
    setIsLoading(true);
    setIsFinished(false);
    setResultsShown(false);
    setWpm(0);
    setAccuracy(0);
    setUserInput('');
    setStartTime(null);
    setEndTime(null);

    try {
      let newText;
      if (isRestart || wpm === 0) {
        newText = typingTexts[Math.floor(Math.random() * typingTexts.length)];
      } else {
        const result = await adaptiveTextGeneration({ wpm, accuracy, previousText: text.map(c => c.char).join('') });
        newText = result.text;
      }
      setText(newText.split('').map(char => ({ char, state: 'default' })));
    } catch (error) {
      console.error("Failed to generate text:", error);
      toast({
        title: "Error",
        description: "Could not fetch new text. Using a default text.",
        variant: "destructive",
      });
      const defaultText = typingTexts[Math.floor(Math.random() * typingTexts.length)];
      setText(defaultText.split('').map(char => ({ char, state: 'default' })));
    } finally {
      setIsLoading(false);
      setTimeout(() => inputRef.current?.focus(), 0);
    }
  }, [wpm, accuracy, text, toast]);

  useEffect(() => {
    resetTest(true);
  }, []); // eslint-disable-line react-hooks/exhaustive-deps
  
  useEffect(() => {
    if (caretRef.current && textContainerRef.current) {
      const container = textContainerRef.current;
      const caret = caretRef.current;
      const containerRect = container.getBoundingClientRect();
      const caretRect = caret.getBoundingClientRect();

      const scrollOffset = caret.offsetLeft - container.offsetLeft - container.clientWidth / 2;
      container.scrollTo({
        left: scrollOffset,
        behavior: 'smooth',
      });
    }
  }, [userInput]);

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    
    if (isFinished) return;

    if (!startTime && value.length > 0) {
      setStartTime(Date.now());
    }
    
    if (value.length >= text.length && !isFinished) {
      setEndTime(Date.now());
    }

    setUserInput(value);

    const newText = text.map((item, index) => {
      if (index < value.length) {
        if (item.char === value[index]) {
          return { ...item, state: 'correct' as CharState };
        } else {
          return { ...item, state: 'incorrect' as CharState };
        }
      }
      return { ...item, state: 'default' as CharState };
    });
    
    setText(newText);
  };

  const handleSubmit = () => {
    if (!userInput) return;
    setEndTime(Date.now());
    calculateResults();
  };

  const renderText = () => {
    return text.map((char, index) => {
      const isCurrent = index === userInput.length;
      return (
        <span key={index} className={cn(
          'font-code text-2xl md:text-3xl transition-colors duration-100',
          {
            'text-foreground/60': char.state === 'default',
            'text-foreground': char.state === 'correct',
            'bg-destructive text-destructive-foreground rounded': char.state === 'incorrect',
            'relative': isCurrent && !isFinished
          }
        )}>
          {isCurrent && !isFinished && <span ref={caretRef} className="absolute left-0 top-0 bottom-0 w-0.5 bg-accent animate-caret-blink" />}
          {char.char === ' ' ? <span>&nbsp;</span> : char.char}
        </span>
      );
    });
  };

  return (
    <div className="w-full max-w-4xl flex flex-col items-center gap-8">
      <Card className="w-full bg-card/50 border-2 border-border p-8 relative">
        <CardContent className="p-0">
          {isLoading ? (
            <div className="space-y-2 h-10">
              <Skeleton className="h-8 w-full" />
            </div>
          ) : (
            <div
              ref={textContainerRef}
              className="whitespace-nowrap overflow-x-auto text-left h-10 scrollbar-hide"
              onClick={() => inputRef.current?.focus()}
              aria-live="polite"
            >
              {renderText()}
            </div>
          )}
          <input
            ref={inputRef}
            type="text"
            value={userInput}
            onChange={handleInput}
            className="absolute top-0 left-0 w-full h-full opacity-0 cursor-default"
            autoFocus
            disabled={isLoading || isFinished}
            autoComplete="off"
            autoCorrect="off"
            autoCapitalize="off"
            spellCheck="false"
          />
        </CardContent>
      </Card>
      
      <div className="flex items-center justify-center w-full max-w-xl gap-4">
        <Button onClick={() => resetTest(true)} size="icon" variant="outline" className="h-12 w-12 border-2 border-accent/50 text-accent hover:bg-accent/10 hover:text-accent">
          <RefreshCw className="h-6 w-6" />
          <span className="sr-only">Restart Test</span>
        </Button>
        <Button onClick={handleSubmit} size="icon" variant="outline" className="h-12 w-12 border-2 border-accent/50 text-accent hover:bg-accent/10 hover:text-accent" disabled={isFinished || !userInput}>
          <CheckSquare className="h-6 w-6" />
          <span className="sr-only">Submit Test</span>
        </Button>
      </div>

      {resultsShown && (
        <div className="flex flex-col items-center gap-4 animate-in fade-in duration-500">
            <h2 className="text-2xl font-headline text-accent">Test Complete!</h2>
            <div className="flex items-center gap-6 text-center">
                <div className="flex flex-col items-center gap-1">
                <span className="text-sm font-headline text-muted-foreground">WPM</span>
                <span className="text-3xl font-bold text-accent">{wpm}</span>
                </div>
                <div className="flex flex-col items-center gap-1">
                <span className="text-sm font-headline text-muted-foreground">Acc</span>
                <span className="text-3xl font-bold text-accent">{accuracy}%</span>
                </div>
            </div>
            <p className="text-muted-foreground">Well done! Ready for the next round?</p>
            <Button onClick={() => resetTest(false)} className="bg-accent text-accent-foreground hover:bg-accent/90">
                Next Text
            </Button>
        </div>
      )}
    </div>
  );
}
