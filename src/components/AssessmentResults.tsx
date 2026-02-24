import React from 'react';
import { CheckCircle2, Trophy, Medal, Star, Target, Zap } from 'lucide-react';
import { motion } from 'framer-motion';
import { Card } from './ui/card';
import { Button } from './ui/button';

interface AssessmentResultsProps {
  score: number;
  totalQuestions: number;
  correctAnswers: number;
  timeSpent: number;
  onContinue?: () => void;
  onRetry?: () => void;
}

export const AssessmentResults: React.FC<AssessmentResultsProps> = ({
  score,
  totalQuestions,
  correctAnswers,
  timeSpent,
  onContinue,
  onRetry
}) => {
  // Determine performance level
  let performanceLevel = 'Needs Improvement';
  let performanceColor = 'from-red-500 to-orange-500';
  let performanceIcon = Target;
  let xpReward = 0;

  if (score >= 90) {
    performanceLevel = 'Mastery';
    performanceColor = 'from-green-500 to-emerald-500';
    performanceIcon = Trophy;
    xpReward = 200;
  } else if (score >= 80) {
    performanceLevel = 'Excellent';
    performanceColor = 'from-blue-500 to-cyan-500';
    performanceIcon = Medal;
    xpReward = 150;
  } else if (score >= 70) {
    performanceLevel = 'Good';
    performanceColor = 'from-purple-500 to-pink-500';
    performanceIcon = Star;
    xpReward = 100;
  } else if (score >= 60) {
    performanceLevel = 'Passing';
    performanceColor = 'from-yellow-500 to-orange-500';
    performanceIcon = Zap;
    xpReward = 50;
  }

  const PerformanceIcon = performanceIcon;

  return (
    <div className="space-y-8">
      {/* Main Results Card */}
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.4 }}
        className={`bg-gradient-to-br ${performanceColor} rounded-3xl p-12 text-white text-center shadow-2xl`}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ delay: 0.2, duration: 0.4 }}
          className="w-24 h-24 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 backdrop-blur-sm"
        >
          <PerformanceIcon className="w-12 h-12" />
        </motion.div>
        
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3, duration: 0.4 }}
          className="text-4xl font-black mb-2"
        >
          {performanceLevel}!
        </motion.h2>
        
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.4, duration: 0.4 }}
          className="text-6xl font-black mb-2"
        >
          {score}%
        </motion.div>
        
        <p className="text-lg opacity-90">Assessment Complete</p>
      </motion.div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {[
          { label: 'Score', value: `${score}%`, icon: CheckCircle2, color: 'from-blue-500 to-cyan-500' },
          { label: 'Correct', value: `${correctAnswers}/${totalQuestions}`, icon: Trophy, color: 'from-green-500 to-emerald-500' },
          { label: 'Time Spent', value: `${timeSpent}m`, icon: Zap, color: 'from-orange-500 to-red-500' },
          { label: 'XP Earned', value: `+${xpReward}`, icon: Star, color: 'from-purple-500 to-pink-500' }
        ].map((stat, idx) => {
          const Icon = stat.icon;
          return (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 + idx * 0.1 }}
            >
              <Card className="border border-border rounded-xl p-4 text-center hover:shadow-lg transition-all">
                <div className={`w-10 h-10 bg-gradient-to-br ${stat.color} rounded-lg flex items-center justify-center mx-auto mb-2 text-white`}>
                  <Icon className="w-5 h-5" />
                </div>
                <p className="text-2xl font-black text-foreground">{stat.value}</p>
                <p className="text-xs font-semibold text-muted-foreground mt-1">{stat.label}</p>
              </Card>
            </motion.div>
          );
        })}
      </div>

      {/* Feedback */}
      <Card className="border border-border rounded-2xl p-8 bg-card">
        <div className="space-y-4">
          <h3 className="text-xl font-bold text-foreground flex items-center gap-2">
            <CheckCircle2 className="w-6 h-6 text-green-500" />
            Assessment Feedback
          </h3>
          <p className="text-muted-foreground leading-relaxed">
            {score >= 80
              ? "Great job! You've demonstrated a solid understanding of the material. Keep practicing to reinforce your knowledge."
              : score >= 60
              ? "Good effort! Review the areas where you struggled and try the assessment again to improve your score."
              : "Keep studying! Review the lesson materials and take the assessment again when you're ready."}
          </p>
        </div>
      </Card>

      {/* Performance Breakdown */}
      <Card className="border border-border rounded-2xl p-8 bg-card">
        <h3 className="text-lg font-bold text-foreground mb-6">Performance Breakdown</h3>
        <div className="space-y-4">
          {[
            { category: 'Accuracy', percentage: score, color: 'from-blue-500 to-cyan-500' },
            { category: 'Speed', percentage: Math.min(100, (timeSpent >= 20 ? 100 : (timeSpent / 20) * 100)), color: 'from-purple-500 to-pink-500' },
            { category: 'Consistency', percentage: Math.min(100, score + 10), color: 'from-green-500 to-emerald-500' }
          ].map((metric, idx) => (
            <div key={idx} className="space-y-2">
              <div className="flex justify-between items-center">
                <p className="font-semibold text-foreground">{metric.category}</p>
                <p className="font-bold text-primary">{Math.round(metric.percentage)}%</p>
              </div>
              <div className="h-2 bg-muted rounded-full overflow-hidden">
                <motion.div
                  initial={{ width: 0 }}
                  animate={{ width: `${metric.percentage}%` }}
                  transition={{ delay: 0.7 + idx * 0.1, duration: 0.6 }}
                  className={`h-full bg-gradient-to-r ${metric.color}`}
                ></motion.div>
              </div>
            </div>
          ))}
        </div>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-4 pt-4">
        {score < 80 && onRetry && (
          <Button
            onClick={onRetry}
            variant="outline"
            className="flex-1 font-bold py-6 text-base rounded-xl"
          >
            Try Again
          </Button>
        )}
        {onContinue && (
          <Button
            onClick={onContinue}
            className="flex-1 bg-gradient-to-r from-primary to-secondary text-primary-foreground font-bold py-6 text-base rounded-xl hover:shadow-lg"
          >
            {score >= 80 ? 'Continue to Next Lesson' : 'Continue Anyway'}
          </Button>
        )}
      </div>
    </div>
  );
};

export default AssessmentResults;
