import React from 'react';
import { Button } from '@/components/ui/button';
import { MoodType } from './MoodTunes';

interface MoodSelectorProps {
  onMoodSelect: (mood: MoodType) => void;
  selectedMood: MoodType | null;
}

const moodEmojis: Record<MoodType, string> = {
  happy: '😄',
  sad: '😢',
  romantic: '😍',
  energetic: '🤘',
  chill: '🧘‍♂️',
  angry: '😠'
};

const moodStyles: Record<MoodType, string> = {
  happy: 'mood-happy',
  sad: 'mood-sad',
  romantic: 'mood-romantic',
  energetic: 'mood-energetic',
  chill: 'mood-chill',
  angry: 'mood-angry'
};

const MoodSelector: React.FC<MoodSelectorProps> = ({ onMoodSelect, selectedMood }) => {
  return (
    <div className="flex flex-wrap justify-center gap-6">
      {Object.entries(moodEmojis).map(([mood, emoji]) => (
        <Button
          key={mood}
          onClick={() => onMoodSelect(mood as MoodType)}
          className={`
            mood-button w-20 h-20 rounded-2xl text-4xl border-2 border-transparent
            ${selectedMood === mood 
              ? `${moodStyles[mood as MoodType]} active scale-110` 
              : 'bg-card hover:bg-card/80 text-foreground hover:scale-105'
            }
            transition-all duration-300 ease-out shadow-lg hover:shadow-xl
          `}
          variant="ghost"
        >
          {emoji}
        </Button>
      ))}
    </div>
  );
};

export default MoodSelector;