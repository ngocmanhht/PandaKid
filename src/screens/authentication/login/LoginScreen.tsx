import {
  Button,
  Image,
  ImageBackground,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import { fontSize, sizeHeight, sizeWidth } from '../../../utils/Utils';
import { HStack, VStack, useToast } from 'native-base';
import auth from '@react-native-firebase/auth';
import { images } from '../../../assets/images/const';
import CustomTextInput from '../../../components/Input/TextInput';
import { Controller, useForm } from 'react-hook-form';
import Header from '../../../components/header';
import LongButton from '../../../components/Button/LongButton';
import Toast from '../../../components/Toast/Toast';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../routers/ScreensName';

const LoginScreen = () => {
  const [value, setvalue] = React.useState('');
  const showToast = useToast();

  const handleLogin = (email: string, password: any) => {
    // console.log(newEmail);

    auth()
      // .signInWithEmailAndPassword('doananhngoc5666@gmail.com','123456')
      .signInWithEmailAndPassword(email, password)

      .then((e) => {
        if (e.user) {
          // console.log('LoginSuccess')
          showToast.show({
            title: 'xsxs',
            placement: 'top',
            duration: 3000,
            render: () => (
              <Toast type='success' message='Đăng nhập thành công !' />
            ),
          });
          navigation.navigate(Screens.AuthenticatedNavigator as never);
        } else {
          // console.log('LoginFailure')
          showToast.show({
            title: 'xsxs',
            placement: 'top',
            duration: 3000,
            render: () => <Toast type='error' message='Đăng nhập thất bại !' />,
          });
        }
      })
      .catch((err) => {
        console.log(err);
        showToast.show({
          title: 'xsxs',
          placement: 'top',
          duration: 3000,
          render: () => <Toast type='error' message='Đăng nhập thất bại !' />,
        });
      });
  };
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: '',
      password: '',
    },
  });
  const navigation = useNavigation();
  const onSubmit = (data: any) => {
    navigation.navigate(Screens.AuthenticatedNavigator as never);

    // handleLogin(data?.email, data?.password);
    // console.log(data);

    // console.log(data)
    // showToast.show({ title: 'xsxs', placement: 'top', duration: 3000, render: () => <Toast type='success' message='Đăng ký thành công' /> })
  };
  return (
    <ImageBackground
      resizeMode='stretch'
      style={{ flex: 1 }}
      source={images.background}
    >
      <SafeAreaView>
        <Header visible={false} title='Đăng nhập' />
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
                * Hãy nhập password
              </Text>
            )}

            <VStack space={5} style={{ top: sizeHeight(8) }}>
              <LongButton
                titleStyle={{ fontSize: fontSize(4.5), fontWeight: 'bold' }}
                onPress={handleSubmit(onSubmit)}
                title='Đăng nhập'
              />
              <HStack space={1} alignSelf={'center'}>
                <Text style={{ fontSize: fontSize(3.5) }}>
                  Bạn chưa tài khoản?
                </Text>
                <TouchableOpacity
                  onPress={() =>
                    navigation.navigate(Screens.RegisterScreen as never)
                  }
                >
                  <Text style={{ fontSize: fontSize(3.5), fontWeight: '600' }}>
                    Đăng ký ngay
                  </Text>
                </TouchableOpacity>
              </HStack>
            </VStack>
          </VStack>
        </VStack>
      </SafeAreaView>
    </ImageBackground>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  textInput: {
    width: sizeWidth(50),
    height: sizeHeight(5),
    borderWidth: 1,
  },
});
