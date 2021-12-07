import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {layouts} from '../../../../shared/styles';
import {TopBar} from '../../../../components/ui';
import {ToastService} from '../../../../shared/services';
import {ChapterForm, ChapterFormData} from './forms';
import {Colors} from '../../../../constants';
import {ChapterApi} from '../../services/chapter/api';
import {useRecoilChapters} from '../../../../contexts/atoms/chapters';
import {BaseScreenProps} from '../../../../shared/core/Screen';

interface UpdateChapterProps extends BaseScreenProps {}

export const UpdateChapter = ({navigation}: UpdateChapterProps) => {
  const {currentChapter, updateCurrentChapter} = useRecoilChapters();
  if (!currentChapter) return null;

  const [loading, setLoading] = useState<boolean>(false);

  const handleClickSave = async (data: ChapterFormData) => {
    if (!currentChapter) return;
    setLoading(true);
    const {title} = data;
    const payload = {
      title,
    };

    const response = await ChapterApi.updateChapter(currentChapter.id, payload);
    setLoading(false);
    if (response.isRight()) {
      // Api Result
      const updatedChapter = response.value.getValue();
      updateCurrentChapter(updatedChapter);
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
        <TopBar
          leftAction={{
            iconName: 'back',
            callback: () => navigation.goBack(),
          }}
          style={styles.topBar}
          color={Colors.dark}
        />
        <ChapterForm
          onSubmit={handleClickSave}
          initState={{
            title: currentChapter.title,
          }}
          loading={loading}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {width: '100%', marginTop: 40},
});
