import { Course } from "../types";

const COURSE_NAMES = [
  "Programming Basics", "Computational Thinking", "Algorithms Fundamentals", "Data Structures Basics", "Problem Solving with Code",
  "Introduction to Python", "Python Intermediate", "Python Advanced", "Introduction to Java", "Java Intermediate", "Java Advanced",
  "Introduction to C", "C Programming Intermediate", "Introduction to C++", "C++ Object-Oriented Programming",
  "HTML Fundamentals", "HTML Forms & Semantics", "CSS Fundamentals", "CSS Layouts (Flexbox & Grid)", "Responsive Web Design",
  "CSS Animations", "JavaScript Fundamentals", "JavaScript DOM Manipulation", "JavaScript ES6+", "TypeScript Basics",
  "Web Accessibility (A11y)", "Web Performance Optimization", "Frontend Project: Personal Website", "React Basics", "React Hooks & State",
  "React Router", "Next.js Fundamentals", "Web APIs & Fetch", "Frontend Project: E-commerce UI", "Progressive Web Apps (PWA)",
  "Mobile App Development Basics", "Android Development with Java", "Android Development with Kotlin", "Flutter Basics", "Flutter Intermediate",
  "React Native Basics", "React Native Advanced", "Mobile UI/UX Design", "Firebase for Mobile Apps", "App Deployment & Publishing",
  "Mobile App Security", "Offline-First Mobile Apps", "Cross-Platform Development", "Mobile App Testing", "Mobile Project: To-Do App",
  "Backend Development Fundamentals", "Node.js Basics", "Express.js", "REST API Design", "Authentication & Authorization",
  "Django Fundamentals", "Django REST Framework", "FastAPI", "SQL Fundamentals", "PostgreSQL", "MongoDB", "Database Design",
  "API Security", "Backend Testing", "Backend Project: Blog API",
  "Data Science Fundamentals", "Data Analysis with Python", "NumPy & Pandas", "Data Visualization", "Statistics for Programmers",
  "Machine Learning Basics", "Supervised Learning", "Unsupervised Learning", "Deep Learning Fundamentals", "Neural Networks",
  "AI with Python", "Natural Language Processing", "Computer Vision Basics", "AI Ethics", "ML Project: Prediction System",
  "Cloud Computing Fundamentals", "AWS Basics", "Google Cloud Basics", "Docker Fundamentals", "Kubernetes Basics", "CI/CD Pipelines",
  "Linux Command Line", "Git & GitHub", "DevOps Fundamentals", "Cybersecurity Basics",
  "Software Engineering Principles", "Clean Code Practices", "Design Patterns", "System Design Basics", "Agile & Scrum",
  "Technical Interview Preparation", "Coding Challenges & Algorithms", "Open Source Contribution", "Portfolio Development", "Capstone Project: Full-Stack Application"
];

const getCategoryForIndex = (index: number): string => {
  if (index < 15) return "Programming Fundamentals";
  if (index < 35) return "Web Development";
  if (index < 50) return "Mobile App Development";
  if (index < 65) return "Backend & Databases";
  if (index < 80) return "Data, AI & Machine Learning";
  if (index < 90) return "Cloud, DevOps & Security";
  return "Career, Projects & Advanced Topics";
};

export const getDetailedCourses = (): Course[] => {
  const pythonForBeginners: Course = {
    id: "intro-python",
    title: "Introduction to Python",
    description: "Start your journey with Python, the most popular language for AI and Data Science.",
    category: "Programming Fundamentals",
    level: "Beginner",
    duration: "4h",
    thumbnail: "https://storage.googleapis.com/dala-prod-public-storage/generated-images/359c0c12-570b-4c1e-b118-77e2ee7c81d8/python-for-beginners-banner-7dcd7008-1771929005335.webp",
    prerequisites: ["None"],
    skillsGained: ["Python Syntax", "Variables", "Loops", "Conditionals"],
    targetAudience: "Beginners",
    modules: [
      {
        id: "py-m1",
        title: "The Basics",
        description: "Get familiar with Python syntax",
        lessons: [
          {
            id: "py-l1",
            title: "Hello Python",
            type: "explanation",
            xp: 20,
            content: {
              explanation: "Python is a high-level, interpreted programming language known for its readability. To print text, use the print() function.",
              codeMain: "print('Hello, CodeMaster!')",
            }
          },
          {
             id: "py-l2",
             title: "Variables",
             type: "practice",
             xp: 30,
             content: {
               explanation: "Variables are used to store data. In Python, you don't need to declare types.",
               codeMain: "name = 'Solo'\
print(name)",
               practiceInstructions: "Change the value of name to your name and print it."
             }
          }
        ]
      }
    ]
  };

  const allCourses: Course[] = [pythonForBeginners];

  COURSE_NAMES.forEach((name, index) => {
    if (name === "Introduction to Python") return;

    const category = getCategoryForIndex(index);
    allCourses.push({
      id: `course-${index}`,
      title: name,
      description: `Comprehensive course on ${name} designed for practical learning. Mastery of ${category} starts here.`,
      category: category,
      level: index % 5 === 0 ? "Advanced" : (index % 3 === 0 ? "Intermediate" : "Beginner"),
      duration: `${3 + (index % 10)}h`,
      thumbnail: `https://picsum.photos/seed/${index}/800/450`,
      prerequisites: ["Basic Logic"],
      skillsGained: [name, "Problem Solving"],
      targetAudience: "Aspiring Developers",
      modules: [
        {
          id: `m-${index}-1`,
          title: "Introduction",
          description: "Foundation and Setup",
          lessons: [
            {
              id: `l-${index}-1`,
              title: "Overview",
              type: "explanation",
              xp: 15,
              content: {
                explanation: `Welcome to the ${name} course. We will explore the core concepts and best practices.`,
                codeMain: "// Learning path initialized"
              }
            }
          ]
        }
      ]
    });
  });

  return allCourses;
};

export const generateCourses = (count: number): Course[] => {
  return getDetailedCourses().slice(0, count);
};