import React from 'react';
import {StyleSheet, View} from 'react-native';
import ImageWithDeleteButton from '../common/ImageWithDeleteButton';
import useFeedStore from '@/store/useFeedStore';

export default function AddFeedSelectedImageView({images}: {images: {id: string; uri: string}[]}) {
  const {removeImage} = useFeedStore();

  function onDeleteImage(id: string) {
    removeImage(id);
  }

  if (images.length === 1) {
    return (
      <View style={[styles.singleImageContainer, styles.imageContainer]}>
        <ImageWithDeleteButton
          id={images[0].id}
          source={{uri: images[0].uri}}
          containerStyle={styles.singleImage}
          onDelete={onDeleteImage}
        />
      </View>
    );
  }
  if (images.length === 2) {
    return (
      <View style={[styles.doubleImageContainer, styles.imageContainer]}>
        {images.map(image => (
          <ImageWithDeleteButton
            id={image.id}
            key={image.id}
            source={{uri: image.uri}}
            containerStyle={styles.doubleImage}
            onDelete={onDeleteImage}
          />
        ))}
      </View>
    );
  }
  if (images.length === 3) {
    return (
      <View style={[styles.tripleImageContainer, styles.imageContainer]}>
        <ImageWithDeleteButton
          id={images[0].id}
          source={{uri: images[0].uri}}
          containerStyle={styles.tripleImageTop}
          onDelete={onDeleteImage}
        />
        <View style={styles.tripleImageBottomContainer}>
          {images.slice(1).map(image => (
            <ImageWithDeleteButton
              id={image.id}
              key={image.id}
              source={{uri: image.uri}}
              containerStyle={styles.tripleImageBottom}
              onDelete={onDeleteImage}
            />
          ))}
        </View>
      </View>
    );
  }
  return null;
}

const styles = StyleSheet.create({
  imageContainer: {
    flex: 1,
    padding: 10,
  },
  singleImageContainer: {
    width: '100%',
    height: '100%',
  },
  singleImage: {
    width: '100%',
    height: '100%',
  },
  doubleImageContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '100%',
  },
  doubleImage: {
    width: '48%',
    height: '100%',
  },
  tripleImageContainer: {
    flex: 1,
  },
  tripleImageTop: {
    width: '100%',
    height: '60%',
    marginBottom: 5,
  },
  tripleImageBottomContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    height: '40%',
  },
  tripleImageBottom: {
    width: '49%',
    height: '100%',
  },
});
