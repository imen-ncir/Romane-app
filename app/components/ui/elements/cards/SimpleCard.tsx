import React from 'react';
import {StyleSheet, ImageBackground} from 'react-native';
import {app} from '../../../../shared/styles';

export interface SimpleCardProps {
  imageSource?: any;
  imageUrl?: any;
  size?: number;
  height?: number;
  width?: number;
  children?: any;
  style?: any;
  centered?: boolean;
}

const DEFAULT_SIZE = 'auto';

export const SimpleCard = ({
  imageSource,
  imageUrl,
  children,
  size,
  height,
  width,
  style,
  centered = false,
}: SimpleCardProps) => {
  const cardHeight = height ? height : size ? size : DEFAULT_SIZE;
  const cardWidth = width ? width : size ? size : DEFAULT_SIZE;

  return (
    <ImageBackground
      source={
        imageUrl ? {uri: imageUrl} : imageSource ? imageSource : undefined
      }
      style={[
        styles.simpleCard,
        app.shadow,
        style,
        {
          width: cardWidth,
          height: cardHeight,
          alignItems: centered ? 'center' : 'flex-start',
          justifyContent: centered ? 'center' : 'flex-start',
        },
      ]}
      imageStyle={[app.coverImage, styles.image]}>
      {children}
    </ImageBackground>
  );
};

const styles = StyleSheet.create({
  simpleCard: {
    borderRadius: 12,
    padding: 10,
  },
  image: {
    borderRadius: 12,
  },
});
