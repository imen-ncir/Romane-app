import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {layouts} from '../../../../shared/styles';
import {CustomStatusBar, TopBar} from '../../../../components/ui';
import {ToastService} from '../../../../shared/services';
import {ChapterForm, ChapterFormData} from './forms';
import {useRecoilSubjects} from '../../../../contexts/atoms/subjects';
import {Colors} from '../../../../constants';
import {ChapterApi} from '../../services/chapter/api';
import {useRecoilChapters} from '../../../../contexts/atoms/chapters';
import {BaseScreenProps} from '../../../../shared/core/Screen';

interface AddChapterProps extends BaseScreenProps {}

export const AddChapter = ({navigation}: AddChapterProps) => {
  const {currentSubject} = useRecoilSubjects();
  const {addChapter} = useRecoilChapters();
  if (!currentSubject) return null;

  const [loading, setLoading] = useState<boolean>(false);

  const handleClickSave = async (data: ChapterFormData) => {
    setLoading(true);
    const {title} = data;
    const payload = {
      title,
    };
    const response = await ChapterApi.addChapterToSubject(
      currentSubject.id,
      payload,
    );
    setLoading(false);
    if (response.isRight()) {
      // Api Result
      const newChapter = response.value.getValue();

      // Update App State
      addChapter(newChapter);

      ToastService.showToast('Enregistré avec succès !', 'success');
      navigation.goBack();
    } else {
      const error: string = response.value;
      ToastService.showToast(error, 'error');
    }
  };

  return (
    <View style={[layouts.container]}>
      <View style={layouts.content}>
        <CustomStatusBar mode={'dark'} />
        <TopBar
          leftAction={{
            iconName: 'back',
            callback: () => navigation.goBack(),
          }}
          style={styles.topBar}
          color={Colors.dark}
        />
        <ChapterForm onSubmit={handleClickSave} loading={loading} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {width: '100%'},
});
