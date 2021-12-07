import React from 'react';
import {Keyboard} from 'react-native';
import {TouchableWithoutFeedback} from 'react-native-gesture-handler';

export const DismissKeyboard = ({children, style}: any) => (
  <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()} style={[style]}>
    {children}
  </TouchableWithoutFeedback>
);
