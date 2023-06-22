import { View, Text, FlatList, Image } from 'react-native';
import React from 'react';
import Container from '../../../components/Container';
import { images } from '../../../assets/images/const';
import Header from '../../../components/header';
import { VStack } from 'native-base';
import MediumCard from '../../../components/medium-card';
import { sizeWidth, sizeHeight } from '../../../utils/Utils';
import useCustomToast from '../../../hooks/useToast';
import axios from 'axios';
import { Apikey, VoiceApi } from '../../../network/const';
import Sound from 'react-native-sound';
import RNFetchBlob from 'rn-fetch-blob';
import TouchableOpacity from '../../../components/Button/TouchableOpacity';
import { Icon } from '../../../assets/icons/const';

const ArrangeWordsScreen = () => {
  const fakeData = [
    { id: 1, title: 'Em' },
    { id: 2, title: 'Ăn' },
    { id: 3, title: 'Chơi' },
    { id: 4, title: 'Cơm' },
    { id: 5, title: 'Đi' },
    { id: 6, title: 'Hồ Tây' },
    { id: 7, title: 'Cá' },
  ];
  const [data, setData] = React.useState(fakeData);
  const [word, setWord] = React.useState([]);
  const [url, setUrl] = React.useState('');
  const [success, setSuccess] = React.useState(true);
  const toast = useCustomToast();
  const handleAdd = (item: any) => {
    if (word.length <= 5) {
      const newData = data.filter((itemData) => itemData?.id !== item.id);
      setData(newData);
      return setWord([...word, item]);
    } else {
      toast.show({ type: 'warn', msg: 'Quá số từ cho phép' });
    }
  };
  const handleRemove = (item: any) => {
    const newData = word.filter((itemData) => itemData?.id !== item.id);
    setWord(newData);
    return setData([...data, item]);
  };
  const getVoiceUrl = async (voice?: any) => {
    var qs = require('qs');
    const data = {
      input: voice,
    };
    const res = await axios({
      url: VoiceApi,
      method: 'POST',
      headers: {
        Apikey: Apikey,
        'Content-Type': 'application/x-www-form-urlencoded',
      },
      data: qs.stringify(data),
    });
    if (res?.status === 200) {
      console.log('success', res?.data?.data?.url);

      const soundUrl = res?.data?.data?.url;
      // setUrl(soundUrl);
      return soundUrl;
    } else {
      console.log('error', res);
      return;
    }
  };
  const playSound = async (soundUrl: any) => {
    const sound = new Sound(soundUrl + '/audio/', '', (err) => {
      if (err) {
        console.log(err);
        setSuccess(true);
      }
      sound.play();
      setSuccess(true);
    });
  };
  const handleArrangeWord = async () => {
    setSuccess(false);

    if (word.length === 0) {
      toast.show({ type: 'warn', msg: 'Hãy chọn từ để ghép' });
      setSuccess(true);
    } else {
      let wd = '';
      const words = word.forEach((e) => {
        wd = wd + ' ' + e?.title;
      });
      // console.log(wd);
      const urls = await getVoiceUrl(wd);
      setTimeout(() => {
        playSound(urls);
      }, 2000);
    }
    // console.log(urls);
  };

  return (
    <Container backgroundSource={images.MainBackground}>
      <Header visible={false} title='Ghép từ' />
      <VStack style={{ padding: 10 }}>
        <View
          style={{
            borderWidth: 3,
            borderRadius: sizeWidth(4),
            flexDirection: 'column',
            borderColor: '#77A4FF',
            backgroundColor: 'white',
            height: sizeHeight(50),
            padding: 10,
          }}
        >
          <FlatList
            data={word}
            numColumns={3}
            scrollEnabled={false}
            renderItem={({ item }) => {
              return (
                <MediumCard
                  onPress={() => handleRemove(item)}
                  title={item?.title}
                />
              );
            }}
          />
          <TouchableOpacity
            style={{ alignSelf: 'flex-end' }}
            onPress={() => handleArrangeWord()}
            isDoubleTap={true}
          >
            <Image
              source={success ? Icon.play : Icon.pause}
              style={{ width: 30, height: 30 }}
            />
          </TouchableOpacity>
        </View>
        <View style={{ height: '42%' }}>
          <FlatList
            data={data}
            numColumns={3}
            renderItem={({ item, index }) => {
              return (
                <MediumCard
                  title={item?.title}
                  onPress={() => handleAdd(item)}
                />
              );
            }}
          />
        </View>
      </VStack>
    </Container>
  );
};

export default ArrangeWordsScreen;
