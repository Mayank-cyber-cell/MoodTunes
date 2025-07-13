import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Copy, Facebook, Twitter, Check } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { MoodType } from './MoodTunes';

interface ShareModalProps {
  isOpen: boolean;
  onClose: () => void;
  mood: MoodType;
  shareText: string;
}

const ShareModal: React.FC<ShareModalProps> = ({ isOpen, onClose, mood, shareText }) => {
  const { toast } = useToast();
  const [copied, setCopied] = React.useState(false);
  
  const shareLink = `https://moodtunes.com/${mood}-playlist`;
  
  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(shareLink);
      setCopied(true);
      toast({
        title: "Link copied!",
        description: "Share link has been copied to clipboard",
      });
      
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Failed to copy",
        description: "Please copy the link manually",
        variant: "destructive"
      });
    }
  };

  const shareOnTwitter = () => {
    const twitterUrl = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareLink)}`;
    window.open(twitterUrl, '_blank');
  };

  const shareOnFacebook = () => {
    const facebookUrl = `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareLink)}`;
    window.open(facebookUrl, '_blank');
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md glass-effect">
        <DialogHeader>
          <DialogTitle className="text-2xl font-bold gradient-text">
            Share Your Vibe
          </DialogTitle>
        </DialogHeader>
        
        <div className="space-y-6">
          <div className="text-center">
            <p className="text-lg mb-4">Share your current mood and playlist with friends!</p>
            
            <div className="p-4 rounded-xl bg-gradient-to-br from-primary/10 to-accent/10 border border-border/50">
              <p className="font-medium mb-2">
                I'm feeling <span className="text-primary font-bold capitalize">{mood}</span> today! 🎵
              </p>
              <p className="text-sm text-muted-foreground">
                Check out my MoodTunes playlist
              </p>
            </div>
          </div>

          <div className="space-y-3">
            <label className="text-sm font-medium">Share link:</label>
            <div className="flex gap-2">
              <Input
                value={shareLink}
                readOnly
                className="flex-1 bg-muted/50"
              />
              <Button
                onClick={copyToClipboard}
                variant="outline"
                size="sm"
                className="px-3"
              >
                {copied ? <Check className="w-4 h-4" /> : <Copy className="w-4 h-4" />}
              </Button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button
              onClick={shareOnTwitter}
              className="flex-1 bg-blue-500 hover:bg-blue-600 text-white"
            >
              <Twitter className="w-4 h-4 mr-2" />
              Twitter
            </Button>
            
            <Button
              onClick={shareOnFacebook}
              className="flex-1 bg-blue-700 hover:bg-blue-800 text-white"
            >
              <Facebook className="w-4 h-4 mr-2" />
              Facebook
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default ShareModal;