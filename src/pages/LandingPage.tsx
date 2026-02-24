import React from 'react';
import { Rocket, Brain, Code2, Users, Star, ArrowRight, Play, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import LearningPaths from '../components/LearningPaths';

export default function LandingPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-blue-500/5 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold animate-bounce">
              <Sparkles className="w-4 h-4" />
              <span>Now with 100+ Interactive Courses</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-slate-900 leading-[1.1] tracking-tight max-w-4xl mx-auto">
              Master Coding with <span className="text-primary">Bite-Sized</span> Lessons
            </h1>
            
            <p className="text-xl text-slate-600 max-w-2xl mx-auto font-medium">
              Join millions of learners. Learn Python, JS, AI, and more through interactive challenges and gamified experience.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link 
                to="/login" 
                className="w-full sm:w-auto px-10 py-5 bg-primary text-white font-black rounded-2xl shadow-xl shadow-primary/20 hover:bg-primary/90 transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                Get Started Free <ArrowRight className="w-5 h-5" />
              </Link>
              <button className="w-full sm:w-auto px-10 py-5 bg-white border-2 border-slate-100 text-slate-700 font-bold rounded-2xl hover:bg-slate-50 transition-all flex items-center justify-center gap-2">
                <Play className="w-5 h-5 fill-current" /> Watch Demo
              </button>
            </div>

            <div className="pt-12 flex flex-wrap justify-center gap-8 md:gap-16">
              {[ 
                { label: 'Active Learners', value: '2M+' },
                { label: 'Courses', value: '100+' },
                { label: 'Success Rate', value: '94%' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-3xl font-black text-slate-900">{stat.value}</div>
                  <div className="text-sm font-bold text-slate-400 uppercase tracking-widest">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Integration of New Component: Learning Paths */}
      <LearningPaths />

      {/* Features Grid */}
      <section className="py-24 bg-slate-50/50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl font-black text-slate-900 tracking-tight">Why CodeMaster?</h2>
            <p className="text-slate-500 font-medium mt-2">Learning to code has never been this fun</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[ 
              { 
                icon: Brain, 
                title: 'Personalized Learning', 
                desc: 'Tailored paths that adapt to your speed and style.',
                color: 'bg-indigo-50 text-indigo-600'
              },
              { 
                icon: Code2, 
                title: 'Interactive IDE', 
                desc: 'Write and run code directly in your browser or phone.',
                color: 'bg-emerald-50 text-emerald-600'
              },
              { 
                icon: Rocket, 
                title: 'Fast-Track Career', 
                desc: 'Curated curriculum to get you job-ready in months.',
                color: 'bg-orange-50 text-orange-600'
              },
              { 
                icon: Users, 
                title: 'Global Community', 
                desc: 'Learn with millions and share your progress.',
                color: 'bg-blue-50 text-blue-600'
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-white p-8 rounded-3xl border border-slate-100 shadow-sm hover:shadow-xl transition-all duration-300 group">
                <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform`}>
                  <feature.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold text-slate-900 mb-3">{feature.title}</h3>
                <p className="text-slate-500 font-medium leading-relaxed">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}