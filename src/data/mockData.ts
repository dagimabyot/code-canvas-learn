import { Course } from '../types';

const pythonCourse: Course = {
  id: 'python-101',
  title: 'Python for Beginners',
  description: 'Master the fundamentals of Python programming with hands-on exercises and real-world projects.',
  thumbnail: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/359c0c12-570b-4c1e-b118-77e2ee7c81d8/python-course-thumbnail-ee7da276-1771928241476.webp',
  category: 'Programming',
  difficulty: 'Beginner',
  duration: '10 hours',
  total_xp: 2500,
  enrolled_count: 15420,
  rating: 4.8,
  modules: [
    {
      id: 'm1',
      title: 'Introduction to Python',
      lessons: [
        {
          id: 'l1',
          title: 'Hello Python',
          type: 'explanation',
          xp_reward: 50,
          content: 'Python is a high-level, interpreted programming language known for its readability and versatility. In this lesson, we will write our first "Hello, World!" program.',
          code_example: {
            code: 'print("Hello, World!")',
            language: 'python',
            explanation: 'The print() function outputs the specified message to the screen.'
          }
        },
        {
          id: 'l2',
          title: 'Your First Practice',
          type: 'practice',
          xp_reward: 100,
          content: 'Now it is your turn! Write a program that prints your name.',
          practice_task: {
            instruction: 'Complete the code to print "My name is John".',
            initial_code: 'print("My name is ...")',
            expected_output: 'My name is John',
            solution: 'print("My name is John")',
            hint: 'Replace the dots with "John".'
          }
        },
        {
          id: 'l3',
          title: 'Quick Check',
          type: 'quiz',
          xp_reward: 50,
          content: "Let's test what you learned.",
          quiz: {
            question: 'Which function is used to output text in Python?',
            options: ['echo()', 'display()', 'print()', 'write()'],
            correct_answer: 2,
            explanation: 'The print() function is the standard way to display output in Python.'
          }
        }
      ]
    }
  ]
};

const webDevCourse: Course = {
  id: 'web-dev-101',
  title: 'Web Development Bootcamp',
  description: 'Learn HTML, CSS, and JavaScript from scratch to build modern responsive websites.',
  thumbnail: 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/359c0c12-570b-4c1e-b118-77e2ee7c81d8/web-dev-course-thumbnail-d60d34cc-1771928241226.webp',
  category: 'Web Development',
  difficulty: 'Beginner',
  duration: '25 hours',
  total_xp: 5000,
  enrolled_count: 28400,
  rating: 4.9,
  modules: []
};

const categories = ['Programming', 'Data Science', 'Mobile Dev', 'Design', 'Marketing', 'Business'];
const difficulties: ('Beginner' | 'Intermediate' | 'Advanced')[] = ['Beginner', 'Intermediate', 'Advanced'];

const generateMockCourses = () => {
  const courses: Course[] = [pythonCourse, webDevCourse];
  for (let i = 3; i <= 100; i++) {
    const cat = categories[i % categories.length];
    const diff = difficulties[i % difficulties.length];
    courses.push({
      id: `course-${i}`,
      title: `${cat} Specialist ${i}`,
      description: `A specialized track for ${cat} focusing on modern industry practices and toolsets for ${diff} learners.`,
      thumbnail: i % 2 === 0 
        ? 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/359c0c12-570b-4c1e-b118-77e2ee7c81d8/data-science-course-thumbnail-8175d53f-1771928240748.webp'
        : 'https://storage.googleapis.com/dala-prod-public-storage/generated-images/359c0c12-570b-4c1e-b118-77e2ee7c81d8/platform-hero-image-efdfba1c-1771928240085.webp',
      category: cat,
      difficulty: diff,
      duration: `${Math.floor(Math.random() * 20) + 5} hours`,
      total_xp: Math.floor(Math.random() * 3000) + 1000,
      enrolled_count: Math.floor(Math.random() * 10000) + 500,
      rating: parseFloat((Math.random() * (5 - 4.5) + 4.5).toFixed(1)),
      modules: [
        {
          id: `m${i}-1`,
          title: 'Foundation',
          lessons: [
            {
              id: `l${i}-1`,
              title: 'Getting Started',
              type: 'explanation',
              xp_reward: 50,
              content: `Welcome to this deep dive into ${cat}. This course is designed to take you from a curious beginner to a proficient practitioner.`,
            }
          ]
        }
      ]
    });
  }
  return courses;
};

export const mockCourses = generateMockCourses();

export const mockLeaderboard = [
  { user_id: '1', full_name: 'Alex Rivera', xp: 12500, rank: 1 },
  { user_id: '2', full_name: 'Sarah Chen', xp: 11200, rank: 2 },
  { user_id: '3', full_name: 'Michael Scott', xp: 10800, rank: 3 },
  { user_id: '4', full_name: 'Pam Beesly', xp: 9500, rank: 4 },
  { user_id: '5', full_name: 'Dwight Schrute', xp: 8700, rank: 5 },
  { user_id: '6', full_name: 'Jim Halpert', xp: 7200, rank: 6 },
  { user_id: '7', full_name: 'Angela Martin', xp: 6500, rank: 7 },
  { user_id: '8', full_name: 'Kevin Malone', xp: 5400, rank: 8 },
  { user_id: '9', full_name: 'Oscar Martinez', xp: 4900, rank: 9 },
  { user_id: '10', full_name: 'Toby Flenderson', xp: 4200, rank: 10 },
];