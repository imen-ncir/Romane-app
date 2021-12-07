import React, {useState} from 'react';
import {StyleSheet, View} from 'react-native';
import {layouts} from '../../../../shared/styles';
import {CustomStatusBar, TopBar} from '../../../../components/ui';
import {ToastService} from '../../../../shared/services';
import {SubjectForm, SubjectFormData} from './forms';
import {SubjectApi} from '../../services/subject/api';
import {useRecoilSubjects} from '../../../../contexts/atoms/subjects';
import {Colors} from '../../../../constants';

interface AddSubjectProps {
  navigation: any;
  route: any;
}

export const AddSubject = ({navigation}: AddSubjectProps) => {
  const {addSubject} = useRecoilSubjects();

  const [loading, setLoading] = useState<boolean>(false);

  const handleClickSave = async (data: SubjectFormData) => {
    setLoading(true);
    const {title, color, picture} = data;
    const payload = {
      title,
      color,
      pictureUrl: picture,
    };
    const response = await SubjectApi.addSubject(payload);
    setLoading(false);
    if (response.isRight()) {
      // Api Result
      const newSubject = response.value.getValue();

      // Update App State
      addSubject(newSubject);

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
        <SubjectForm onSubmit={handleClickSave} loading={loading} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  topBar: {width: '100%'},
});
