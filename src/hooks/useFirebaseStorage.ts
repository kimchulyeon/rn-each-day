import storage from '@react-native-firebase/storage';

export default function useFirebaseStorage() {
  // 유저 프로필 이미지 업로드 함수
  async function uploadProfileImage(userId: string, imageUri: string) {
    const fileName = `users/${userId}/profile`;
    const reference = storage().ref(fileName);
    await reference.putFile(imageUri);
    console.log(`🚀 ${userId} 유저, ${imageUri} 이미지 Storage에 저장 >>>>>>`);
    return await reference.getDownloadURL();
  }

  // 피드 이미지 업로드 함수
  async function uploadFeedImages(
    userId: string,
    feedId: string,
    images: string[],
  ) {
    const uploadPromises = images.map(async (imageUri, index) => {
      const fileName = `users/${userId}/feeds/${feedId}_${index}.jpg`;
      const reference = storage().ref(fileName);

      await reference.putFile(imageUri);
      return await reference.getDownloadURL(); // 각 이미지의 다운로드 URL 반환
    });

    return Promise.all(uploadPromises); // 모든 이미지 URL을 배열로 반환
  }

  return {
    uploadProfileImage,
    uploadFeedImages,
  };
}
