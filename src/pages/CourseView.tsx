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
      <header className="border-b border-border bg-card sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4 h-16 flex items-center justify-between">
          <Button variant="ghost" size="sm" onClick={() => navigate("/courses")} className="text-muted-foreground hover:text-foreground">
            <ArrowLeft className="h-4 w-4 mr-2" />
            Back to Courses
          </Button>
          <div className="flex-1 max-w-sm mx-6 hidden md:block">
            <div className="flex justify-between mb-2 text-xs font-semibold text-muted-foreground">
              <span>Progress</span>
              <span className="text-primary">{Math.round(progress)}%</span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-gradient-to-r from-primary to-secondary transition-all duration-300"
                style={{ width: `${progress}%` }}
              ></div>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2 px-4 py-2 bg-primary/10 rounded-lg">
              <Trophy className="h-5 w-5 text-primary" />
              <span className="font-bold text-primary text-sm">{course.total_xp || 2500} XP</span>
            </div>
          </div>
        </div>
      </header>

      <main className="flex-1 container mx-auto px-4 py-8 flex flex-col md:flex-row gap-8">
        <aside className="w-full md:w-96 space-y-4">
          <div className="bg-card rounded-2xl border border-border p-6 shadow-sm sticky top-24">
            <h2 className="font-bold text-lg mb-6 flex items-center gap-2 text-foreground">
              <Play className="h-5 w-5 text-primary fill-primary" />
              Course Lessons
            </h2>
            <div className="space-y-6 max-h-[calc(100vh-200px)] overflow-y-auto">
              {course.modules.map((mod, mIdx) => (
                <div key={mod.id}>
                  <div className="flex items-center gap-2 mb-3">
                    <div className="h-1 w-1 rounded-full bg-primary"></div>
                    <h3 className="text-xs font-bold uppercase tracking-wider text-primary">Module {mIdx + 1}</h3>
                  </div>
                  <h4 className="text-sm font-bold text-foreground mb-2">{mod.title}</h4>
                  <div className="space-y-2">
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
                          className={`w-full text-left p-3 rounded-xl text-sm flex items-center gap-3 transition-all ${
                            isActive 
                              ? "bg-primary text-primary-foreground font-semibold shadow-md" 
                              : isCompleted
                              ? "bg-green-500/10 text-foreground hover:bg-green-500/20"
                              : "bg-muted/50 text-muted-foreground hover:bg-muted"
                          }`}
                        >
                          {isCompleted ? (
                            <CheckCircle2 className="h-4 w-4 text-green-500 flex-shrink-0" />
                          ) : isActive ? (
                            <div className="h-4 w-4 rounded-full border-2 border-current border-t-transparent animate-spin flex-shrink-0" />
                          ) : (
                            <div className="h-4 w-4 rounded-full border-2 border-muted-foreground/20 flex-shrink-0" />
                          )}
                          <span className="truncate text-left">{lesson.title}</span>
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
                <div className="space-y-8">
                  <div className="space-y-4">
                    <p className="text-xl text-foreground leading-relaxed font-medium">
                      {typeof currentLesson.content === 'string' 
                        ? currentLesson.content 
                        : currentLesson.content.explanation}
                    </p>
                  </div>

                  {currentLesson.code_example && (
                    <Card className="border-l-4 border-l-primary bg-slate-950 overflow-hidden shadow-lg">
                      <CardContent className="p-0">
                        <div className="bg-slate-900 px-6 py-3 flex items-center justify-between">
                          <span className="text-sm font-bold text-slate-300 flex items-center gap-2">
                            <Code className="h-4 w-4" />
                            Code Example
                          </span>
                          <span className="text-xs font-bold text-primary uppercase tracking-wider">{currentLesson.code_example.language}</span>
                        </div>
                        <div className="p-6 border-t border-slate-800">
                          <pre className="font-mono text-sm text-slate-100 overflow-x-auto">
                            <code>{currentLesson.code_example.code}</code>
                          </pre>
                        </div>
                        <div className="bg-slate-900 p-4 border-t border-slate-800">
                          <p className="text-sm text-slate-300 flex items-start gap-3">
                            <Lightbulb className="h-5 w-5 text-yellow-500 shrink-0 mt-0.5" />
                            <span>{currentLesson.code_example.explanation}</span>
                          </p>
                        </div>
                      </CardContent>
                    </Card>
                  )}

                  <div className="bg-primary/5 border border-primary/20 rounded-xl p-6 flex gap-4">
                    <div className="h-10 w-10 rounded-lg bg-primary/20 flex items-center justify-center flex-shrink-0">
                      <Lightbulb className="h-6 w-6 text-primary" />
                    </div>
                    <div>
                      <h4 className="font-bold text-foreground mb-1">Key Takeaway</h4>
                      <p className="text-sm text-muted-foreground">Master this concept before moving to the next lesson. Understanding fundamentals is crucial for your coding journey.</p>
                    </div>
                  </div>
                </div>
              )}

              {currentLesson.type === "practice" && (
                <div className="space-y-6">
                  <div className="bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-blue-500/20 p-6 rounded-xl flex gap-4">
                    <div className="h-12 w-12 rounded-lg bg-blue-500/20 flex items-center justify-center flex-shrink-0">
                      <Code className="h-6 w-6 text-blue-500" />
                    </div>
                    <div>
                      <h4 className="font-bold text-blue-500 mb-1">Practice Task</h4>
                      <p className="text-foreground">{currentLesson.practice_task?.instruction}</p>
                      {currentLesson.practice_task?.hint && (
                        <p className="text-xs text-muted-foreground mt-2 font-medium">💡 Hint: {currentLesson.practice_task.hint}</p>
                      )}
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <label className="text-sm font-bold text-foreground">Code Editor</label>
                    <div className="h-[450px] border border-border rounded-xl overflow-hidden shadow-lg bg-slate-950">
                      <CodeEditor 
                        initialCode={currentLesson.practice_task?.initial_code || ""}
                        language={currentLesson.code_example?.language || "javascript"}
                      />
                    </div>
                  </div>
                  
                  <div className="flex flex-col sm:flex-row justify-between items-center gap-4 bg-card p-6 rounded-xl border border-border">
                    <div className="text-sm font-semibold">
                      {showCodeFeedback === true && (
                        <span className="text-green-500 flex items-center gap-2">
                          <CheckCircle2 className="h-5 w-5" /> Correct! Great job!
                        </span>
                      )}
                      {showCodeFeedback === false && (
                        <span className="text-orange-500 flex items-center gap-2">
                          Not quite right. Keep trying!
                        </span>
                      )}
                    </div>
                    <Button onClick={() => handleCodeSubmit("completed")} className="bg-primary hover:bg-primary/90 text-primary-foreground font-bold">
                      Check Solution
                    </Button>
                  </div>
                </div>
              )}

              {currentLesson.type === "quiz" && (
                <div className="max-w-2xl mx-auto py-12">
                  <div className="text-center mb-12">
                    <div className="h-20 w-20 bg-gradient-to-br from-primary/20 to-secondary/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg">
                      <MessageCircle className="h-10 w-10 text-primary" />
                    </div>
                    <h2 className="text-3xl font-black text-foreground mb-2">Knowledge Check</h2>
                    <p className="text-muted-foreground">Test your understanding of the concepts you just learned</p>
                  </div>
                  <div className="bg-card border border-border rounded-2xl p-8">
                    <Quiz 
                      quizData={currentLesson.quiz} 
                      onComplete={handleQuizComplete}
                    />
                  </div>
                </div>
              )}

              <div className="pt-12 flex items-center justify-between border-t border-border">
                <Button 
                  variant="outline" 
                  onClick={handlePrevious}
                  disabled={currentModuleIndex === 0 && currentLessonIndex === 0}
                  className="font-bold"
                >
                  <ChevronLeft className="h-4 w-4 mr-2" />
                  Previous Lesson
                </Button>
                <Button 
                  onClick={handleNext}
                  className="bg-gradient-to-r from-primary to-secondary hover:shadow-lg text-primary-foreground font-bold px-8"
                >
                  {currentModuleIndex === course.modules.length - 1 && currentLessonIndex === (currentModule?.lessons?.length || 0) - 1 
                    ? "Finish Course" 
                    : "Next Lesson"}
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
