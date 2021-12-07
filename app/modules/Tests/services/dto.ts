import {
  AnswerDTO,
  ChapterDetailsDTO,
  QuestionDTO,
} from '../../Courses/services';

export interface SubjectFullDTO {
  id: string;
  title: string;
  color: string;
  chapters: ChapterDetailsDTO[];
  pictureUrl?: string;
}

export interface TestFlashcardDTO {
  id: string;
  color: string;
  question: QuestionDTO;
  answer: AnswerDTO;
  chapterTitle: string;
  subjectTitle: string;
}

export interface TestDTO {
  id: string;
  chapterIds: string[];
  length: number;
  successRate: number;
  subjectId?: string;
}

export interface TestRunDTO {
  id: string;
  chapterIds: string[];
  cards: TestFlashcardDTO[];
  completed: number;
}
