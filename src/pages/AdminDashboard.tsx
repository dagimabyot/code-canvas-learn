import React, { useState } from 'react';
import { 
  LayoutDashboard, 
  BookOpen, 
  Users, 
  Settings, 
  Plus, 
  Search, 
  MoreVertical,
  Edit,
  Trash2,
  CheckCircle,
  Clock,
  BarChart3,
  LogOut
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { mockCourses } from '@/data/mockData';
import { toast } from 'sonner';
import { supabase } from '@/lib/supabase';
import { useNavigate } from 'react-router-dom';

export default function AdminDashboard() {
  const [activeTab, setActiveTab] = useState('courses');
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success('Logged out');
    navigate('/admin/login');
  };

  const filteredCourses = mockCourses.filter(c => 
    c.title.toLowerCase().includes(searchQuery.toLowerCase()) || 
    c.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const stats = [
    { title: 'Total Students', value: '12,482', icon: Users, trend: '+12% this month' },
    { title: 'Active Courses', value: '100', icon: BookOpen, trend: '+5 since last week' },
    { title: 'Avg. Completion Rate', value: '68%', icon: CheckCircle, trend: '+2% from last month' },
    { title: 'Total Learning Hours', value: '45.2k', icon: Clock, trend: '+8% this month' },
  ];

  return (
    <div className="min-h-screen bg-slate-50 flex">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-slate-300 hidden md:flex flex-col border-r border-slate-800">
        <div className="p-6">
          <div className="flex items-center gap-2 text-white font-bold text-xl mb-8">
            <div className="bg-primary h-8 w-8 rounded-lg flex items-center justify-center">
              <BarChart3 className="h-5 w-5 text-white" />
            </div>
            AdminPanel
          </div>
          
          <nav className="space-y-1">
            <button
              onClick={() => setActiveTab('overview')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                activeTab === 'overview' ? 'bg-slate-800 text-white font-medium' : 'hover:bg-slate-800'
              }`}
            >
              <LayoutDashboard className="h-4 w-4" /> Overview
            </button>
            <button
              onClick={() => setActiveTab('courses')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                activeTab === 'courses' ? 'bg-slate-800 text-white font-medium' : 'hover:bg-slate-800'
              }`}
            >
              <BookOpen className="h-4 w-4" /> Courses
            </button>
            <button
              onClick={() => setActiveTab('users')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                activeTab === 'users' ? 'bg-slate-800 text-white font-medium' : 'hover:bg-slate-800'
              }`}
            >
              <Users className="h-4 w-4" /> Users
            </button>
            <button
              onClick={() => setActiveTab('settings')}
              className={`w-full flex items-center gap-3 px-4 py-2 rounded-lg text-sm transition-colors ${
                activeTab === 'settings' ? 'bg-slate-800 text-white font-medium' : 'hover:bg-slate-800'
              }`}
            >
              <Settings className="h-4 w-4" /> Settings
            </button>
          </nav>
        </div>
        
        <div className="mt-auto p-6">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-slate-400 hover:text-white hover:bg-slate-800"
            onClick={handleLogout}
          >
            <LogOut className="h-4 w-4" /> Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <header className="h-16 border-b bg-white flex items-center justify-between px-8 sticky top-0 z-10">
          <h1 className="font-bold text-xl capitalize">{activeTab}</h1>
          <div className="flex items-center gap-4">
            <div className="relative w-64">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input 
                placeholder="Search everything..." 
                className="pl-9 bg-slate-100 border-none h-9"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            <Button size="sm" onClick={() => toast.info('New course modal opened')}>
              <Plus className="h-4 w-4 mr-2" /> New Course
            </Button>
          </div>
        </header>

        <div className="p-8 space-y-8">
          {/* Stats Overview */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {stats.map((stat, i) => (
              <Card key={i}>
                <CardContent className="p-6">
                  <div className="flex items-center justify-between mb-2">
                    <stat.icon className="h-5 w-5 text-primary" />
                    <span className="text-xs font-medium text-green-600 bg-green-50 px-2 py-0.5 rounded-full">
                      {stat.trend}
                    </span>
                  </div>
                  <div className="text-2xl font-bold">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.title}</div>
                </CardContent>
              </Card>
            ))}
          </div>

          {/* Courses List */}
          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <div>
                <CardTitle>Management</CardTitle>
                <CardDescription>View and manage all your educational content</CardDescription>
              </div>
              <div className="flex gap-2">
                <Button variant="outline" size="sm">Export Data</Button>
                <Button variant="outline" size="sm">Filters</Button>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <table className="w-full text-sm text-left">
                  <thead className="bg-slate-50 text-slate-500 font-medium border-y">
                    <tr>
                      <th className="px-4 py-3">Course Name</th>
                      <th className="px-4 py-3">Category</th>
                      <th className="px-4 py-3">Students</th>
                      <th className="px-4 py-3">XP</th>
                      <th className="px-4 py-3">Difficulty</th>
                      <th className="px-4 py-3">Status</th>
                      <th className="px-4 py-3"></th>
                    </tr>
                  </thead>
                  <tbody className="divide-y">
                    {filteredCourses.slice(0, 10).map((course) => {
                      const level = course.level || course.difficulty || 'Beginner';
                      return (
                        <tr key={course.id} className="hover:bg-slate-50/50 transition-colors">
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-3">
                              <div className="h-10 w-10 rounded-lg bg-slate-200 overflow-hidden">
                                <img src={course.thumbnail} alt="" className="h-full w-full object-cover" />
                              </div>
                              <div>
                                <div className="font-bold">{course.title}</div>
                                <div className="text-xs text-muted-foreground">{course.duration}</div>
                              </div>
                            </div>
                          </td>
                          <td className="px-4 py-4">{course.category}</td>
                          <td className="px-4 py-4 font-medium">{(course.enrolled_count || 0).toLocaleString()}</td>
                          <td className="px-4 py-4">{course.total_xp || 100} XP</td>
                          <td className="px-4 py-4">
                            <Badge variant="outline" className={
                              level === 'Beginner' ? 'text-green-600' :
                              level === 'Intermediate' ? 'text-blue-600' : 'text-orange-600'
                            }>
                              {level}
                            </Badge>
                          </td>
                          <td className="px-4 py-4">
                            <div className="flex items-center gap-1.5 text-green-600">
                              <div className="h-1.5 w-1.5 rounded-full bg-green-600" />
                              Published
                            </div>
                          </td>
                          <td className="px-4 py-4 text-right">
                            <DropdownMenu>
                              <DropdownMenuTrigger asChild>
                                <Button variant="ghost" size="icon">
                                  <MoreVertical className="h-4 w-4" />
                                </Button>
                              </DropdownMenuTrigger>
                              <DropdownMenuContent align="end">
                                <DropdownMenuItem onClick={() => toast.info('Edit mode')}>
                                  <Edit className="h-4 w-4 mr-2" /> Edit
                                </DropdownMenuItem>
                                <DropdownMenuItem className="text-red-600" onClick={() => toast.error('Delete clicked')}>
                                  <Trash2 className="h-4 w-4 mr-2" /> Delete
                                </DropdownMenuItem>
                              </DropdownMenuContent>
                            </DropdownMenu>
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                </table>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}