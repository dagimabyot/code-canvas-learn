import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, useLocation } from 'react-router-dom';
import { Mail, Lock, LogIn, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

export default function AuthUser() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      if (event === 'SIGNED_IN' && session) {
        navigate('/');
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        // Sign Up
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              role: 'user',
              full_name: email.split('@')[0],
              xp: 0,
              streak: 0,
              level: 1
            },
            emailRedirectTo: window.location.origin,
          }
        });
        
        if (error) throw error;
        
        // If we get data but no user identities, the email is likely already in use
        if (data?.user && (!data.user.identities || data.user.identities.length === 0)) {
           toast.error('This email is already associated with an account.');
        } else {
           toast.success('Check your email for the confirmation link!');
        }
      } else {
        // Sign In
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        toast.success('Welcome back!');
        navigate('/');
      }
    } catch (error: any) {
      toast.error(error.message || 'Authentication failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignIn = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: window.location.origin,
        }
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-xl overflow-hidden border border-slate-100">
        <div className="p-8 md:p-10">
          <div className="text-center mb-10">
            <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg transition-transform hover:scale-110 duration-300">
              {isSignUp ? <UserPlus className="w-8 h-8" /> : <LogIn className="w-8 h-8" />}
            </div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              {isSignUp ? 'Join CodeMaster' : 'Welcome Back'}
            </h1>
            <p className="text-slate-500 mt-2 font-medium">The world's favorite way to learn coding</p>
          </div>

          <form onSubmit={handleAuth} className="space-y-5">
            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium text-slate-900"
                  placeholder="name@example.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium text-slate-900"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-2xl transition-all shadow-lg active:scale-[0.98] disabled:opacity-70 flex items-center justify-center gap-2"
            >
              {loading ? 'Processing...' : (isSignUp ? 'Create Account' : 'Sign In')}
              {!loading && <LogIn className="w-5 h-5" />}
            </button>
          </form>

          <div className="mt-8 flex flex-col gap-4">
            <div className="relative flex items-center justify-center">
              <div className="border-t-2 border-slate-100 w-full"></div>
              <span className="bg-white px-4 text-[10px] font-bold text-slate-400 uppercase tracking-widest absolute">Or continue with</span>
            </div>

            <button
              onClick={handleGoogleSignIn}
              className="w-full flex items-center justify-center gap-3 bg-white border-2 border-slate-100 hover:bg-slate-50 hover:border-slate-200 text-slate-700 font-bold py-4 rounded-2xl transition-all active:scale-[0.98]"
            >
              <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
              Sign in with Google
            </button>
          </div>

          <div className="mt-8 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-slate-500 hover:text-primary text-sm font-bold transition-colors underline-offset-4 hover:underline"
            >
              {isSignUp ? 'Already have an account? Sign in' : "Don't have an account? Join free"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}