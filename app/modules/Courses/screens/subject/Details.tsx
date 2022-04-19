import React, {useEffect} from 'react';
import {StyleSheet, View} from 'react-native';
import {Header, Section} from '../../../../components/ui/layouts';
import {layouts} from '../../../../shared/styles';
import {HeaderTitle} from '../../../../components/ui/texts';
import {
  AdvancedButton,
  ContentLoader,
  FloatingButton,
  HeaderProgressBar,
  SuccessFailureBar,
  TopBar,
} from '../../../../components/ui';
import {ConfirmService, ToastService} from '../../../../shared/services';
import {SubjectApi} from '../../services/subject/api';
import {ModalNames, RouteNames} from '../../../../constants';
import {useRecoilSubjects} from '../../../../contexts/atoms';
import {ChapterList} from './components';

interface SubjectDetailProps {
  navigation: any;
  route: any;
}

export const SubjectDetails = ({navigation, route}: SubjectDetailProps) => {
  const id = route.params.id;
  const {
    currentSubject,
    addSubject,
    removeSubject,
    setCurrentSubject,
  } = useRecoilSubjects();

  useEffect(() => {
    let isSubscribed = true;
    async function loadData() {
      const response = await SubjectApi.getSubject(id);
      if (response.isRight() && isSubscribed) {
        const subjectDetails = response.value.getValue();
        setCurrentSubject(subjectDetails);
      }
    }
    if (id) {
      loadData();
    } else {
      navigation.goBack();
    }
    return () => {
      setCurrentSubject(null);
    };
  }, []);

  if (!currentSubject) return <ContentLoader />;

  // Menu
  const handleClickEdit = () => {
    navigation.push(RouteNames.SubjectUpdate);
  };
  const handleClickDuplicate = async () => {
    const {title, color, pictureUrl} = currentSubject;
    const payload = {
      title,
      color,
      pictureUrl,
    };
    const response = await SubjectApi.addSubject(payload);
    if (response.isRight()) {
      const newSubject = response.value.getValue();
      addSubject(newSubject);
      ToastService.showToast('Dupliqué avec succès !', 'success');
      navigation.goBack();
    } else {
      const error: string = response.value;
      ToastService.showToast(error, 'error');
    }
  };
  const handleClickShare = async () => {
    navigation.push(ModalNames.SearchMember, {
      callback: (memberId: string) =>
        navigation.push(ModalNames.Share, {
          targetId: memberId,
          subjectId: id,
        }),
    });
  };
  const handleClickSell = async () => {
    navigation.push(ModalNames.Sell, {subjectId: id});
  };
  const handleClickDelete = async () => {
    const confirm = await ConfirmService.show();
    if (confirm) {
      removeSubject(currentSubject.id);
      navigation.goBack();
      const response = await SubjectApi.deleteSubject(currentSubject.id);
      if (response.isRight()) {
        ToastService.showToast('Matière supprimée avec succès !', 'success');
      } else {
        const error: string = response.value;
        ToastService.showToast(error, 'error');
      }
    }
  };

  // Header Floating Button
  const handleClickTest = () => {
    if (!currentSubject || currentSubject.chapters.length < 1) return;
    navigation.navigate(ModalNames.TestSelection, {subjectId: id});
  };

  // Advanced Button
  const handleClickAdd = async () => {
    navigation.push(RouteNames.ChapterAdd);
  };

  // List item
  const {title, pictureUrl, color, chapters} = currentSubject;

  const sumCards = chapters.reduce(
    (total, obj) => obj.flashcardsNumber + total,
    0,
  );
  const sumCompletedCard = chapters.reduce(
    (total, obj) => obj.completedNumber + total,
    0,
  );
  const sumFailedCard = chapters.reduce(
    (total, obj) => obj.failedNumber + total,
    0,
  );

  const chapterProgress =
    chapters.length > 0
      ? chapters.filter(
          c =>
            c.flashcardsNumber > 0 && c.completedNumber === c.flashcardsNumber,
        ).length
      : 0;

  return (
    <View style={[layouts.container]}>
      <AdvancedButton icon="add" onPress={handleClickAdd} />
      <Header
        backgroundColor={color}
        imageSource={pictureUrl ? {uri: pictureUrl} : undefined}>
        <TopBar
          leftAction={{
            iconName: 'back',
            callback: () => navigation.goBack(),
          }}
          moreActions={[
            {
              name: 'Modifier',
              iconName: 'edit',
              callback: handleClickEdit,
            },
            {
              name: 'Dupliquer',
              iconName: 'duplicate',
              callback: handleClickDuplicate,
            },
            {
              name: 'Partager',
              iconName: 'share',
              callback: handleClickShare,
            },
            // {
            //   name: 'Vendre',
            //   iconName: 'sell',
            //   callback: handleClickSell,
            // },
            {
              iconName: 'delete',
              name: 'Supprimer',
              callback: handleClickDelete,
            },
          ]}
        />
        <HeaderTitle title={title} />
        <HeaderProgressBar
          value={chapterProgress}
          max={chapters.length}
          label={'chapitres'}
        />
        <FloatingButton
          icon={'play'}
          right={40}
          bottom={-30}
          size={32}
          onPress={handleClickTest}
        />
        <View style={{height: 20}} />
      </Header>
      <View style={layouts.content}>
        <Section title="Mes statistiques">
          <SuccessFailureBar
            total={sumCards}
            successValue={sumCompletedCard}
            failureValue={sumFailedCard}
            style={styles.successBar}
          />
        </Section>
        <Section title="Les chapitres">
          <ChapterList navigation={navigation} chapters={chapters} />
        </Section>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  progressBar: {},
  successBar: {
    width: '100%',
    marginVertical: 10,
  },
});
