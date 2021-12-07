import {atom, useRecoilState} from 'recoil';
import {
  ChapterDetailsDTO,
  ChapterDTO,
} from '../../modules/Courses/services/chapter/dto';
import {replaceItemAtIndex} from '../../shared/utils';
import {useRecoilSubjects} from './subjects';

export const chapterAtom = atom<ChapterDetailsDTO | null>({
  key: 'selected_chapter',
  default: null,
});

function ToChapterDTO(dto: ChapterDetailsDTO): ChapterDTO {
  const {flashcards, ...chapterDTO} = dto;
  return {
    ...chapterDTO,
    flashcardsNumber: flashcards ? flashcards.length : 0,
  };
}

export const useRecoilChapters = () => {
  const {currentSubject, updateCurrentSubject} = useRecoilSubjects();
  const [currentChapter, setCurrentChapter] = useRecoilState(chapterAtom);

  const handleAddChapter = (newValue: ChapterDTO) => {
    if (!currentSubject) return;
    const newList = [...currentSubject.chapters, newValue];
    updateCurrentSubject({...currentSubject, chapters: newList});
  };
  const handleRemoveChapter = (id: string) => {
    if (!currentSubject) return;
    const newList = [...currentSubject.chapters].filter(c => c.id !== id);
    updateCurrentSubject({...currentSubject, chapters: newList});
  };
  const updateChapter = (newValue: ChapterDTO) => {
    if (!currentSubject) return;
    const chapters = [...currentSubject.chapters];
    const index = chapters.findIndex(c => c.id === newValue.id);
    const newList = replaceItemAtIndex(chapters, index, newValue);
    if (index > -1) {
      updateCurrentSubject({...currentSubject, chapters: newList});
    }
  };
  const handleUpdateCurrentChapter = (newValue: ChapterDetailsDTO) => {
    setCurrentChapter(newValue);
    updateChapter(ToChapterDTO(newValue));
  };

  return {
    addChapter: handleAddChapter,
    removeChapter: handleRemoveChapter,
    updateCurrentChapter: handleUpdateCurrentChapter,
    setCurrentChapter,
    currentChapter,
  };
};
