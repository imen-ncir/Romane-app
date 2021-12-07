import {ChapterDTO} from '../chapter/dto';

export interface SubjectDTO {
  id: string;
  title: string;
  color: string;
  chapterNumber: number;
  pictureUrl?: string;
  fromShop?: boolean;
}
export interface SubjectDetailsDTO {
  id: string;
  title: string;
  color: string;
  pictureUrl?: string;
  chapters: ChapterDTO[];
  fromShop?: boolean;
}
