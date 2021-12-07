import {atom, useRecoilState} from 'recoil';
import {PackDTO} from '../../modules/Shop';
import {replaceItemAtIndex} from '../../shared/utils';

const initState: PackDTO[] = [];

export const packsAtom = atom<PackDTO[]>({
  key: 'packs',
  default: initState,
});

export const useRecoilPacks = () => {
  const [packs, setPacks] = useRecoilState(packsAtom);

  const addPack = (newValue: PackDTO) => {
    setPacks(curr => [...curr, newValue]);
  };
  const removePack = (id: string) => {
    setPacks(curr => [...curr].filter(s => s.id !== id));
  };
  const updatePack = (newValue: PackDTO) => {
    const index = packs.findIndex(s => s.id === newValue.id);
    if (index > -1) {
      setPacks(curr => replaceItemAtIndex([...curr], index, newValue));
    }
  };

  return {
    addPack,
    updatePack,
    removePack,
    resetPacks: () => setPacks(initState),
    packs,
    setPacks,
  };
};
