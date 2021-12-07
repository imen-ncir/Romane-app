import {ChapterDetailsDTO} from '../../Courses/services';

export interface PackDTO {
  id: string;
  description: string;
  level: string;
  category: string;
  price: number;
  totalCards: number;
  isFree: boolean;
  title: string;
  color: string;
  imageUrl?: string;
  rating?: number;
  [x: string]: any;
}

export interface PackDetailsDTO {
  description: string;
  level: string;
  ownerId: string;
  ownerAvatarUrl?: string;
  ownerExperience?: number;
  chapters: ChapterDetailsDTO[];
  category: string;
  price: number;
  totalCards: number;
  isFree: boolean;
  title: string;
  color: string;
  imageUrl?: string;
  rating?: number;
  nbDownloads: number;
}
