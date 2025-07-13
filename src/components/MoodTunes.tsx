import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Music, Moon, Sun, Heart, Share2, Sparkles, RotateCcw, Info } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import MoodSelector from './MoodSelector';
import PlaylistCard from './PlaylistCard';
import ShareModal from './ShareModal';
import AboutModal from './AboutModal';

export type MoodType = 'happy' | 'sad' | 'romantic' | 'energetic' | 'chill' | 'angry';

export interface MoodData {
  quote: string;
  playlist: string;
  hindiPlaylist?: string;
  shareText: string;
  color: string;
  gradient: string;
}

const moodData: Record<MoodType, MoodData> = {
  happy: {
    quote: "Happiness is not something ready made. It comes from your own actions.",
    playlist: "https://open.spotify.com/embed/playlist/37i9dQZF1DXdPec7aLTmlC?utm_source=generator",
    hindiPlaylist: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4PP3DA4J0N8?utm_source=generator",
    shareText: "I'm feeling happy today! Check out my uplifting playlist on MoodTunes!",
    color: "from-yellow-400 to-orange-500",
    gradient: "bg-gradient-to-br from-yellow-400/20 to-orange-500/20"
  },
  sad: {
    quote: "Tears come from the heart and not from the brain. Let them flow to heal.",
    playlist: "https://open.spotify.com/embed/playlist/37i9dQZF1DX7qK8ma5wgG1?utm_source=generator",
    shareText: "I'm feeling a bit down today. This MoodTunes playlist is helping me through it.",
    color: "from-blue-500 to-blue-700",
    gradient: "bg-gradient-to-br from-blue-500/20 to-blue-700/20"
  },
  romantic: {
    quote: "Love is composed of a single soul inhabiting two bodies.",
    playlist: "https://open.spotify.com/embed/playlist/37i9dQZF1DX50QitC6Oqtn?utm_source=generator",
    shareText: "Feeling romantic today! ❤️ Here's my love-filled MoodTunes playlist.",
    color: "from-pink-500 to-rose-600",
    gradient: "bg-gradient-to-br from-pink-500/20 to-rose-600/20"
  },
  energetic: {
    quote: "Energy and persistence conquer all things.",
    playlist: "https://open.spotify.com/embed/playlist/37i9dQZF1DX0XUsuxWHRQd?utm_source=generator",
    shareText: "Full of energy today! ⚡ This MoodTunes playlist is fueling my vibe!",
    color: "from-red-500 to-orange-600",
    gradient: "bg-gradient-to-br from-red-500/20 to-orange-600/20"
  },
  chill: {
    quote: "Sometimes the most productive thing you can do is relax.",
    playlist: "https://open.spotify.com/embed/playlist/37i9dQZF1DX4WYpdgoIcn6?utm_source=generator",
    shareText: "Chilling out with this perfect MoodTunes playlist. So relaxing! 🧘‍♂️",
    color: "from-green-400 to-teal-500",
    gradient: "bg-gradient-to-br from-green-400/20 to-teal-500/20"
  },
  angry: {
    quote: "For every minute you remain angry, you give up sixty seconds of peace of mind.",
    playlist: "https://open.spotify.com/embed/playlist/37i9dQZF1DX3YSRoSdA634?utm_source=generator",
    shareText: "Working through some anger with this cathartic MoodTunes playlist.",
    color: "from-red-600 to-red-800",
    gradient: "bg-gradient-to-br from-red-600/20 to-red-800/20"
  }
};

const customMoodMap: Record<string, MoodType> = {
  excited: "happy",
  joyful: "happy",
  depressed: "sad",
  melancholy: "sad",
  loving: "romantic",
  passionate: "romantic",
  pumped: "energetic",
  hype: "energetic",
  relaxed: "chill",
  calm: "chill",
  furious: "angry",
  annoyed: "angry"
};

