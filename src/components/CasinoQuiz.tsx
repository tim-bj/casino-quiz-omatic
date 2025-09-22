import { useState, useEffect, useCallback } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { questions } from "@/data/questions";
import { QuizState, QuizStats } from "@/types/quiz";
import { useToast } from "@/components/ui/use-toast";
import { Shuffle, Play, RotateCcw, Trophy, Timer, Target } from "lucide-react";
import LootboxQuestion from "@/components/LootboxQuestion";

const CasinoQuiz = () => {
  const { toast } = useToast();
  
  const [quizState, setQuizState] = useState<QuizState>({
    currentQuestionIndex: 0,
    score: 0,
    answeredQuestions: [],
    selectedAnswer: null,
    showResult: false,
    timeLeft: 30,
    isGameStarted: false,
    isGameFinished: false,
  });

  const [shuffledQuestions, setShuffledQuestions] = useState(questions);
  const [stats, setStats] = useState<QuizStats>({
    totalQuestions: 0,
    correctAnswers: 0,
    wrongAnswers: 0,
    percentage: 0,
    timeSpent: 0,
  });

  const [isShowingLootbox, setIsShowingLootbox] = useState(false);
  const [isRevealing, setIsRevealing] = useState(false);

  // Shuffle questions casino-style
  const shuffleQuestions = useCallback(() => {
    const shuffled = [...questions].sort(() => Math.random() - 0.5);
    setShuffledQuestions(shuffled);
    toast({
      title: "🎰 Preguntes barrejades!",
      description: "Les cartes s'han repartit. Que comenci el joc!",
    });
  }, [toast]);

  // Timer effect
  useEffect(() => {
    if (quizState.isGameStarted && !quizState.isGameFinished && quizState.timeLeft > 0 && !isShowingLootbox) {
      const timer = setTimeout(() => {
        setQuizState(prev => ({ ...prev, timeLeft: prev.timeLeft - 1 }));
      }, 1000);
      return () => clearTimeout(timer);
    } else if (quizState.timeLeft === 0 && !quizState.showResult && !isShowingLootbox) {
      handleNextQuestion();
    }
  }, [quizState.timeLeft, quizState.isGameStarted, quizState.isGameFinished, isShowingLootbox]);

  const startGame = () => {
    shuffleQuestions();
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      answeredQuestions: [],
      selectedAnswer: null,
      showResult: false,
      timeLeft: 30,
      isGameStarted: true,
      isGameFinished: false,
    });
    setIsShowingLootbox(true);
    setIsRevealing(true);
    
    setTimeout(() => {
      setIsShowingLootbox(false);
      setIsRevealing(false);
    }, 4500);
  };

  const selectAnswer = (answerIndex: number) => {
    if (quizState.selectedAnswer !== null) return;
    
    setQuizState(prev => ({ ...prev, selectedAnswer: answerIndex }));
    
    const currentQuestion = shuffledQuestions[quizState.currentQuestionIndex];
    const isCorrect = answerIndex === currentQuestion.correctAnswer;
    
    if (isCorrect) {
      toast({
        title: "🎉 Correcte!",
        description: currentQuestion.explanation || "Bona resposta!",
        className: "winner-glow",
      });
      setQuizState(prev => ({ ...prev, score: prev.score + 1 }));
    } else {
      toast({
        title: "❌ Incorrecte",
        description: `La resposta correcta era: ${currentQuestion.options[currentQuestion.correctAnswer]}`,
        variant: "destructive",
      });
    }

    setTimeout(() => {
      handleNextQuestion();
    }, 2000);
  };

  const handleNextQuestion = () => {
    const nextIndex = quizState.currentQuestionIndex + 1;
    
    if (nextIndex >= 20) {
      // Game finished
      const finalStats: QuizStats = {
        totalQuestions: 20,
        correctAnswers: quizState.score + (quizState.selectedAnswer === shuffledQuestions[quizState.currentQuestionIndex]?.correctAnswer ? 1 : 0),
        wrongAnswers: 20 - (quizState.score + (quizState.selectedAnswer === shuffledQuestions[quizState.currentQuestionIndex]?.correctAnswer ? 1 : 0)),
        percentage: ((quizState.score + (quizState.selectedAnswer === shuffledQuestions[quizState.currentQuestionIndex]?.correctAnswer ? 1 : 0)) / 20) * 100,
        timeSpent: (20 - quizState.currentQuestionIndex) * 30,
      };
      
      setStats(finalStats);
      setQuizState(prev => ({ 
        ...prev, 
        isGameFinished: true,
        currentQuestionIndex: nextIndex 
      }));
      
      toast({
        title: "🏆 Joc completat!",
        description: `Has aconseguit ${finalStats.correctAnswers}/20 respostes correctes (${finalStats.percentage.toFixed(1)}%)`,
        className: finalStats.percentage >= 70 ? "winner-glow" : "",
      });
    } else {
      // Show lootbox for next question
      setIsShowingLootbox(true);
      setIsRevealing(true);
      
      setTimeout(() => {
        setQuizState(prev => ({
          ...prev,
          currentQuestionIndex: nextIndex,
          selectedAnswer: null,
          timeLeft: 30,
        }));
      }, 3500);
      
      setTimeout(() => {
        setIsShowingLootbox(false);
        setIsRevealing(false);
      }, 4500);
    }
  };

  const resetGame = () => {
    setQuizState({
      currentQuestionIndex: 0,
      score: 0,
      answeredQuestions: [],
      selectedAnswer: null,
      showResult: false,
      timeLeft: 30,
      isGameStarted: false,
      isGameFinished: false,
    });
    setIsShowingLootbox(false);
    setIsRevealing(false);
  };

  const currentQuestion = shuffledQuestions[quizState.currentQuestionIndex];
  const progress = ((quizState.currentQuestionIndex + 1) / 20) * 100;

  // Show lootbox animation
  if (isShowingLootbox && currentQuestion) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <LootboxQuestion 
          question={currentQuestion}
          onReveal={() => {}}
          isRevealing={isRevealing}
        />
      </div>
    );
  }

  if (!quizState.isGameStarted) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl casino-glow">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold bg-gradient-casino bg-clip-text text-transparent mb-4">
              🎰 Quiz Casino de Programació
            </CardTitle>
            <p className="text-lg text-muted-foreground">
              Test interactiu de 20 preguntes sobre fonaments de programació
            </p>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid gap-4 text-center">
              <div className="flex items-center justify-center gap-4">
                <Badge variant="secondary" className="text-lg p-2">
                  <Target className="w-4 h-4 mr-1" />
                  20 preguntes
                </Badge>
                <Badge variant="secondary" className="text-lg p-2">
                  <Timer className="w-4 h-4 mr-1" />
                  30s per pregunta
                </Badge>
              </div>
              
              <div className="space-y-2">
                <Button 
                  variant="casino" 
                  size="casino" 
                  onClick={startGame}
                  className="w-full"
                >
                  <Play className="w-6 h-6 mr-2" />
                  Obrir Lootbox
                </Button>
                
                <Button 
                  variant="gold" 
                  size="lg" 
                  onClick={shuffleQuestions}
                  className="w-full"
                >
                  <Shuffle className="w-5 h-5 mr-2" />
                  Barrejar Preguntes
                </Button>
              </div>
            </div>

            <div className="bg-muted/50 p-4 rounded-lg">
              <h3 className="font-semibold mb-2">📚 Temari del quiz:</h3>
              <ul className="text-sm text-muted-foreground space-y-1">
                <li>• Introducció a la programació</li>
                <li>• Llenguatges de programació (baix, intermig, alt nivell)</li>
                <li>• Compiladors, assembladors i intèrprets</li>
                <li>• Fases de desenvolupament de programes</li>
                <li>• Variables i tipus de dades</li>
                <li>• Diagrames de flux i algorismes</li>
              </ul>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  if (quizState.isGameFinished) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4">
        <Card className={`w-full max-w-2xl ${stats.percentage >= 70 ? 'winner-glow winner-pulse' : 'casino-glow'}`}>
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold mb-4">
              {stats.percentage >= 90 ? "🏆 PERFECTE!" : 
               stats.percentage >= 70 ? "🎉 MOLT BÉ!" : 
               stats.percentage >= 50 ? "👍 APROVAT" : "💪 SEGUEIX PRACTICANT"}
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="text-center space-y-4">
              <div className="text-6xl font-bold bg-gradient-winner bg-clip-text text-transparent">
                {stats.correctAnswers}/20
              </div>
              <div className="text-2xl font-semibold">
                {stats.percentage.toFixed(1)}% de correctes
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-success/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-success">{stats.correctAnswers}</div>
                <div className="text-sm text-muted-foreground">Correctes</div>
              </div>
              <div className="bg-destructive/20 p-4 rounded-lg text-center">
                <div className="text-2xl font-bold text-destructive">{stats.wrongAnswers}</div>
                <div className="text-sm text-muted-foreground">Incorrectes</div>
              </div>
            </div>

            <div className="space-y-2">
              <Button 
                variant="casino" 
                size="casino" 
                onClick={resetGame}
                className="w-full"
              >
                <RotateCcw className="w-6 h-6 mr-2" />
                Obrir Nova Lootbox
              </Button>
            </div>

            {stats.percentage >= 70 && (
              <div className="bg-success/10 p-4 rounded-lg text-center">
                <Trophy className="w-8 h-8 text-success mx-auto mb-2" />
                <p className="text-success font-semibold">
                  Excel·lent coneixement dels fonaments de programació! 🎊
                </p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <Card className="w-full max-w-3xl casino-glow">
        <CardHeader>
          <div className="flex justify-between items-center mb-4">
            <Badge variant="secondary" className="text-lg">
              Pregunta {quizState.currentQuestionIndex + 1}/20
            </Badge>
            <Badge variant={quizState.timeLeft <= 10 ? "destructive" : "secondary"} className="text-lg">
              <Timer className="w-4 h-4 mr-1" />
              {quizState.timeLeft}s
            </Badge>
          </div>
          
          <Progress value={progress} className="h-3 mb-4" />
          
          <div className="flex justify-between text-sm text-muted-foreground mb-4">
            <span>Puntuació: {quizState.score}/{quizState.currentQuestionIndex}</span>
            <Badge variant="outline">{currentQuestion.category}</Badge>
          </div>
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="lootbox-reveal">
            <h2 className="text-2xl font-bold mb-6">{currentQuestion.question}</h2>
          </div>

          <div className="grid gap-3">
            {currentQuestion.options.map((option, index) => (
              <Button
                key={index}
                variant={
                  quizState.selectedAnswer === index
                    ? index === currentQuestion.correctAnswer
                      ? "winner"
                      : "destructive"
                    : quizState.selectedAnswer !== null && index === currentQuestion.correctAnswer
                    ? "winner"
                    : "slot"
                }
                size="lg"
                onClick={() => selectAnswer(index)}
                disabled={quizState.selectedAnswer !== null}
                className={`text-left justify-start p-4 text-wrap h-auto ${
                  quizState.selectedAnswer === index ? 'casino-spin' : ''
                }`}
              >
                <span className="mr-3 font-bold">
                  {String.fromCharCode(65 + index)}.
                </span>
                {option}
              </Button>
            ))}
          </div>

          {quizState.selectedAnswer !== null && (
            <div className="text-center text-muted-foreground">
              Preparant la següent lootbox...
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default CasinoQuiz;