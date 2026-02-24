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

  const navItemClass = "text-muted-foreground hover:text-primary font-bold transition-all flex items-center gap-2 px-3 py-2 rounded-lg hover:bg-primary/5";

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-background/80 backdrop-blur-xl border-b border-border">
      <div className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-8">
          <button onClick={() => navigate('/')} className="flex items-center gap-2 group transition-transform active:scale-95">
            <div className="w-10 h-10 bg-gradient-to-br from-primary to-secondary rounded-xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:rotate-12 transition-all">
              <Code className="w-6 h-6 text-white" />
            </div>
            <span className="font-black text-2xl tracking-tighter text-foreground">CODE<span className="bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">LEARN</span></span>
          </button>

          <div className="hidden md:flex items-center gap-2">
            <button onClick={() => navigate('/leaderboard')} className={navItemClass}>
              <Trophy className="w-4 h-4 text-amber-500" />
              Leaderboard
            </button>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-4">
          {!user ? (
            <div className="flex items-center gap-3">
              <Button variant="ghost" onClick={() => navigate('/login')} className="font-bold text-muted-foreground hover:text-foreground">
                Log In
              </Button>
              <Button onClick={() => navigate('/signup')} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold px-6 rounded-xl shadow-lg shadow-primary/20">
                Get Started
              </Button>
            </div>
          ) : (
            <div className="flex items-center gap-3">
              {user.role === 'admin' && (
                <Button variant="outline" onClick={() => navigate('/admin')} className="border-border text-foreground hover:bg-card font-bold rounded-xl">
                  <ShieldCheck className="w-4 h-4 mr-2 text-primary" /> Admin
                </Button>
              )}
              <div className="h-8 w-[1px] bg-border mx-2"></div>
              <button onClick={() => navigate('/profile')} className="flex items-center gap-3 bg-card border border-border pl-2 pr-4 py-1.5 rounded-full hover:border-primary transition-all group">
                <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-white font-black text-sm shadow-sm group-hover:scale-105 transition-transform">
                  {(user.username || 'U').charAt(0).toUpperCase()}
                </div>
                <div className="text-left">
                  <p className="text-xs font-bold text-foreground leading-none">{user.username || 'Learner'}</p>
                  <p className="text-[10px] text-primary font-bold">{user.xp} XP</p>
                </div>
              </button>
              <button onClick={handleLogout} className="p-2 text-muted-foreground hover:text-destructive transition-colors rounded-lg hover:bg-destructive/5">
                <LogOut className="w-5 h-5" />
              </button>
            </div>
          )}
        </div>

        {/* Mobile Toggle */}
        <button className="md:hidden p-2 text-muted-foreground hover:bg-card rounded-lg" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X /> : <Menu />}
        </button>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden absolute top-16 left-0 right-0 bg-background border-b border-border p-4 space-y-4 animate-in slide-in-from-top duration-300 shadow-2xl">
          <button onClick={() => { navigate('/leaderboard'); setIsOpen(false); }} className="w-full text-left py-4 px-4 rounded-2xl hover:bg-card text-foreground font-bold flex items-center gap-3 transition-colors">
            <Trophy className="w-5 h-5 text-amber-500" /> Leaderboard
          </button>
          {!user ? (
            <div className="grid grid-cols-1 gap-3 pt-4">
              <Button variant="outline" onClick={() => { navigate('/login'); setIsOpen(false); }} className="rounded-2xl h-14 font-bold">Log In</Button>
              <Button onClick={() => { navigate('/signup'); setIsOpen(false); }} className="bg-primary text-primary-foreground rounded-2xl h-14 font-bold shadow-lg shadow-primary/20">Join for Free</Button>
            </div>
          ) : (
            <div className="space-y-2 pt-2">
               <button onClick={() => { navigate('/profile'); setIsOpen(false); }} className="w-full text-left py-4 px-4 rounded-2xl hover:bg-card text-foreground font-bold flex items-center gap-3 transition-colors">
                <User className="w-5 h-5 text-primary" /> My Profile
              </button>
              {user.role === 'admin' && (
                <button onClick={() => { navigate('/admin'); setIsOpen(false); }} className="w-full text-left py-4 px-4 rounded-2xl hover:bg-primary/10 text-primary font-bold flex items-center gap-3 transition-colors">
                  <ShieldCheck className="w-5 h-5" /> Admin Console
                </button>
              )}
              <div className="pt-4 border-t border-border">
                <button onClick={() => { handleLogout(); setIsOpen(false); }} className="w-full text-left py-4 px-4 rounded-2xl hover:bg-destructive/10 text-destructive font-bold flex items-center gap-3 transition-colors">
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
