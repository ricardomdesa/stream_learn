import Image from 'next/image';
import type { Lesson } from '@/lib/types';
import { Button } from '@/components/ui/button';
import { ChevronLeft, ChevronRight, Play } from 'lucide-react';

interface VideoPlayerProps {
  lesson: Lesson | null;
  onPrev: () => void;
  onNext: () => void;
  isFirst: boolean;
  isLast: boolean;
}

export function VideoPlayer({ lesson, onPrev, onNext, isFirst, isLast }: VideoPlayerProps) {
  return (
    <div className="flex h-full flex-col">
      <div className="flex-1 bg-black flex items-center justify-center relative">
        {lesson ? (
          <>
            <Image
              src="https://placehold.co/1920x1080.png"
              alt="Video placeholder"
              layout="fill"
              objectFit="contain"
              data-ai-hint="presentation screen"
            />
            <div className="absolute inset-0 bg-black/40 flex items-center justify-center">
               <button className="group rounded-full bg-white/20 p-4 backdrop-blur-sm transition-all hover:bg-white/30">
                  <Play className="h-16 w-16 text-white transform transition-transform group-hover:scale-110" fill="white" />
               </button>
            </div>
          </>
        ) : (
          <div className="text-white">Select a lesson to begin.</div>
        )}
      </div>
      <div className="border-t bg-card p-4">
        <div className="container mx-auto flex items-center justify-between">
           <div>
            <h2 className="text-2xl font-bold">{lesson?.title || 'No lesson selected'}</h2>
            <p className="text-muted-foreground">{lesson ? `Duration: ${lesson.duration}` : ''}</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="lg" onClick={onPrev} disabled={isFirst}>
              <ChevronLeft className="h-5 w-5 mr-2" />
              Previous
            </Button>
            <Button size="lg" onClick={onNext} disabled={isLast}>
              Next
              <ChevronRight className="h-5 w-5 ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
