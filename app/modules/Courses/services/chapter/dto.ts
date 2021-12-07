import {FlashcardDTO} from '../flashcard/dto';

export interface ChapterDTO {
  id: string;
  title: string;
  flashcardsNumber: number;
  completedNumber: number;
  failedNumber: number;
}
export interface ChapterDetailsDTO extends ChapterDTO {
  flashcards: FlashcardDTO[];
  subjectId: string;
}
