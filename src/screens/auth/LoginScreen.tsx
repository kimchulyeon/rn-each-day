import React from 'react';
import {
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
import useUserStore from '@/store/userStore';
import useLoadingStore from '@/store/loadingStore';
import Input from '@/components/common/Input';
import {Brown} from '@/constants';

export default function LoginScreen() {
  const {loginMutation} = useAuth();
  const {setIsLogin} = useUserStore();
  const {showLoading, hideLoading} = useLoadingStore();

  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = React.useState({
    email: '',
    password: '',
  });
  const [touched, setTouched] = React.useState({
    email: false,
    password: false,
  });
  const passwordRef = React.useRef<TextInput | null>(null);

  function onPressBackground() {
    Keyboard.dismiss();
  }

  async function onLogin() {
    showLoading();
    setErrors({email: '', password: ''});
    loginMutation.mutate(inputs, {
      onError: (error: any) => {
        console.log('wow', error.code);
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
      onSuccess: () => {
        setErrors({email: '', password: ''});
        setTouched({email: false, password: false});
        setIsLogin(true);
      },
      onSettled: () => {
        hideLoading();
      },
    });
  }

  function moveToSignup() {
    // TODO 회원가입 화면으로 이동
  }

  return (
    <TouchableWithoutFeedback onPress={onPressBackground}>
      <SafeAreaView style={styles.container}>
        <View style={styles.imgContainer}>
          <Image
            source={require('@/assets/eachdaylogo.webp')}
            resizeMode="contain"
            style={styles.image}
          />
        </View>

        <View style={styles.inputContainer}>
          <Input
            value={inputs.email}
            onChangeText={text => setInputs({...inputs, email: text})}
            error={errors.email}
            touched={touched.email}
            placeholder="이메일"
            returnKeyType="next"
            onFocus={() => setTouched({...touched, email: true})}
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
          <Input
            ref={passwordRef}
            value={inputs.password}
            onChangeText={text => setInputs({...inputs, password: text})}
            error={errors.password}
            touched={touched.password}
            placeholder="비밀번호"
            secureTextEntry
            onFocus={() => setTouched({...touched, password: true})}
            onSubmitEditing={onLogin}
          />
          <Pressable onPress={moveToSignup}>
            <Text style={styles.signupLink}>회원하러 가기</Text>
          </Pressable>
          <PrimaryButton
            onPress={onLogin}
            label="로그인"
            invalid={!inputs.email.trim() || !inputs.password.trim()}
          />
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
