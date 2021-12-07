import React from 'react';
import {View} from 'react-native';
import {layouts} from '../../../../shared/styles';
import {Header} from '../../../../components/ui/layouts';
import {
  HeaderTitle,
  TopBar,
  TwoColumnSubjectList,
} from '../../../../components/ui';
import {useRecoilSubjects} from '../../../../contexts/atoms';
import {RouteNames} from '../../../../constants';

export const MovingSubjectSelection = ({navigation, route}: any) => {
  const callback = route.params?.callback;
  const selectChapter = route.params?.selectChapter;
  const {subjects} = useRecoilSubjects();

  const handleSelectSubject = (subjectId: string) => {
    if (!!selectChapter && selectChapter == true) {
      navigation.navigate(RouteNames.MovingChapterSelection, {
        callback: (chapterId: string) => callback(chapterId),
        subjectId,
      });
    } else {
      if (callback) {
        callback(subjectId);
      }
      navigation.goBack();
    }
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
        <HeaderTitle title={'Déplacer'} />
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
