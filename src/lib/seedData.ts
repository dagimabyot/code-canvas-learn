import { supabase } from './supabase';
import { Course } from '../types';

const THUMBNAILS = [
  "https://storage.googleapis.com/dala-prod-public-storage/generated-images/359c0c12-570b-4c1e-b118-77e2ee7c81d8/web-dev-thumbnail-01852022-1771927044674.webp",
  "https://storage.googleapis.com/dala-prod-public-storage/generated-images/359c0c12-570b-4c1e-b118-77e2ee7c81d8/data-science-thumbnail-5120925f-1771927049916.webp",
  "https://storage.googleapis.com/dala-prod-public-storage/generated-images/359c0c12-570b-4c1e-b118-77e2ee7c81d8/cyber-security-thumbnail-3add9cb2-1771927044861.webp",
  "https://storage.googleapis.com/dala-prod-public-storage/generated-images/359c0c12-570b-4c1e-b118-77e2ee7c81d8/mobile-dev-thumbnail-560321a1-1771927044483.webp",
  "https://storage.googleapis.com/dala-prod-public-storage/generated-images/359c0c12-570b-4c1e-b118-77e2ee7c81d8/cloud-devops-thumbnail-5d30e9d1-1771927045238.webp",
  "https://storage.googleapis.com/dala-prod-public-storage/generated-images/359c0c12-570b-4c1e-b118-77e2ee7c81d8/ai-ml-thumbnail-f12d60ef-1771927045045.webp",
  "https://storage.googleapis.com/dala-prod-public-storage/generated-images/359c0c12-570b-4c1e-b118-77e2ee7c81d8/ui-ux-thumbnail-bddf4645-1771927059388.webp",
  "https://storage.googleapis.com/dala-prod-public-storage/generated-images/359c0c12-570b-4c1e-b118-77e2ee7c81d8/database-thumbnail-f3241041-1771927052039.webp",
  "https://storage.googleapis.com/dala-prod-public-storage/generated-images/359c0c12-570b-4c1e-b118-77e2ee7c81d8/game-dev-thumbnail-8a95efb3-1771927052757.webp",
  "https://storage.googleapis.com/dala-prod-public-storage/generated-images/359c0c12-570b-4c1e-b118-77e2ee7c81d8/soft-skills-thumbnail-4e578f9a-1771927052642.webp"
];

const CATEGORIES = ['Web Development', 'Data Science', 'Mobile Dev', 'AI & ML', 'Cybersecurity', 'Game Dev', 'DevOps', 'Cloud Computing', 'UI/UX Design', 'BlockChain'];
const LEVELS = ['Beginner', 'Intermediate', 'Advanced'] as const;

export async function seed100Courses() {
  const coursesToInsert: any[] = [];
  
  coursesToInsert.push({
    title: 'JavaScript Masterclass',
    description: 'The complete guide to modern JavaScript.',
    category: 'Web Development',
    level: 'Beginner',
    duration: '20 hours',
    modules_count: 5,
    lessons_count: 25,
    xp_reward: 1000,
    image_url: THUMBNAILS[0]
  });

  const techs = ['React', 'Python', 'Go', 'Rust', 'Docker', 'AWS', 'Swift', 'Kotlin', 'Flutter', 'Next.js'];

  for (let i = 1; i < 100; i++) {
    const tech = techs[i % techs.length];
    const category = CATEGORIES[i % CATEGORIES.length];
    const level = LEVELS[Math.floor(Math.random() * LEVELS.length)];
    
    coursesToInsert.push({
      title: `${tech} for ${level}s`,
      description: `Deep dive into ${tech} ecosystems.`,
      category: category,
      level: level,
      duration: '10 hours',
      modules_count: 3,
      lessons_count: 15,
      xp_reward: 500,
      image_url: THUMBNAILS[i % THUMBNAILS.length]
    });
  }

  const { data: insertedCourses, error: courseError } = await supabase
    .from('courses')
    .insert(coursesToInsert)
    .select();

  if (courseError) throw courseError;

  for (const course of insertedCourses) {
    const modules = [
      { course_id: course.id, title: 'Getting Started', order: 1 },
      { course_id: course.id, title: 'Core Concepts', order: 2 },
      { course_id: course.id, title: 'Final Project', order: 3 }
    ];

    const { data: insertedModules, error: modError } = await supabase.from('modules').insert(modules).select();
    if (modError || !insertedModules) continue;

    for (const mod of insertedModules) {
      const lessons = [];
      for (let l = 1; l <= 3; l++) {
        lessons.push({
          module_id: mod.id,
          title: `Lesson ${l}`,
          order: l,
          content: [
            { type: 'text', content: 'Lesson content here.' },
            { type: 'code', content: 'console.log("Hello");', language: 'javascript' }
          ],
          interactive_practice: {
            instructions: 'Return true.',
            initial_code: 'function test() {}',
            solution_code: 'function test() { return true; }',
            expected_output: 'true',
            hint: 'Use return true.'
          },
          quiz: [
            {
              question: 'Is this easy?',
              options: ['Yes', 'No'],
              correct_answer: 0,
              explanation: 'It is!'
            }
          ]
        });
      }
      await supabase.from('lessons').insert(lessons);
    }
  }

  return true;
}