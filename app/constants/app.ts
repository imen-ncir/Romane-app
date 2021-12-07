export enum FlashcardTypes {
  FLASHCARD = 'flashcard',
  TEXT = 'text',
  MULTIPLE = 'qcm',
}

export enum FlashcardScoreValues {
  KNOWN = 1,
  UNKWOWN = 0,
  BARELY_KNOWN = 0.5,
}

export enum PackCategories {
  French = 'francais',
  Maths = 'maths',
  History = 'histoire',
  Nature = 'svt',
  Geography = 'geographie',
}
export enum PackLevels {
  Seconde = 'seconde',
  Premiere = 'premiere',
  Terminale = 'terminale',
  Superieure = 'superieure',
}

export const TEST_EXPERIENCE_REWARD = 100;
export const PRICE_PER_CARDS = 0.1;
