import React, {useCallback, useEffect, useState} from 'react';
import {View, StyleSheet, Text, Alert} from 'react-native';
import {layouts} from '../../../../shared/styles';
import {Header} from '../../../../components/ui/layouts';
import {
  AdvancedButton,
  ChapterSelectionList,
  ColorDot,
  HeaderTitle,
  TopBar,
  TwoColumnSubjectList,
} from '../../../../components/ui';
import Swiper from 'react-native-swiper';
import StepIndicator from 'react-native-step-indicator';
import {getIcon} from '../../../../assets/icons';
import {useRecoilSubjects} from '../../../../contexts/atoms';
import {ChapterDTO, SubjectApi} from '../../../Courses/services';
import {
  Colors,
  ERROR_GENERIC,
  ModalNames,
  REQUIREMENT,
} from '../../../../constants';
import {theme} from '../../../../shared/styles/theme';
import {ActivityIndicator} from 'react-native-paper';
import {PackInfoForm, PackInfoFormData} from './forms';
import {PRICE_PER_CARDS} from '../../../../constants/app';
import {ShopApi} from '../../services';
import {ToastService} from '../../../../shared/services';
import {toMoneyFormat} from '../../../../shared/utils';
import {useRecoilPacks} from '../../../../contexts/atoms/packs';
import {BaseScreenProps} from '../../../../shared/core/Screen';
import {PaymentApi} from '../../../Shared/api/payment';

const steps: {index: number; label: string}[] = [
  {index: 0, label: 'Matière'},
  {index: 1, label: 'Chapitres'},
  {index: 2, label: 'Information'},
];

const renderStepIcon = ({
  position,
  stepStatus,
}: {
  position: number;
  stepStatus: string;
}) => {
  let iconConfig = {
    name: 'home',
    color: stepStatus === 'current' ? Colors.purple : Colors.white,
    size: 15,
  };
  switch (position) {
    case 0:
      iconConfig.name = 'subject';
      break;
    case 1:
      iconConfig.name = 'chapter';
      break;
    case 2:
      iconConfig.name = 'info';
      break;
    default:
      break;
  }
  return getIcon(iconConfig.name, iconConfig.size, iconConfig.color);
};
const renderStepLabel = ({
  position,
  label,
  currentPosition,
}: {
  position: number;
  stepStatus: string;
  label: string;
  currentPosition: number;
}) => {
  return (
    <Text
      style={[
        theme.paragraph,
        position === currentPosition
          ? styles.stepLabelSelected
          : styles.stepLabel,
      ]}>
      {label}
    </Text>
  );
};

