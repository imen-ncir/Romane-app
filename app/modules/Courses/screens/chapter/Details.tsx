import React, {useEffect, useState} from 'react';
import {View} from 'react-native';
import {Header} from '../../../../components/ui/layouts';
import {layouts} from '../../../../shared/styles';
import {HeaderTitle} from '../../../../components/ui/texts';
import {
  AdvancedButton,
  ContentLoader,
  FloatingButton,
  TopBar,
} from '../../../../components/ui';
import {ConfirmService, ToastService} from '../../../../shared/services';
import {ERROR_GENERIC, ModalNames, RouteNames} from '../../../../constants';
import {ChapterApi} from '../../services/chapter/api';
import {useRecoilChapters} from '../../../../contexts/atoms/chapters';
import {BaseScreenProps} from '../../../../shared/core/Screen';
import {FlashcardList} from './components';
import {TestApi} from '../../../Tests';
import {useRecoilSubjects} from '../../../../contexts/atoms';

interface ChapterDetailProps extends BaseScreenProps {}

export const ChapterDetails = ({navigation, route}: ChapterDetailProps) => {
  const {subjects} = useRecoilSubjects();
  const [loading, setLoading] = useState<boolean>(false);
  const id = route.params.id;
  const {
    currentChapter,
    addChapter,
    removeChapter,
    setCurrentChapter,
  } = useRecoilChapters();

  useEffect(() => {
    let isSubscribed = true;
    async function loadData() {
      const response = await ChapterApi.getChapter(id);
      if (response.isRight() && isSubscribed) {
        const chapterDetails = response.value.getValue();
        setCurrentChapter(chapterDetails);
      }
    }
    if (id) {
      loadData();
    } else {
      navigation.goBack();
    }
  }, []);

  if (!currentChapter) return <ContentLoader />;

  // Menu
  const handleClickEdit = () => {
    navigation.push(RouteNames.ChapterUpdate);
  };
  const handleClickDuplicate = async () => {
    if (!currentSubject) return;

    setLoading(true);
    const {title} = currentChapter;
    const payload = {
      title,
    };
    const response = await ChapterApi.addChapterToSubject(
      currentSubject.id,
      payload,
    );
    setLoading(false);
    if (response.isRight()) {
      const newChapter = response.value.getValue();
      // Api Result
      addChapter(newChapter);
      ToastService.showToast('Dupliqué avec succès !', 'success');
      navigation.goBack();
    } else {
      const error: string = response.value;
      ToastService.showToast(error, 'error');
    }
  };
  const handleClickDelete = async () => {
    const confirm = await ConfirmService.show();
    if (confirm) {
      removeChapter(currentChapter.id);
      navigation.goBack();
      const response = await ChapterApi.deleteChapter(currentChapter.id);
      if (response.isRight()) {
        ToastService.showToast('Chapitre supprimé avec succès !', 'success');
      } else {
        const error: string = response.value;
        ToastService.showToast(error, 'error');
      }
    }
  };
  const handlePressMove = async () => {
    navigation.push(RouteNames.MovingSubjectSelection, {
      callback: handleMoveChapter,
    });
  };
  const handleMoveChapter = async (subjectId: string) => {
    setLoading(true);
    const response = await ChapterApi.moveChapter(id, {
      targetSubjectId: subjectId,
    });
    setLoading(false);
    if (response.isRight()) {
      removeChapter(id);
      navigation.goBack();
      ToastService.showToast('Déplacé avec succès !');
    } else {
      ToastService.showToast(ERROR_GENERIC, 'error', response.value.toString());
    }
  };

  // Header Floating Button
  const handleClickTest = async () => {
    if (!currentChapter || currentChapter.flashcards.length < 1) return;

    const response = await TestApi.generateTest([id]);
    if (response.isRight()) {
      navigation.navigate(ModalNames.Test, {
        test: response.value.getValue(),
      });
    } else {
      ToastService.showToast(response.value, 'error');
    }
  };

  // Advanced Button
  const handleClickAdd = async () => {
    navigation.push(RouteNames.FlashcardAdd);
  };

  const currentSubject = subjects.find(s => s.id === currentChapter.subjectId);
  if (!currentSubject) return null;

  const {color, pictureUrl} = currentSubject;
  const {title, flashcards} = currentChapter;

  return (
    <View style={[layouts.container]}>
      <AdvancedButton
        icon="add"
        onPress={handleClickAdd}
        loading={loading}
        disabled={loading}
      />
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
              name: 'Déplacer',
              iconName: 'move',
              callback: handlePressMove,
            },
            {
              name: 'Dupliquer',
              iconName: 'duplicate',
              callback: handleClickDuplicate,
            },
            {
              iconName: 'delete',
              name: 'Supprimer',
              callback: handleClickDelete,
            },
          ]}
        />
        <HeaderTitle title={title} />
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
        <FlashcardList navigation={navigation} flashcards={flashcards} />
      </View>
    </View>
  );
};
