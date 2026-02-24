import React from 'react';
import { Trophy, Zap, Target, BookOpen, Star, Flame } from 'lucide-react';
import { Card } from './ui/card';

interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: React.ReactNode;
  unlocked: boolean;
  progress?: number;
  color: string;
}

interface UserAchievementsProps {
  userId?: string;
}

export const UserAchievements: React.FC<UserAchievementsProps> = () => {
  // Mock achievements data
  const achievements: Achievement[] = [
    {
      id: 'first-lesson',
      name: 'Getting Started',
      description: 'Complete your first lesson',
      icon: <BookOpen className="w-6 h-6" />,
      unlocked: true,
      color: 'from-blue-500 to-cyan-500'
    },
    {
      id: 'five-lessons',
      name: 'Momentum',
      description: 'Complete 5 lessons',
      icon: <Zap className="w-6 h-6" />,
      unlocked: true,
      progress: 100,
      color: 'from-yellow-500 to-orange-500'
    },
    {
      id: 'first-course',
      name: 'Course Master',
      description: 'Complete your first full course',
      icon: <Trophy className="w-6 h-6" />,
      unlocked: false,
      progress: 60,
      color: 'from-purple-500 to-pink-500'
    },
    {
      id: 'seven-day-streak',
      name: 'On Fire',
      description: '7-day learning streak',
      icon: <Flame className="w-6 h-6" />,
      unlocked: false,
      progress: 42,
      color: 'from-red-500 to-orange-500'
    },
    {
      id: 'perfect-score',
      name: 'Perfect Score',
      description: 'Score 100% on a quiz',
      icon: <Star className="w-6 h-6" />,
      unlocked: true,
      color: 'from-green-500 to-emerald-500'
    },
    {
      id: 'multi-language',
      name: 'Polyglot',
      description: 'Learn 5 different programming languages',
      icon: <Target className="w-6 h-6" />,
      unlocked: false,
      progress: 40,
      color: 'from-indigo-500 to-blue-500'
    }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h3 className="text-2xl font-black text-foreground mb-2">Achievements</h3>
        <p className="text-muted-foreground">Unlock badges and milestones as you progress</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        {achievements.map((achievement) => (
          <div
            key={achievement.id}
            className={`relative group ${achievement.unlocked ? '' : 'opacity-50'}`}
          >
            <Card className={`aspect-square flex flex-col items-center justify-center p-4 text-center rounded-2xl border-2 transition-all hover:scale-105 cursor-pointer ${
              achievement.unlocked 
                ? `bg-gradient-to-br ${achievement.color} text-white shadow-lg border-white/20`
                : 'bg-muted border-border'
            }`}>
              <div className="mb-2">
                {achievement.icon}
              </div>
              <p className="text-xs font-bold leading-tight line-clamp-2">{achievement.name}</p>
            </Card>

            {!achievement.unlocked && achievement.progress && (
              <div className="mt-2">
                <div className="h-1 bg-muted rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-primary to-secondary transition-all"
                    style={{ width: `${achievement.progress}%` }}
                  ></div>
                </div>
                <p className="text-xs text-muted-foreground mt-1">{achievement.progress}%</p>
              </div>
            )}

            {/* Tooltip */}
            <div className="absolute -top-20 left-1/2 -translate-x-1/2 hidden group-hover:block">
              <div className="bg-foreground text-background px-3 py-2 rounded-lg text-xs font-semibold whitespace-nowrap shadow-lg">
                {achievement.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default UserAchievements;
