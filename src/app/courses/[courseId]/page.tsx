"use client";

import { CourseSidebar } from "@/components/courses/course-sidebar";
import { VideoPlayer } from "@/components/courses/video-player";

import type { Course, Lesson } from "@/lib/types";
import { useCourses } from "@/providers/CoursesProvider";
import { notFound, useRouter } from "next/navigation";
import React, { useEffect, useMemo, useState } from "react";

export default function CoursePage({
  params,
}: {
  params: Promise<{ courseId: string }>;
}) {
  const { courseId } = React.use(params);
  const { courses } = useCourses();

  const [activeCourse, setActiveCourse] = useState<Course>({id: '', title: '', description: '', imageUrl: '', modulos: []});
  const [activeLesson, setActiveLesson] = useState<Lesson | null>(null);
  const router = useRouter();

  useEffect(() => {
    if(courses.length === 0 || courses[0].id === 'vazio'){
      router.push('/courses');
    }
    setActiveCourse(courses.find((c) => c.id === courseId) || courses[0]);
  }, [courseId, courses]);

  const allLessons = useMemo(
    () =>
      courses
        .find((c) => c.id === courseId)
        ?.modulos.flatMap((m) => m.lessons) || [],
    [courses, courseId]
  );

  useEffect(() => {
    if (courses && allLessons.length > 0) {
      setActiveLesson(allLessons[0]);
    }
  }, [courses, allLessons]);

  if (!courses) {
    notFound();
  }

  const handleSelectLesson = (lesson: Lesson) => {
    setActiveLesson(lesson);
  };

  const handleNavigation = (direction: "next" | "prev") => {
    if (!activeLesson) return;

    const currentIndex = allLessons.findIndex((l) => l.id === activeLesson.id);
    if (currentIndex === -1) return;

    if (direction === "next" && currentIndex < allLessons.length - 1) {
      setActiveLesson(allLessons[currentIndex + 1]);
    } else if (direction === "prev" && currentIndex > 0) {
      setActiveLesson(allLessons[currentIndex - 1]);
    }
  };

  return (
    <div
      className="flex flex-col lg:flex-row"
      style={{ height: "calc(100vh - 64px)" }}
    >
      <CourseSidebar
        course={activeCourse}
        activeLesson={activeLesson}
        onSelectLesson={handleSelectLesson}
      />
      <main className="flex-1 flex flex-col bg-muted/30">
        <VideoPlayer
          lesson={activeLesson}
          onNext={() => handleNavigation("next")}
          onPrev={() => handleNavigation("prev")}
          isFirst={
            activeLesson
              ? allLessons.findIndex((l) => l.id === activeLesson.id) === 0
              : true
          }
          isLast={
            activeLesson
              ? allLessons.findIndex((l) => l.id === activeLesson.id) ===
                allLessons.length - 1
              : true
          }
        />
      </main>
    </div>
  );
}
