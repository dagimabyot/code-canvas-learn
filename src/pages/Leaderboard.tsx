import React from 'react';
import { motion } from 'framer-motion';
import { Trophy, Medal, Award, TrendingUp, Users } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { mockLeaderboard } from '@/data/mockData';

export default function Leaderboard() {
  const topThree = mockLeaderboard.slice(0, 3);
  const others = mockLeaderboard.slice(3);

  return (
    <div className="min-h-screen bg-background pt-20 pb-12">
      <div className="container mx-auto px-4 max-w-4xl">
        <div className="text-center mb-12">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            className="inline-block p-3 bg-primary/10 rounded-full mb-4"
          >
            <Trophy className="h-8 w-8 text-primary" />
          </motion.div>
          <h1 className="text-4xl font-bold mb-2">Global Leaderboard</h1>
          <p className="text-muted-foreground">Compete with learners around the world and climb the ranks!</p>
        </div>

        {/* Top 3 Podium */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
          {topThree.map((user, index) => (
            <motion.div
              key={user.user_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className={`relative bg-card rounded-2xl border-2 p-6 text-center ${
                index === 0 ? 'border-primary shadow-lg scale-105 z-10' : 'border-border'
              }`}
            >
              <div className="absolute -top-4 left-1/2 -translate-x-1/2">
                {index === 0 && <Medal className="h-10 w-10 text-yellow-500 fill-yellow-500" />}
                {index === 1 && <Medal className="h-8 w-8 text-slate-400 fill-slate-400" />}
                {index === 2 && <Medal className="h-8 w-8 text-amber-700 fill-amber-700" />}
              </div>
              
              {/* Profile image removed as per user request */}
              <div className="w-16 h-16 bg-accent rounded-full flex items-center justify-center mx-auto mb-4 text-2xl font-bold">
                {user.full_name.charAt(0)}
              </div>
              
              <h3 className="font-bold text-lg mb-1">{user.full_name}</h3>
              <p className="text-primary font-bold text-xl">{user.xp.toLocaleString()} XP</p>
              <Badge variant="secondary" className="mt-2">Rank #{user.rank}</Badge>
            </motion.div>
          ))}
        </div>

        {/* Stats Summary */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          <Card>
            <CardContent className="pt-6 text-center">
              <Users className="h-5 w-5 mx-auto mb-2 text-primary" />
              <div className="text-2xl font-bold">15.4k</div>
              <div className="text-xs text-muted-foreground">Active Learners</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <TrendingUp className="h-5 w-5 mx-auto mb-2 text-green-500" />
              <div className="text-2xl font-bold">+12%</div>
              <div className="text-xs text-muted-foreground">Avg. Growth</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Award className="h-5 w-5 mx-auto mb-2 text-orange-500" />
              <div className="text-2xl font-bold">842</div>
              <div className="text-xs text-muted-foreground">Weekly Badges</div>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6 text-center">
              <Trophy className="h-5 w-5 mx-auto mb-2 text-yellow-500" />
              <div className="text-2xl font-bold">50k</div>
              <div className="text-xs text-muted-foreground">Total XP Awarded</div>
            </CardContent>
          </Card>
        </div>

        {/* Full List */}
        <Card>
          <CardHeader>
            <CardTitle className="text-xl">Top Learners</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <div className="divide-y">
              {others.map((user, index) => (
                <div 
                  key={user.user_id} 
                  className="flex items-center justify-between p-4 hover:bg-accent/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <span className="w-8 font-mono text-muted-foreground font-bold">#{user.rank}</span>
                    {/* Profile image removed as per user request */}
                    <div className="w-10 h-10 bg-accent rounded-full flex items-center justify-center text-sm font-bold">
                      {user.full_name.charAt(0)}
                    </div>
                    <div>
                      <div className="font-bold">{user.full_name}</div>
                      <div className="text-xs text-muted-foreground">New Learner</div>
                    </div>
                  </div>
                  <div className="flex items-center gap-4">
                    <div className="text-right">
                      <div className="font-bold text-primary">{user.xp.toLocaleString()}</div>
                      <div className="text-[10px] text-muted-foreground uppercase font-bold tracking-wider">Total XP</div>
                    </div>
                    <div className="h-8 w-8 bg-green-500/10 rounded-full flex items-center justify-center">
                      <TrendingUp className="h-4 w-4 text-green-500" />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}