const MoodTunes = () => {
  const [currentMood, setCurrentMood] = useState<MoodType | null>(null);
  const [customMood, setCustomMood] = useState('');
  const [isDark, setIsDark] = useState(false);
  const [isEnglish, setIsEnglish] = useState(true);
  const [showShare, setShowShare] = useState(false);
  const [showAbout, setShowAbout] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const { toast } = useToast();

  // Apply mood theme function
  const applyMoodTheme = (mood: string) => {
    // Remove any previously applied mood class from body
    const moodClasses = ['theme-happy', 'theme-sad', 'theme-romantic', 'theme-energetic'];
    moodClasses.forEach(className => {
      document.body.classList.remove(className);
    });
    
    // Add the new mood class to body (only for the specified moods)
    if (['happy', 'sad', 'romantic', 'energetic'].includes(mood)) {
      document.body.classList.add(`theme-${mood}`);
    }
  };

  useEffect(() => {
    // Check for saved theme preference
    const savedTheme = localStorage.getItem('theme');
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    
    if (savedTheme === 'dark' || (!savedTheme && prefersDark)) {
      setIsDark(true);
      document.documentElement.classList.add('dark');
    }

    // Cleanup function to remove mood themes when component unmounts
    return () => {
      const moodClasses = ['theme-happy', 'theme-sad', 'theme-romantic', 'theme-energetic'];
      moodClasses.forEach(className => {
        document.body.classList.remove(className);
      });
    };
  }, []);

  const toggleTheme = () => {
    const newTheme = !isDark;
    setIsDark(newTheme);
    
    if (newTheme) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('theme', 'light');
    }
  };

  const detectMoodFromText = () => {
    const text = customMood.trim().toLowerCase();
    
    if (!text) {
      toast({
        title: "Please enter how you're feeling",
        description: "Type your mood in the input field",
        variant: "destructive"
      });
      return;
    }

    // Find matching mood
    let detectedMood: MoodType | null = null;
    
    // Check exact matches first
    if (moodData[text as MoodType]) {
      detectedMood = text as MoodType;
    } else {
      // Check custom mood map
      detectedMood = customMoodMap[text];
      
      // If still not found, try partial matches
      if (!detectedMood) {
        for (const mood in customMoodMap) {
          if (text.includes(mood)) {
            detectedMood = customMoodMap[mood];
            break;
          }
        }
      }
    }

    if (detectedMood) {
      selectMood(detectedMood);
      toast({
        title: "Mood detected! 🎵",
        description: `We found the perfect ${detectedMood} playlist for you`,
      });
    } else {
      toast({
        title: "Mood not recognized",
        description: "Please try selecting from the emoji options or use different words",
        variant: "destructive"
      });
    }
  };

  const selectMood = (mood: MoodType) => {
    setCurrentMood(mood);
    setShowResults(true);
    setCustomMood('');
    
    // Apply mood-specific theme
    applyMoodTheme(mood);
  };

  const resetSelection = () => {
    setCurrentMood(null);
    setShowResults(false);
    setCustomMood('');
    
    // Remove mood theme when resetting
    applyMoodTheme('');
  };

  const currentMoodData = currentMood ? moodData[currentMood] : null;

  return (
    <div className="min-h-screen bg-background transition-all duration-500">
      {/* Animated Background */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -right-40 w-80 h-80 rounded-full bg-primary/10 blur-3xl animate-float"></div>
        <div className="absolute -bottom-40 -left-40 w-80 h-80 rounded-full bg-accent/10 blur-3xl animate-float" style={{ animationDelay: '1s' }}></div>
      </div>

      {/* Header */}
      <header className="relative z-10 p-6 flex justify-between items-center border-b border-border/50 backdrop-blur-sm bg-background/80">
        <div className="flex items-center space-x-3">
          <div className="p-2 rounded-xl bg-gradient-to-br from-primary to-accent">
            <Music className="w-6 h-6 text-white" />
          </div>
          <h1 className="text-3xl font-bold gradient-text">MoodTunes</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsEnglish(!isEnglish)}
            className="glass-effect"
          >
            {isEnglish ? '🇺🇸' : '🇮🇳'} {isEnglish ? 'EN' : 'HI'}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={toggleTheme}
            className="glass-effect"
          >
            {isDark ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
          </Button>
          
          <Button
            variant="outline"
            size="sm"
            onClick={() => setShowAbout(true)}
            className="glass-effect"
          >
            <Info className="w-4 h-4" />
          </Button>
        </div>
      </header>

      {/* Main Content */}
      <main className="relative z-10 px-6 py-12">
        {!showResults ? (
          // Mood Selection Section
          <div className="max-w-4xl mx-auto text-center space-y-8 animate-fade-in-up">
            <div className="space-y-4">
              <h2 className="text-4xl md:text-5xl font-bold">
                How are you{' '}
                <span className="gradient-text animate-pulse-glow">feeling</span>{' '}
                today?
              </h2>
              <p className="text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed">
                Select your mood and we'll find the perfect soundtrack for your soul
              </p>
            </div>

            <div className="space-y-8">
              <MoodSelector 
                onMoodSelect={selectMood}
                selectedMood={currentMood}
              />

              <div className="max-w-md mx-auto">
                <div className="relative">
                  <Input
                    type="text"
                    placeholder="Or describe your mood..."
                    value={customMood}
                    onChange={(e) => setCustomMood(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && detectMoodFromText()}
                    className="pr-12 h-12 rounded-full border-2 border-border/50 focus:border-primary bg-card/50 backdrop-blur-sm text-center text-lg"
                  />
                  <Button
                    onClick={detectMoodFromText}
                    size="sm"
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-full bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90"
                  >
                    <Sparkles className="w-4 h-4" />
                  </Button>
                </div>
                <p className="text-sm text-muted-foreground mt-2">
                  Try words like: excited, melancholy, pumped, relaxed
                </p>
              </div>
            </div>
          </div>
        ) : (
          // Results Section
          <div className="max-w-4xl mx-auto space-y-8 animate-fade-in-scale">
            <div className="text-center space-y-6">
              <div className="inline-flex items-center space-x-3 px-6 py-3 rounded-full bg-card/50 backdrop-blur-sm border border-border/50">
                <span className="text-lg">For your</span>
                <Badge 
                  className={`px-4 py-2 text-lg font-semibold bg-gradient-to-r ${currentMoodData?.color} text-white border-0`}
                >
                  {currentMood}
                </Badge>
                <span className="text-lg">mood</span>
              </div>

              <Card className={`glass-effect max-w-2xl mx-auto ${currentMoodData?.gradient}`}>
                <CardContent className="p-8">
                  <div className="flex items-start space-x-4">
                    <div className="p-3 rounded-full bg-gradient-to-br from-primary to-accent">
                      <Heart className="w-5 h-5 text-white" />
                    </div>
                    <blockquote className="text-lg italic leading-relaxed flex-1">
                      "{currentMoodData?.quote}"
                    </blockquote>
                  </div>
                </CardContent>
              </Card>
            </div>

            <PlaylistCard
              playlist={isEnglish ? currentMoodData?.playlist || '' : currentMoodData?.hindiPlaylist || currentMoodData?.playlist || ''}
              mood={currentMood || 'happy'}
            />

            <div className="flex flex-wrap justify-center gap-4">
              <Button
                onClick={() => setShowShare(true)}
                className="bg-gradient-to-r from-primary to-accent hover:from-primary/90 hover:to-accent/90 text-white px-6 py-3 rounded-full"
              >
                <Share2 className="w-4 h-4 mr-2" />
                Share Your Vibe
              </Button>
              
              <Button
                onClick={resetSelection}
                variant="outline"
                className="glass-effect px-6 py-3 rounded-full"
              >
                <RotateCcw className="w-4 h-4 mr-2" />
                Choose Another Mood
              </Button>
            </div>
          </div>
        )}
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 text-center text-muted-foreground border-t border-border/50">
        <p className="text-lg">
          Made with <Heart className="w-4 h-4 inline text-red-500" /> for music lovers everywhere
        </p>
      </footer>

      {/* Modals */}
      <ShareModal
        isOpen={showShare}
        onClose={() => setShowShare(false)}
        mood={currentMood || 'happy'}
        shareText={currentMoodData?.shareText || ''}
      />
      
      <AboutModal
        isOpen={showAbout}
        onClose={() => setShowAbout(false)}
      />
    </div>
  );
};

export default MoodTunes;