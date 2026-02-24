import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { supabase } from '../lib/supabase';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { ShieldAlert, ArrowLeft, Lock, Mail } from 'lucide-react';
import { toast } from 'sonner';

export default function AdminLogin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleAdminLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });
      if (error) throw error;

      // Verify admin role
      const { data: profile, error: profileError } = await supabase
        .from('profiles')
        .select('role')
        .eq('id', data.user.id)
        .single();

      if (profileError || profile?.role !== 'admin') {
        await supabase.auth.signOut();
        throw new Error('Unauthorized. Access restricted to administrators.');
      }

      toast.success('Admin access granted');
      navigate('/admin');
    } catch (error: any) {
      toast.error(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-64px)] flex items-center justify-center bg-slate-50 p-4">
      <Card className="w-full max-w-md border-slate-200 bg-white shadow-2xl rounded-[32px] overflow-hidden border-2">
        <div className="h-2 w-full bg-slate-900"></div>
        <CardHeader className="space-y-4 text-center pb-8 pt-10">
          <div className="flex justify-center">
            <div className="p-4 bg-slate-900 rounded-2xl shadow-xl rotate-12">
              <ShieldAlert className="h-10 w-10 text-white" />
            </div>
          </div>
          <div className="space-y-2">
            <CardTitle className="text-3xl font-black text-slate-900 tracking-tight">Admin Portal</CardTitle>
            <CardDescription className="text-slate-500 font-medium">
              Secure management access only
            </CardDescription>
          </div>
        </CardHeader>
        <CardContent className="space-y-6 px-8">
          <form onSubmit={handleAdminLogin} className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-email" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Admin Email</Label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="admin-email"
                  type="email"
                  placeholder="admin@platform.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="pl-12 py-6 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 transition-all font-medium"
                  required
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="admin-password" className="text-xs font-bold text-slate-500 uppercase tracking-widest ml-1">Password</Label>
              <div className="relative">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-400" />
                <Input
                  id="admin-password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="pl-12 py-6 bg-slate-50 border-2 border-slate-100 rounded-2xl focus:border-slate-900 focus:ring-4 focus:ring-slate-900/10 transition-all font-medium"
                  required
                  placeholder="••••••••"
                />
              </div>
            </div>
            <Button type="submit" className="w-full py-6 rounded-2xl bg-slate-900 hover:bg-black text-white font-bold text-lg shadow-lg active:scale-[0.98] transition-all" disabled={loading}>
              {loading ? 'Authenticating...' : 'Enter Dashboard'}
            </Button>
          </form>
        </CardContent>
        <CardFooter className="flex justify-center border-t border-slate-100 bg-slate-50/50 py-6">
          <Link to="/login" className="flex items-center gap-2 text-sm font-bold text-slate-500 hover:text-slate-900 transition-colors uppercase tracking-widest">
            <ArrowLeft className="h-4 w-4" /> Back to Login
          </Link>
        </CardFooter>
      </Card>
    </div>
  );
}