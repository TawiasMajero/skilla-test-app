import { useState, useRef } from "react";
import PlayPauseButton from './PlayPauseButton';
import ProgressBar from './ProgressBar';
import AudioControls from './AudioControls';
import { useAudioSource } from './hooks/useAudioSource';
import { useAudioEvents } from './hooks/useAudioEvents';
import type { AudioPlayerProps } from '../../../shared/types/component.types';

const AudioPlayer: React.FC<AudioPlayerProps> = ({ recordId, partnershipId, onClose }) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  const { audioUrl, isLoading: isUrlLoading } = useAudioSource(recordId, partnershipId, audioRef);

  useAudioEvents(audioRef, {
    onTimeUpdate: (t) => setCurrentTime(t),
    onLoadedMetadata: (d) => {
      setDuration(d);
      setIsLoading(false);
    },
    onEnded: () => {
      setIsPlaying(false);
      setCurrentTime(0);
    },
    onError: () => {
      setIsLoading(false);
    },
  });

  const togglePlay = async () => {
    const audio = audioRef.current;
    if (!audio) return;

    if (isPlaying) {
      audio.pause();
      setIsPlaying(false);
    } else {
      try {
        await audio.play();
        setIsPlaying(true);
      } catch (error) {
        console.error("Error playing audio:", error);
      }
    }
  };

  const handleSeek = (percent: number) => {
    const audio = audioRef.current;
    if (!audio || !duration || Number.isNaN(duration)) return;
    const newTime = (percent / 100) * duration;
    audio.currentTime = newTime;
    setCurrentTime(newTime);
  };

  const handleDownload = () => {
    if (!audioUrl) return;
    const link = document.createElement("a");
    link.href = audioUrl;
    link.download = `record_${recordId}.mp3`;
    document.body.appendChild(link);
    link.click();
    link.remove();
  };

  const formatTime = (time: number): string => {
    if (!time || isNaN(time)) return "0:00";
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, "0")}`;
  };

  const progress = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className="flex items-center gap-3 w-full" onClick={(e) => e.stopPropagation()}>
    <audio ref={audioRef} preload="metadata">
      {audioUrl && <source src={audioUrl} type="audio/mpeg" />}
    </audio>

      {/* Воспроизведение/пауза */}
      <PlayPauseButton onToggle={togglePlay} isPlaying={isPlaying} isLoading={isLoading || isUrlLoading} />

      {/* Время */}
      <span
        className="flex-shrink-0"
        style={{
          fontFamily: "SF Pro Display",
          fontSize: "15px",
          lineHeight: "145%",
          color: "#122945",
          textAlign: "right",
          minWidth: "37px",
        }}
      >
        {formatTime(currentTime)}
      </span>

      {/* Progress Bar */}
      <div className="flex-1">
        <ProgressBar value={progress} onSeek={(p) => handleSeek(p)} />
      </div>

      {/* Controls (download + close) */}
      <AudioControls
        audioUrl={audioUrl ?? null}
        onDownload={() => handleDownload()}
        onClose={() => {
          if (audioRef.current) {
            audioRef.current.pause();
            setIsPlaying(false);
            setCurrentTime(0);
          }
          onClose?.();
        }}
      />
    </div>
  );
};

export default AudioPlayer;
