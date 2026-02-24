import React, { useState, useEffect } from 'react';
import { supabase } from '../lib/supabase';
import { useNavigate, Link } from 'react-router-dom';
import { Shield, Lock, LogIn, Mail, ChevronLeft, UserPlus } from 'lucide-react';
import { toast } from 'sonner';

export default function AuthAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [isSignUp, setIsSignUp] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(async (event, session) => {
      if (event === 'SIGNED_IN' && session) {
        const { data: profile } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', session.user.id)
          .single();
        
        if (profile?.role === 'admin') {
          navigate('/admin');
        } else {
          // If profile hasn't updated yet or role is wrong
          // We don't sign out immediately here to avoid loops if trigger is slow
        }
      }
    });
    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleAdminAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isSignUp) {
        const { data, error } = await supabase.auth.signUp({
          email,
          password,
          options: {
            data: {
              role: 'admin',
              full_name: `Admin - ${email.split('@')[0]}`,
            },
            emailRedirectTo: `${window.location.origin}/admin`,
          }
        });
        
        if (error) throw error;
        
        if (data?.user && (!data.user.identities || data.user.identities.length === 0)) {
          toast.error('This email is already registered.');
        } else {
          toast.success('Admin registration successful! Check email for verification.');
        }
      } else {
        const { data, error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        const { data: profile, error: profileErr } = await supabase
          .from('profiles')
          .select('role')
          .eq('id', data.user?.id)
          .single();

        if (profileErr || profile?.role !== 'admin') {
          await supabase.auth.signOut();
          throw new Error('Access denied. Administrator privileges required.');
        }

        toast.success('Admin access granted.');
        navigate('/admin');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex flex-col items-center justify-center p-4">
      <button 
        onClick={() => navigate('/login')}
        className="absolute top-8 left-8 text-slate-500 hover:text-slate-900 flex items-center gap-2 font-bold transition-colors"
      >
        <ChevronLeft className="w-5 h-5" />
        Back to User Login
      </button>

      <div className="max-w-md w-full bg-white rounded-[32px] shadow-2xl border border-slate-200 overflow-hidden relative">
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 via-primary to-pink-500"></div>
        
        <div className="p-10 md:p-12">
          <div className="flex justify-center mb-8">
            <div className="w-20 h-20 bg-primary/10 rounded-[24px] flex items-center justify-center border border-primary/20 shadow-xl">
              {isSignUp ? <UserPlus className="w-10 h-10 text-primary" /> : <Shield className="w-10 h-10 text-primary" />}
            </div>
          </div>
          
          <div className="text-center mb-10">
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">
              {isSignUp ? 'Admin Registration' : 'Admin Portal'}
            </h1>
            <p className="text-slate-500 mt-2 font-medium">Secure management interface</p>
          </div>

          <form onSubmit={handleAdminAuth} className="space-y-6">
            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">Email</label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="email"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
                  placeholder="admin@platform.io"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-black text-slate-500 uppercase tracking-widest mb-2 px-1">Password</label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <input
                  type="password"
                  required
                  className="w-full pl-12 pr-4 py-4 bg-slate-50 border border-slate-200 text-slate-900 rounded-2xl focus:ring-4 focus:ring-primary/10 outline-none transition-all font-medium"
                  placeholder="••••••••"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-slate-900 hover:bg-black text-white font-black py-4 rounded-2xl transition-all flex items-center justify-center gap-3 shadow-xl active:scale-[0.98] disabled:opacity-50"
            >
              {loading ? 'Processing...' : (isSignUp ? 'Register Admin' : 'Login to Dashboard')}
              {!loading && <LogIn className="w-5 h-5" />}
            </button>
          </form>

          <div className="mt-10 text-center">
            <button
              onClick={() => setIsSignUp(!isSignUp)}
              className="text-slate-500 hover:text-primary text-xs font-bold transition-colors uppercase tracking-widest"
            >
              {isSignUp ? 'Back to Admin Login' : 'Register as Administrator'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}