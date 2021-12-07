import React, {FC, useEffect, useState} from 'react';
import {
  Animated,
  Dimensions,
  Keyboard,
  StyleSheet,
  TextInput,
} from 'react-native';
import {Colors} from '../../../constants';
import {ratio} from '../../../shared/utils';

const {State: TextInputState} = TextInput;

interface KeyboardShiftProps {
  children: any;
  offsetHeight?: number;
  backgroundColor?: string;
}

export const KeyboardShift: FC<KeyboardShiftProps> = ({
  children,
  offsetHeight = 60,
}: KeyboardShiftProps) => {
  const [shift] = useState(new Animated.Value(0));

  useEffect(() => {
    let keyboardDidShowSub = Keyboard.addListener(
      'keyboardDidShow',
      handleKeyboardDidShow,
    );
    let keyboardDidHideSub = Keyboard.addListener(
      'keyboardDidHide',
      handleKeyboardDidHide,
    );
    return () => {
      keyboardDidShowSub.remove();
      keyboardDidHideSub.remove();
    };
  }, []);

  const handleKeyboardDidShow = (event: any) => {
    const {height: windowHeight} = Dimensions.get('window');
    const keyboardHeight = event.endCoordinates.height;

    const currentlyFocusedInput = TextInputState.currentlyFocusedInput();
    if (currentlyFocusedInput) {
      currentlyFocusedInput.measure(
        (originX, originY, width, height, pageX, pageY) => {
          const fieldHeight = height;
          const fieldTop = pageY;
          const gap = windowHeight - keyboardHeight - (fieldTop + fieldHeight);
          if (gap >= 0) {
            return;
          }
          Animated.timing(shift, {
            toValue: gap - offsetHeight * ratio,
            duration: 500,
            useNativeDriver: true,
          }).start();
        },
      );
    }
  };

  const handleKeyboardDidHide = () => {
    Animated.timing(shift, {
      toValue: 0,
      duration: 500,
      useNativeDriver: true,
    }).start();
  };

  return (
    <Animated.View
      style={[styles.container, {transform: [{translateY: shift}]}]}>
      {children}
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.lightGray,
  },
});
