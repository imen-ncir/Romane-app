import React from 'react';
import {StyleSheet, View, Platform, Dimensions} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getIcon} from '../../../assets/icons';
import {Colors} from '../../../constants';
import {layouts} from '../../../shared/styles';
import {Menu, Divider} from 'react-native-paper';

const {width} = Dimensions.get('window');
interface TopBarAction {
  iconName: string;
  name?: string;
  isDangerous?: boolean;
  callback: () => void;
}

interface TopBarProps {
  leftAction?: TopBarAction;
  rightAction?: TopBarAction;
  moreActions?: TopBarAction[];
  style?: any;
  color?: string;
}

function renderAction(action: TopBarAction, color: string = Colors.white) {
  if (!action) return null;
  return (
    <TouchableOpacity onPress={action.callback} style={styles.iconButton}>
      {getIcon(action.iconName, 28, color, false, styles.icon)}
    </TouchableOpacity>
  );
}
function renderMoreActions(
  actions: TopBarAction[],
  visible: boolean,
  openMenu: any,
  closeMenu: any,
  color: string = Colors.white,
) {
  if (!actions) return null;

  return (
    <Menu
      visible={visible}
      onDismiss={closeMenu}
      contentStyle={{
        width: width / 2,
      }}
      anchor={
        <TouchableOpacity onPress={openMenu} style={styles.iconButton}>
          {getIcon('more', 28, color, false, styles.icon)}
        </TouchableOpacity>
      }>
      {actions &&
        actions.map((action, index) => {
          return (
            <View key={index}>
              {index !== 0 && <Divider />}
              <Menu.Item
                titleStyle={{
                  color:
                    action.iconName === 'delete' || action.isDangerous
                      ? Colors.googleRed
                      : Colors.purple,
                  fontWeight: 'bold',
                  fontSize: 20,
                }}
                onPress={() => {
                  action.callback();
                  closeMenu();
                }}
                title={action.name}
              />
            </View>
          );
        })}
    </Menu>
  );
}

export const TopBar = ({
  leftAction,
  rightAction,
  moreActions,
  style,
  color,
}: TopBarProps) => {
  const [visible, setVisible] = React.useState(false);
  const openMenu = () => setVisible(true);
  const closeMenu = () => setVisible(false);

  return (
    <View style={[layouts.row, styles.topBar, style]}>
      <View style={styles.leftContent}>
        {leftAction && renderAction(leftAction, color)}
      </View>
      <View style={[layouts.row, styles.rightContent]}>
        <View style={{marginRight: moreActions ? 20 : 0}}>
          {rightAction && renderAction(rightAction, color)}
        </View>
        {moreActions &&
          renderMoreActions(moreActions, visible, openMenu, closeMenu, color)}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  leftContent: {},
  rightContent: {},
  icon: {},
  iconButton: {},
  topBar: {
    // paddingTop: 10,
    height: Platform.OS === 'android' ? 30 : 30,
  },
});
