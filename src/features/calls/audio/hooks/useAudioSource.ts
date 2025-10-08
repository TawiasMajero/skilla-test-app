import { useEffect } from 'react';
import { useGetRecordUrlQuery } from '../../../../app/api/skillaApi';

export function useAudioSource(
  recordId: string | null | undefined,
  partnershipId: string | null | undefined,
  audioRef: React.RefObject<HTMLAudioElement | null>
) {
  const skip = !recordId;
  const { data: recordUrl, isLoading, error } = useGetRecordUrlQuery(
    { record: recordId ?? '', partnership_id: partnershipId ?? '' },
    { skip }
  );

  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;
    if (recordUrl) {
      try {
        audio.src = recordUrl;
        audio.load();
      } catch {
        // ignore DOM exceptions
      }
    }
  }, [recordUrl, audioRef]);

  return { audioUrl: recordUrl ?? null, isLoading, error } as const;
}
