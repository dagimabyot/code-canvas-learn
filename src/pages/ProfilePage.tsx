import React from 'react';
import { useAppContext } from '../AppContext';
import { Award, Star, Edit, CheckCircle } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card } from '../components/ui/card';

const ProfilePage: React.FC = () => {
  const { user } = useAppContext();

  if (!user) return null;

  return (
    <div className="max-w-7xl mx-auto px-4 py-12 pt-24">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Left: Profile Card */}
        <div className="lg:col-span-1">
          <Card className="bg-slate-900 border-slate-800 p-8 text-center space-y-6">
            <div className="relative inline-block">
              <div className="w-32 h-32 rounded-3xl overflow-hidden mx-auto bg-gradient-to-br from-blue-500 to-indigo-600 p-1">
                <img 
                  src={user.avatar_url || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.username}`} 
                  alt={user.username} 
                  className="w-full h-full object-cover rounded-[1.4rem]"
                />
              </div>
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-blue-600 border-4 border-slate-900 rounded-full flex items-center justify-center text-white text-xs font-black">
                {user.level}
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold text-white">{user.username}</h2>
              <p className="text-slate-500 font-medium">{user.role === 'admin' ? 'Administrator' : 'Aspiring Developer'}</p>
            </div>
            <div className="flex justify-center gap-6">
              <div className="text-center">
                <p className="text-lg font-black text-white">{user.xp}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">XP</p>
              </div>
              <div className="w-px h-8 bg-slate-800" />
              <div className="text-center">
                <p className="text-lg font-black text-white">{user.streak}</p>
                <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Streak</p>
              </div>
            </div>
            <Button className="w-full bg-slate-800 hover:bg-slate-700 text-white font-bold h-12 rounded-xl">
              <Edit className="w-4 h-4 mr-2" /> Edit Profile
            </Button>
          </Card>
        </div>

        {/* Right: Achievements & Progress */}
        <div className="lg:col-span-2 space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Card className="bg-slate-900 border-slate-800 p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-yellow-500/10 rounded-xl flex items-center justify-center">
                <Award className="w-6 h-6 text-yellow-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Certificates</p>
                <p className="text-xl font-black text-white">{user.certificates?.length || 0}</p>
              </div>
            </Card>
            <Card className="bg-slate-900 border-slate-800 p-6 flex items-center gap-4">
              <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center">
                <CheckCircle className="w-6 h-6 text-blue-500" />
              </div>
              <div>
                <p className="text-sm font-bold text-slate-500 uppercase tracking-widest">Lessons Completed</p>
                <p className="text-xl font-black text-white">{user.completed_lessons?.length || 0}</p>
              </div>
            </Card>
          </div>

          <div className="space-y-6">
            <h3 className="text-xl font-bold text-white">Achievements</h3>
            <div className="grid grid-cols-4 md:grid-cols-6 gap-4">
              {user.badges?.map((badge, i) => (
                <div key={i} className="aspect-square bg-slate-900 border border-slate-800 rounded-2xl flex items-center justify-center p-3 grayscale hover:grayscale-0 transition-all cursor-help" title={typeof badge === 'string' ? badge : badge.name}>
                   <Star className="w-full h-full text-yellow-500 fill-yellow-500/10" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;