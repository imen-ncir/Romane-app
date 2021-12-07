import React, {useEffect} from 'react';
import {View, Text} from 'react-native';
import {layouts} from '../../../../shared/styles';
import {Header} from '../../../../components/ui/layouts';
import {
  HeaderTitle,
  TopBar,
  TwoColumnSubjectList,
} from '../../../../components/ui';
import {useRecoilSubjects} from '../../../../contexts/atoms';
import {theme} from '../../../../shared/styles/theme';
import {RouteNames} from '../../../../constants';

export const ShareSubjectSelection = ({navigation, route}: any) => {
  const targetId: string = route.params?.targetId;
  const subjectId: string = route.params?.subjectId;

  useEffect(() => {
    if (subjectId) {
      navigation.push(RouteNames.ShareSelectChapter, {subjectId, targetId});
    }
  }, []);

  const {subjects} = useRecoilSubjects();

  const handleSelectSubject = (subjectId: string) => {
    navigation.push(RouteNames.ShareSelectChapter, {subjectId, targetId});
  };

  return (
    <View style={layouts.container}>
      <Header>
        <TopBar
          leftAction={{
            iconName: 'back',
            callback: () => navigation.popToTop(),
          }}
        />
        <HeaderTitle title={'Partager'} />
        <Text style={[theme.h4]}>Lorem ipsum Lorem ipsum Lorem ipsum ?</Text>
      </Header>
      <View style={[layouts.content]}>
        <TwoColumnSubjectList
          subjects={subjects}
          withColumnOffset={true}
          columnOffsetType={'right'}
          columnOffset={30}
          onPressItem={handleSelectSubject}
        />
      </View>
    </View>
  );
};
