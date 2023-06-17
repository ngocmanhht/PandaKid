import { FlatList, StyleSheet } from 'react-native';
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
import TouchableOpacity from '../../../components/Button/TouchableOpacity';
import axios from 'axios';
import RNFetchBlob from 'rn-fetch-blob';
import SoundPlayer from 'react-native-sound-player';

const WordScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();
  const [data, setData] = React.useState([]);

  const uiStore: UIStore = useStores().uiStore;
  React.useEffect(() => {
    uiStore.showLoading();
    firestore()
      .collection('Category')
      .doc(route?.params?.title)
      .collection(route?.params?.title)
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

  const [isVisibleModal, setIsVisibleModal] = React.useState(false);
  const [index, setIndex] = React.useState(0);
  const playSound = async () => {
    // let sound = new Sound(
    //   'https://chunk.lab.zalo.ai/98196f230741ee1fb750/98196f230741ee1fb750',
    //   null,
    //   (err) => {
    //     if (err) {
    //       console.log(err);
    //       return;
    //     }
    //     sound.play();
    //   }
    // );

    fetch(
      'https://api.zalo.ai/v1/tts/synthesize?input=Chơi game gì? Coi phim gì? Đi chơi chỗ nào?',
      {
        body: 'speaker_id=4&speed=0.8',
        headers: {
          Apikey: 'MnU8hGGIm462mZaeyZ4ekmfuw2EvbjfI',
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        method: 'POST',
      }
    )
      .then((res) => {
        SoundPlayer.loadUrl(res?.url);
        try {
          SoundPlayer.playUrl(res?.url);
        } catch (err) {
          console.error(err);
        }

        // SoundPlayer.addEventListener('FinishedLoadingURL', (ress) => {
        //   console.log(ress);
        //   // SoundPlayer.playUrl(res?.url);
        // });
        // if (success) {
        //   SoundPlayer.playUrl(res?.url);
        // }
      })
      .catch((err) => console.log(err));
  };
  return (
    <Container backgroundSource={images.Background2}>
      <Header
        onBackPress={() => navigation.goBack()}
        title={route?.params?.title}
        rightIconShown={true}
        rightIconSource={Icon.add}
        rightOnpress={() =>
          navigation.navigate(Screens.AddWord as never, { data: data } as never)
        }
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
              onPress={() => playSound()}
              key={index}
              activeOpacity={0.2}
              isDoubleTap={true}
            >
              <BigCardWithVoice
                key={index}
                onPressVoiceIcon={() => {
                  setIndex(index);
                  setIsVisibleModal(!isVisibleModal);
                  console.log(index);
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
        onDismiss={() => setIsVisibleModal(!isVisibleModal)}
        index={index}
        onIndexChange={(e) => setIndex(e)}
      />
    </Container>
  );
};

export default WordScreen;

const styles = StyleSheet.create({});
