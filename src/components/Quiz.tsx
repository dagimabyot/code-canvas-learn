import React, { useState } from 'react';
import { CheckCircle2, XCircle, Info, HelpCircle, Lightbulb } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizProps {
  quizData?: {
    question: string;
    options: string[];
    correct_answer: number;
    explanation: string;
  };
  onComplete: (score: number) => void;
  currentQuestion?: number;
  totalQuestions?: number;
}

const Quiz: React.FC<QuizProps> = ({ 
  quizData,
  onComplete,
  currentQuestion = 1,
  totalQuestions = 1
}) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  if (!quizData) return null;

  const handleCheck = (idx: number) => {
    if (isAnswered) return;
    
    setSelectedOption(idx);
    setIsAnswered(true);
    
    const correct = idx === quizData.correct_answer;
    setIsCorrect(correct);
    onComplete(correct ? 100 : 0);
  };

  return (
    <div className="space-y-6">
      {/* Progress bar */}
      <div className="space-y-2">
        <div className="flex justify-between items-center text-sm">
          <span className="text-muted-foreground font-semibold">Question {currentQuestion} of {totalQuestions}</span>
          <span className="font-bold text-primary">{Math.round((currentQuestion / totalQuestions) * 100)}%</span>
        </div>
        <div className="h-2 bg-muted rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
            style={{ width: `${(currentQuestion / totalQuestions) * 100}%` }}
          ></div>
        </div>
      </div>

      {/* Question */}
      <div className="bg-card border border-border rounded-2xl p-6 space-y-4">
        <div className="flex items-start gap-4">
          <div className="w-10 h-10 bg-primary/20 rounded-lg flex items-center justify-center flex-shrink-0 mt-1">
            <HelpCircle className="w-6 h-6 text-primary" />
          </div>
          <h3 className="text-lg font-bold text-foreground leading-relaxed">{quizData.question}</h3>
        </div>
      </div>

      {/* Options */}
      <div className="grid grid-cols-1 gap-3">
        {quizData.options.map((option, idx) => {
          let stateStyles = "border-border bg-muted/30 hover:border-primary/30 text-foreground";
          
          if (isAnswered) {
            if (idx === quizData.correct_answer) {
              stateStyles = "border-green-500/50 bg-green-500/10 text-foreground border-2";
            } else if (idx === selectedOption) {
              stateStyles = "border-red-500/50 bg-red-500/10 text-foreground border-2";
            } else {
              stateStyles = "border-border opacity-40 text-muted-foreground";
            }
          }

          return (
            <motion.button
              key={idx}
              onClick={() => handleCheck(idx)}
              disabled={isAnswered}
              whileHover={!isAnswered ? { scale: 1.02, x: 4 } : {}}
              whileTap={!isAnswered ? { scale: 0.98 } : {}}
              className={`w-full p-4 text-left rounded-xl border-2 font-semibold transition-all duration-300 flex items-center justify-between gap-3 cursor-pointer ${stateStyles}`}
            >
              <span className="flex items-center gap-3 flex-1">
                <div className={`w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 ${
                  idx === selectedOption && isAnswered 
                    ? 'border-current bg-current' 
                    : 'border-current/30'
                }`}>
                  {idx === selectedOption && isAnswered && (
                    <div className="w-2 h-2 rounded-full bg-background"></div>
                  )}
                </div>
                {option}
              </span>
              {isAnswered && idx === quizData.correct_answer && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <CheckCircle2 className="w-5 h-5 text-green-500 flex-shrink-0" />
                </motion.div>
              )}
              {isAnswered && idx === selectedOption && !isCorrect && (
                <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }}>
                  <XCircle className="w-5 h-5 text-red-500 flex-shrink-0" />
                </motion.div>
              )}
            </motion.button>
          );
        })}
      </div>

      {/* Explanation */}
      <AnimatePresence>
        {isAnswered && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-xl border-2 flex gap-4 ${isCorrect ? 'bg-green-500/5 border-green-500/30' : 'bg-orange-500/5 border-orange-500/30'}`}
          >
            <div className="flex-shrink-0 mt-1">
              {isCorrect ? (
                <CheckCircle2 className="w-6 h-6 text-green-500" />
              ) : (
                <Lightbulb className="w-6 h-6 text-orange-500" />
              )}
            </div>
            <div className="space-y-2">
              <p className={`font-bold text-sm ${isCorrect ? 'text-green-600 dark:text-green-400' : 'text-orange-600 dark:text-orange-400'}`}>
                {isCorrect ? 'Excellent! That is correct.' : 'Not quite right. Here\'s why:'}
              </p>
              <p className="text-foreground text-sm leading-relaxed">{quizData.explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;
