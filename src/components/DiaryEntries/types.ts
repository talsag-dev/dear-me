import { DiaryEntry } from '../../utils';

export interface DiaryEntriesProps {
  entries: DiaryEntry[];
  onEntryRemoved: () => void;
}
