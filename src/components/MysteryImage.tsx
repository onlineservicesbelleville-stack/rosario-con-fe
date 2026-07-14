import React from 'react';
import { Image, View, StyleSheet, StyleProp, ImageStyle } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { Colors } from '../constants/colors';

interface Props {
  /** Asset local via require(). Si falta, se muestra un placeholder visual. */
  imageSource?: number;
  style: StyleProp<ImageStyle>;
  iconSize?: number;
}

export function MysteryImage({ imageSource, style, iconSize = 28 }: Props) {
  if (!imageSource) {
    return (
      <View style={[styles.placeholder, style]}>
        <Ionicons name="image-outline" size={iconSize} color={Colors.textMuted} />
      </View>
    );
  }

  return <Image source={imageSource} style={style} resizeMode="cover" />;
}

const styles = StyleSheet.create({
  placeholder: {
    backgroundColor: Colors.backgroundAlt,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
