import {FlashcardTypes} from '../../../../constants/app';

export interface FlashcardDTO {
  id: string;
  question: string;
}

export interface FlashcardDetailsDTO {
  id: string;
  question: QuestionDTO;
  answer: AnswerDTO;
}

export interface QuestionDTO {
  text: string;
  audioUrl?: string;
  pictureUrl?: string;
}

export interface AnswerDTO {
  type: FlashcardTypes;
  value: AnswerValueDTO;
}

export type AnswerValueDTO =
  | AnswerTextDTO
  | AnswerTextAudioDTO
  | AnswerTextAudioDTO[];

export interface AnswerTextDTO {
  text: string;
}

export interface AnswerTextAudioDTO {
  text: string;
  audioUrl: string;
}

export interface AnswerMultipleTextAudioDTO extends AnswerTextAudioDTO {
  isRight?: boolean;
}
