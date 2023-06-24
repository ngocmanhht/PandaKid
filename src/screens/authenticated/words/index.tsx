import { FlatList, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import {
  useIsFocused,
  useNavigation,
  useRoute,
} from '@react-navigation/native';
import Container from '../../../components/Container';
import { images } from '../../../assets/images/const';
import Header from '../../../components/header';
import { sizeWidth } from '../../../utils/Utils';
import BigCardWithVoice from '../../../components/Card/big-card-with-voice';
import WordModal from './word-modal';
import { Screens } from '../../../routers/ScreensName';
import { Icon } from '../../../assets/icons/const';
import firestore from '@react-native-firebase/firestore';
import UIStore from '../../../stores/ui';
import useStores from '../../../hooks/use-stores';
import useLogicWords from './useLogicWords';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WordScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [data, setData] = React.useState([]);
  const [isVisibleModal, setIsVisibleModal] = React.useState(false);
  const [swiperIndex, setSwiperIndex] = React.useState(0);
  const { playSound } = useLogicWords();
  const uiStore: UIStore = useStores().uiStore;
  const isBasicAccount = async () => {
    const typeAccount = await AsyncStorage.getItem('type_account');
    if (JSON.parse(typeAccount) === 'Basic') {
      return true;
    }
    return false;
  };
  React.useEffect(() => {
    uiStore.showLoading();
    firestore()
      .collection('Category')
      .doc(route?.params?.title)
      .collection(route?.params?.title)
      .orderBy('id', 'asc')
      .onSnapshot((querySnapshot) => {
        const users: any = [];

        querySnapshot.forEach((documentSnapshot) => {
          users.push({
            ...documentSnapshot.data(),
            key: documentSnapshot.id,
          });
        });
        setData(users);
        uiStore.hideLoading();
        // console.log(users);
      });
    return () => {};
  }, []);
  const handleAdd = async () => {
    if (await isBasicAccount()) {
      uiStore.showUpdateModal();
    } else {
      navigation.navigate(Screens.AddWord as never, { data: data } as never);
    }
  };
  return (
    <Container backgroundSource={images.Background2}>
      <Header
        onBackPress={() => navigation.goBack()}
        title={route?.params?.title}
        rightIconShown={true}
        rightIconSource={Icon.add}
        rightOnpress={handleAdd}
      />
      <FlatList
        data={data}
        numColumns={2}
        showsVerticalScrollIndicator={false}
        snapToEnd={true}
        contentContainerStyle={{
          alignSelf: 'center',
          width: sizeWidth(90),
          paddingTop: 10,
        }}
        renderItem={({ item, index }) => {
          return (
            <TouchableOpacity
              onPress={() => {
                setSwiperIndex(index);
                setIsVisibleModal(!isVisibleModal);
                console.log(index);
              }}
              key={index}
              activeOpacity={0.2}
            >
              <BigCardWithVoice
                key={index}
                onPressVoiceIcon={() => {
                  playSound(item?.soundUrl);
                }}
                title={item?.key}
                source={{ uri: item.url }}
              />
            </TouchableOpacity>
          );
        }}
      />

      <WordModal
        isVisible={isVisibleModal}
        data={data}
        onDismiss={() => setIsVisibleModal(false)}
        index={swiperIndex}
        // onIndexChange={(e) => setIndex(e)}
      />
    </Container>
  );
};

export default WordScreen;

const styles = StyleSheet.create({});
