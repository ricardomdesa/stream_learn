export interface Lesson {
  id: string;
  title: string;
  duration: string;
  videoUrl: string;
}

export interface Module {
  id: string;
  title: string;
  lessons: Lesson[];
}

export interface Course {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  modulos: Module[];
}

export interface Progress {
  [courseId: string]: string[]; // Array of completed lesson IDs
}