export const SellingModal = ({navigation, route}: BaseScreenProps) => {
  const subjectId = route.params?.subjectId;
  const {subjects} = useRecoilSubjects();
  const {addPack} = useRecoilPacks();
  const [currentStep, setCurrentStep] = useState<number>(0);

  const [loading, setLoading] = useState<boolean>(false);
  const [selectedSubject, setSelectedSubject] = useState<string>(subjectId);
  const [chapters, setChapters] = useState<ChapterDTO[]>();
  const [selection, setSelection] = useState<string[]>([]);

  useEffect(() => {
    let isSubscribed = true;
    async function loadSubject() {
      if (selectedSubject) {
        setLoading(true);
        const response = await SubjectApi.getSubject(selectedSubject);
        setLoading(false);
        if (response.isRight() && isSubscribed) {
          const subjectDetails = response.value.getValue();
          setChapters(subjectDetails.chapters);
        }
      } else {
        setChapters([]);
      }
    }
    loadSubject();
    return () => {
      isSubscribed = false;
    };
  }, [selectedSubject]);

  useEffect(() => {
    if (subjectId) {
      goNext();
    }
  }, []);

  const handleSelectSubject = useCallback((subjectId: string) => {
    setSelectedSubject(subjectId);
    goNext();
  }, []);
  const handleSelectChapter = useCallback(
    (chapterId: string) => {
      if (selection.includes(chapterId)) {
        setSelection(curr => curr.filter(id => id !== chapterId));
      } else {
        setSelection(curr => [...curr, chapterId]);
      }
    },
    [selection],
  );
  const handleValidateChapter = () => {
    goNext();
  };
  const handlePressChapterOverview = useCallback((chapterId: string) => {
    navigation.push(ModalNames.FlashcardsOverview, {
      id: chapterId,
    });
  }, []);
  const handleSellPack = async (data: PackInfoFormData) => {
    if (!selectedSubject || !selection || !data) return;

    const canSell = data.isFree ? true : await PaymentApi.canSell();
    if (canSell) {
      const response = await ShopApi.sellPack({
        subjectId: selectedSubject,
        chapterIds: selection,
        ...data,
      });
      if (response.isRight()) {
        addPack(response.value.getValue());
        ToastService.showToast(
          'Mise en ligne réussie',
          'success',
          `Votre pack est maintenant disponible sur le store.`,
        );
        navigation.goBack();
      } else {
        ToastService.showToast(
          ERROR_GENERIC,
          'error',
          response.value.toString(),
        );
      }
    } else {
      Alert.alert(
        REQUIREMENT,
        'Vous devez créer un compte vendeur dans votre profil afin de pouvoir vendre des packs.',
      );
    }
  };

  const goNext = () => {
    if (currentStep < 2) setCurrentStep(curr => curr + 1);
  };
  const goBack = () => {
    if (currentStep > 0) {
      setCurrentStep(curr => curr - 1);
    } else {
      navigation.goBack();
    }
  };
  const getFlashcardNumbers = useCallback(() => {
    let selectedFlashcardNumber = 0;
    if (chapters && selection && selection.length > 0) {
      chapters
        .filter(c => selection.includes(c.id))
        .forEach(c => {
          selectedFlashcardNumber += c.flashcardsNumber;
        });
    }
    return selectedFlashcardNumber;
  }, [selection]);

  const renderHeaderInfo = useCallback(() => {
    if (currentStep > 0 && selectedSubject) {
      const subject = subjects.find(s => s.id === selectedSubject);
      if (!!subject) {
        const cardNumbers = getFlashcardNumbers();
        const price = toMoneyFormat(cardNumbers * PRICE_PER_CARDS);
        return (
          <View style={[layouts.row, {alignItems: 'flex-end'}]}>
            <View style={{flex: 1}}>
              <HeaderTitle title="Vendre" />
              <View style={layouts.row}>
                <ColorDot color={subject.color} style={styles.dot} />
                <Text style={[theme.h4, {flex: 1}]}>{subject.title}</Text>
              </View>
            </View>
            <View style={{alignItems: 'flex-end'}}>
              <Text
                style={[theme.h4]}>{`${getFlashcardNumbers()} cartes`}</Text>
              <Text
                style={[theme.h3, {fontWeight: 'bold'}]}>{`${price} €`}</Text>
            </View>
          </View>
        );
      }
    }
    return <HeaderTitle title="Vendre" />;
  }, [selectedSubject, selection, currentStep]);
  const renderStepContent = useCallback(
    (step: number) => {
      let children = null;

      switch (step) {
        case 0:
          children = (
            <TwoColumnSubjectList
              subjects={subjects}
              withColumnOffset={true}
              columnOffsetType={'right'}
              columnOffset={30}
              onPressItem={handleSelectSubject}
            />
          );
          break;
        case 1:
          children = loading ? (
            <ActivityIndicator />
          ) : (
            <>
              <ChapterSelectionList
                chapters={chapters || []}
                selection={selection}
                onPressItem={handleSelectChapter}
                onPressOverview={handlePressChapterOverview}
                emptyComponent={
                  <Text
                    style={[
                      theme.h4,
                      {color: Colors.dark, textAlign: 'center'},
                    ]}>
                    Aucun chapitre
                  </Text>
                }
              />
              <AdvancedButton icon="check" onPress={handleValidateChapter} />
            </>
          );
          break;
        case 2:
          children = <PackInfoForm onSubmit={handleSellPack} />;
          break;
        default:
          break;
      }
      return (
        <View key={step} style={styles.page}>
          {children}
        </View>
      );
    },
    [currentStep, chapters, loading, selection],
  );

  return (
    <View style={layouts.container}>
      <Header style={{paddingBottom: 10}}>
        <TopBar
          leftAction={{
            iconName: 'back',
            callback: goBack,
          }}
        />
        {renderHeaderInfo()}
      </Header>
      <View style={styles.stepIndicator}>
        <StepIndicator
          customStyles={indicatorStyle}
          currentPosition={currentStep}
          stepCount={steps.length}
          renderStepIndicator={params => renderStepIcon(params)}
          labels={steps.map(s => s.label)}
          renderLabel={renderStepLabel}
        />
      </View>
      <Swiper
        style={{flexGrow: 1}}
        loop={false}
        index={currentStep}
        autoplay={false}
        showsPagination={false}
        scrollEnabled={false}
        nextButton={false}
        showsVerticalScrollIndicator={false}
        showsHorizontalScrollIndicator={false}
        alwaysBounceVertical={false}
        alwaysBounceHorizontal={false}
        onIndexChanged={index => {
          setCurrentStep(index);
        }}>
        {steps.map(({index}) => renderStepContent(index))}
      </Swiper>
    </View>
  );
};

const styles = StyleSheet.create({
  page: {
    flex: 1,
    padding: 20,
  },
  stepIndicator: {
    marginTop: 10,
  },
  stepLabel: {
    color: Colors.dark,
  },
  stepLabelSelected: {
    color: Colors.purple,
    fontWeight: 'bold',
  },
  dot: {
    marginRight: 10,
  },
  estimate: {
    color: Colors.white,
  },
});

const indicatorStyle = {
  stepIndicatorSize: 30,
  currentStepIndicatorSize: 40,
  separatorStrokeWidth: 3,
  separatorFinishedColor: Colors.purple,
  separatorUnFinishedColor: Colors.gray,
  stepStrokeWidth: 3,
  stepIndicatorFinishedColor: Colors.purple,
  stepIndicatorUnFinishedColor: Colors.gray,
  stepIndicatorCurrentColor: '#ffffff',
  currentStepStrokeWidth: 5,
  stepStrokeCurrentColor: Colors.purple,
  stepStrokeFinishedColor: Colors.purple,
  stepStrokeUnFinishedColor: Colors.gray,
  currentStepIndicatorLabelFontSize: 15,
  stepIndicatorLabelFontSize: 15,
  stepIndicatorLabelCurrentColor: '#000000',
  stepIndicatorLabelFinishedColor: '#ffffff',
  stepIndicatorLabelUnFinishedColor: Colors.dark,
  labelColor: Colors.dark,
  labelSize: 12,
  currentStepLabelColor: Colors.purple,
};
