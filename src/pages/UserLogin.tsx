import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Button } from '../components/ui/button';
import { Input } from '../components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '../components/ui/card';
import { Label } from '../components/ui/label';
import { LogIn, Mail, Lock, ShieldAlert } from 'lucide-react';
import { toast } from 'sonner';

const UserLogin: React.FC = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleEmailLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithPassword({ email, password });
      if (error) throw error;
      toast.success('Welcome back!');
      navigate('/profile');
    } catch (error: any) {
      toast.error(error.message || 'Login failed');
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/profile`,
          queryParams: {
            access_type: 'offline',
            prompt: 'consent',
          }
        }
      });
      if (error) throw error;
    } catch (error: any) {
      toast.error(error.message || 'Google login failed');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-[calc(100vh-64px)] px-4 bg-slate-50">
      <div className="w-full max-w-md">
        <Card className="border-slate-200 bg-white shadow-xl rounded-3xl overflow-hidden border-2">
          <CardHeader className="space-y-4 text-center pb-8 pt-10">
            <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg -rotate-3">
              <LogIn className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl font-black text-slate-900 tracking-tight">Welcome Back</CardTitle>
              <CardDescription className="text-slate-500 font-medium">
                Continue your learning adventure
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 px-8">
            <div className="grid grid-cols-1 gap-4">
              <Button 
                variant="outline" 
                onClick={handleGoogleLogin} 
                className="py-6 rounded-2xl border-2 border-slate-100 hover:bg-slate-50 hover:border-slate-200 text-slate-700 font-bold transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
              >
                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-5 h-5" />
                Continue with Google
              </Button>
            </div>
            <div className="relative py-2 text-center">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t-2 border-slate-100" />
              </div>
              <span className="relative bg-white px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Or use email credentials
              </span>
            </div>
            <form onSubmit={handleEmailLogin} className="space-y-4">
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input 
                    type="email" 
                    placeholder="name@example.com" 
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-12 py-6 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input 
                    type="password" 
                    placeholder="••••••••" 
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="pl-12 py-6 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full py-6 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-lg shadow-primary/20 active:scale-[0.98] transition-all" disabled={loading}>
                {loading ? 'Signing in...' : 'Sign In'}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 pb-10">
            <div className="text-sm font-bold text-slate-500 text-center">
              Don&apos;t have an account?{' '}
              <Link to="/signup" className="text-primary hover:underline underline-offset-4 font-bold">
                Sign up for free
              </Link>
            </div>
            <div className="pt-6 border-t border-slate-100 w-full">
              <Link to="/admin/login" className="flex items-center justify-center gap-2 text-xs font-bold text-slate-400 hover:text-slate-600 uppercase tracking-widest transition-colors">
                <ShieldAlert className="w-4 h-4" />
                Administrator Portal
              </Link>
            </div>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
};

export default UserLogin;