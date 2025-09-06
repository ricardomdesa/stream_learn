import type { Course } from '@/lib/types';

export const courses: Course[] = [
  {
    id: 'golang-for-beginners',
    title: 'Golang for Beginners',
    description: 'An introductory course to master the fundamentals of Golang and modern web development.',
    imageUrl: 'https://placehold.co/600x400.png',
    modulos: [
      {
        id: 'm1',
        title: 'Module 1: Introduction to Golang',
        lessons: [
          { id: 'l1-1', title: 'Introducao', duration: '01:41', videoUrl: 'mod1/1-Introdução' },
          { id: 'l1-2', title: 'O que é a Linguagem GO', duration: '06:26', videoUrl: 'mod1/2-O_que_é_a_Linguagem_GO' },
          { id: 'l1-3', title: 'Histórico', duration: '05:24', videoUrl: 'mod1/3-Histórico' },
        ],
      },
      {
        id: 'm2',
        title: 'Module 2: Styling and Components',
        lessons: [
          { id: 'l2-1', title: 'CSS Modules', duration: '10:05', videoUrl: 'placeholder' },
          { id: 'l2-2', title: 'Using Tailwind CSS', duration: '18:20', videoUrl: 'placeholder' },
          { id: 'l2-3', title: 'Building Reusable Components', duration: '22:00', videoUrl: 'placeholder' },
        ],
      },
      {
        id: 'm3',
        title: 'Module 3: Data Fetching',
        lessons: [
          { id: 'l3-1', title: 'getStaticProps for static generation', duration: '14:55', videoUrl: 'placeholder' },
          { id: 'l3-2', title: 'getServerSideProps for SSR', duration: '16:40', videoUrl: 'placeholder' },
        ],
      },
    ],
  },
];

export const getCourseById = (id: string): Course | undefined => {
  return courses.find((course) => course.id === id);
};
