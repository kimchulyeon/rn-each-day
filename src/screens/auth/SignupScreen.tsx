import Input from '@/components/common/Input';
import PrimaryButton from '@/components/common/PrimaryButton';
import {Brown} from '@/constants';
import useAuth from '@/hooks/apis/useAuth';
import {AuthStackParamList} from '@/navigations/stack/AuthStackNavigator';
import useLoadingStore from '@/store/loadingStore';
import {StackNavigationProp} from '@react-navigation/stack';
import React from 'react';
import {
  Alert,
  Dimensions,
  Image,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
} from 'react-native';

export default function SignupScreen({
  navigation,
}: {
  navigation: StackNavigationProp<AuthStackParamList>;
}) {
  const {signupMutation} = useAuth();
  const {showLoading, hideLoading} = useLoadingStore();

  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
    passwordCheck: '',
  });
  const [errors, setErrors] = React.useState({
    email: '',
    password: '',
    passwordCheck: '',
  });

  const passwordRef = React.useRef<TextInput | null>(null);
  const passwordCheckRef = React.useRef<TextInput | null>(null);

  function onPressBackground() {
    Keyboard.dismiss();
  }

  function isValidate(): boolean {
    if (inputs.password !== inputs.passwordCheck) {
      setErrors(prevErrors => ({
        ...prevErrors,
        passwordCheck: '비밀번호가 일치하지 않습니다.',
      }));
      return false;
    }

    return true;
  }

  function onSignup() {
    resetErrors();
    if (isValidate() === false) {
      return;
    }
    showLoading();

    const {email, password} = inputs;

    signupMutation.mutate(
      {email, password},
      {
        onSuccess: () => {
          Alert.alert('회원가입 성공');
          // TODO 사용자 닉네임, 프로필 이미지 설정 페이지로 이동
          navigation.navigate('Auth_Main');
        },
        onSettled: hideLoading,
        onError: (error: any) => {
          console.log(error.code);
          setErrors(prevErrors => {
            if (error.code === 'auth/email-already-in-use') {
              return {
                ...prevErrors,
                email: '이미 사용중인 이메일입니다.',
              };
            } else if (error.code === 'auth/invalid-email') {
              return {...prevErrors, email: '유효하지 않은 이메일 주소입니다.'};
            } else if (error.code === 'auth/weak-password') {
              return {
                ...prevErrors,
                password: '비밀번호는 6자 이상이어야 합니다.',
                passwordCheck: '비밀번호는 6자 이상이어야 합니다.',
              };
            } else {
              return {...prevErrors, email: '알 수 없는 오류가 발생했습니다.'};
            }
          });
        },
      },
    );
  }

  function resetErrors() {
    setErrors({email: '', password: '', passwordCheck: ''});
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
            onSubmitEditing={() => passwordCheckRef.current?.focus()}
          />
          <Input
            ref={passwordCheckRef}
            value={inputs.passwordCheck}
            onChangeText={text => setInputs({...inputs, passwordCheck: text})}
            error={errors.passwordCheck}
            placeholder="비밀번호 확인"
            secureTextEntry
            onSubmitEditing={onSignup}
          />
          <PrimaryButton
            onPress={onSignup}
            label="회원가입"
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
