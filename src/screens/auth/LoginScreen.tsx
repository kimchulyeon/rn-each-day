import React from 'react';
import {
  Dimensions,
  Image,
  SafeAreaView,
  StyleSheet,
  TextInput,
  TouchableWithoutFeedback,
  View,
  Alert,
} from 'react-native';
import PrimaryButton from '@/components/common/PrimaryButton';
import {Keyboard} from 'react-native';

import useAuth from '@/hooks/apis/useAuth';

export default function LoginScreen() {
  const {loginMutation} = useAuth();

  const [inputs, setInputs] = React.useState({
    email: '',
    password: '',
  });
  const passwordRef = React.useRef<TextInput | null>(null);

  function onPressBackground() {
    Keyboard.dismiss();
  }

  async function onLogin() {
    loginMutation.mutate(inputs, {
      onError: (error: any) => {
        console.log(error.code);
        if (error.code === 'auth/email-already-in-use') {
          Alert.alert('이미 사용 중인 이메일 주소입니다.');
        }

        if (error.code === 'auth/invalid-email') {
          Alert.alert('유효하지 않은 이메일 주소입니다.');
        }

        if (error.code === 'auth/weak-password') {
          Alert.alert('비밀번호는 6자 이상이어야 합니다.');
        }
      },
    });
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
          <TextInput
            value={inputs.email}
            onChangeText={text => setInputs({...inputs, email: text})}
            style={styles.input}
            spellCheck={false}
            autoCorrect={false}
            autoCapitalize="none"
            returnKeyType="next"
            blurOnSubmit={false}
            placeholder="이메일"
            onSubmitEditing={() => passwordRef.current?.focus()}
          />
          <TextInput
            ref={passwordRef}
            value={inputs.password}
            onChangeText={text => setInputs({...inputs, password: text})}
            style={styles.input}
            spellCheck={false}
            autoCorrect={false}
            autoCapitalize="none"
            placeholder="비밀번호"
            onSubmitEditing={onLogin}
            secureTextEntry
          />
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
    gap: 3,
    flex: 2,
    width: Dimensions.get('screen').width * 0.8,
  },
  input: {
    borderWidth: 1,
    padding: 14,
    borderRadius: 5,
    marginBottom: 10,
  },
});
