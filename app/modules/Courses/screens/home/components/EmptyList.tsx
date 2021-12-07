import React from 'react';
import {StyleSheet, View, Text} from 'react-native';
import {getIcon} from '../../../../../assets/icons';
import {PrimaryButton} from '../../../../../components/ui';
import {Colors} from '../../../../../constants';
import {layouts} from '../../../../../shared/styles';
import {theme} from '../../../../../shared/styles/theme';

export interface EmptyListProps {
  onPress: () => void;
}

export const EmptyList = ({onPress}: EmptyListProps) => {
  return (
    <View style={styles.container}>
      <View style={[layouts.row]}>
        {getIcon('hand', 36, Colors.darkGray)}
        <Text style={[theme.title, styles.black, styles.title]}>
          Bienvenu !
        </Text>
        {getIcon('hand', 36, Colors.darkGray, false, styles.rotate)}
      </View>
      <Text style={[theme.h2, styles.black, styles.text]}>
        Tu n'as pas encore de matière, clique sur le bouton ci-dessous pour en
        ajouter !
      </Text>
      {getIcon('expand', 40, Colors.darkGray)}
      <PrimaryButton
        text="Ajouter une matière"
        onPress={onPress}
        style={styles.button}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  rotate: {
    transform: [{rotateY: '180deg'}],
  },
  container: {
    flex: 1,
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  title: {
    fontWeight: 'bold',
    marginHorizontal: 10,
  },
  text: {
    textAlign: 'center',
    fontWeight: '300',
  },
  black: {
    color: Colors.darkGray,
  },
  button: {
    paddingHorizontal: 40,
  },
});
