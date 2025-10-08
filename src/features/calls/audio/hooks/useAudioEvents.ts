import { useEffect } from 'react';

type Handlers = {
  onTimeUpdate?: (currentTime: number) => void;
  onLoadedMetadata?: (duration: number) => void;
  onEnded?: () => void;
  onError?: (err: unknown) => void;
};

export function useAudioEvents(audioRef: React.RefObject<HTMLAudioElement | null>, handlers: Handlers) {
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleTimeUpdate = () => handlers.onTimeUpdate?.(audio.currentTime);
    const handleLoadedMetadata = () => handlers.onLoadedMetadata?.(audio.duration);
    const handleEnded = () => handlers.onEnded?.();
    const handleError = () => handlers.onError?.(audio.error);

    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('loadedmetadata', handleLoadedMetadata);
    audio.addEventListener('ended', handleEnded);
    audio.addEventListener('error', handleError);

    return () => {
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
      audio.removeEventListener('ended', handleEnded);
      audio.removeEventListener('error', handleError);
    };
  }, [audioRef, handlers]);
}
