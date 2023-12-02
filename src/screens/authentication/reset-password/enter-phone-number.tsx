import React from 'react';
import { SafeAreaView, Text, View } from 'react-native';
import Container from '../../../components/Container';
import Header from '../../../components/header';
import { useNavigation } from '@react-navigation/native';
import CustomTextInput from '../../../components/Input/TextInput';
import LongButton from '../../../components/Button/LongButton';
import { Screens } from '../../../routers/ScreensName';

const EnterPhoneNumber = () => {
  const navigation = useNavigation();
  return (
    <Container>
      <Header
        onBackPress={() => navigation.goBack()}
        visible={true}
        title={'Quên mật khẩu'}
      />

      <View
        style={{
          padding: 25,
          justifyContent: 'center',
          alignItems: 'center',
          gap: 20,
        }}
      >
        <Text>Nhập số điện thoại di động đã đăng kí để nhận mã xác minh</Text>

        <CustomTextInput placeholder={'Nhập số điện thoại đã đăng kí'} />

        <LongButton
          title={'Tiếp tục'}
          titleStyle={{ fontWeight: 'bold' }}
          onPress={() => navigation.navigate(Screens.ResetPassword as never)}
        />
      </View>
    </Container>
  );
};

export default EnterPhoneNumber;
