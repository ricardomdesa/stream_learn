import type { Course } from '@/lib/types';

export const courses: Course[] = [
  {
    id: 'nextjs-for-beginners',
    title: 'Next.js for Beginners',
    description: 'An introductory course to master the fundamentals of Next.js and modern web development.',
    imageUrl: 'https://placehold.co/600x400.png',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Introduction to Next.js',
        lessons: [
          { id: 'l1-1', title: 'What is Next.js?', duration: '08:32', videoUrl: 'placeholder' },
          { id: 'l1-2', title: 'Setting up your first project', duration: '12:45', videoUrl: 'placeholder' },
          { id: 'l1-3', title: 'Pages and Routing', duration: '15:10', videoUrl: 'placeholder' },
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
  {
    id: 'advanced-typescript',
    title: 'Advanced TypeScript',
    description: 'Deep dive into advanced TypeScript features to write safer and more maintainable code.',
    imageUrl: 'https://placehold.co/600x400.png',
    modules: [
      {
        id: 'm1',
        title: 'Module 1: Generics',
        lessons: [
          { id: 'l1-1', title: 'Introduction to Generics', duration: '11:20', videoUrl: 'placeholder' },
          { id: 'l1-2', title: 'Generic Constraints', duration: '09:30', videoUrl: 'placeholder' },
        ],
      },
      {
        id: 'm2',
        title: 'Module 2: Utility Types',
        lessons: [
          { id: 'l2-1', title: 'Partial, Required, Readonly', duration: '14:00', videoUrl: 'placeholder' },
          { id: 'l2-2', title: 'Pick, Omit, Record', duration: '12:15', videoUrl: 'placeholder' },
        ],
      },
       {
        id: 'm3',
        title: 'Module 3: Advanced Patterns',
        lessons: [
          { id: 'l3-1', title: 'Conditional Types', duration: '20:10', videoUrl: 'placeholder' },
          { id: 'l3-2', title: 'Mapped Types', duration: '18:50', videoUrl: 'placeholder' },
          { id: 'l3-3', title: 'Template Literal Types', duration: '15:00', videoUrl: 'placeholder' },
        ],
      },
    ],
  },
];

export const getCourseById = (id: string): Course | undefined => {
  return courses.find((course) => course.id === id);
};
