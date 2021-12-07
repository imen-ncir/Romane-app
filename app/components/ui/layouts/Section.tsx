import React from 'react';
import {View, StyleSheet, Text} from 'react-native';
import {app, layouts} from '../../../shared/styles';
import {typos} from '../../../shared/styles/typos';

interface SectionProps {
  title?: string;
  children?: any;
  style?: any;
}

export const Section = ({title, children, style}: SectionProps) => (
  <View style={[layouts.section, style]}>
    <Text style={[app.text, typos.sectionTitle, styles.sectionTitle]}>
      {title}
    </Text>
    {children}
  </View>
);

const styles = StyleSheet.create({
  sectionTitle: {
    textAlign: 'left',
  },
});
