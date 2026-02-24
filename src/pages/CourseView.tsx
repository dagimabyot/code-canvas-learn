import React, { useState, useMemo } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ArrowLeft, 
  CheckCircle2, 
  ChevronRight, 
  ChevronLeft, 
  Lightbulb, 
  Play, 
  Trophy, 
  MessageCircle,
  Code
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import CodeEditor from '@/components/CodeEditor';
import Quiz from '@/components/Quiz';
import { mockCourses } from '@/data/mockData';
import { toast } from 'sonner';

export default function CourseView() {
  const { courseId } = useParams();
  const navigate = useNavigate();
  const course = mockCourses.find(c => c.id === courseId);

  const [currentModuleIndex, setCurrentModuleIndex] = useState(0);
  const [currentLessonIndex, setCurrentLessonIndex] = useState(0);
  const [completedLessons, setCompletedLessons] = useState<string[]>([]);
  const [showCodeFeedback, setShowCodeFeedback] = useState<null | boolean>(null);

  if (!course) {
    return <div className="p-8 text-center">Course not found</div>;
  }

  const currentModule = course.modules[currentModuleIndex];
  const currentLesson = currentModule?.lessons?.[currentLessonIndex];

  const totalLessons = useMemo(() => {
    return course.modules.reduce((acc, mod) => acc + (mod.lessons?.length || 0), 0);
  }, [course]);

  const progress = totalLessons > 0 ? (completedLessons.length / totalLessons) * 100 : 0;

  const handleNext = () => {
    if (!currentModule) return;
    if (currentLessonIndex < currentModule.lessons.length - 1) {
      setCurrentLessonIndex(prev => prev + 1);
      setShowCodeFeedback(null);
    } else if (currentModuleIndex < course.modules.length - 1) {
      setCurrentModuleIndex(prev => prev + 1);
      setCurrentLessonIndex(0);
      setShowCodeFeedback(null);
    } else {
      toast.success("Congratulations! You finished the course!");
      navigate("/profile");
    }
  };

  const handlePrevious = () => {
    if (currentLessonIndex > 0) {
      setCurrentLessonIndex(prev => prev - 1);
      setShowCodeFeedback(null);
    } else if (currentModuleIndex > 0) {
      const prevModule = course.modules[currentModuleIndex - 1];
      setCurrentModuleIndex(prev => prev - 1);
      setCurrentLessonIndex(prevModule.lessons.length - 1);
      setShowCodeFeedback(null);
    }
  };

  const markCompleted = (lessonId: string) => {
    if (!completedLessons.includes(lessonId)) {
      setCompletedLessons(prev => [...prev, lessonId]);
      toast.success("Lesson completed! +50 XP");
    }
  };

  const handleCodeSubmit = (code: string) => {
    if (!currentLesson?.practice_task) return;
    
    if (code.includes(currentLesson.practice_task.solution) || code.length > 5) {
      setShowCodeFeedback(true);
      markCompleted(currentLesson.id);
    } else {
      setShowCodeFeedback(false);
      toast.error("Code doesn't match the requirements. Try again!");
    }
  };

  const handleQuizComplete = (score: number) => {
    if (score >= 80) {
      markCompleted(currentLesson?.id || "");
      toast.success("Quiz passed!");
    }
  };

  if (!currentLesson) {
    return (
      <div className="p-8 text-center">
        <p>No lesson available in this module.</p>
        <Button onClick={() => navigate("/")} className="mt-4">Back to Courses</Button>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col">
      <header className="border-b bg-card sticky top-0 z-50">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate("/")}>
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Catalog
          </Button>
          <div className="flex-1 max-w-md mx-4 hidden md:block">
            <div className="flex justify-between mb-1 text-xs text-muted-foreground">
              <span>Overall Progress</span>
              <span>{Math.round(progress)}%</span>
            </div>
            <Progress value={progress} className="h-2" />
          </div>
          <div className="flex items-center gap-2">
            <Trophy className="h-5 w-5 text-yellow-500" />
            <span className="font-bold text-primary">{course.total_xp} XP</span>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-80 space-y-4">
          <div className="bg-card rounded-xl border p-4">
            <h2 className="font-bold mb-4 flex items-center gap-2">
              <Play className="h-4 w-4 text-primary fill-primary" />
              Course Structure
            </h2>
            <div className="space-y-6">
              {course.modules.map((mod, mIdx) => (
                <div key={mod.id}>
                  <h3 className="text-sm font-semibold mb-2">Module {mIdx + 1}: {mod.title}</h3>
                  <div className="space-y-1">
                    {mod.lessons?.map((lesson, lIdx) => {
                      const isActive = mIdx === currentModuleIndex && lIdx === currentLessonIndex;
                      const isCompleted = completedLessons.includes(lesson.id);
                      return (
                        <button
                          key={lesson.id}
                          onClick={() => {
                            setCurrentModuleIndex(mIdx);
                            setCurrentLessonIndex(lIdx);
                          }}
                          className={`w-full text-left p-2 rounded-lg text-sm flex items-center gap-2 transition-colors ${
                            isActive 
                              ? "bg-primary/10 text-primary font-medium" 
                              : "hover:bg-accent"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500" />
                          ) : isActive ? (
                            <div className="h-4 w-4 rounded-full border-2 border-primary border-t-transparent animate-spin" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border" />
                          )}
                          <span className="truncate">{lesson.title}</span>
                        </button>
                      );
                    })}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </aside>

        <div className="flex-1 max-w-3xl">
          <AnimatePresence mode="wait">
            <motion.div
              key={currentLesson.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.2 }}
              className="space-y-6"
            >
              <div className="space-y-2">
                <Badge variant="outline" className="text-primary border-primary">
                  {currentModule.title}
                </Badge>
                <h1 className="text-3xl font-bold">{currentLesson.title}</h1>
              </div>

              {currentLesson.type === "explanation" && (
                <div className="space-y-6">
                  <div className="prose dark:prose-invert max-w-none">
                    <p className="text-lg text-muted-foreground leading-relaxed">
                      {typeof currentLesson.content === 'string' 
                        ? currentLesson.content 
                        : currentLesson.content.explanation}
                    </p>
                  </div>

                  {currentLesson.code_example && (
                    <Card className="border-l-4 border-l-primary bg-slate-900 overflow-hidden">
                      <CardContent className="p-0">
                        <div className="bg-slate-800 px-4 py-2 flex items-center justify-between text-[10px] text-slate-400 font-mono">
                          <span>Example</span>
                          <span className="uppercase">{currentLesson.code_example.language}</span>
                        </div>
                        <div className="p-6">
                          <pre className="font-mono text-sm text-slate-100">
                            <code>{currentLesson.code_example.code}</code>
                          </pre>
                        </div>
                        <div className="bg-slate-950 p-4 border-t border-slate-800">
                          <p className="text-sm text-slate-300 italic flex items-center gap-2">
                            <Lightbulb className="h-4 w-4 text-yellow-500 shrink-0" />
                            {currentLesson.code_example.explanation}
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}
                </div>
              )}

              {currentLesson.type === "practice" && (
                <div className="space-y-6">
                  <div className="bg-blue-500/10 border border-blue-500/20 p-4 rounded-xl flex gap-3">
                    <Code className="h-5 w-5 text-blue-500 mt-1" />
                    <div>
                      <h4 className="font-bold text-blue-500">Practice Task</h4>
                      <p className="text-sm">{currentLesson.practice_task?.instruction}</p>
                    </div>
                  </div>
                  
                  <div className="h-[400px] border rounded-xl overflow-hidden shadow-lg">
                    <CodeEditor 
                      initialCode={currentLesson.practice_task?.initial_code || ""}
                      language={currentLesson.code_example?.language || "javascript"}
                    />
                  </div>
                  
                  <div className="flex justify-between items-center bg-card p-4 rounded-xl border">
                    <div className="text-sm text-muted-foreground">
                      {showCodeFeedback === true && (
                        <span className="text-green-500 flex items-center gap-1">
                          <CheckCircle2 className="h-4 w-4" /> Correct! Moving to next lesson.
                        </span>
                      )}
                    </div>
                    <Button onClick={() => handleCodeSubmit("completed")}>
                      Check Solution
                    </Button>
                  </div>
                </div>
              )}

              {currentLesson.type === "quiz" && (
                <div className="max-w-xl mx-auto py-8">
                  <div className="text-center mb-8">
                    <div className="h-16 w-16 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                      <MessageCircle className="h-8 w-8 text-primary" />
                    </div>
                    <h2 className="text-2xl font-bold">Knowledge Check</h2>
                  </div>
                  <Quiz 
                    quizData={currentLesson.quiz} 
                    onComplete={handleQuizComplete}
                  />
                </div>
              )}

              <div className="pt-10 flex items-center justify-between border-t">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={currentModuleIndex === 0 && currentLessonIndex === 0}
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous
                </Button>
                <Button 
                  onClick={handleNext}
                  className="bg-primary hover:bg-primary/90"
                >
                  {currentModuleIndex === course.modules.length - 1 && currentLessonIndex === (currentModule?.lessons?.length || 0) - 1 
                    ? "Finish Course" 
                    : "Continue"}
                  <ChevronRight className="h-4 w-4 ml-2" />
                </Button>
              </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </main>
    </div>
  );
}