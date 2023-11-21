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
import { useIsFocused, useNavigation } from '@react-navigation/native';
import { Screens } from '../../../routers/ScreensName';
import { Icon } from '../../../assets/icons/const';
import auth from '@react-native-firebase/auth';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UIStore from '../../../stores/ui';
import useStores from '../../../hooks/use-stores';
import SessionStore from '../../../stores/session';
import toast from '../../../components/Toast/Toast';
import useCustomToast from '../../../hooks/useToast';

const SettingScreen = () => {
  const [confirmModal, setConfirmModal] = React.useState(false);
  const navigation = useNavigation();
  const [typeOfAccount, setTypeOfAccount] = React.useState<any>();
  const uiStore: UIStore = useStores().uiStore;
  const sessionStore: SessionStore = useStores().sessionStore;

  const toast = useCustomToast();

  const handleLogout = () => {
    setConfirmModal(!confirmModal);
    auth()
      .signOut()
      .then(async (success) => {
        sessionStore.setData({ storage: [] });
        await AsyncStorage.removeItem('access_token');
        await AsyncStorage.removeItem('type_account');
        navigation.reset({
          index: 0,
          routes: [{ name: Screens.AuthenticationNavigator as never }],
        });
      })
      .catch((err) => toast.show({ type: 'error', msg: err }));
  };
  const email = auth().currentUser?.email;
  const getTypeOfAccount = async () => {
    console.log(auth().currentUser);
    const typeAccount = auth().currentUser?.displayName as any;
    setTypeOfAccount(typeAccount);
  };
  const isFocused = useIsFocused();
  React.useEffect(() => {
    if (isFocused) {
      getTypeOfAccount();
    }
  }, [isFocused]);

  return (
    <Container backgroundSource={images.MainBackground}>
      <Header visible={false} title='Cài đặt' />
      <VStack
        marginTop={sizeHeight(8)}
        w={'90%'}
        style={{ paddingVertical: 20 }}
        alignSelf={'center'}
        borderWidth={3}
        borderColor={'white'}
        borderRadius={sizeWidth(2)}
        backgroundColor={'#92CB76'}
        alignItems={'center'}
        space={2}
      >
        <Image
          source={
            typeOfAccount === 'Basic' ? images.Avatar : images.PremiumAvatar
          }
          style={{ width: 100, height: 100, alignSelf: 'center' }}
          resizeMode='contain'
        />
        <Text
          style={{ fontSize: fontSize(5), fontWeight: 'bold', color: 'white' }}
        >
          {email?.slice(0, email?.indexOf('@'))}
        </Text>
        <Text style={{ fontSize: fontSize(4), color: 'white' }}>{email}</Text>
      </VStack>

      <VStack margin={5} space={1}>
        {typeOfAccount === 'Basic' && (
          <ExitButton
            onPress={() => uiStore.showDescriptionUpdateModal()}
            title={'Nâng cấp tài khoản'}
            source={Icon.update}
          />
        )}

        <ExitButton
          title={'Đăng xuất'}
          source={Icon.logout}
          onPress={() => setConfirmModal(!confirmModal)}
        />
      </VStack>
      <ConfirmModal
        isVisible={confirmModal}
        onDismiss={() => setConfirmModal(!confirmModal)}
        title='Bạn có chắc chắn muốn thoát ?'
        onConfirmPress={handleLogout}
      />
    </Container>
  );
};

export default SettingScreen;

const styles = StyleSheet.create({});
