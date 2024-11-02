import React from 'react';
import {Gray} from '@/constants';
import {Image, ImageProps, StyleProp, StyleSheet, TouchableOpacity, View, ViewStyle} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';

interface IImageWithDeleteButtonProps extends ImageProps {
  id: string;
  onDelete: (id: string) => void;
  containerStyle: StyleProp<ViewStyle>;
}

export default function ImageWithDeleteButton({id, onDelete, containerStyle, ...props}: IImageWithDeleteButtonProps) {
  return (
    <View style={[styles.container, containerStyle]}>
      <Image {...props} style={[styles.image]} />
      <TouchableOpacity style={styles.deleteButton} onPress={() => onDelete(id)}>
        <Icon name="close-outline" />
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'relative',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 10,
    resizeMode: 'cover',
  },
  deleteButton: {
    position: 'absolute',
    top: 5,
    right: 5,
    backgroundColor: Gray.LIGHT,
    borderRadius: 8,
    width: 16,
    height: 16,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
