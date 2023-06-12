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

const WordScreen = () => {
  const route = useRoute();
  const navigation = useNavigation();
  const isFocused = useIsFocused();

  const data = [
    { id: 1, title: 'word1' },
    { id: 2, title: 'word2' },
    { id: 3, title: 'word3' },
    { id: 4, title: 'word4' },
    { id: 5, title: 'word5' },
    { id: 6, title: 'word6' },
    { id: 7, title: 'word7' },
  ];
  const [isVisibleModal, setIsVisibleModal] = React.useState(false);
  const [index, setIndex] = React.useState(0);
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
            <TouchableOpacity activeOpacity={0.2}>
              <BigCardWithVoice
                onPressVoiceIcon={() => {
                  setIsVisibleModal(!isVisibleModal);
                  setIndex(index);
                }}
                title={item?.title}
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
        onIndexChange={(e) => console.log(e)}
      />
    </Container>
  );
};

export default WordScreen;

const styles = StyleSheet.create({});
