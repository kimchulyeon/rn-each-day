import Input from '@/components/common/Input';
import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  Linking,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Alert, SafeAreaView, View} from 'react-native';
import {launchImageLibrary} from 'react-native-image-picker';
import {Brown} from '@/constants';
import PrimaryButton from '@/components/common/PrimaryButton';
import useUserStore from '@/store/userStore';
import useFirestore from '@/hooks/useFirestore';
import {
  checkPhotoLibraryPermission,
  requestPhotoLibraryPermission,
} from '@/lib/permission';

export default function SetProfileScreen() {
  const {user, setUserStore} = useUserStore();
  const {setUserDataToDB} = useFirestore();

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

    launchImageLibrary({mediaType: 'photo'}, response => {
      if (response.didCancel) {
        setPhotoUrl('');
        return;
      }
      if (response.assets) {
        setPhotoUrl(response.assets[0].uri);
      }
    });
  }

  async function onSaveProfile() {
    try {
      const newUserData = {...user, displayName, photoUrl};
      setUserStore({...newUserData, photoUrl});
      await setUserDataToDB({...newUserData, photoUrl});

      Alert.alert('프로필이 성공적으로 저장되었습니다.', '', [
        {text: '확인', onPress: moveToHome},
      ]);
    } catch (error) {
      console.log(error);
      Alert.alert('오류', '프로필 저장에 실패했습니다.');
    }
  }

  function moveToHome() {
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

        <PrimaryButton
          size="medium"
          onPress={onSaveProfile}
          label="저장"
          invalid={!displayName.trim()}
        />
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
