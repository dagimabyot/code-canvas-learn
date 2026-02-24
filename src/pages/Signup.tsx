import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { UserPlus, Mail, Lock, User } from 'lucide-react';
import { toast } from 'sonner';

export default function Signup() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [fullName, setFullName] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
        options: {
          data: {
            full_name: fullName,
            role: 'user',
            xp: 0,
            level: 1,
            streak: 0,
          },
          emailRedirectTo: `${window.location.origin}/login`,
        },
      });
      
      if (error) throw error;
      
      if (data?.user && (!data.user.identities || data.user.identities.length === 0)) {
        toast.error('This email is already associated with an account.');
      } else {
        toast.success('Account created! Please check your email for verification.');
        navigate('/login');
      }
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleSignup = async () => {
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
      toast.error(error.message);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 p-4">
      <div className="max-w-md w-full">
        <Card className="border-slate-200 bg-white shadow-xl rounded-3xl overflow-hidden border-2">
          <CardHeader className="space-y-4 text-center pb-8 pt-10">
            <div className="w-16 h-16 bg-primary text-white rounded-2xl flex items-center justify-center mx-auto shadow-lg rotate-3">
              <UserPlus className="w-8 h-8" />
            </div>
            <div className="space-y-2">
              <CardTitle className="text-3xl font-black text-slate-900 tracking-tight">Create Account</CardTitle>
              <CardDescription className="text-slate-500 font-medium">
                Start your coding journey with CodeMaster
              </CardDescription>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 px-8">
            <form onSubmit={handleSignup} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="fullName" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Full Name</Label>
                <div className="relative">
                  <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    required
                    className="pl-12 py-6 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="m@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="pl-12 py-6 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="pl-12 py-6 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-primary focus:ring-4 focus:ring-primary/10 transition-all font-medium"
                  />
                </div>
              </div>
              <Button type="submit" className="w-full py-6 rounded-2xl bg-primary hover:bg-primary/90 text-white font-bold text-lg shadow-lg shadow-primary/20 active:scale-[0.98] transition-all" disabled={loading}>
                {loading ? 'Creating account...' : 'Create Account'}
              </Button>
            </form>

            <div className="relative py-2 text-center">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t-2 border-slate-100" />
              </div>
              <span className="relative bg-white px-4 text-[10px] font-black text-slate-400 uppercase tracking-widest">
                Or continue with
              </span>
            </div>

            <Button 
              variant="outline" 
              className="w-full py-6 rounded-2xl border-2 border-slate-100 hover:bg-slate-50 hover:border-slate-200 text-slate-700 font-bold transition-all flex items-center justify-center gap-3 active:scale-[0.98]"
              onClick={handleGoogleSignup}
            >
              <img src="https://www.google.com/favicon.ico" className="w-5 h-5" alt="Google" />
              Google Account
            </Button>
          </CardContent>
          <CardFooter className="flex justify-center pb-10 pt-4">
            <p className="text-sm font-bold text-slate-500">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline underline-offset-4">
                Log in
              </Link>
            </p>
          </CardFooter>
        </Card>
      </div>
    </div>
  );
}