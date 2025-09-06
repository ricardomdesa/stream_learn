"use client";

import { createContext, ReactNode, useContext, useState } from "react";
import { VideoController } from "../controller/VideoController";
import { Course } from "@/lib/types";

type CoursesContextType = {
  courses: Course[];
  selectedVideo: string;
  setSelectedVideo: (video: string) => void;
  setCourses: (data: any) => void;
  getCourses: (token: string) => void;
};

const CoursesContext = createContext<CoursesContextType>({} as CoursesContextType);

export function CoursesProvider(props: { children: ReactNode }) {
  const [courses, setCourses] = useState<Course[]>(() => {
    const storedCourses = localStorage.getItem('courses');
    return storedCourses ? JSON.parse(storedCourses) : [{
        id: 'vazio',
        title: '',
        description: '',
        imageUrl: '',
        modulos: []
    }];
  });
  const [selectedVideo, setSelectedVideo] = useState<string>("");

  async function getCourses(token: string) {
    const data = await VideoController.getClasses(token);
    setCourses(data);
    localStorage.setItem('courses', JSON.stringify(data));
  }

  const providerValue: CoursesContextType = {
    courses,
    selectedVideo,
    setSelectedVideo,
    setCourses,
    getCourses,
  };
  return (
    <CoursesContext.Provider value={providerValue}>
      {props.children}
    </CoursesContext.Provider>
  );
}

export const useCourses = () => useContext(CoursesContext);
