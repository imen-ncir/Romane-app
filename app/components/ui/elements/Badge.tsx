import React from 'react';
import {Image, StyleSheet, Text, View} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {Modal, Portal} from 'react-native-paper';
import {b1, b2, b3, b4} from '../../../assets/images/badges';
import {Colors} from '../../../constants';
import {BadgeDTO} from '../../../modules/Profile/services/dto';

interface BadgeProps {
  item: BadgeDTO;
  size?: number;
  style?: any;
}

// const DEFAULT_AVATAR_URL =
//   'https://avatar-management--avatars.us-west-2.prod.public.atl-paas.net/default-avatar.png';

const getBadge = (id: string) => {
  switch (id) {
    case '1':
      return b1;
    case '2':
      return b2;
    case '3':
      return b3;
    case '4':
      return b4;
    default:
      return b1;
  }
};

const ratio = 1.5;
export const Badge = ({item, size = 64, style}: BadgeProps) => {
  const [visible, setVisible] = React.useState(false);
  const showModal = () => setVisible(true);
  const hideModal = () => setVisible(false);
  return (
    <>
      <View style={{height: size, width: size, margin: 5}}>
        <TouchableOpacity disabled={!item.enabled} onPress={showModal}>
          <View
            style={[
              styles.wrapper,
              {height: size, width: size, backgroundColor: item.color},
              style,
              !item.enabled ? styles.wrapperDisabled : null,
            ]}></View>
          <Image
            source={getBadge(item.id)}
            style={[
              styles.badge,
              {
                height: size * ratio,
                width: size * ratio,
                left: -(size / ratio / 3),
                top: -(size / ratio / 5),
                borderRadius: size,
              },
              !item.enabled ? styles.disabled : null,
            ]}
          />
        </TouchableOpacity>
      </View>
      <Portal>
        <Modal
          visible={visible}
          onDismiss={hideModal}
          contentContainerStyle={modalStyle.modal}>
          <View style={modalStyle.hero}>
            <View style={[modalStyle.wrapper, {backgroundColor: item.color}]}>
              <Image source={getBadge(item.id)} style={modalStyle.badge} />
            </View>
          </View>
          <Text style={modalStyle.badgeTitle}>Titre du badge</Text>
          <Text style={modalStyle.paragraph}>
            Vestibulum semper mauris lorem, et bibendum lacus sollicitudin ut.
            Vestibulum semper mauris lorem, et bibendum lacus sollicitudin ut.
            Vestibulum semper mauris lorem, et bibendum lacus sollicitudin ut.
          </Text>
        </Modal>
      </Portal>
    </>
  );
};

const modalStyle = StyleSheet.create({
  modal: {
    backgroundColor: Colors.white,
    padding: 40,
    margin: 20,
    borderRadius: 12,
    alignItems: 'center',
  },
  badgeTitle: {
    fontSize: 18,
    color: Colors.darkGray,
    fontWeight: 'bold',
    marginTop: 20,
  },
  paragraph: {
    fontSize: 14,
    color: Colors.darkGray,
    marginVertical: 10,
    textAlign: 'center',
  },
  hero: {
    position: 'absolute',
    top: -60,
  },
  wrapper: {
    borderRadius: 50,
    zIndex: 2,
    height: 100,
    width: 100,
  },
  badge: {
    height: 128,
    width: 128,
    top: -10,
    left: -10,
    borderColor: Colors.white,
  },
});

const styles = StyleSheet.create({
  wrapper: {
    borderRadius: 50,
    zIndex: 2,
  },
  badge: {
    zIndex: 3,
    borderColor: Colors.white,
    position: 'absolute',
  },
  wrapperDisabled: {
    opacity: 0.1,
    backgroundColor: Colors.darkGray,
  },
  disabled: {
    zIndex: 1,
    opacity: 0.3,
  },
});
