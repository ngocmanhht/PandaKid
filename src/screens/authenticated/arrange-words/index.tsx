import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import Container from '../../../components/Container';
import { images } from '../../../assets/images/const';
import Header from '../../../components/header';
import { VStack } from 'native-base';
import MediumCard from '../../../components/medium-card';
import { sizeWidth, sizeHeight } from '../../../utils/Utils';
import useCustomToast from '../../../hooks/useToast';

const ArrangeWordsScreen = () => {
  const fakeData = [
    { id: 1, title: 'word1' },
    { id: 2, title: 'word2' },
    { id: 3, title: 'word3' },
    { id: 4, title: 'word4' },
    { id: 5, title: 'word5' },
    { id: 6, title: 'word6' },
    { id: 7, title: 'word7' },
  ];
  const [data, setData] = React.useState(fakeData);
  const [word, setWord] = React.useState([]);
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
  return (
    <Container backgroundSource={images.MainBackground}>
      <Header visible={false} title='Ghép từ' />
      <VStack style={{ padding: 10 }}>
        <View
          style={{
            borderWidth: 3,
            borderRadius: sizeWidth(4),
            flexDirection: 'row',
            borderColor: '#77A4FF',
            backgroundColor: 'white',
            height: sizeHeight(45),
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
