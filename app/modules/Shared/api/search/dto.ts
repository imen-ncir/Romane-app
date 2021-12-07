import {ChapterDTO, FlashcardDTO, SubjectDTO} from '../../../Courses/services';

export interface GlobalSearchResultsDTO {
  subjects: SubjectDTO[];
  chapters: ChapterDTO[];
  flashcards: FlashcardDTO[];
}
