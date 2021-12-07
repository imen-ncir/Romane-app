import React, {useEffect, useState} from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {layouts} from '../../../../shared/styles';
import {Header} from '../../../../components/ui/layouts';
import {
  ChapterSelectionList,
  ColorDot,
  ContentLoader,
  HeaderTitle,
  TopBar,
} from '../../../../components/ui';
import {ChapterDTO, SubjectApi} from '../../services';
import {theme} from '../../../../shared/styles/theme';
import {useRecoilSubjects} from '../../../../contexts/atoms';

export const MovingChapterSelection = ({navigation, route}: any) => {
  const subjectId = route.params?.subjectId;
  const callback = route.params?.callback;
  if (!subjectId) navigation.goBack();

  const {subjects} = useRecoilSubjects();
  const subject = subjects.find(f => f.id === subjectId);

  const [chapters, setChapters] = useState<ChapterDTO[]>();

  useEffect(() => {
    let isSubscribed = true;
    async function loadChapters() {
      const response = await SubjectApi.getSubject(subjectId);
      if (response.isRight() && isSubscribed) {
        const subjectDetails = response.value.getValue();
        setChapters(subjectDetails.chapters);
      }
    }
    loadChapters();
    return () => {
      isSubscribed = false;
    };
  }, []);

  const handleSelectChapter = (chapterId: string) => {
    if (callback) callback(chapterId);
    navigation.goBack();
  };

  if (!chapters || !subject) return <ContentLoader />;

  return (
    <View style={layouts.container}>
      <Header>
        <TopBar
          leftAction={{
            iconName: 'back',
            callback: () => navigation.goBack(),
          }}
        />
        <HeaderTitle title={'Partager'} />
        <View style={[layouts.row, {justifyContent: 'flex-start'}]}>
          <ColorDot color={subject.color} style={styles.dot} />
          <Text style={[theme.h4, {flex: 1}]}>{subject?.title}</Text>
        </View>
      </Header>
      <View style={[layouts.content]}>
        <ChapterSelectionList
          chapters={chapters}
          selection={[]}
          onPressItem={handleSelectChapter}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  dot: {
    marginRight: 10,
  },
});
