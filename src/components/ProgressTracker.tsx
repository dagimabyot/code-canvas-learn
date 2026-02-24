import React from 'react';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';
import { Card } from './ui/card';
import { TrendingUp, BookOpen, Clock, Flame } from 'lucide-react';

interface ProgressTrackerProps {
  userId?: string;
}

export const ProgressTracker: React.FC<ProgressTrackerProps> = () => {
  // Mock data for progress
  const weeklyProgress = [
    { day: 'Mon', lessons: 2, xp: 150 },
    { day: 'Tue', lessons: 3, xp: 250 },
    { day: 'Wed', lessons: 1, xp: 100 },
    { day: 'Thu', lessons: 4, xp: 400 },
    { day: 'Fri', lessons: 3, xp: 300 },
    { day: 'Sat', lessons: 2, xp: 200 },
    { day: 'Sun', lessons: 3, xp: 280 }
  ];

  const courseProgress = [
    { name: 'Python', value: 85 },
    { name: 'JavaScript', value: 60 },
    { name: 'React', value: 40 },
    { name: 'SQL', value: 25 }
  ];

  const COLORS = ['#5b4efe', '#ff6b6b', '#00d4ff', '#fbbf24'];

  const stats = [
    { icon: BookOpen, label: 'Lessons Completed', value: '42', color: 'from-blue-500 to-cyan-500' },
    { icon: Clock, label: 'Total Hours', value: '28.5', color: 'from-purple-500 to-pink-500' },
    { icon: Flame, label: 'Current Streak', value: '7 days', color: 'from-orange-500 to-red-500' },
    { icon: TrendingUp, label: 'This Week XP', value: '1,680', color: 'from-green-500 to-emerald-500' }
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-black text-foreground mb-2">Your Progress</h2>
        <p className="text-muted-foreground">Track your learning journey and celebrate milestones</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, idx) => (
          <Card key={idx} className="border border-border rounded-2xl p-6 hover:shadow-lg transition-all">
            <div className="flex items-start justify-between">
              <div>
                <p className="text-sm font-semibold text-muted-foreground mb-1">{stat.label}</p>
                <p className="text-3xl font-black text-foreground">{stat.value}</p>
              </div>
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${stat.color} flex items-center justify-center text-white shadow-lg`}>
                <stat.icon className="w-6 h-6" />
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Weekly Activity */}
        <Card className="border border-border rounded-2xl p-6">
          <h3 className="text-lg font-bold text-foreground mb-6">Weekly Activity</h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={weeklyProgress}>
              <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
              <XAxis dataKey="day" stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
              <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
                labelStyle={{ color: 'var(--color-foreground)' }}
              />
              <Bar dataKey="lessons" fill="#5b4efe" name="Lessons" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </Card>

        {/* Course Progress */}
        <Card className="border border-border rounded-2xl p-6">
          <h3 className="text-lg font-bold text-foreground mb-6">Course Progress</h3>
          <ResponsiveContainer width="100%" height={300}>
            <PieChart>
              <Pie
                data={courseProgress}
                cx="50%"
                cy="50%"
                innerRadius={60}
                outerRadius={100}
                paddingAngle={2}
                dataKey="value"
              >
                {courseProgress.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip 
                contentStyle={{ 
                  backgroundColor: 'var(--color-card)', 
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px'
                }}
              />
            </PieChart>
          </ResponsiveContainer>
          <div className="mt-6 space-y-2">
            {courseProgress.map((course, idx) => (
              <div key={course.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: COLORS[idx] }}></div>
                  <span className="text-sm font-semibold text-foreground">{course.name}</span>
                </div>
                <span className="text-sm font-bold text-primary">{course.value}%</span>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* XP Over Time */}
      <Card className="border border-border rounded-2xl p-6">
        <h3 className="text-lg font-bold text-foreground mb-6">XP Earned This Week</h3>
        <ResponsiveContainer width="100%" height={250}>
          <LineChart data={weeklyProgress}>
            <CartesianGrid strokeDasharray="3 3" stroke="var(--color-border)" vertical={false} />
            <XAxis dataKey="day" stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
            <YAxis stroke="var(--color-muted-foreground)" style={{ fontSize: '12px' }} />
            <Tooltip 
              contentStyle={{ 
                backgroundColor: 'var(--color-card)', 
                border: '1px solid var(--color-border)',
                borderRadius: '8px'
              }}
              labelStyle={{ color: 'var(--color-foreground)' }}
            />
            <Line 
              type="monotone" 
              dataKey="xp" 
              stroke="#5b4efe" 
              strokeWidth={3}
              dot={{ fill: '#5b4efe', r: 5 }}
              activeDot={{ r: 7 }}
              name="XP"
            />
          </LineChart>
        </ResponsiveContainer>
      </Card>

      {/* Learning Milestones */}
      <Card className="border border-border rounded-2xl p-6">
        <h3 className="text-lg font-bold text-foreground mb-6">Recent Milestones</h3>
        <div className="space-y-4">
          {[
            { title: 'First Course Completed', date: '2 days ago', icon: '🎓' },
            { title: '100 Lessons Milestone', date: '1 week ago', icon: '⭐' },
            { title: '7-Day Streak Achieved', date: 'Today', icon: '🔥' },
            { title: 'Python Intermediate Certification', date: '3 days ago', icon: '📜' }
          ].map((milestone, idx) => (
            <div key={idx} className="flex items-center gap-4 p-4 bg-card rounded-xl border border-border hover:border-primary transition-colors">
              <div className="text-2xl">{milestone.icon}</div>
              <div className="flex-1">
                <p className="font-semibold text-foreground">{milestone.title}</p>
                <p className="text-xs text-muted-foreground">{milestone.date}</p>
              </div>
              <div className="w-2 h-2 rounded-full bg-primary"></div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  );
};

export default ProgressTracker;
