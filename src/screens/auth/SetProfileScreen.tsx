import Input from '@/components/common/Input';
import React, {useEffect} from 'react';
import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
} from 'react-native';
import {Alert, Platform, SafeAreaView, View} from 'react-native';
import {request, PERMISSIONS, RESULTS} from 'react-native-permissions';
import {launchImageLibrary} from 'react-native-image-picker';
import {Brown} from '@/constants';
import PrimaryButton from '@/components/common/PrimaryButton';
import useUserStore from '@/store/userStore';
import useFirestore from '@/hooks/useFirestore';

export default function SetProfileScreen() {
  const {user, setUserStore} = useUserStore();
  const {setUserDataToDB} = useFirestore();

  const [isAllowed, setIsAllowed] = React.useState(false);
  const [displayName, setDisplayName] = React.useState('');
  const [photoUrl, setPhotoUrl] = React.useState<string | undefined>();

  function requestPhotoLibraryPermission() {
    if (Platform.OS === 'android') {
      request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES).then(status => {
        switch (status) {
          case RESULTS.GRANTED:
            setIsAllowed(true);
            break;
          case RESULTS.LIMITED:
            setIsAllowed(true);
            break;
          default:
            setIsAllowed(false);
            break;
        }
      });
    } else if (Platform.OS === 'ios') {
      request(PERMISSIONS.IOS.PHOTO_LIBRARY).then(status => {
        console.log(status);
        switch (status) {
          case RESULTS.GRANTED:
            setIsAllowed(true);
            console.log('허용됨');
            break;
          case RESULTS.LIMITED:
            setIsAllowed(true);
            console.log('허용됨');
            break;
          default:
            setIsAllowed(false);
            break;
        }
      });
    }
  }

  async function selectImage() {
    if (!isAllowed) {
      return Alert.alert('권한 필요', '사진 접근 권한이 필요합니다.');
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

  async function saveProfile() {
    try {
      console.log('DISPLAYNAME', displayName);
      const newUserData = {...user, displayName, photoUrl};
      console.log('newUserData : ', newUserData);
      setUserStore({...user, displayName, photoUrl});
      await setUserDataToDB({});

      Alert.alert('프로필이 성공적으로 저장되었습니다.');
    } catch (error) {
      console.log(error);
      Alert.alert('오류', '프로필 저장에 실패했습니다.');
    }
  }

  useEffect(() => {
    requestPhotoLibraryPermission();
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.profileContainer}>
        <TouchableOpacity onPress={selectImage}>
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
          onPress={saveProfile}
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
