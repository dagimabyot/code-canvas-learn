import React from 'react';
import { Course } from '../types';
import { BookOpen, Clock, ChevronRight, Star } from 'lucide-react';
import { Card } from './ui/card';

interface CourseCardProps {
  course: Course;
  onClick: () => void;
}

const CourseCard: React.FC<CourseCardProps> = ({ course, onClick }) => {
  const level = course.level || course.difficulty || 'Beginner';
  
  return (
    <Card 
      onClick={onClick}
      className="group cursor-pointer bg-card border border-border hover:border-primary transition-all duration-300 overflow-hidden flex flex-col shadow-sm hover:shadow-xl hover:-translate-y-1"
    >
      <div className="relative aspect-video overflow-hidden bg-gradient-to-br from-slate-100 to-slate-200">
        <img 
          src={course.thumbnail} 
          alt={course.title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-foreground/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
        <div className="absolute top-3 left-3 flex gap-2">
          <span className={`px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest shadow-lg ${
            level === 'Beginner' ? 'bg-emerald-500 text-white' :
            level === 'Intermediate' ? 'bg-amber-500 text-white' :
            'bg-rose-500 text-white'
          }`}>
            {level}
          </span>
        </div>
        <div className="absolute bottom-3 right-3 flex items-center gap-1 bg-white/90 backdrop-blur-md px-2 py-1 rounded-md shadow-sm">
          <Star className="h-3 w-3 text-amber-500 fill-amber-500" />
          <span className="text-[10px] font-bold text-foreground">{course.rating || '4.8'}</span>
        </div>
      </div>
      
      <div className="p-6 flex-1 flex flex-col">
        <div className="flex items-center gap-2 text-primary text-[10px] font-bold uppercase tracking-widest mb-2">
          <BookOpen className="w-3 h-3" />
          {course.category}
        </div>
        
        <h3 className="text-lg font-bold text-foreground mb-2 line-clamp-2 group-hover:text-primary transition-colors">
          {course.title}
        </h3>
        
        <p className="text-muted-foreground text-sm mb-6 line-clamp-2 leading-relaxed font-medium">
          {course.description}
        </p>
        
        <div className="mt-auto pt-6 border-t border-border space-y-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-1.5 text-muted-foreground font-semibold">
              <Clock className="w-4 h-4" />
              <span className="text-xs">{course.duration}</span>
            </div>
            <div className="flex items-center gap-1.5 text-muted-foreground font-semibold">
              <BookOpen className="w-4 h-4" />
              <span className="text-xs">{course.lessons || 0} lessons</span>
            </div>
          </div>
          <div className="flex items-center justify-between pt-2">
            <span className="text-xs font-bold text-primary">{(course.enrolled_count || 0).toLocaleString()} learners</span>
            <div className="w-8 h-8 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-white transition-all">
              <ChevronRight className="w-4 h-4" />
            </div>
          </div>
        </div>
      </div>
    </Card>
  );
};

export default CourseCard;
