import React, {useState} from 'react';
import {Dimensions, View} from 'react-native';
import {layouts} from '../../../../shared/styles';
import {CustomStatusBar, TopBar} from '../../../../components/ui';
import {Colors} from '../../../../constants';
import {useRecoilChapters} from '../../../../contexts/atoms/chapters';
import {BaseScreenProps} from '../../../../shared/core/Screen';
import {useRecoilFlashcards} from '../../../../contexts/atoms/flashcards';
import {
  FlashcardAnswerForm,
  FlashcardAnswerFormData,
  FlashcardQuestionForm,
  FlashcardQuestionFormData,
} from './forms';
import {SceneMap, TabView} from 'react-native-tab-view';
import {FlashcardTabBar} from './components';
import {ToastService, UploadService} from '../../../../shared/services';
import {FlashcardApi} from '../../services';
import {FlashcardTypes} from '../../../../constants/app';
import {useAuthContext} from '../../../../contexts/auth.context';

const {width, height} = Dimensions.get('screen');

const RoutePlaceHolder = () => <View></View>;
const QuestionTab = (
  callback: any,
  question?: FlashcardQuestionFormData,
  loading?: boolean,
) => (
  <FlashcardQuestionForm
    onSubmit={callback}
    initState={question}
    loading={loading}
  />
);
const AnswerTab = (
  callback: any,
  answer?: FlashcardAnswerFormData,
  loading?: boolean,
) => (
  <FlashcardAnswerForm
    onSubmit={callback}
    initState={answer}
    loading={loading}
  />
);
const tabRoutes = [
  {key: 'question', title: 'Question'},
  {key: 'answer', title: 'Réponse'},
];

interface AddFlashcardProps extends BaseScreenProps {}

export const AddFlashcard = ({navigation}: AddFlashcardProps) => {
  const {uid} = useAuthContext();
  const {currentChapter} = useRecoilChapters();
  const {addFlashcard} = useRecoilFlashcards();
  if (!currentChapter || !uid || !addFlashcard) return null;
  const uploadFolder = `${uid}/flashcards/`;

  const [loading, setLoading] = useState<boolean>(false);

  const [question, setQuestion] = useState<
    FlashcardQuestionFormData | undefined
  >(undefined);
  const [answer, setAnswer] = useState<FlashcardAnswerFormData | undefined>(
    undefined,
  );

  const [index, setIndex] = React.useState(0);
  const [routes] = React.useState(tabRoutes);
  const renderScene = SceneMap({
    question: () => QuestionTab(handleSaveQuestion, question, loading),
    answer: () => AnswerTab(handleSaveAnswer, answer, loading),
  });

  const handleSaveQuestion = async (data: FlashcardQuestionFormData) => {
    setQuestion(data);
    setIndex(1);
  };
  const handleSaveAnswer = async (data: FlashcardAnswerFormData) => {
    setAnswer(data);
    handleSave(question, data);
  };

  // Uploading file to firebase
  const uploadFile = async (uri?: string): Promise<string | undefined> => {
    if (!uri) return;
    const fileName = uri.substring(uri.lastIndexOf('/') + 1, uri.length);
    const url = await UploadService.uploadToStorage(
      uri,
      uploadFolder,
      fileName,
    );
    return url;
  };
  const buildQuestionPayload = async (question: FlashcardQuestionFormData) => {
    const {text, audioFileUri, pictureFileUri} = question;
    let result = {
      text,
    } as any;

    if (pictureFileUri) result.pictureUrl = await uploadFile(pictureFileUri);
    if (audioFileUri) result.audioUrl = await uploadFile(audioFileUri);

    return result;
  };
  const buildAnswerPayload = async (answer: FlashcardAnswerFormData) => {
    const {type, textValue, flashcardValue, multipleValues} = answer;
    let value: any = {};
    switch (type) {
      case FlashcardTypes.TEXT:
        value = {
          text: textValue,
        };
        break;
      case FlashcardTypes.FLASHCARD:
        if (flashcardValue) {
          value = {
            text: flashcardValue?.text,
            audioUrl: await uploadFile(flashcardValue?.audioFileUri),
          };
        }
        break;
      case FlashcardTypes.MULTIPLE:
        let values: any[] = [];
        if (multipleValues) {
          for (let i = 0; i < multipleValues?.length; i++) {
            const val = multipleValues[i];
            values.push({
              text: val.text,
              audioUrl: await uploadFile(val?.audioFileUri),
              isRight: val.isRight,
            });
          }
        }
        value = values;
        break;
      default:
        break;
    }

    return {type, value};
  };
  //

  const handleSave = async (
    question?: FlashcardQuestionFormData,
    answer?: FlashcardAnswerFormData,
  ) => {
    if (!question) {
      ToastService.showToast('Vous devez remplir la question', 'error');
      return;
    }
    if (!answer) {
      ToastService.showToast('Vous devez remplir la réponse', 'error');
      return;
    }
    setLoading(true);
    const qPlayload = await buildQuestionPayload(question);
    const aPayload = await buildAnswerPayload(answer);

    const payload = {
      question: qPlayload,
      answer: aPayload,
    };

    const response = await FlashcardApi.addFlashcardToChapter(
      currentChapter.id,
      payload,
    );
    setLoading(false);
    if (response.isRight()) {
      // Api Result
      const newFlashcard = response.value.getValue();
      // Update App State
      addFlashcard(newFlashcard);
      ToastService.showToast('Enregistré avec succès !', 'success');
      navigation.goBack();
    } else {
      const error: string = response.value;
      ToastService.showToast(error, 'error');
    }
  };

  return (
    <View style={[layouts.container]}>
      <View style={[layouts.content]}>
        <CustomStatusBar mode={'dark'} />
        <TopBar
          leftAction={{
            iconName: 'back',
            callback: () => navigation.goBack(),
          }}
          color={Colors.dark}
        />
        <TabView
          swipeEnabled={false}
          navigationState={{index, routes}}
          onIndexChange={setIndex}
          renderScene={renderScene}
          renderTabBar={FlashcardTabBar}
          initialLayout={{width: width, height: height}}
          lazy={false}
          renderLazyPlaceholder={RoutePlaceHolder}
          lazyPreloadDistance={0}
          tabBarPosition="top"
        />
      </View>
    </View>
  );
};
