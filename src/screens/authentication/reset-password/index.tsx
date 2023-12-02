import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import Container from '../../../components/Container';
import Header from '../../../components/header';
import CustomTextInput from '../../../components/Input/TextInput';
import LongButton from '../../../components/Button/LongButton';
import { Screens } from '../../../routers/ScreensName';
import { useNavigation } from '@react-navigation/native';
import SquareTextInput from '../../../components/square-text-input';

const ResetPassword = () => {
  const navigation = useNavigation();

  return (
    <Container>
      <Header
        onBackPress={() => navigation.goBack()}
        visible={true}
        title={'Đặt lại mật khẩu'}
      />

      <View
        style={{
          padding: 20,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 25,
        }}
      >
        <Text>Nhập mã xác minh được gửi đến số 0853462608</Text>
        <View style={{ flexDirection: 'row', gap: 10 }}>
          <SquareTextInput />
          <SquareTextInput />
          <SquareTextInput />
          <SquareTextInput />
          <SquareTextInput />
          <SquareTextInput />
        </View>
        <TouchableOpacity style={{ alignSelf: 'flex-start' }}>
          <Text style={{ color: '#7AA6FE' }}>Gửi lại mã xác minh</Text>
        </TouchableOpacity>
        <View style={{ gap: 10 }}>
          <CustomTextInput rightIconShow placeholder={'Mật khẩu mới'} />
          <CustomTextInput
            rightIconShow
            placeholder={'Xác nhận mật khẩu mới'}
          />
        </View>
        <LongButton
          title={'Hoàn tất'}
          titleStyle={{ fontWeight: 'bold' }}
          onPress={() => navigation.navigate(Screens.ResetPassword as never)}
        />
      </View>
    </Container>
  );
};

export default ResetPassword;
