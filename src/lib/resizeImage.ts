import ImageResizer from '@bam.tech/react-native-image-resizer';

export async function resizeImage(
  imageUri: string | undefined,
  width: number,
  height: number,
  quality: number = 100,
) {
  if (!imageUri) {
    return null;
  }

  try {
    const response = await ImageResizer.createResizedImage(
      imageUri,
      width,
      height,
      'JPEG',
      quality,
    );
    return response.uri;
  } catch (error) {
    console.log('❌ 이미지 최적화 실패', error);
    return null;
  }
}
