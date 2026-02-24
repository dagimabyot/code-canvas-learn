import React from 'react';
import { Rocket, Brain, Code2, Users, Star, ArrowRight, Sparkles, CheckCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import LearningPaths from '../components/LearningPaths';

export default function LandingPage() {
  return (
    <div className="bg-background">
      {/* Hero Section */}
      <section className="relative pt-20 pb-32 overflow-hidden bg-gradient-to-br from-background via-background to-primary/5">
        <div className="absolute top-0 right-0 -translate-y-1/2 translate-x-1/2 w-[600px] h-[600px] bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 left-0 translate-y-1/2 -translate-x-1/2 w-[400px] h-[400px] bg-secondary/10 rounded-full blur-3xl"></div>

        <div className="max-w-7xl mx-auto px-4 relative z-10">
          <div className="text-center space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/10 text-primary rounded-full text-sm font-bold">
              <Sparkles className="w-4 h-4" />
              <span>Master 12+ Programming Languages</span>
            </div>
            
            <h1 className="text-5xl md:text-7xl font-black text-foreground leading-[1.1] tracking-tight max-w-4xl mx-auto">
              Learn Coding with <span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">Interactive</span> Lessons
            </h1>
            
            <p className="text-xl text-muted-foreground max-w-2xl mx-auto font-medium">
              Master Python, JavaScript, Java, C++, and more. Start coding in minutes with our bite-sized lessons, interactive challenges, and gamified learning experience.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                to="/login" 
                className="w-full sm:w-auto px-10 py-4 bg-primary text-primary-foreground font-bold rounded-xl shadow-lg hover:shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                Start Learning Free <ArrowRight className="w-5 h-5" />
              </Link>
              <Link 
                to="/courses" 
                className="w-full sm:w-auto px-10 py-4 bg-card border-2 border-border text-foreground font-bold rounded-xl hover:border-primary transition-all flex items-center justify-center gap-2"
              >
                <Star className="w-5 h-5" /> Explore Courses
              </Link>
            </div>

            <div className="pt-12 grid grid-cols-3 gap-4 md:gap-8 max-w-3xl mx-auto">
              {[ 
                { label: 'Active Learners', value: '5M+' },
                { label: 'Courses Available', value: '50+' },
                { label: 'Success Rate', value: '96%' }
              ].map((stat, i) => (
                <div key={i} className="text-center">
                  <div className="text-2xl md:text-3xl font-black text-primary">{stat.value}</div>
                  <div className="text-xs md:text-sm font-semibold text-muted-foreground uppercase tracking-widest mt-1">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Featured Courses Section */}
      <section className="py-20 bg-card/30">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">Popular Courses</h2>
            <p className="text-muted-foreground font-medium mt-3">Start with industry-standard programming languages</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: 'Python for Beginners', lessons: 48, level: 'Beginner', color: 'from-blue-500 to-blue-600' },
              { title: 'JavaScript Essentials', lessons: 56, level: 'Beginner', color: 'from-yellow-500 to-yellow-600' },
              { title: 'Java Programming', lessons: 64, level: 'Beginner', color: 'from-red-500 to-red-600' },
              { title: 'React Fundamentals', lessons: 60, level: 'Intermediate', color: 'from-cyan-500 to-cyan-600' },
              { title: 'Data Structures & Algorithms', lessons: 80, level: 'Intermediate', color: 'from-pink-500 to-pink-600' },
              { title: 'C++ Programming', lessons: 72, level: 'Intermediate', color: 'from-purple-500 to-purple-600' },
            ].map((course, idx) => (
              <div key={idx} className={`bg-gradient-to-br ${course.color} rounded-2xl p-6 text-white shadow-lg hover:shadow-xl transition-all hover:-translate-y-1`}>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold mb-2">{course.title}</h3>
                    <span className="inline-block bg-white/20 px-3 py-1 rounded-full text-sm font-semibold">{course.level}</span>
                  </div>
                </div>
                <div className="flex items-center gap-2 text-sm">
                  <Code2 className="w-4 h-4" />
                  <span>{course.lessons} lessons</span>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link 
              to="/courses" 
              className="inline-flex items-center gap-2 px-8 py-3 bg-primary text-primary-foreground font-bold rounded-xl hover:shadow-lg transition-all"
            >
              View All Courses <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Section */}
      <section className="py-24 bg-background">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-20">
            <h2 className="text-4xl md:text-5xl font-black text-foreground tracking-tight">Why Learn With Us?</h2>
            <p className="text-muted-foreground font-medium mt-3">Everything you need to become a professional developer</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {[ 
              { 
                icon: Brain, 
                title: 'Personalized Learning Path', 
                desc: 'AI-driven recommendations adapt to your pace and learning style.',
                features: ['Smart difficulty adjustment', 'Custom learning paths', 'Progress tracking']
              },
              { 
                icon: Code2, 
                title: 'Hands-On Code Practice', 
                desc: 'Write real code instantly in your browser with interactive challenges.',
                features: ['Live code editor', 'Real-time feedback', 'Best practices guide']
              },
              { 
                icon: Rocket, 
                title: 'Career Ready Skills', 
                desc: 'Curriculum designed by industry experts for real-world applications.',
                features: ['Industry standards', 'Interview prep', 'Project portfolio']
              },
              { 
                icon: Users, 
                title: 'Global Community', 
                desc: 'Learn together with millions of developers worldwide.',
                features: ['Community support', 'Discussion forums', 'Peer learning']
              }
            ].map((feature, idx) => (
              <div key={idx} className="bg-card border border-border rounded-2xl p-8 hover:border-primary transition-colors">
                <div className="flex items-start gap-4">
                  <div className="w-14 h-14 rounded-xl bg-primary/10 flex items-center justify-center flex-shrink-0">
                    <feature.icon className="w-7 h-7 text-primary" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-foreground mb-2">{feature.title}</h3>
                    <p className="text-muted-foreground mb-4">{feature.desc}</p>
                    <ul className="space-y-2">
                      {feature.features.map((f, i) => (
                        <li key={i} className="flex items-center gap-2 text-sm">
                          <CheckCircle className="w-4 h-4 text-primary" />
                          <span className="text-foreground">{f}</span>
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Paths Component */}
      <LearningPaths />

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-primary to-secondary relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-4xl mx-auto px-4 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Ready to Start Coding?</h2>
          <p className="text-white/90 text-lg mb-8">Join millions of learners and start your coding journey today. No credit card required!</p>
          <Link 
            to="/login" 
            className="inline-flex items-center gap-2 px-10 py-4 bg-white text-primary font-black rounded-xl hover:shadow-xl transition-all hover:scale-105"
          >
            Get Started for Free <ArrowRight className="w-5 h-5" />
          </Link>
        </div>
      </section>
    </div>
  );
}
