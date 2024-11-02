import storage from '@react-native-firebase/storage';

export default function useFirebaseStorage() {
  // 유저 프로필 이미지 업로드 함수
  async function uploadProfileImage(userId: string, imageUri: string) {
    const path = `users/${userId}/profile`;
    const reference = storage().ref(path);
    await reference.putFile(imageUri);
    console.log(`🚀 ${userId} 유저, ${imageUri} 이미지 Storage에 저장 >>>>>>`);
    return await reference.getDownloadURL();
  }

  // 피드 이미지 업로드 함수
  async function uploadFeedImages(userId: string, feedId: string, images: {id: string; uri: string}[]) {
    const uploadPromises = images.map(async (image, index) => {
      const fileName = `feeds/${userId}/${feedId}_${index}.jpg`;
      const reference = storage().ref(fileName);

      await reference.putFile(image.uri);
      return await reference.getDownloadURL();
    });

    return Promise.all(uploadPromises); // 모든 이미지 URL을 배열로 반환
  }

  return {
    uploadProfileImage,
    uploadFeedImages,
  };
}
