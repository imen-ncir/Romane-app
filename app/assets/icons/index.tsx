import React from 'react';
import MaterialsIcon from 'react-native-vector-icons/MaterialIcons';
import Ionicon from 'react-native-vector-icons/Ionicons';
import FeatherIcon from 'react-native-vector-icons/Feather';
import MCIcon from 'react-native-vector-icons/MaterialCommunityIcons';
import FA5 from 'react-native-vector-icons/FontAwesome5';
import Ant from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import {Colors} from '../../constants';

export const getIcon = (
  icon: string,
  size: number = 24,
  color: string = Colors.white,
  focused: boolean = false,
  style?: any,
) => {
  let Icon: any = Ionicon;
  let iconName = '';

  switch (icon) {
    case 'money':
      iconName = 'euro-sign';
      Icon = FA5;
      break;
    case 'stripe':
      iconName = 'stripe';
      Icon = FA5;
      break;
    case 'remove':
      iconName = 'remove';
      Icon = MaterialsIcon;
      break;
    case 'download':
      iconName = 'download';
      Icon = Ant;
      break;
    case 'buy':
      iconName = 'euro';
      Icon = MaterialsIcon;
      break;
    case 'info':
      iconName = 'information';
      Icon = Ionicon;
      break;
    case 'chapter':
      iconName = 'ios-bookmarks-outline';
      Icon = Ionicon;
      break;
    case 'subject':
      iconName = 'ios-book-outline';
      Icon = Ionicon;
      break;
    case 'person-add':
      iconName = 'ios-person-add';
      Icon = Ionicon;
      break;
    case 'chevron-up':
      iconName = 'expand-less';
      Icon = MaterialsIcon;
      break;
    case 'chevron-down':
      iconName = 'expand-more';
      Icon = MaterialsIcon;
      break;
    case 'blocked':
      iconName = 'block';
      Icon = Entypo;
      break;
    case 'chat-bubble':
      iconName = 'md-chatbubbles';
      Icon = Ionicon;
      break;
    case 'share':
      iconName = 'ios-share-social';
      Icon = Ionicon;
      break;
    case 'message':
      iconName = 'message';
      Icon = MaterialsIcon;
      break;
    case 'chat':
      iconName = 'ios-chatbubbles-sharp';
      Icon = Ionicon;
      break;
    case 'hand':
      iconName = 'hand';
      Icon = Entypo;
      break;
    case 'card':
      iconName = 'creditcard';
      Icon = Ant;
      break;
    case 'transfert':
      iconName = 'swap';
      Icon = Ant;
      break;
    case 'check-outline':
      iconName = 'checkmark-circle-outline';
      Icon = Ionicon;
      break;
    case 'close-outline':
      iconName = 'close-circle-outline';
      Icon = Ionicon;
      break;
    case 'retry': {
      iconName = 'refresh';
      Icon = Ionicon;
      break;
    }
    case 'close': {
      iconName = 'close-outline';
      Icon = Ionicon;
      break;
    }
    case 'eye': {
      iconName = 'eye-outline';
      Icon = Ionicon;
      break;
    }
    case 'audio-play':
      iconName = 'play-circle-outline';
      Icon = Ionicon;
      break;
    case 'audio-pause':
      iconName = 'pause-circle-outline';
      Icon = Ionicon;
      break;
    case 'audio-stop':
      iconName = 'stop-circle-outline';
      Icon = Ionicon;
      break;
    case 'audio-listen':
      iconName = 'volume-medium-outline';
      Icon = Ionicon;
      break;
    case 'audio-record':
      iconName = 'microphone-outline';
      Icon = MCIcon;
      break;
    case 'stop':
      iconName = 'stop';
      Icon = MCIcon;
      break;
    case 'record':
      iconName = 'record';
      Icon = MCIcon;
      break;
    case 'picture':
      iconName = 'image-outline';
      Icon = Ionicon;
      break;
    case 'expand-more':
      iconName = 'chevron-forward';
      Icon = Ionicon;
      break;
    case 'expand-less':
      iconName = 'chevron-down';
      Icon = Ionicon;
      break;
    case 'expand':
      iconName = 'expand-more';
      Icon = MaterialsIcon;
      break;
    case 'more':
      iconName = 'more-vertical';
      Icon = FeatherIcon;
      break;
    case 'edit':
      iconName = 'square-edit-outline';
      Icon = MCIcon;
      break;
    case 'check':
      iconName = 'check';
      Icon = MaterialsIcon;
      break;
    case 'star':
      iconName = 'star';
      Icon = MaterialsIcon;
      break;
    case 'next':
      iconName = 'arrow-right';
      Icon = MCIcon;
      break;
    case 'back':
      iconName = 'keyboard-backspace';
      Icon = MCIcon;
      break;
    case 'play':
      iconName = 'play';
      Icon = Ionicon;
      break;
    case 'facebook':
      iconName = 'facebook';
      Icon = FA5;
      break;
    case 'google':
      iconName = 'google';
      Icon = FA5;
      break;
    case 'logout':
      iconName = 'log-in';
      Icon = FeatherIcon;
      break;
    case 'settings':
      iconName = 'settings';
      Icon = FeatherIcon;
      break;
    case 'search':
      iconName = 'search';
      Icon = Ionicon;
      break;
    case 'help':
      iconName = 'ios-help';
      Icon = Ionicon;
      break;
    case 'chevron-right':
      iconName = 'ios-chevron-forward';
      Icon = Ionicon;
      break;
    case 'add':
      iconName = 'add';
      Icon = Ionicon;
      break;
    case 'add-circle':
      iconName = 'add-circle-outline';
      Icon = Ionicon;
      break;
    case 'home':
      iconName = focused ? 'ios-home' : 'ios-home-outline';
      Icon = Ionicon;
      break;
    case 'chart':
      iconName = focused ? 'ios-stats-chart' : 'ios-stats-chart-outline';
      Icon = Ionicon;
      break;
    case 'shop':
      iconName = focused ? 'ios-cart' : 'ios-cart-outline';
      Icon = Ionicon;
      break;
    case 'user':
      iconName = focused ? 'ios-person' : 'ios-person-outline';
      Icon = Ionicon;
      break;
  }

  return <Icon name={iconName} color={color} size={size} style={style} />;
};
