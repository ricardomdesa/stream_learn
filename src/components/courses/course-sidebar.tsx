'use client';

import type { Course, Lesson, Module } from '@/lib/types';
import { useCourseProgress } from '@/hooks/use-course-progress';
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
import { Checkbox } from '@/components/ui/checkbox';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import { PlayCircle } from 'lucide-react';

interface CourseSidebarProps {
  course: Course;
  activeLesson: Lesson | null;
  onSelectLesson: (lesson: Lesson) => void;
}

export function CourseSidebar({ course, activeLesson, onSelectLesson }: CourseSidebarProps) {
  const { toggleLessonComplete, isLessonComplete } = useCourseProgress(course.id);
  const defaultOpenModule = course.modules.find(m => m.lessons.some(l => l.id === activeLesson?.id))?.id;

  return (
    <aside className="w-full lg:w-80 xl:w-96 border-r flex flex-col bg-card">
      <div className="p-4 border-b">
        <h2 className="text-xl font-bold">{course.title}</h2>
        <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
      </div>
      <ScrollArea className="flex-1">
        <Accordion type="single" collapsible defaultValue={defaultOpenModule || course.modules[0]?.id} className="w-full">
          {course.modules.map((module: Module) => (
            <AccordionItem value={module.id} key={module.id}>
              <AccordionTrigger className="px-4 font-semibold text-base hover:no-underline hover:bg-muted/50">
                {module.title}
              </AccordionTrigger>
              <AccordionContent>
                <ul className="flex flex-col">
                  {module.lessons.map((lesson: Lesson) => (
                    <li key={lesson.id}>
                      <button
                        onClick={() => onSelectLesson(lesson)}
                        className={cn(
                          "w-full text-left p-4 pl-6 flex items-center gap-4 transition-colors",
                          activeLesson?.id === lesson.id
                            ? "bg-primary/10 text-primary font-semibold"
                            : "hover:bg-muted/50"
                        )}
                      >
                         <Checkbox
                          checked={isLessonComplete(lesson.id)}
                          onClick={(e) => {
                            e.stopPropagation();
                            toggleLessonComplete(lesson.id);
                          }}
                          aria-label={`Mark ${lesson.title} as complete`}
                          className="rounded-full"
                        />
                        <div className="flex-1">
                          <span>{lesson.title}</span>
                          <span className="block text-xs text-muted-foreground">{lesson.duration}</span>
                        </div>
                         {activeLesson?.id === lesson.id && <PlayCircle className="h-5 w-5 text-primary" />}
                      </button>
                    </li>
                  ))}
                </ul>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </ScrollArea>
    </aside>
  );
}
