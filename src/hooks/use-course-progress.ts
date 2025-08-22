'use client';

import { useState, useEffect, useCallback } from 'react';
import type { Progress } from '@/lib/types';

const STORAGE_KEY = 'streamlearn_progress';

export function useCourseProgress(courseId: string | null) {
  const [progress, setProgress] = useState<Progress>({});

  useEffect(() => {
    try {
      const storedProgress = localStorage.getItem(STORAGE_KEY);
      if (storedProgress) {
        setProgress(JSON.parse(storedProgress));
      }
    } catch (error) {
      console.error('Failed to load progress from localStorage', error);
    }
  }, []);

  const saveProgress = useCallback((newProgress: Progress) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newProgress));
      setProgress(newProgress);
    } catch (error) {
      console.error('Failed to save progress to localStorage', error);
    }
  }, []);

  const toggleLessonComplete = useCallback((lessonId: string) => {
    if (!courseId) return;

    setProgress(prevProgress => {
      const courseProgress = prevProgress[courseId] || [];
      const newCourseProgress = courseProgress.includes(lessonId)
        ? courseProgress.filter(id => id !== lessonId)
        : [...courseProgress, lessonId];
      
      const newTotalProgress = {
        ...prevProgress,
        [courseId]: newCourseProgress
      };
      
      saveProgress(newTotalProgress);
      return newTotalProgress;
    });
  }, [courseId, saveProgress]);

  const isLessonComplete = (lessonId: string) => {
    if (!courseId) return false;
    return progress[courseId]?.includes(lessonId) ?? false;
  };

  return { progress, toggleLessonComplete, isLessonComplete };
}
