import React, {useEffect} from 'react';
import AddFeedSelectedImageView from '@/components/feed/AddFeedSelectedImageView';
import FeedProfile from '@/components/feed/FeedProfile';
import {Gray, Salgu} from '@/constants';
import useFeedStore from '@/store/useFeedStore';
import {
  Alert,
  Keyboard,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {resizeImage} from '@/lib/resizeImage';

export default function AddFeedScreen() {
  const {content, images, updateContent, updateImages, resetFeed} = useFeedStore();

  const IMAGE_LIMIT = 3;

  useEffect(() => {
    return () => {
      resetFeed();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  async function onAddImage() {
    await launchImageLibrary({mediaType: 'photo', selectionLimit: IMAGE_LIMIT - images.length}, async response => {
      if (response.didCancel) {
        return;
      }
      if (!response.assets) {
        Alert.alert('이미지를 불러오는데 실패했습니다.');
        return;
      }
      const newImages = await Promise.all(
        response.assets.map(async (asset, index) => {
          const resizedImage = await resizeImage(asset.uri, 500, 500);
          return {id: `${asset.uri}_${index}`, uri: resizedImage};
        }),
      );

      const filteredImages = newImages.filter((image): image is {id: string; uri: string} => image !== null);
      updateImages(filteredImages);
    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <FeedProfile />
      </View>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.inputContainer}>
          <TextInput
            autoFocus
            value={content}
            onChangeText={updateContent}
            placeholder="오늘은 무슨 일이 있었나요?"
            multiline
            autoCapitalize="none"
            spellCheck={false}
            autoCorrect={false}
          />
        </View>
      </TouchableWithoutFeedback>
      {images.length < IMAGE_LIMIT && (
        <Pressable style={styles.addImageButton} onPress={onAddImage}>
          <Text style={styles.addImageText}>사진 추가</Text>
        </Pressable>
      )}
      <AddFeedSelectedImageView images={images} />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    borderBottomWidth: 1,
    borderBottomColor: Gray.LIGHT,
    paddingVertical: 10,
  },
  inputContainer: {
    flex: 1,
    padding: 10,
  },
  addImageButton: {
    margin: 10,
    borderRadius: 5,
    padding: 10,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: Salgu.Primary,
  },
  addImageText: {
    color: Gray.DEFAULT,
  },
});
