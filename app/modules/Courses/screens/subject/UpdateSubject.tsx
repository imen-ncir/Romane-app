import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {layouts} from '../../../../shared/styles';
import {TopBar} from '../../../../components/ui';
import {ToastService} from '../../../../shared/services';
import {SubjectForm, SubjectFormData} from './forms';
import {SubjectApi} from '../../services/subject/api';
import {useRecoilSubjects} from '../../../../contexts/atoms/subjects';
import {Colors} from '../../../../constants';

interface UpdateSubjectProps {
  navigation: any;
}

export const UpdateSubject = ({navigation}: UpdateSubjectProps) => {
  const {currentSubject, updateCurrentSubject} = useRecoilSubjects();
  if (!currentSubject) return null;

  const [loading, setLoading] = useState<boolean>(false);

  const handleClickSave = async (data: SubjectFormData) => {
    setLoading(true);
    const {title, color, picture} = data;
    const payload = {
      title,
      color,
      pictureUrl: picture,
    };
    const response = await SubjectApi.updateSubject(currentSubject.id, payload);
    setLoading(false);
    if (response.isRight()) {
      // Api Result
      const newSubject = response.value.getValue();

      // Update App State
      updateCurrentSubject(newSubject);

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
        <SubjectForm
          onSubmit={handleClickSave}
          initState={{
            title: currentSubject.title,
            color: currentSubject.color,
            picture: currentSubject.pictureUrl,
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
