import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Badge } from '@/components/ui/badge';
import { Music, Heart, Palette, Smartphone, Share2, Moon } from 'lucide-react';

interface AboutModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const AboutModal: React.FC<AboutModalProps> = ({ isOpen, onClose }) => {
  const features = [
    {
      icon: <Music className="w-5 h-5" />,
      title: "Mood-based Music",
      description: "AI-powered mood detection with curated playlists"
    },
    {
      icon: <Heart className="w-5 h-5" />,
      title: "Inspirational Quotes",
      description: "Uplifting quotes to complement your musical journey"
    },
    {
      icon: <Palette className="w-5 h-5" />,
      title: "Beautiful Design",
      description: "Modern UI with smooth animations and glassmorphism"
    },
    {
      icon: <Smartphone className="w-5 h-5" />,
      title: "Fully Responsive",
      description: "Perfect experience across all devices and screen sizes"
    },
    {
      icon: <Share2 className="w-5 h-5" />,
      title: "Social Sharing",
      description: "Share your mood and playlists with friends"
    },
    {
      icon: <Moon className="w-5 h-5" />,
      title: "Dark/Light Mode",
      description: "Toggle between themes for comfortable viewing"
    }
  ];

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl glass-effect max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold gradient-text mb-4">
            About MoodTunes
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br from-primary to-accent mb-4">
              <Music className="w-8 h-8 text-white" />
            </div>
            <p className="text-lg leading-relaxed text-muted-foreground">
              MoodTunes is an intelligent music recommendation app that creates the perfect 
              soundtrack for your emotions. Simply express how you're feeling, and we'll 
              curate a playlist that resonates with your soul.
            </p>
          </div>

          <div className="grid gap-4">
            <h3 className="text-xl font-semibold mb-2">✨ Features</h3>
            {features.map((feature, index) => (
              <div 
                key={index}
                className="flex items-start space-x-3 p-3 rounded-lg bg-gradient-to-r from-primary/5 to-accent/5 border border-border/30"
              >
                <div className="p-2 rounded-lg bg-gradient-to-br from-primary/20 to-accent/20">
                  {feature.icon}
                </div>
                <div className="flex-1">
                  <h4 className="font-medium">{feature.title}</h4>
                  <p className="text-sm text-muted-foreground">{feature.description}</p>
                </div>
              </div>
            ))}
          </div>

          <div className="border-t border-border/50 pt-6">
            <div className="flex flex-wrap gap-2 justify-center">
              <Badge variant="secondary" className="px-3 py-1">React</Badge>
              <Badge variant="secondary" className="px-3 py-1">TypeScript</Badge>
              <Badge variant="secondary" className="px-3 py-1">Tailwind CSS</Badge>
              <Badge variant="secondary" className="px-3 py-1">Spotify API</Badge>
              <Badge variant="secondary" className="px-3 py-1">Glassmorphism</Badge>
            </div>
            
            <div className="text-center mt-6">
              <p className="text-muted-foreground">
                Built with <Heart className="w-4 h-4 inline text-red-500" /> for music lovers everywhere
              </p>
              <p className="text-sm text-muted-foreground mt-2">
                Experience the perfect harmony of technology and emotion
              </p>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default AboutModal;