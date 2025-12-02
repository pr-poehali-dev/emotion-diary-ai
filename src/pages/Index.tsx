import { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Progress } from '@/components/ui/progress';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from '@/components/ui/dialog';
import Icon from '@/components/ui/icon';

interface Entry {
  id: number;
  date: string;
  emotion: string;
  emotionEmoji: string;
  note: string;
  intensity: number;
  triggers?: string[];
}

interface Trigger {
  name: string;
  count: number;
  color: string;
}

const Index = () => {
  const [currentEmotion, setCurrentEmotion] = useState('');
  const [currentNote, setCurrentNote] = useState('');
  const [currentIntensity, setCurrentIntensity] = useState(5);
  const [currentTriggers, setCurrentTriggers] = useState<string[]>([]);
  const [selectedTrigger, setSelectedTrigger] = useState<string | null>(null);
  const [entries, setEntries] = useState<Entry[]>([
    {
      id: 1,
      date: '2025-12-01',
      emotion: 'Радость',
      emotionEmoji: '😊',
      note: 'Получил пятёрку по математике, учитель похвалил перед классом!',
      intensity: 8,
      triggers: ['Учёба']
    },
    {
      id: 2,
      date: '2025-11-30',
      emotion: 'Тревога',
      emotionEmoji: '😰',
      note: 'Завтра контрольная по химии, боюсь не справиться',
      intensity: 6,
      triggers: ['Учёба']
    },
    {
      id: 3,
      date: '2025-11-29',
      emotion: 'Грусть',
      emotionEmoji: '😢',
      note: 'Поссорился с лучшим другом, обидно и грустно',
      intensity: 7,
      triggers: ['Друзья']
    },
    {
      id: 4,
      date: '2025-11-28',
      emotion: 'Злость',
      emotionEmoji: '😠',
      note: 'Родители не разрешили пойти на вечеринку с одноклассниками',
      intensity: 6,
      triggers: ['Семья', 'Друзья']
    },
    {
      id: 5,
      date: '2025-11-27',
      emotion: 'Воодушевление',
      emotionEmoji: '🤩',
      note: 'Выиграли школьный турнир по баскетболу!',
      intensity: 9,
      triggers: ['Увлечения']
    },
    {
      id: 6,
      date: '2025-11-26',
      emotion: 'Радость',
      emotionEmoji: '😊',
      note: 'Замечательно провели время всей семьёй в парке',
      intensity: 8,
      triggers: ['Семья']
    },
    {
      id: 7,
      date: '2025-11-25',
      emotion: 'Тревога',
      emotionEmoji: '😰',
      note: 'Комплексую из-за прыщей, боюсь насмешек',
      intensity: 5,
      triggers: ['Внешность']
    },
    {
      id: 8,
      date: '2025-11-24',
      emotion: 'Тревога',
      emotionEmoji: '😰',
      note: 'Волнуюсь о выборе профессии и поступлении в вуз',
      intensity: 7,
      triggers: ['Будущее', 'Учёба']
    },
    {
      id: 9,
      date: '2025-11-23',
      emotion: 'Радость',
      emotionEmoji: '😊',
      note: 'Пригласили в команду по KVN, так рад!',
      intensity: 8,
      triggers: ['Увлечения', 'Друзья']
    },
    {
      id: 10,
      date: '2025-11-22',
      emotion: 'Спокойствие',
      emotionEmoji: '😌',
      note: 'Спокойный выходной, почитал любимую книгу',
      intensity: 6,
      triggers: ['Увлечения']
    }
  ]);

  const emotions = [
    { name: 'Радость', emoji: '😊', color: 'bg-emotion-yellow' },
    { name: 'Грусть', emoji: '😢', color: 'bg-emotion-blue' },
    { name: 'Тревога', emoji: '😰', color: 'bg-emotion-peach' },
    { name: 'Злость', emoji: '😠', color: 'bg-emotion-pink' },
    { name: 'Спокойствие', emoji: '😌', color: 'bg-emotion-lavender' },
    { name: 'Воодушевление', emoji: '🤩', color: 'bg-emotion-green' }
  ];

  const triggers: Trigger[] = [
    { name: 'Учёба', count: 8, color: 'bg-emotion-blue' },
    { name: 'Друзья', count: 6, color: 'bg-emotion-pink' },
    { name: 'Семья', count: 5, color: 'bg-emotion-yellow' },
    { name: 'Увлечения', count: 4, color: 'bg-emotion-green' },
    { name: 'Внешность', count: 3, color: 'bg-emotion-lavender' },
    { name: 'Будущее', count: 2, color: 'bg-emotion-peach' }
  ];

  const exercises = [
    { title: 'Дыхательная практика', duration: '5 мин', emoji: '🌬️', description: 'Глубокое дыхание для снижения стресса' },
    { title: 'Медитация благодарности', duration: '10 мин', emoji: '🙏', description: 'Фокус на позитивных моментах дня' },
    { title: 'Прогулка на природе', duration: '20 мин', emoji: '🌳', description: 'Смена обстановки и физическая активность' }
  ];

  const handleSaveEntry = () => {
    if (currentEmotion && currentNote) {
      const emotion = emotions.find(e => e.name === currentEmotion);
      const newEntry: Entry = {
        id: Date.now(),
        date: new Date().toISOString().split('T')[0],
        emotion: currentEmotion,
        emotionEmoji: emotion?.emoji || '😊',
        note: currentNote,
        intensity: currentIntensity,
        triggers: currentTriggers.length > 0 ? currentTriggers : undefined
      };
      setEntries([newEntry, ...entries]);
      setCurrentEmotion('');
      setCurrentNote('');
      setCurrentIntensity(5);
      setCurrentTriggers([]);
    }
  };

  const toggleTrigger = (triggerName: string) => {
    setCurrentTriggers(prev => 
      prev.includes(triggerName)
        ? prev.filter(t => t !== triggerName)
        : [...prev, triggerName]
    );
  };

  const emotionStats = emotions.map(emotion => ({
    ...emotion,
    count: entries.filter(e => e.emotion === emotion.name).length
  }));

  const averageIntensity = entries.length > 0
    ? Math.round(entries.reduce((sum, e) => sum + e.intensity, 0) / entries.length)
    : 0;

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-emotion-lavender/10 to-emotion-blue/10">
      <div className="max-w-6xl mx-auto p-4 md:p-8">
        <header className="text-center mb-8 animate-fade-in">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-2">
            Дневник Эмоций 🌈
          </h1>
          <p className="text-muted-foreground text-lg">
            Твой личный помощник для отслеживания настроения и управления стрессом
          </p>
        </header>

        <Tabs defaultValue="diary" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4 max-w-2xl mx-auto">
            <TabsTrigger value="diary" className="flex items-center gap-2">
              <Icon name="BookOpen" size={18} />
              <span className="hidden sm:inline">Дневник</span>
            </TabsTrigger>
            <TabsTrigger value="stats" className="flex items-center gap-2">
              <Icon name="BarChart3" size={18} />
              <span className="hidden sm:inline">Статистика</span>
            </TabsTrigger>
            <TabsTrigger value="ai" className="flex items-center gap-2">
              <Icon name="Sparkles" size={18} />
              <span className="hidden sm:inline">ИИ-помощник</span>
            </TabsTrigger>
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <Icon name="User" size={18} />
              <span className="hidden sm:inline">Профиль</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="diary" className="space-y-6 animate-scale-in">
            <Card className="border-2 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="PenLine" size={24} />
                  Новая запись
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Как ты себя чувствуешь сегодня?
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                    {emotions.map((emotion) => (
                      <button
                        key={emotion.name}
                        onClick={() => setCurrentEmotion(emotion.name)}
                        className={`p-4 rounded-xl border-2 transition-all duration-200 ${
                          currentEmotion === emotion.name
                            ? `${emotion.color} border-primary scale-105 shadow-lg`
                            : 'bg-card border-border hover:scale-105 hover:border-primary/50'
                        }`}
                      >
                        <div className="text-4xl mb-2">{emotion.emoji}</div>
                        <div className="text-sm font-medium">{emotion.name}</div>
                      </button>
                    ))}
                  </div>
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Интенсивность: {currentIntensity}/10
                  </label>
                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={currentIntensity}
                    onChange={(e) => setCurrentIntensity(Number(e.target.value))}
                    className="w-full h-2 bg-emotion-lavender rounded-lg appearance-none cursor-pointer accent-primary"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-2 block">
                    Что волнует?
                  </label>
                  <Textarea
                    placeholder="Опиши свои мысли и чувства..."
                    value={currentNote}
                    onChange={(e) => setCurrentNote(e.target.value)}
                    className="min-h-32 resize-none"
                  />
                </div>

                <div>
                  <label className="text-sm font-medium mb-3 block">
                    Триггеры (необязательно)
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {triggers.map((trigger) => (
                      <button
                        key={trigger.name}
                        onClick={() => toggleTrigger(trigger.name)}
                        className={`p-3 rounded-xl border-2 transition-all duration-200 text-sm font-medium ${
                          currentTriggers.includes(trigger.name)
                            ? `${trigger.color} border-primary scale-105 shadow-lg`
                            : 'bg-card border-border hover:scale-105 hover:border-primary/50'
                        }`}
                      >
                        <div className="flex items-center justify-center gap-2">
                          {currentTriggers.includes(trigger.name) && (
                            <Icon name="Check" size={16} />
                          )}
                          {trigger.name}
                        </div>
                      </button>
                    ))}
                  </div>
                </div>

                <Button
                  onClick={handleSaveEntry}
                  disabled={!currentEmotion || !currentNote}
                  className="w-full text-lg py-6"
                >
                  <Icon name="Save" size={20} className="mr-2" />
                  Сохранить запись
                </Button>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="History" size={24} />
                  История записей
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {entries.map((entry) => (
                    <div
                      key={entry.id}
                      className="p-4 rounded-xl border-2 border-border bg-card hover:shadow-md transition-shadow"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{entry.emotionEmoji}</span>
                          <div>
                            <h3 className="font-semibold">{entry.emotion}</h3>
                            <p className="text-sm text-muted-foreground">{entry.date}</p>
                          </div>
                        </div>
                        <Badge variant="secondary">
                          Интенсивность: {entry.intensity}/10
                        </Badge>
                      </div>
                      <p className="text-sm mt-2">{entry.note}</p>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="stats" className="space-y-6 animate-scale-in">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="LineChart" size={24} />
                  График настроения
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  <div className="h-64 relative">
                    {(() => {
                      const sortedEntries = [...entries].sort((a, b) => 
                        new Date(a.date).getTime() - new Date(b.date).getTime()
                      );
                      
                      const maxIntensity = 10;
                      const chartHeight = 220;
                      const chartWidth = 100;
                      
                      if (sortedEntries.length === 0) return null;
                      
                      const points = sortedEntries.map((entry, idx) => ({
                        x: (idx / Math.max(sortedEntries.length - 1, 1)) * chartWidth,
                        y: chartHeight - (entry.intensity / maxIntensity) * chartHeight,
                        entry
                      }));
                      
                      const pathD = points.map((point, idx) => 
                        `${idx === 0 ? 'M' : 'L'} ${point.x},${point.y}`
                      ).join(' ');
                      
                      const areaD = `${pathD} L ${points[points.length - 1].x},${chartHeight} L 0,${chartHeight} Z`;

                      return (
                        <svg 
                          viewBox={`0 0 ${chartWidth} ${chartHeight}`} 
                          className="w-full h-full"
                          preserveAspectRatio="none"
                        >
                          <defs>
                            <linearGradient id="intensityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                              <stop offset="0%" stopColor="rgb(155, 135, 245)" stopOpacity="0.3" />
                              <stop offset="100%" stopColor="rgb(155, 135, 245)" stopOpacity="0.05" />
                            </linearGradient>
                          </defs>
                          
                          <path
                            d={areaD}
                            fill="url(#intensityGradient)"
                          />
                          
                          <path
                            d={pathD}
                            fill="none"
                            stroke="rgb(155, 135, 245)"
                            strokeWidth="0.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          
                          {points.map((point, idx) => (
                            <g key={idx}>
                              <circle
                                cx={point.x}
                                cy={point.y}
                                r="1.5"
                                fill="rgb(155, 135, 245)"
                                className="hover:r-2 transition-all cursor-pointer"
                              />
                            </g>
                          ))}
                        </svg>
                      );
                    })()}
                  </div>

                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3 pt-4 border-t">
                    {(() => {
                      const sortedEntries = [...entries]
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .slice(0, 8);
                      
                      return sortedEntries.map((entry) => (
                        <div
                          key={entry.id}
                          className="p-3 rounded-lg bg-card border-2 border-border hover:border-primary/50 transition-colors"
                        >
                          <div className="flex items-center gap-2 mb-1">
                            <span className="text-xl">{entry.emotionEmoji}</span>
                            <Badge variant="secondary" className="text-xs">
                              {entry.intensity}/10
                            </Badge>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {new Date(entry.date).toLocaleDateString('ru-RU', { 
                              day: 'numeric', 
                              month: 'short' 
                            })}
                          </div>
                        </div>
                      ));
                    })()}
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="TrendingUp" size={24} />
                    Общая статистика
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="flex items-center justify-between p-4 rounded-lg bg-emotion-green/20">
                    <span className="font-medium">Всего записей</span>
                    <span className="text-2xl font-bold">{entries.length}</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-emotion-lavender/20">
                    <span className="font-medium">Средняя интенсивность</span>
                    <span className="text-2xl font-bold">{averageIntensity}/10</span>
                  </div>
                  <div className="flex items-center justify-between p-4 rounded-lg bg-emotion-yellow/20">
                    <span className="font-medium">Дней ведения дневника</span>
                    <span className="text-2xl font-bold">
                      {new Set(entries.map(e => e.date)).size}
                    </span>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center gap-2">
                    <Icon name="Heart" size={24} />
                    Эмоции
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  {emotionStats.map((emotion) => (
                    <div key={emotion.name} className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="flex items-center gap-2">
                          <span className="text-2xl">{emotion.emoji}</span>
                          <span className="font-medium">{emotion.name}</span>
                        </span>
                        <span className="text-sm text-muted-foreground">
                          {emotion.count} раз
                        </span>
                      </div>
                      <Progress
                        value={(emotion.count / entries.length) * 100}
                        className={`h-2 ${emotion.color}`}
                      />
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="AlertCircle" size={24} />
                  Обнаруженные триггеры
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {triggers.map((trigger) => (
                    <button
                      key={trigger.name}
                      onClick={() => setSelectedTrigger(trigger.name)}
                      className={`p-4 rounded-xl ${trigger.color} text-center transition-all duration-200 hover:scale-105 hover:shadow-lg cursor-pointer`}
                    >
                      <div className="text-2xl font-bold mb-1">{trigger.count}</div>
                      <div className="text-sm font-medium">{trigger.name}</div>
                      <Icon name="ChevronRight" size={16} className="mx-auto mt-2 opacity-60" />
                    </button>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="ai" className="space-y-6 animate-scale-in">
            <Card className="border-2 border-primary/20 shadow-lg">
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Sparkles" size={24} />
                  ИИ-анализ твоего состояния
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 rounded-xl bg-emotion-lavender/20 border border-primary/20">
                  <p className="text-sm leading-relaxed">
                    🌟 Привет! Я проанализировал твои последние записи. Замечаю, что тревога часто связана с работой. 
                    Рекомендую попробовать техники управления стрессом перед важными событиями.
                  </p>
                </div>
                <div className="p-4 rounded-xl bg-emotion-green/20">
                  <p className="text-sm leading-relaxed">
                    ✨ Твоя средняя интенсивность эмоций стабильна, это отличный знак! 
                    Продолжай вести дневник регулярно — это помогает лучше понимать себя.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="Lightbulb" size={24} />
                  Рекомендованные упражнения
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {exercises.map((exercise, idx) => (
                    <div
                      key={idx}
                      className="p-4 rounded-xl border-2 border-border hover:border-primary/50 transition-colors"
                    >
                      <div className="flex items-start justify-between mb-2">
                        <div className="flex items-center gap-3">
                          <span className="text-3xl">{exercise.emoji}</span>
                          <div>
                            <h3 className="font-semibold">{exercise.title}</h3>
                            <p className="text-sm text-muted-foreground">
                              {exercise.description}
                            </p>
                          </div>
                        </div>
                        <Badge>{exercise.duration}</Badge>
                      </div>
                      <Button className="w-full mt-3" variant="outline">
                        <Icon name="Play" size={16} className="mr-2" />
                        Начать
                      </Button>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="MessageCircle" size={24} />
                  Мотивация дня
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center p-8 rounded-xl bg-gradient-to-br from-emotion-pink/20 to-emotion-lavender/20">
                  <p className="text-xl font-medium mb-4">
                    "Каждый день — это новая возможность стать лучше" 🌸
                  </p>
                  <p className="text-sm text-muted-foreground">
                    Ты справляешься отлично! Помни, что твои чувства важны 💜
                  </p>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="profile" className="space-y-6 animate-scale-in">
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  <Icon name="User" size={24} />
                  Профиль
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center gap-4 p-4 rounded-xl bg-emotion-blue/10">
                  <div className="w-20 h-20 rounded-full bg-primary/20 flex items-center justify-center text-4xl">
                    👤
                  </div>
                  <div>
                    <h3 className="text-xl font-semibold">Пользователь</h3>
                    <p className="text-sm text-muted-foreground">
                      С нами с декабря 2025
                    </p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Bell" size={20} />
                    Настройки уведомлений
                  </h3>
                  <div className="space-y-3">
                    <label className="flex items-center justify-between p-4 rounded-lg border-2 border-border cursor-pointer hover:bg-accent/50">
                      <span className="text-sm">Ежедневное напоминание (20:00)</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </label>
                    <label className="flex items-center justify-between p-4 rounded-lg border-2 border-border cursor-pointer hover:bg-accent/50">
                      <span className="text-sm">Мотивационные сообщения</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </label>
                    <label className="flex items-center justify-between p-4 rounded-lg border-2 border-border cursor-pointer hover:bg-accent/50">
                      <span className="text-sm">Рекомендации от ИИ</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </label>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Target" size={20} />
                    Цели
                  </h3>
                  <div className="space-y-3">
                    <div className="p-4 rounded-lg bg-emotion-green/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                          Вести дневник 7 дней подряд
                        </span>
                        <span className="text-xs text-muted-foreground">2/7</span>
                      </div>
                      <Progress value={28} className="h-2" />
                    </div>
                    <div className="p-4 rounded-lg bg-emotion-yellow/20">
                      <div className="flex items-center justify-between mb-2">
                        <span className="text-sm font-medium">
                          Попробовать 5 упражнений
                        </span>
                        <span className="text-xs text-muted-foreground">0/5</span>
                      </div>
                      <Progress value={0} className="h-2" />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      <Dialog open={!!selectedTrigger} onOpenChange={() => setSelectedTrigger(null)}>
        <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2 text-2xl">
              <Icon name="Target" size={28} />
              Триггер: {selectedTrigger}
            </DialogTitle>
            <DialogDescription>
              Анализ записей, связанных с этим триггером
            </DialogDescription>
          </DialogHeader>

          {selectedTrigger && (() => {
            const triggerEntries = entries.filter(e => 
              e.triggers?.includes(selectedTrigger)
            );
            
            const triggerEmotions = emotions.map(emotion => ({
              ...emotion,
              count: triggerEntries.filter(e => e.emotion === emotion.name).length
            })).filter(e => e.count > 0);

            const avgIntensity = triggerEntries.length > 0
              ? Math.round(triggerEntries.reduce((sum, e) => sum + e.intensity, 0) / triggerEntries.length)
              : 0;

            const triggerColor = triggers.find(t => t.name === selectedTrigger)?.color || 'bg-gray-200';

            return (
              <div className="space-y-6 mt-4">
                <div className="grid grid-cols-3 gap-4">
                  <div className={`p-4 rounded-xl ${triggerColor} text-center`}>
                    <div className="text-sm text-muted-foreground mb-1">Всего записей</div>
                    <div className="text-3xl font-bold">{triggerEntries.length}</div>
                  </div>
                  <div className={`p-4 rounded-xl ${triggerColor} text-center`}>
                    <div className="text-sm text-muted-foreground mb-1">Средняя интенсивность</div>
                    <div className="text-3xl font-bold">{avgIntensity}/10</div>
                  </div>
                  <div className={`p-4 rounded-xl ${triggerColor} text-center`}>
                    <div className="text-sm text-muted-foreground mb-1">Дней</div>
                    <div className="text-3xl font-bold">
                      {new Set(triggerEntries.map(e => e.date)).size}
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Heart" size={20} />
                    Распределение эмоций
                  </h3>
                  <div className="space-y-3">
                    {triggerEmotions.map((emotion) => (
                      <div key={emotion.name} className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="flex items-center gap-2">
                            <span className="text-2xl">{emotion.emoji}</span>
                            <span className="font-medium">{emotion.name}</span>
                          </span>
                          <span className="text-sm text-muted-foreground">
                            {emotion.count} раз ({Math.round((emotion.count / triggerEntries.length) * 100)}%)
                          </span>
                        </div>
                        <Progress
                          value={(emotion.count / triggerEntries.length) * 100}
                          className={`h-2 ${emotion.color}`}
                        />
                      </div>
                    ))}
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <Icon name="Clock" size={20} />
                    История записей
                  </h3>
                  <div className="space-y-3">
                    {triggerEntries.map((entry) => (
                      <div
                        key={entry.id}
                        className="p-4 rounded-xl border-2 border-border bg-card hover:shadow-md transition-shadow"
                      >
                        <div className="flex items-start justify-between mb-2">
                          <div className="flex items-center gap-3">
                            <span className="text-3xl">{entry.emotionEmoji}</span>
                            <div>
                              <h4 className="font-semibold">{entry.emotion}</h4>
                              <p className="text-sm text-muted-foreground">{entry.date}</p>
                            </div>
                          </div>
                          <Badge variant="secondary">
                            {entry.intensity}/10
                          </Badge>
                        </div>
                        <p className="text-sm mt-2">{entry.note}</p>
                      </div>
                    ))}
                  </div>
                </div>

                <div className={`p-4 rounded-xl ${triggerColor} border-2 border-primary/20`}>
                  <div className="flex items-start gap-3">
                    <Icon name="Lightbulb" size={24} className="mt-1 flex-shrink-0" />
                    <div>
                      <h4 className="font-semibold mb-2">Рекомендации</h4>
                      <p className="text-sm leading-relaxed">
                        {selectedTrigger === 'Учёба' && 
                          'Учёба — важная часть жизни! Составь расписание занятий, делай перерывы каждый час и не бойся просить помощи у учителей или одноклассников. Помни: ошибки — это часть обучения! 📚'}
                        {selectedTrigger === 'Друзья' && 
                          'Дружба — это про честность и поддержку. Если что-то не так, попробуй открыто поговорить. Настоящие друзья услышат тебя и помогут найти решение. 🤝'}
                        {selectedTrigger === 'Семья' && 
                          'Семья иногда не понимает, и это нормально. Попробуй спокойно объяснить свою точку зрения и выслушать родителей — часто они просто переживают за тебя. 💙'}
                        {selectedTrigger === 'Увлечения' && 
                          'Увлечения помогают снять стресс и развивают таланты! Уделяй им время регулярно — это твоё личное пространство для роста и радости. 🎨'}
                        {selectedTrigger === 'Внешность' && 
                          'Помни: ты уникален(а) и прекрасен(а) таким(ой), какой(ая) есть! Комплексы есть у всех, но они не определяют твою ценность. Забота о себе — это про здоровье, а не стандарты. 💜'}
                        {selectedTrigger === 'Будущее' && 
                          'Волноваться о будущем — нормально! Но не забывай жить сегодня. Пробуй разное, общайся с людьми из разных сфер и доверяй себе — твой путь найдётся! 🌟'}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            );
          })()}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default Index;