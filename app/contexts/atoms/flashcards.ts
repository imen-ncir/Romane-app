import {atom, useRecoilState} from 'recoil';
import {
  FlashcardDetailsDTO,
  FlashcardDTO,
} from '../../modules/Courses/services/flashcard/dto';
import {replaceItemAtIndex} from '../../shared/utils';
import {useRecoilChapters} from './chapters';

function ToFlashcardDTO(dto: FlashcardDetailsDTO): FlashcardDTO {
  const {id, question} = dto;
  return {
    id: id,
    question: question.text,
  };
}

export const useRecoilFlashcards = () => {
  const {currentChapter, updateCurrentChapter} = useRecoilChapters();

  const handleAddFlashcard = (newValue: FlashcardDTO) => {
    if (!currentChapter) return;
    const newList = [...currentChapter.flashcards, newValue];
    updateCurrentChapter({...currentChapter, flashcards: newList});
  };
  const handleRemoveFlashcard = (id: string) => {
    if (!currentChapter) return;
    const newList = [...currentChapter.flashcards].filter(c => c.id !== id);
    updateCurrentChapter({...currentChapter, flashcards: newList});
  };
  const updateChapter = (newValue: FlashcardDTO) => {
    if (!currentChapter) return;
    const chapters = [...currentChapter.flashcards];
    const index = chapters.findIndex(c => c.id === newValue.id);
    const newList = replaceItemAtIndex(chapters, index, newValue);
    if (index > -1) {
      updateCurrentChapter({...currentChapter, flashcards: newList});
    }
  };
  const handleUpdateFlashcard = (newValue: FlashcardDetailsDTO) => {
    updateChapter(ToFlashcardDTO(newValue));
  };

  return {
    addFlashcard: handleAddFlashcard,
    removeFlashcard: handleRemoveFlashcard,
    updateFlashcard: handleUpdateFlashcard,
  };
};
