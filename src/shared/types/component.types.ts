// Common component-level TypeScript interfaces
export interface AvatarProps {
  src?: string;
  alt?: string;
  initials?: string;
  size?: number;
}

export type CallGrade = "excellent" | "good" | "bad";

export type CallType = "incoming" | "outgoing" | "missed" | "missed-outgoing";

export type CallDateLabel = "today" | "yesterday";

export interface TableCall {
  id: number;
  type: CallType;
  time: string;
  avatar?: string;
  initials?: string;
  phone: string;
  source?: string;
  grade?: CallGrade;
  duration: string;
  hasRecord?: boolean;
  date: CallDateLabel;
  recordId?: string;
  partnershipId?: string;
}

export interface CallsTableProps {
  calls: TableCall[];
}

export interface CallRowProps {
  type: CallType;
  time: string;
  avatar?: string;
  initials?: string;
  phone: string;
  source?: string;
  grade?: CallGrade;
  duration: string;
  hasRecord?: boolean;
  recordId?: string;
  partnershipId?: string;
}

export interface CallsFiltersProps {
  onFilterChange?: (filter: string) => void;
  onDateChange?: (days: number) => void;
}

export interface AudioPlayerProps {
  recordId: string;
  partnershipId: string;
  onClose?: () => void;
}

export interface PlayPauseProps {
  isPlaying: boolean;
  isLoading: boolean;
  disabled?: boolean;
  onToggle: () => void;
}

export interface ProgressBarProps {
  value: number; // 0-100
  onSeek: (percentage: number) => void;
}

export interface AudioControlsProps {
  audioUrl: string | null;
  onDownload: () => void;
  onClose: () => void;
}
