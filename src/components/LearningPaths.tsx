import React from 'react';
import { Rocket, Trophy, Target, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PATHS = [
  {
    title: "Web Development",
    icon: Rocket,
    color: "text-cyan-600",
    bg: "bg-cyan-50",
    courses: ["HTML & CSS", "JavaScript", "React"],
    description: "Master frontend development with modern frameworks."
  },
  {
    title: "Backend & Databases",
    icon: Star,
    color: "text-purple-600",
    bg: "bg-purple-50",
    courses: ["Python", "Node.js", "SQL & Databases"],
    description: "Build robust backend systems and APIs."
  },
  {
    title: "Data Science & AI",
    icon: Trophy,
    color: "text-pink-600",
    bg: "bg-pink-50",
    courses: ["Python", "Data Structures", "Machine Learning"],
    description: "Unlock the power of data and AI."
  },
  {
    title: "Systems & Competitive Programming",
    icon: Target,
    color: "text-orange-600",
    bg: "bg-orange-50",
    courses: ["C++", "Data Structures & Algorithms", "Competitive Coding"],
    description: "Master algorithms and systems programming."
  },
  {
    title: "Mobile Development",
    icon: Rocket,
    color: "text-green-600",
    bg: "bg-green-50",
    courses: ["JavaScript", "Java", "Mobile App Dev"],
    description: "Create powerful cross-platform mobile apps."
  },
  {
    title: "Full Stack Development",
    icon: Star,
    color: "text-blue-600",
    bg: "bg-blue-50",
    courses: ["JavaScript", "React", "Node.js & Databases"],
    description: "Become a complete full stack developer."
  }
];

export default function LearningPaths() {
  return (
    <section className="py-24 px-4 bg-card/50">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-4">
          <div>
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">Learning Paths</h2>
            <p className="text-muted-foreground font-medium mt-3">Choose your career path and master the skills you need</p>
          </div>
          <button className="text-primary font-bold flex items-center gap-1 hover:underline whitespace-nowrap">
            View all paths <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {PATHS.map((path, idx) => (
            <div 
              key={idx} 
              className="group relative bg-background border border-border rounded-2xl p-8 shadow-sm hover:shadow-lg transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className={`w-14 h-14 ${path.bg} ${path.color} rounded-xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300`}>
                <path.icon className="w-7 h-7" />
              </div>
              
              <h3 className="text-lg font-bold text-foreground mb-2">{path.title}</h3>
              <p className="text-muted-foreground text-sm leading-relaxed mb-6">{path.description}</p>

              <div className="space-y-2 mb-8">
                {path.courses.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs font-semibold text-foreground">
                    <div className="w-1.5 h-1.5 rounded-full bg-primary"></div>
                    {c}
                  </div>
                ))}
              </div>

              <div className="pt-6 border-t border-border">
                 <button className="w-full py-3 bg-primary text-primary-foreground hover:bg-primary/90 rounded-xl font-bold text-sm transition-all flex items-center justify-center gap-2 shadow-md hover:shadow-lg">
                    Start Path <Target className="w-4 h-4" />
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
