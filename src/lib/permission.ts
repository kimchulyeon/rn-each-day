import {Platform} from 'react-native';
import {request, PERMISSIONS, RESULTS, check} from 'react-native-permissions';

export async function checkPhotoLibraryPermission() {
  let result = false;

  if (Platform.OS === 'android') {
    const status = await check(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
    switch (status) {
      case RESULTS.GRANTED:
      case RESULTS.LIMITED:
        result = true;
        break;
      default:
        result = false;
        break;
    }
  } else if (Platform.OS === 'ios') {
    const status = await check(PERMISSIONS.IOS.PHOTO_LIBRARY);
    switch (status) {
      case RESULTS.GRANTED:
      case RESULTS.LIMITED:
        result = true;
        break;
      default:
        result = false;
        break;
    }
  }

  return result;
}

// 사진 접근 권한 요청
export async function requestPhotoLibraryPermission() {
  let result = false;

  if (Platform.OS === 'android') {
    const status = await request(PERMISSIONS.ANDROID.READ_MEDIA_IMAGES);
    switch (status) {
      case RESULTS.GRANTED:
      case RESULTS.LIMITED:
        result = true;
        break;
      default:
        result = false;
        break;
    }
  } else if (Platform.OS === 'ios') {
    const status = await request(PERMISSIONS.IOS.PHOTO_LIBRARY);
    switch (status) {
      case RESULTS.GRANTED:
      case RESULTS.LIMITED:
        result = true;
        break;
      default:
        result = false;
        break;
    }
  }

  return result;
}
