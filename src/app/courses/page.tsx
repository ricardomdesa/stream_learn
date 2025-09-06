"use client"
import { CourseCard } from '@/components/courses/course-card';
import { useSession } from 'next-auth/react';
import { Course } from '@/lib/types';

import { useEffect } from 'react';
import { useCourses } from '@/providers/CoursesProvider';

export default function CoursesPage() {
  const { data: session } = useSession();
  const { courses, getCourses } = useCourses();

  useEffect(() => {
    async function fetchCourses() {
      if (session?.accessToken) {
        await getCourses(session.accessToken);
      }
    }
    fetchCourses();
  }, [session?.accessToken]);

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="mb-8">
        <h1 className="text-4xl font-bold tracking-tight">Courses</h1>
        <p className="mt-2 text-lg text-muted-foreground">
          Choose a course to start learning or continue your progress.
        </p>
      </div>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {courses.map((course: Course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </div>
  );
}
