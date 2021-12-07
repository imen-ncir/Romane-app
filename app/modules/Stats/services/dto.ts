export interface GlobalStatDTO {
  overallCompletion: number;
  overallSuccess: number;
  overallFailure: number;
  overallTotalCards: number;
  lastTestDate?: Date;
  subjects: SubjectStatDTO[];
}

export interface SubjectStatDTO {
  subject: string;
  color: string;
  completed: number;
  failed: number;
  total: number;
  lastDateDate?: Date;
  chapters: ChapterStatDTO[];
}

export interface ChapterStatDTO {
  chapter: string;
  completed: number;
  failed: number;
  total: number;
}
