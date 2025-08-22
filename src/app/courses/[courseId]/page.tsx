'use client';

import { useState, useEffect, useMemo } from 'react';
import { notFound } from 'next/navigation';
import { getCourseById } from '@/lib/data';
import type { Lesson } from '@/lib/types';
import { CourseSidebar } from '@/components/courses/course-sidebar';
import { VideoPlayer } from '@/components/courses/video-player';

export default function CoursePage({ params }: { params: { courseId: string } }) {
  const course = useMemo(() => getCourseById(params.courseId), [params.courseId]);
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);

  const allLessons = useMemo(() => course?.modules.flatMap(m => m.lessons) || [], [course]);

  useEffect(() => {
    if (course && allLessons.length > 0) {
      setActiveLesson(allLessons[0]);
    }
  }, [course, allLessons]);

  if (!course) {
    notFound();
  }

  const handleSelectLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
  };
  
  const handleNavigation = (direction: 'next' | 'prev') => {
    if (!activeLesson) return;

    const currentIndex = allLessons.findIndex(l => l.id === activeLesson.id);
    if (currentIndex === -1) return;

    if (direction === 'next' && currentIndex < allLessons.length - 1) {
      setActiveLesson(allLessons[currentIndex + 1]);
    } else if (direction === 'prev' && currentIndex > 0) {
      setActiveLesson(allLessons[currentIndex - 1]);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row" style={{ height: 'calc(100vh - 64px)' }}>
      <CourseSidebar
        course={course}
        activeLesson={activeLesson}
        onSelectLesson={handleSelectLesson}
      />
      <main className="flex-1 flex flex-col bg-muted/30">
        <VideoPlayer 
          lesson={activeLesson}
          onNext={() => handleNavigation('next')}
          onPrev={() => handleNavigation('prev')}
          isFirst={activeLesson ? allLessons.findIndex(l => l.id === activeLesson.id) === 0 : true}
          isLast={activeLesson ? allLessons.findIndex(l => l.id === activeLesson.id) === allLessons.length - 1 : true}
        />
      </main>
    </div>
  );
}
