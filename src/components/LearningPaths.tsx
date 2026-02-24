import React from 'react';
import { Rocket, Trophy, Target, Star, ChevronRight } from 'lucide-react';
import { Link } from 'react-router-dom';

const PATHS = [
  {
    title: "Web Development",
    icon: Rocket,
    color: "text-blue-600",
    bg: "bg-blue-50",
    courses: ["HTML Fundamentals", "CSS Fundamentals", "JavaScript Fundamentals"],
    description: "Become a frontend master building modern websites."
  },
  {
    title: "Data & AI",
    icon: Star,
    color: "text-purple-600",
    bg: "bg-purple-50",
    courses: ["Introduction to Python", "Data Analysis", "Machine Learning"],
    description: "Unlock the power of data and artificial intelligence."
  },
  {
    title: "Mobile Dev",
    icon: Trophy,
    color: "text-orange-600",
    bg: "bg-orange-50",
    courses: ["Mobile App Basics", "Flutter Basics", "React Native"],
    description: "Create stunning mobile experiences for iOS and Android."
  }
];

export default function LearningPaths() {
  return (
    <section className="py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10 gap-4">
          <div>
            <h2 className="text-3xl font-black text-slate-900 tracking-tight">Learning Paths</h2>
            <p className="text-slate-500 font-medium mt-1">Structured roadmaps to reach your career goals faster</p>
          </div>
          <button className="text-primary font-bold flex items-center gap-1 hover:underline">
            View all paths <ChevronRight className="w-4 h-4" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {PATHS.map((path, idx) => (
            <div 
              key={idx} 
              className="group relative bg-white border border-slate-100 rounded-[2rem] p-8 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
            >
              <div className={`w-14 h-14 ${path.bg} ${path.color} rounded-2xl flex items-center justify-center mb-6 transition-transform group-hover:scale-110 duration-300`}>
                <path.icon className="w-8 h-8" />
              </div>
              
              <h3 className="text-xl font-bold text-slate-900 mb-2">{path.title}</h3>
              <p className="text-slate-500 text-sm leading-relaxed mb-6">{path.description}</p>

              <div className="space-y-3">
                {path.courses.map((c, i) => (
                  <div key={i} className="flex items-center gap-3 text-xs font-bold text-slate-700">
                    <div className="w-1.5 h-1.5 rounded-full bg-slate-200"></div>
                    {c}
                  </div>
                ))}
              </div>

              <div className="mt-8 pt-6 border-t border-slate-50">
                 <button className="w-full py-3 bg-slate-50 hover:bg-slate-100 rounded-xl text-slate-900 font-bold text-sm transition-colors flex items-center justify-center gap-2">
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