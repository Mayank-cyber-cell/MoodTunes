import React from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { MoodType } from './MoodTunes';

interface PlaylistCardProps {
  playlist: string;
  mood: MoodType;
}

const PlaylistCard: React.FC<PlaylistCardProps> = ({ playlist, mood }) => {
  return (
    <Card className="glass-effect overflow-hidden shadow-xl hover:shadow-2xl transition-all duration-500 animate-fade-in-up">
      <CardContent className="p-0">
        <div className="p-6 pb-4">
          <h3 className="text-2xl font-bold mb-2 flex items-center">
            <span className="w-3 h-3 rounded-full bg-gradient-to-r from-primary to-accent mr-3"></span>
            Your MoodTunes Playlist
          </h3>
          <p className="text-muted-foreground">Curated specially for your {mood} mood</p>
        </div>
        
        <div className="px-6 pb-6">
          <div className="relative overflow-hidden rounded-xl border border-border/50">
            <iframe
              src={playlist}
              className="w-full h-80 md:h-96"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
            
            {/* Gradient overlay for better integration */}
            <div className="absolute inset-0 pointer-events-none">
              <div className="absolute inset-0 bg-gradient-to-t from-background/20 via-transparent to-transparent"></div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PlaylistCard;