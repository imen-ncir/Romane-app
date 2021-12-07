import {atom, useRecoilState} from 'recoil';
import {
  SubjectDetailsDTO,
  SubjectDTO,
} from '../../modules/Courses/services/subject/dto';
import {replaceItemAtIndex} from '../../shared/utils';

const initState: SubjectDTO[] = [];

export const subjectsAtom = atom<SubjectDTO[]>({
  key: 'subjects',
  default: initState,
});
const currentSubjectAtom = atom<SubjectDetailsDTO | null>({
  key: 'selected_subject',
  default: null,
});

function ToSubjectDTO(dto: SubjectDetailsDTO): SubjectDTO {
  const {chapters, ...subjectDTO} = dto;

  return {
    ...subjectDTO,
    chapterNumber: chapters ? chapters.length : 0,
  };
}

export const useRecoilSubjects = () => {
  const [subjects, setSubjects] = useRecoilState(subjectsAtom);
  const [currentSubject, setCurrentSubject] = useRecoilState(
    currentSubjectAtom,
  );

  const handleAddSubject = (newValue: SubjectDTO) => {
    setSubjects(curr => [...curr, newValue]);
  };
  const handleRemoveSubject = (id: string) => {
    setSubjects(curr => [...curr].filter(s => s.id !== id));
  };
  const updateSubject = (newValue: SubjectDTO) => {
    const index = subjects.findIndex(s => s.id === newValue.id);
    if (index > -1) {
      setSubjects(curr => replaceItemAtIndex([...curr], index, newValue));
    }
  };
  const handleUpdateCurrentSubject = (newValue: SubjectDetailsDTO) => {
    setCurrentSubject(newValue);
    updateSubject(ToSubjectDTO(newValue));
  };
  const getSubject = (subjectId: string) => {
    return subjects.find(s => s.id === subjectId);
  };

  return {
    addSubject: handleAddSubject,
    removeSubject: handleRemoveSubject,
    setCurrentSubject: setCurrentSubject,
    updateCurrentSubject: handleUpdateCurrentSubject,
    currentSubject,
    setSubjects,
    getSubject,
    subjects,
    resetSubjects: () => setSubjects(initState),
  };
};
