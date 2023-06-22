import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Container from '../../../components/Container';
import { images } from '../../../assets/images/const';
import { VStack } from 'native-base';
import { fontSize, sizeHeight, sizeWidth } from '../../../utils/Utils';
import Header from '../../../components/header';
import LongButton from '../../../components/Button/LongButton';
import ExitButton from './buton';
import ConfirmModal from '../../../components/confirm-modal';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../routers/ScreensName';

const SettingScreen = () => {
  const [confirmModal, setConfirmModal] = React.useState(false);
  const navigation = useNavigation();
  return (
    <Container backgroundSource={images.MainBackground}>
      <Header visible={false} title='Cài đặt' />
      <VStack
        marginTop={sizeHeight(8)}
        w={'90%'}
        padding={10}
        alignSelf={'center'}
        borderWidth={3}
        borderColor={'white'}
        borderRadius={sizeWidth(2)}
        backgroundColor={'#92CB76'}
        alignItems={'center'}
        space={2}
      >
        <Image
          source={images.Avatar}
          style={{ width: 100, height: 100, alignSelf: 'center' }}
          resizeMode='contain'
        />
        <Text
          style={{ fontSize: fontSize(5), fontWeight: 'bold', color: 'white' }}
        >
          Đoàn Ngọc
        </Text>
        <Text style={{ fontSize: fontSize(4), color: 'white' }}>
          doananhngoc5666@gmail.com
        </Text>
      </VStack>
      <ExitButton onPress={() => setConfirmModal(!confirmModal)} />
      <ConfirmModal
        isVisible={confirmModal}
        onDismiss={() => setConfirmModal(!confirmModal)}
        title='Bạn có chắc chắn muốn xóa ?'
        onConfirmPress={() => navigation.navigate(Screens.LoginScreen as never)}
      />
    </Container>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({});
