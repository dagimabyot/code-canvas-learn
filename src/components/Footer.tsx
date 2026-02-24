import React from 'react';
import { Link } from 'react-router-dom';
import { Github, Twitter, Linkedin, Mail, Code2, Heart } from 'lucide-react';

const Footer: React.FC = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-card border-t border-border mt-auto pt-16 pb-8">
      <div className="container mx-auto px-4 max-w-7xl">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
          <div className="md:col-span-1 space-y-6">
            <Link to="/" className="flex items-center gap-2 group transition-transform hover:scale-105 duration-300">
              <div className="bg-gradient-to-br from-primary to-secondary text-white p-2 rounded-xl shadow-lg shadow-primary/20 group-hover:rotate-6 transition-transform">
                <Code2 className="w-6 h-6" />
              </div>
              <span className="text-2xl font-black text-foreground tracking-tight">CodeLearn</span>
            </Link>
            <p className="text-muted-foreground font-medium leading-relaxed">
              Master 12+ programming languages through interactive, bite-sized lessons and a gamified learning experience.
            </p>
            <div className="flex items-center gap-4">
              <a href="#" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all border border-border">
                <Twitter className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all border border-border">
                <Github className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-full bg-background flex items-center justify-center text-muted-foreground hover:text-primary hover:bg-primary/5 transition-all border border-border">
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="text-foreground font-bold mb-6 text-sm uppercase tracking-widest">Platform</h4>
            <ul className="space-y-4">
              <li><Link to="/" className="text-muted-foreground hover:text-primary font-medium transition-colors">Courses</Link></li>
              <li><Link to="/leaderboard" className="text-muted-foreground hover:text-primary font-medium transition-colors">Leaderboard</Link></li>
              <li><Link to="/learning-paths" className="text-muted-foreground hover:text-primary font-medium transition-colors">Learning Paths</Link></li>
              <li><Link to="/challenges" className="text-muted-foreground hover:text-primary font-medium transition-colors">Daily Challenges</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-foreground font-bold mb-6 text-sm uppercase tracking-widest">Support</h4>
            <ul className="space-y-4">
              <li><a href="#" className="text-muted-foreground hover:text-primary font-medium transition-colors">Help Center</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary font-medium transition-colors">Documentation</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary font-medium transition-colors">Community</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary font-medium transition-colors">Privacy Policy</a></li>
            </ul>
          </div>

          <div className="space-y-6">
            <h4 className="text-foreground font-bold mb-2 text-sm uppercase tracking-widest">Join our Newsletter</h4>
            <p className="text-muted-foreground font-medium text-sm leading-relaxed">
              Stay updated with new courses, challenges, and coding tips.
            </p>
            <div className="flex gap-2">
              <input 
                type="email" 
                placeholder="Enter your email" 
                className="bg-background border border-border rounded-xl px-4 py-2 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 w-full"
              />
              <button className="bg-primary text-primary-foreground px-4 py-2 rounded-xl text-sm font-bold hover:bg-primary/90 transition-all shadow-md shadow-primary/20">
                Join
              </button>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-border flex flex-col md:flex-row justify-between items-center gap-4 text-center md:text-left">
          <p className="text-muted-foreground text-sm font-medium">
            &copy; {currentYear} CodeLearn. All rights reserved.
          </p>
          <p className="text-muted-foreground text-sm font-medium flex items-center gap-1.5 justify-center">
            Made with <Heart className="w-4 h-4 text-secondary fill-secondary" /> for the coding community
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
