import React from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Pressable,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import PrimaryButton from '@/components/common/PrimaryButton';
import {Keyboard} from 'react-native';
import useAuth from '@/hooks/apis/useAuth';
import useLoadingStore from '@/store/loadingStore';
import Input from '@/components/common/Input';
import {Brown} from '@/constants';
import {StackNavigationProp} from '@react-navigation/stack';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import useFirestore from '@/hooks/useFirestore';

export default function LoginScreen({navigation}: {navigation: StackNavigationProp<AuthStackParamList>}) {
  const {loginMutation} = useAuth();
  const {showLoading, hideLoading} = useLoadingStore();
  const {getUserDataFromDB} = useFirestore();

  const [inputs, setInputs] = React.useState({
    email: 'test@test.com',
    password: '123123',
  });
  const [errors, setErrors] = React.useState({
    email: '',
    password: '',
  });
  const passwordRef = React.useRef<TextInput | null>(null);

  function onPressBackground() {
    Keyboard.dismiss();
  }

  async function onLogin() {
    resetErrors();
    showLoading();
    loginMutation.mutate(inputs, {
      onError: (error: any) => {
        setErrors(prevErrors => {
          if (error.code === 'auth/invalid-credential') {
            return {
              ...prevErrors,
              password: '이메일 또는 비밀번호가 일치하지 않습니다.',
            };
          } else if (error.code === 'auth/invalid-email') {
            return {...prevErrors, email: '유효하지 않은 이메일 주소입니다.'};
          } else {
            return {...prevErrors, email: '알 수 없는 오류가 발생했습니다.'};
          }
        });
      },
      onSuccess: async res => {
        console.log(res.user);
        const IS_FIRST_LOGIN = !res.user.displayName;

        if (IS_FIRST_LOGIN) {
          // 회원가입 후 첫 로그인 (프로필 설정 화면으로 이동)
          navigation.navigate('Auth_SetProfile');
        } else {
          // 일반 로그인 : 파이어베이스에서 uid로 유저 정보 가져오기
          // 유저 정보가 있으면 AsyncStorage, 전역상태에 저장하고 메인 화면으로 이동
          console.log('🚀 프로필 설정 완료 한 사용자 로그인');
          const userData = await getUserDataFromDB(res.user.uid);
          if (!userData) {
            Alert.alert('유저 정보를 불러오는데 실패했습니다. 새로 회원가입해주세요.');
          }
        }
      },
      onSettled: hideLoading,
    });
  }

  function resetErrors() {
    setErrors({email: '', password: ''});
  }

  function moveToSignup() {
    navigation.navigate('Auth_Signup');
  }

  return (
    <TouchableWithoutFeedback onPress={onPressBackground}>
      <SafeAreaView style={styles.container}>
        <View style={styles.imgContainer}>
          <Image source={require('@/assets/eachdaylogo.webp')} resizeMode="contain" style={styles.image} />
        </View>

        <View style={styles.inputContainer}>
          <Input
            value={inputs.email}
            onChangeText={text => setInputs({...inputs, email: text})}
            error={errors.email}
            placeholder="이메일"
            returnKeyType="next"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
          <Input
            ref={passwordRef}
            value={inputs.password}
            onChangeText={text => setInputs({...inputs, password: text})}
            error={errors.password}
            placeholder="비밀번호"
            secureTextEntry
            onSubmitEditing={onLogin}
          />
          <Pressable onPress={moveToSignup}>
            <Text style={styles.signupLink}>회원가입하러 가기</Text>
          </Pressable>
          <PrimaryButton onPress={onLogin} label="로그인" invalid={!inputs.email.trim() || !inputs.password.trim()} />
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    flex: 1,
  },
  imgContainer: {
    flex: 1,
    width: Dimensions.get('screen').width * 0.8,
  },
  image: {
    width: '100%',
    height: '100%',
  },
  inputContainer: {
    gap: 15,
    flex: 2,
    width: Dimensions.get('screen').width * 0.8,
  },
  signupLink: {
    alignSelf: 'flex-end',
    color: Brown.Secondary,
    width: '50%',
    textAlign: 'right',
    padding: 8,
  },
});
