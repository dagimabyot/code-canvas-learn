import React from 'react';
import { useAppContext } from '../AppContext';
import { Award, Star, Edit, CheckCircle, Zap, TrendingUp } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';
import UserAchievements from '../components/UserAchievements';
import ProgressTracker from '../components/ProgressTracker';

const ProfilePage: React.FC = () => {
  const { user } = useAppContext();

  if (!user) return null;

  return (
    <div className="min-h-screen bg-background pt-20">
      {/* Profile Header */}
      <div className="bg-gradient-to-br from-primary/10 to-secondary/10 py-12 px-4 border-b border-border">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-start">
            {/* Left: Profile Card */}
            <div>
              <Card className="bg-card border border-border p-8 text-center space-y-6 rounded-2xl">
                <div className="relative inline-block">
                  <div className="w-32 h-32 rounded-3xl overflow-hidden mx-auto bg-gradient-to-br from-primary to-secondary p-1">
                    <img 
                      src={user.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} 
                      alt={user.username} 
                      className="w-full h-full object-cover rounded-[1.4rem]"
                    />
                  </div>
                  <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-gradient-to-br from-primary to-secondary border-4 border-background rounded-full flex items-center justify-center text-white text-xs font-black shadow-lg">
                    {user.level || '1'}
                  </div>
                </div>
                <div>
                  <h2 className="text-3xl font-black text-foreground">{user.username}</h2>
                  <p className="text-muted-foreground font-semibold mt-1">{user.role === 'admin' ? 'Administrator' : 'Aspiring Developer'}</p>
                </div>
                <div className="space-y-4">
                  <div className="flex justify-around py-4 border-t border-b border-border">
                    <div className="text-center">
                      <p className="text-2xl font-black text-primary">{user.xp || 0}</p>
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Total XP</p>
                    </div>
                    <div className="w-px bg-border" />
                    <div className="text-center">
                      <p className="text-2xl font-black text-secondary">{user.streak || 0}</p>
                      <p className="text-[11px] font-bold text-muted-foreground uppercase tracking-widest mt-1">Day Streak</p>
                    </div>
                  </div>
                </div>
                <Button className="w-full bg-primary hover:bg-primary/90 text-primary-foreground font-bold h-11 rounded-xl">
                  <Edit className="w-4 h-4 mr-2" /> Edit Profile
                </Button>
              </Card>
            </div>

            {/* Right: Quick Stats */}
            <div className="md:col-span-2 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <Card className="bg-card border border-border p-5 rounded-xl hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <Award className="w-5 h-5 text-yellow-500" />
                    <p className="text-xs font-bold text-muted-foreground uppercase">Certificates</p>
                  </div>
                  <p className="text-2xl font-black text-foreground">{user.certificates?.length || 0}</p>
                </Card>
                <Card className="bg-card border border-border p-5 rounded-xl hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <CheckCircle className="w-5 h-5 text-primary" />
                    <p className="text-xs font-bold text-muted-foreground uppercase">Lessons Done</p>
                  </div>
                  <p className="text-2xl font-black text-foreground">{user.completed_lessons?.length || 0}</p>
                </Card>
                <Card className="bg-card border border-border p-5 rounded-xl hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <Zap className="w-5 h-5 text-orange-500" />
                    <p className="text-xs font-bold text-muted-foreground uppercase">Courses</p>
                  </div>
                  <p className="text-2xl font-black text-foreground">5</p>
                </Card>
                <Card className="bg-card border border-border p-5 rounded-xl hover:shadow-lg transition-all">
                  <div className="flex items-center gap-3 mb-2">
                    <TrendingUp className="w-5 h-5 text-green-500" />
                    <p className="text-xs font-bold text-muted-foreground uppercase">Rank</p>
                  </div>
                  <p className="text-2xl font-black text-foreground">#1,234</p>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="space-y-12">
          {/* Achievements */}
          <UserAchievements />
          
          {/* Progress Tracker */}
          <ProgressTracker />
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
