import React, { useState } from 'react';
import { CheckCircle2, XCircle, Info, HelpCircle } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface QuizProps {
  quizData?: {
    question: string;
    options: string[];
    correct_answer: number;
    explanation: string;
  };
  onComplete: (score: number) => void;
}

const Quiz: React.FC<QuizProps> = ({ 
  quizData,
  onComplete 
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
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 space-y-8 shadow-2xl">
      <div className="flex items-center gap-4 text-primary">
        <div className="w-10 h-10 bg-primary/10 rounded-xl flex items-center justify-center">
          <HelpCircle className="w-6 h-6" />
        </div>
        <h3 className="text-xl font-bold text-white leading-tight">{quizData.question}</h3>
      </div>

      <div className="grid grid-cols-1 gap-4">
        {quizData.options.map((option, idx) => {
          let stateStyles = "border-slate-800 bg-slate-800/50 hover:border-slate-700 text-slate-300";
          
          if (isAnswered) {
            if (idx === quizData.correct_answer) {
              stateStyles = "border-emerald-500 bg-emerald-500/10 text-emerald-400";
            } else if (idx === selectedOption) {
              stateStyles = "border-red-500 bg-red-500/10 text-red-400";
            } else {
              stateStyles = "border-slate-800 opacity-40 text-slate-500";
            }
          }

          return (
            <button
              key={idx}
              onClick={() => handleCheck(idx)}
              disabled={isAnswered}
              className={`w-full p-5 text-left rounded-2xl border-2 font-bold transition-all duration-300 flex items-center justify-between group ${stateStyles}`}
            >
              <span>{option}</span>
              {isAnswered && idx === quizData.correct_answer && <CheckCircle2 className="w-5 h-5" />}
              {isAnswered && idx === selectedOption && !isCorrect && <XCircle className="w-5 h-5" />}
            </button>
          );
        })}
      </div>

      <AnimatePresence>
        {isAnswered && (
          <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className={`p-6 rounded-2xl border flex gap-4 ${isCorrect ? 'bg-emerald-500/5 border-emerald-500/20' : 'bg-red-500/5 border-red-500/20'}`}
          >
            <Info className={`w-5 h-5 shrink-0 mt-0.5 ${isCorrect ? 'text-emerald-500' : 'text-red-500'}`} />
            <div className="space-y-1">
              <p className={`font-bold ${isCorrect ? 'text-emerald-400' : 'text-red-400'}`}>
                {isCorrect ? 'Correct Answer!' : 'Not Quite Right'}
              </p>
              <p className="text-slate-400 text-sm leading-relaxed">{quizData.explanation}</p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Quiz;