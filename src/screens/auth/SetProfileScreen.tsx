import Input from '@/components/common/Input';
import React, {useEffect} from 'react';
import {Dimensions, Image, Linking, StyleSheet, Text, TouchableOpacity} from 'react-native';
import {Alert, SafeAreaView, View} from 'react-native';
import {ImagePickerResponse, launchImageLibrary} from 'react-native-image-picker';
import {Brown} from '@/constants';
import PrimaryButton from '@/components/common/PrimaryButton';
import {checkPhotoLibraryPermission, requestPhotoLibraryPermission} from '@/lib/permission';
import useFirestore from '@/hooks/useFirestore';
import useFirebaseStorage from '@/hooks/useFirebaseStorage';
import useFirebaseAuth from '@/hooks/useFirebaseAuth';
import {resizeImage} from '@/lib/resizeImage';

export default function SetProfileScreen() {
  const {setUserProfileToDB} = useFirestore();
  const {uploadProfileImage} = useFirebaseStorage();
  const {checkCurrentUser} = useFirebaseAuth();

  const [isAllowed, setIsAllowed] = React.useState(false);
  const [displayName, setDisplayName] = React.useState('');
  const [photoUrl, setPhotoUrl] = React.useState<string | undefined>();

  // 사진 라이브러리 접근 권한 확인
  async function onPhotoLibraryPermission() {
    const IS_ALLOWED = await checkPhotoLibraryPermission();
    setIsAllowed(IS_ALLOWED);

    if (!IS_ALLOWED) {
      const requestStatus = await requestPhotoLibraryPermission();
      setIsAllowed(requestStatus);
    }
  }

  async function onTapAddProfile() {
    if (!isAllowed) {
      return Alert.alert('권한 필요', '사진 접근 권한이 필요합니다.', [
        {
          text: '확인',
          onPress: async () => {
            await Linking.openSettings();
          },
        },
      ]);
    }

    await launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        setPhotoUrl('');
        return;
      }
      onConfigureProfileImage(response);
    });
  }

  async function onConfigureProfileImage(response: ImagePickerResponse) {
    try {
      if (!response.assets) {
        Alert.alert('이미지를 불러오는데 실패했습니다.');
        return;
      }
      const uid = checkCurrentUser()?.uid;
      const selectedImageUri = response.assets[0].uri;
      const resizedSelectedImageUri = await resizeImage(selectedImageUri, 120, 120);
      if (uid && resizedSelectedImageUri) {
        const storedURL = await uploadProfileImage(uid, resizedSelectedImageUri);
        setPhotoUrl(storedURL);
      }
    } catch (error) {
      console.log(error);
      // Alert.alert('프로필 이미지 설정에 실패했습니다.');
    }
  }

  async function onSaveProfile() {
    try {
      await setUserProfileToDB(displayName, photoUrl);

      Alert.alert('프로필이 성공적으로 저장되었습니다.', '', [{text: '확인', onPress: moveToHome}]);
    } catch (error) {
      console.error('❌', error);
    }
  }

  function moveToHome() {
    console.log('홈으로 이동 >>>>>>>>');
    // https://reactnavigation.org/docs/auth-flow
    // userUserStore에서 상태값 업데이트해서 Navigator 교체 (공식 문서에서 권장?)
  }

  useEffect(() => {
    onPhotoLibraryPermission();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={onTapAddProfile}>
          {photoUrl ? (
            <Image source={{uri: photoUrl}} style={styles.profileImage} />
          ) : (
            <View style={styles.placeholder}>
              <Text style={styles.placeholderText}>프로필 이미지 추가</Text>
            </View>
          )}
        </TouchableOpacity>

        <Input
          style={styles.input}
          placeholder="닉네임을 입력하세요"
          maxLength={8}
          value={displayName}
          onChangeText={setDisplayName}
        />

        <PrimaryButton size="medium" onPress={onSaveProfile} label="저장" invalid={!displayName.trim()} />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  profileContainer: {
    alignItems: 'center',
    gap: 20,
  },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
  },
  placeholder: {
    width: 120,
    height: 120,
    borderRadius: 60,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ddd',
  },
  placeholderText: {
    color: '#888',
  },
  input: {
    width: Dimensions.get('screen').width * 0.5,
    borderColor: Brown.Primary,
  },
});
