import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppContext } from '../AppContext';
import { Button } from './ui/button';
import { 
  Trophy, LogOut, Code, 
  Menu, X, ShieldCheck, User
} from 'lucide-react';
import { supabase } from '../lib/supabase';
import { toast } from 'sonner';

const Navbar: React.FC = () => {
  const { user } = useAppContext();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = React.useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out successfully');
    navigate('/');
  };

  const navItemClass = "text-slate-500 hover:text-primary font-bold transition-all flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/5";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-white/80 backdrop-blur-xl border-b border-slate-200/60">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 group transition-transform active:scale-95">
            <div className="w-10 h-10 bg-primary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-12 transition-all">
              <Code className="w-6 h-6 text-white" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-slate-900">LEARN<span className="text-primary">LAB</span></span>
          </button>

          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => navigate('/leaderboard')} className={navItemClass}>
              <Trophy className="w-4 h-4 text-orange-500" />
              Leaderboard
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate('/login')} className="font-bold text-slate-600 hover:text-primary">
                Log In
              </Button>
              <Button onClick={() => navigate('/signup')} className="bg-primary hover:bg-primary/90 text-white font-bold px-6 rounded-xl shadow-lg shadow-primary/20">
                Get Started
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {user.role === 'admin' && (
                <Button variant="outline" onClick={() => navigate('/admin')} className="border-slate-200 text-slate-700 hover:bg-slate-50 font-bold rounded-xl">
                  <ShieldCheck className="w-4 h-4 mr-2 text-indigo-500" /> Admin
                </Button>
              )}
              <div className="h-8 w-[1px] bg-slate-200 mx-2"></div>
              <button onClick={() => navigate('/profile')} className="flex items-center gap-3 bg-slate-50 border border-slate-200 pl-2 pr-4 py-1.5 rounded-full hover:bg-slate-100 transition-all group">
                <div className="w-8 h-8 rounded-full bg-primary flex items-center justify-center text-white font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
                  {(user.username || 'U').charAt(0).toUpperCase()}
                </div>
                <div className="text-left">
                  <p className="text-xs font-black text-slate-900 leading-none">{user.username || 'Learner'}</p>
                  <p className="text-[10px] text-primary font-bold">{user.xp} XP</p>
                </div>
              </button>
              <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-destructive transition-colors rounded-lg hover:bg-destructive/5">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-slate-600 hover:bg-slate-100 rounded-lg" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-white border-b border-slate-200 p-4 space-y-4 animate-in slide-in-from-top duration-300 shadow-2xl">
          <button onClick={() => { navigate('/leaderboard'); setIsOpen(false); }} className="w-full text-left py-4 px-4 rounded-2xl hover:bg-slate-50 text-slate-700 font-bold flex items-center gap-3 transition-colors">
            <Trophy className="w-5 h-5 text-orange-500" /> Leaderboard
          </button>
          {!user ? (
            <div className="grid grid-cols-1 gap-3 pt-4">
              <Button variant="outline" onClick={() => { navigate('/login'); setIsOpen(false); }} className="rounded-2xl h-14 font-bold">Log In</Button>
              <Button onClick={() => { navigate('/signup'); setIsOpen(false); }} className="bg-primary rounded-2xl h-14 font-bold shadow-lg shadow-primary/20">Join for Free</Button>
            </div>
          ) : (
            <div className="space-y-2 pt-2">
               <button onClick={() => { navigate('/profile'); setIsOpen(false); }} className="w-full text-left py-4 px-4 rounded-2xl hover:bg-slate-50 text-slate-700 font-bold flex items-center gap-3 transition-colors">
                <User className="w-5 h-5 text-primary" /> My Profile
              </button>
              {user.role === 'admin' && (
                <button onClick={() => { navigate('/admin'); setIsOpen(false); }} className="w-full text-left py-4 px-4 rounded-2xl hover:bg-indigo-50 text-indigo-600 font-bold flex items-center gap-3 transition-colors">
                  <ShieldCheck className="w-5 h-5" /> Admin Console
                </button>
              )}
              <div className="pt-4 border-t border-slate-100">
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full text-left py-4 px-4 rounded-2xl hover:bg-destructive/5 text-destructive font-bold flex items-center gap-3 transition-colors">
                  <LogOut className="w-5 h-5" /> Logout
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;