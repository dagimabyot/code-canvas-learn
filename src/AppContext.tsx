import React, { createContext, useContext, useState, useEffect } from 'react';
import { User } from './types';
import { supabase } from './lib/supabase';
import { toast } from 'sonner';

interface AppContextType {
  user: User | null;
  loading: boolean;
  checkUser: () => Promise<void>;
  completeLesson: (lessonId: string, xpEarned: number) => Promise<void>;
  updateProfile: (updates: Partial<User>) => Promise<void>;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

const DEFAULT_AVATAR = 'https://api.dicebear.com/7.x/avataaars/svg?seed=Learner';

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkUser = async () => {
    try {
      const { data: { session } } = await supabase.auth.getSession();
      if (session) {
        const { data: profile, error } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', session.user.id)
          .single();

        if (error) {
          if (error.code === 'PGRST116') {
             const newProfile = {
               id: session.user.id,
               username: session.user.email?.split('@')[0] || 'Learner',
               email: session.user.email,
               role: 'user',
               xp: 0,
               level: 1,
               streak: 0,
               enrolled_courses: [],
               completed_lessons: [],
               badges: [],
               certificates: []
             };
             const { data: created } = await supabase.from('profiles').insert(newProfile).select().single();
             setUser(created as any);
          } else {
             throw error;
          }
        } else {
          setUser({
            ...profile,
            avatar_url: profile.avatar_url || DEFAULT_AVATAR,
          } as any);
        }
      } else {
        setUser(null);
      }
    } catch (error) {
      console.error('Auth error:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    checkUser();
    const { data: { subscription } } = supabase.auth.onAuthStateChange(() => {
      checkUser();
    });
    return () => subscription.unsubscribe();
  }, []);

  const completeLesson = async (lessonId: string, xpEarned: number) => {
    if (!user) return;
    
    if (!user.completed_lessons?.includes(lessonId)) {
      const newXp = (user.xp || 0) + xpEarned;
      const newLevel = Math.floor(newXp / 500) + 1;
      const newCompleted = [...(user.completed_lessons || []), lessonId];

      const { error } = await supabase
        .from('profiles')
        .update({
          xp: newXp,
          level: newLevel,
          completed_lessons: newCompleted
        })
        .eq('id', user.id);

      if (error) {
        toast.error('Failed to save progress');
        return;
      }

      setUser(prev => prev ? ({
        ...prev,
        xp: newXp,
        level: newLevel,
        completed_lessons: newCompleted
      }) : null);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (!user) return;
    const { error } = await supabase
      .from('profiles')
      .update(updates)
      .eq('id', user.id);

    if (error) {
      toast.error('Update failed');
      throw error;
    }
    setUser(prev => prev ? ({ ...prev, ...updates } as any) : null);
    toast.success('Profile updated');
  };

  return (
    <AppContext.Provider value={{ user, loading, checkUser, completeLesson, updateProfile }}>
      {children}
    </AppContext.Provider>
  );
};

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useAppContext must be used within an AppProvider');
  return context;
};