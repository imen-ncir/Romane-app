import React from 'react';
import {StyleSheet, Text} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {getIcon} from '../../../../assets/icons';
import {BaseCard} from '../../../../components/ui';
import {Colors} from '../../../../constants';
import {app} from '../../../../shared/styles';
import {theme} from '../../../../shared/styles/theme';

interface OptionProps {
  title: string;
  description?: string;
  icon?: string;
  onPress?: any;
  style?: any;
}

export const Option = ({
  title,
  description,
  icon,
  onPress,
  style,
}: OptionProps) => {
  return (
    <BaseCard style={[app.softShadows, style]}>
      <TouchableOpacity style={[styles.content]} onPress={onPress}>
        {icon && getIcon(icon, 64, Colors.purple)}
        <Text style={[theme.h4, styles.title]}>{title}</Text>
        <Text style={[theme.paragraph, styles.description]}>{description}</Text>
      </TouchableOpacity>
    </BaseCard>
  );
};

const styles = StyleSheet.create({
  content: {
    alignItems: 'center',
    alignContent: 'center',
    justifyContent: 'center',
  },
  title: {
    marginTop: 20,
    color: Colors.darkGray,
    fontWeight: 'bold',
  },
  description: {
    textAlign: 'center',
  },
});
