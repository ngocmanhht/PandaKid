import {
  StyleSheet,
  Text,
  View,
  Image,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import React from 'react';
import Container from '../../../components/Container';
import Header from '../../../components/header';
import { fontSize, sizeHeight, sizeWidth } from '../../../utils/Utils';
import { HStack, VStack, useToast } from 'native-base';
import auth from '@react-native-firebase/auth';
import { images } from '../../../assets/images/const';
import CustomTextInput from '../../../components/Input/TextInput';
import { Controller, useForm } from 'react-hook-form';
import LongButton from '../../../components/Button/LongButton';
import Toast from '../../../components/Toast/Toast';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../routers/ScreensName';
// import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scrollview';

const RegisterScreen = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
    getValues,
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
      repassword: '',
    },
  });
  const navigation = useNavigation();
  const showToast = useToast();
  const onSubmit = (data: any) => {
    if (data?.password === data?.repassword) {
      auth()
        .createUserWithEmailAndPassword(data?.email, data?.password)
        .then((e: any) => {
          // console.log(e?.user);
          e?.user.updateProfile({
            displayName: 'Basic',
          });
          showToast.show({
            title: 'xsxs',
            placement: 'top',
            duration: 3000,
            render: () => (
              <Toast type='success' message='Đăng ký thành công !' />
            ),
          });
          navigation.navigate(Screens.LoginScreen as never);
        })
        .catch((error) => {
          if (error?.code === 'auth/email-already-in-use') {
            // console.log('That email address is already in use!');
            showToast.show({
              title: 'xsxs',
              placement: 'top',
              duration: 3000,
              render: () => (
                <Toast type='error' message='Email đã được sử dụng!' />
              ),
            });
          }

          if (error?.code === 'auth/invalid-email') {
            // console.log('That email address is invalid!');
            showToast.show({
              title: 'xsxs',
              placement: 'top',
              duration: 3000,
              render: () => (
                <Toast type='error' message='Email không tồn tại !' />
              ),
            });
          }
        });
    }
  };
  return (
    <Container>
      <Header visible={false} title='Đăng ký' />
      <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
        <VStack paddingTop={sizeHeight(8)}>
          <Image
            source={images.IntroImage1}
            style={{
              width: sizeWidth(65),
              alignSelf: 'center',
              height: sizeHeight(20),
            }}
            resizeMode='contain'
          />
          <VStack paddingTop={sizeHeight(10)} alignSelf={'center'} space={3}>
            {/* Email */}

            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  placeholder='Email'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                />
              )}
              name='email'
            />
            {errors.email && (
              <Text
                style={{
                  color: 'red',
                  alignSelf: 'flex-end',
                  fontSize: fontSize(3),
                }}
              >
                * Hãy nhập email
              </Text>
            )}

            {/* Password */}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  placeholder='Mật khẩu'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  rightIconShow={true}
                />
              )}
              name='password'
            />
            {errors.password && (
              <Text
                style={{
                  color: 'red',
                  alignSelf: 'flex-end',
                  fontSize: fontSize(3),
                }}
              >
                * Hãy nhập xác nhập password
              </Text>
            )}
            <Controller
              control={control}
              rules={{
                required: true,
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <CustomTextInput
                  placeholder='Xác nhận mật khẩu'
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  rightIconShow={true}
                />
              )}
              name='repassword'
            />
            {errors.repassword && (
              <Text
                style={{
                  color: 'red',
                  alignSelf: 'flex-end',
                  fontSize: fontSize(3),
                }}
              >
                * Hãy nhập xác nhập password
              </Text>
            )}
            {getValues().password !== getValues().repassword && (
              <Text
                style={{
                  color: 'red',
                  alignSelf: 'flex-end',
                  fontSize: fontSize(3),
                }}
              >
                Mật khẩu xác nhận không khớp
              </Text>
            )}

            <VStack space={5} style={{ top: sizeHeight(8) }}>
              <LongButton
                titleStyle={{ fontSize: fontSize(4.5), fontWeight: 'bold' }}
                onPress={handleSubmit(onSubmit)}
                title='Đăng ký'
              />
              <HStack space={1} alignSelf={'center'}>
                <Text style={{ fontSize: fontSize(3.5) }}>
                  Bạn đã có tài khoản?
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(Screens.LoginScreen as never)
                  }
                >
                  <Text style={{ fontSize: fontSize(3.5), fontWeight: '600' }}>
                    Đăng nhập
                  </Text>
                </TouchableOpacity>
              </HStack>
            </VStack>
          </VStack>
        </VStack>
      </TouchableWithoutFeedback>
    </Container>
  );
};

export default RegisterScreen;

const styles = StyleSheet.create({});
