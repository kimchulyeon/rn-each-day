import dayjs from 'dayjs';
import {FirebaseFirestoreTypes} from '@react-native-firebase/firestore';

export function formatServerTimeToYYYYMMDDHHMM(serverTime: FirebaseFirestoreTypes.FieldValue) {
  const dateObj = (serverTime as FirebaseFirestoreTypes.Timestamp).toDate();
  return dayjs(dateObj).format('YYYY-MM-DD HH:mm');
}

export function formatRelativeTime(serverTime: FirebaseFirestoreTypes.FieldValue) {
  const dateObj = (serverTime as FirebaseFirestoreTypes.Timestamp).toDate();
  const now = dayjs();
  const timeDifference = now.diff(dayjs(dateObj), 'minute');

  // 10분 이내
  if (timeDifference < 10) {
    return '방금';
  }

  // 10분 이상 1시간 이내
  if (timeDifference < 60) {
    return `${Math.floor(timeDifference)}분 전`;
  }

  // 1시간 이상 24시간 이내
  const hourDifference = now.diff(dayjs(dateObj), 'hour');
  if (hourDifference < 24) {
    return `${hourDifference}시간 전`;
  }

  // 24시간 이상 3일 이내
  const dayDifference = now.diff(dayjs(dateObj), 'day');
  if (dayDifference <= 3) {
    return `${dayDifference}일 전`;
  }

  // 1년 이내, 월-일 표시
  if (now.diff(dayjs(dateObj), 'year') < 1) {
    return dayjs(dateObj).format('M월 D일');
  }

  // 1년 이상
  const yearDifference = now.diff(dayjs(dateObj), 'year');
  return `${yearDifference}년 전`;
}
