import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { BaseCard, IconButton } from '../../../../../components/ui';
import { layouts } from '../../../../../shared/styles';
import { Menu, ProgressBar } from 'react-native-paper';
import { Colors } from '../../../../../constants';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { ChapterDTO } from '../../../services/chapter/dto';

interface ChapterPreviewProps {
  item: ChapterDTO;
  onPressTest: any;
  onPressChapter: any;
  onPressDelete: any;
  onPressMove: any;
  style?: any;
}

export const ChapterPreview = ({
  item,
  style,
  onPressTest,
  onPressChapter,
  onPressDelete,
  onPressMove,
}: ChapterPreviewProps) => {
  const { title, flashcardsNumber, completedNumber } = item;

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
    <BaseCard style={[styles.container, style, { height: 80 }]}>
      <IconButton
        icon="play"
        onPress={onPressTest}
        style={styles.button}
        size={28}
      />
      <View style={[layouts.row]}>
        <View style={[styles.content]}>
          <TouchableOpacity onPress={onPressChapter}>
            <Text style={[styles.chapter]}>{title}</Text>
            <View style={[layouts.row, styles.bottom]}>
              <Text style={styles.number}>{`${flashcardsNumber} cartes`}</Text>
              <View style={[styles.progressContainer]}>
                {flashcardsNumber > 0 ?
                  <ProgressBar
                    progress={completedNumber / flashcardsNumber}
                    style={styles.progress}
                    color={Colors.green}
                  />
                  : <ProgressBar
                    progress={0}
                    style={styles.progress}
                    color={Colors.green}
                  />
                }
              </View>
            </View>
          </TouchableOpacity>
        </View>
        {renderMenu()}
      </View>
    </BaseCard>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    marginLeft: 20,
    height: 80,
    paddingLeft: 40,
    paddingHorizontal: 10,
    justifyContent: 'center',
  },
  button: {
    position: 'absolute',
    left: -20,
    top: 16,
    height: 48,
    width: 48,
  },
  content: {
    flex: 1,
  },
  moreIcon: {
    width: 20,
    backgroundColor: 'transparent',
  },
  chapter: {
    fontWeight: 'bold',
    color: Colors.darkGray,
    fontSize: 16,
  },
  bottom: {
    justifyContent: 'center',
    paddingVertical: 5,
  },
  number: {
    color: Colors.dark,
    fontSize: 14,
  },
  progressContainer: {
    flex: 1,
    paddingHorizontal: 10,
  },
  progress: {
    height: 10,
    borderRadius: 8,
    backgroundColor: Colors.gray,
  },
});
