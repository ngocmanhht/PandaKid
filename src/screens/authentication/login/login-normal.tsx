import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import { HStack, VStack } from 'native-base';
import { fontSize, sizeHeight, sizeWidth } from '../../../utils/Utils';
import { images } from '../../../assets/images/const';
import { Control, Controller, FieldErrors, FieldValues } from 'react-hook-form';
import CustomTextInput from '../../../components/Input/TextInput';
import LongButton from '../../../components/Button/LongButton';
import { Screens } from '../../../routers/ScreensName';
import { useNavigation } from '@react-navigation/native';

const LoginNormal = ({
  control,
  errors,
  onLoginPress,
}: {
  control?: Control<any>;
  errors: FieldErrors<{ email: string; password: string }>;
  onLoginPress: () => void;
}) => {
  const navigation = useNavigation();

  return (
    <VStack paddingTop={sizeHeight(10)}>
      <Image
        source={images.IntroImage1}
        style={{
          width: sizeWidth(65),
          alignSelf: 'center',
          height: sizeHeight(20),
        }}
        resizeMode='contain'
      />
      <VStack paddingTop={50} alignSelf={'center'} space={3}>
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
            onPress={onLoginPress}
            title='Đăng nhập'
          />
          <HStack space={1} alignSelf={'center'}>
            <Text style={{ fontSize: fontSize(3.5) }}>Bạn chưa tài khoản?</Text>
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
  );
};

export default LoginNormal;
