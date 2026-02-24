export interface User {
  id: string;
  email: string;
  username: string;
  full_name?: string;
  avatar_url?: string;
  role: 'user' | 'admin';
  xp: number;
  level: number;
  streak: number;
  badges: string[] | Badge[];
  certificates: Certificate[];
  completed_lessons: string[];
  enrolled_courses: string[];
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  unlocked_at: string;
}

export interface Certificate {
  id: string;
  course_id: string;
  course_name: string;
  issued_at: string;
  url: string;
}

export interface Course {
  id: string;
  title: string;
  description: string;
  thumbnail: string;
  category: string;
  level?: 'Beginner' | 'Intermediate' | 'Advanced';
  difficulty?: 'Beginner' | 'Intermediate' | 'Advanced';
  duration: string;
  modules: Module[];
  prerequisites?: string[];
  skillsGained?: string[];
  targetAudience?: string;
  total_xp?: number;
  enrolled_count?: number;
  rating?: number;
}

export interface Module {
  id: string;
  title: string;
  description?: string;
  lessons: Lesson[];
}

export interface LessonContent {
  explanation: string;
  codeMain?: string;
  practiceInstructions?: string;
}

export interface Lesson {
  id: string;
  title: string;
  type: 'explanation' | 'practice' | 'quiz' | 'challenge' | 'project';
  xp?: number;
  xp_reward?: number;
  content: string | LessonContent;
  code_example?: {
    code: string;
    language: string;
    explanation: string;
  };
  practice_task?: {
    instruction: string;
    initial_code: string;
    expected_output: string;
    solution: string;
    hint: string;
  };
  quiz?: {
    question: string;
    options: string[];
    correct_answer: number;
    explanation: string;
  };
}

export interface LeaderboardEntry {
  user_id: string;
  full_name: string;
  xp: number;
  rank: number;
}