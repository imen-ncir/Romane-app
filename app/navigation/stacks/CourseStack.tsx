import * as React from 'react';
import 'react-native-gesture-handler';
import {createStackNavigator} from '@react-navigation/stack';
import {RouteNames} from '../../constants';
import {Home, Search} from '../../modules/Courses';
import {
  AddSubject,
  SubjectDetails,
  UpdateSubject,
} from '../../modules/Courses/screens/subject';
import {
  AddChapter,
  ChapterDetails,
  UpdateChapter,
} from '../../modules/Courses/screens/chapter';
import {AddFlashcard} from '../../modules/Courses/screens/flashcard';
import {UpdateFlashcard} from '../../modules/Courses/screens/flashcard/UpdateFlashcard';
import {
  MoveChapterSubjectSelection,
  MovingChapterSelection,
  MovingSubjectSelection,
} from '../../modules/Courses/modals/moving';

const Stack = createStackNavigator();

export const CourseStack = () => {
  return (
    <Stack.Navigator initialRouteName={RouteNames.Home}>
      <Stack.Screen
        name={RouteNames.Home}
        component={Home}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RouteNames.Search}
        component={Search}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RouteNames.SubjectAdd}
        component={AddSubject}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RouteNames.SubjectDetails}
        component={SubjectDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RouteNames.SubjectUpdate}
        component={UpdateSubject}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RouteNames.ChapterAdd}
        component={AddChapter}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RouteNames.ChapterDetails}
        component={ChapterDetails}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RouteNames.ChapterUpdate}
        component={UpdateChapter}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RouteNames.FlashcardAdd}
        component={AddFlashcard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RouteNames.FlashcardUpdate}
        component={UpdateFlashcard}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RouteNames.MovingSubjectSelection}
        component={MovingSubjectSelection}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name={RouteNames.MovingChapterSelection}
        component={MovingChapterSelection}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  );
};
