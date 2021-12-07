import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {BaseCard, IconButton} from '../../../../../components/ui';
import {layouts} from '../../../../../shared/styles';
import {Menu} from 'react-native-paper';
import {Colors, RouteNames} from '../../../../../constants';
import {FlashcardDTO} from '../../../services/flashcard/dto';
import {useNavigation} from '@react-navigation/core';
import {FlashcardApi} from '../../../services';

interface FlashcardPreviewProps {
  item: FlashcardDTO;
  onPressFlashcard: any;
  onPressDelete?: any;
  onPressMove: any;
  style?: any;
}

export const FlashcardPreview = ({
  item,
  style,
  onPressFlashcard,
  onPressMove,
  onPressDelete,
}: FlashcardPreviewProps) => {
  const {question} = item;

  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);
  const renderMenu = () => {
    return (
      <Menu
        visible={visible}
        onDismiss={closeMenu}
        anchor={
          <IconButton
            icon="more"
            iconColor={Colors.darkGray}
            style={styles.moreIcon}
            onPress={openMenu}
          />
        }>
        <Menu.Item
          titleStyle={{
            color: Colors.purple,
            fontWeight: 'bold',
            fontSize: 20,
          }}
          onPress={() => {
            closeMenu();
            onPressMove();
          }}
          title={'Déplacer'}
        />
        <Menu.Item
          titleStyle={{
            color: Colors.googleRed,
            fontWeight: 'bold',
            fontSize: 20,
          }}
          onPress={() => {
            closeMenu();
            onPressDelete();
          }}
          title={'Supprimer'}
        />
      </Menu>
    );
  };

  return (
    <BaseCard style={[styles.container, layouts.row, style, {height: 80}]}>
      <View style={[styles.content]}>
        <TouchableOpacity onPress={onPressFlashcard}>
          <Text style={[styles.question]}>{question}</Text>
        </TouchableOpacity>
      </View>
      {onPressDelete && renderMenu()}
    </BaseCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    height: 80,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  content: {
    flex: 1,
  },
  moreIcon: {
    width: 20,
    backgroundColor: 'transparent',
  },
  question: {
    fontWeight: 'bold',
    color: Colors.darkGray,
    fontSize: 16,
  },
});
