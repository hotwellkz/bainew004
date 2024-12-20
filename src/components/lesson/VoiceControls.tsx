import React from 'react';
import { Volume2, Volume1, Play, Pause } from 'lucide-react';

interface VoiceControlsProps {
  content: string;
  onStandardVoice: () => void;
  onPremiumVoice: () => void;
  tokens: number;
  premiumCost: number;
  isPlaying: boolean;
  isPaused: boolean;
  onPause: () => void;
  onResume: () => void;
}

const VoiceControls = ({
  onStandardVoice,
  onPremiumVoice,
  tokens,
  premiumCost,
  isPlaying,
  isPaused,
  onPause,
  onResume
}: VoiceControlsProps) => {
  return (
    <div className="flex gap-2">
      <button
        onClick={onStandardVoice}
        className="btn-secondary inline-flex items-center"
        disabled={isPlaying}
      >
        <Volume1 className="w-5 h-5 mr-2" />
        Озвучить бесплатно
      </button>

      <button
        onClick={onPremiumVoice}
        className="btn-primary inline-flex items-center"
        disabled={tokens < premiumCost || isPlaying}
      >
        <Volume2 className="w-5 h-5 mr-2" />
        Озвучить красивым голосом ({premiumCost} токенов)
      </button>

      {isPlaying && (
        <button
          onClick={isPaused ? onResume : onPause}
          className="btn-secondary"
        >
          {isPaused ? <Play className="w-5 h-5" /> : <Pause className="w-5 h-5" />}
        </button>
      )}
    </div>
  );
};

export default VoiceControls;