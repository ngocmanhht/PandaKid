import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Container from '../../../components/Container';
import { images } from '../../../assets/images/const';
import SearchInput from '../../../components/search-input';
import { VStack } from 'native-base';
import Header from '../../../components/header';
import ListWordByCate from './list-word-by-category';
import { sizeHeight } from '../../../utils/Utils';
import { Icon } from '../../../assets/icons/const';
import { useNavigation } from '@react-navigation/native';

const AddWordToStorage = () => {
  const data = [
    { id: 1, title: 'category1' },
    { id: 2, title: 'category2' },
    { id: 3, title: 'category3' },
    { id: 4, title: 'category4' },
  ];
  const navigation = useNavigation();
  return (
    <Container backgroundSource={images.MainBackground}>
      <Header
        title='Kho từ'
        onBackPress={() => navigation.goBack()}
        rightIconShown={true}
        rightIconSource={Icon.done}
      />
      <VStack space={5} style={{ padding: 20 }}>
        <SearchInput />
        <View style={{ height: sizeHeight(80) }}>
          <FlatList
            data={data}
            renderItem={({ item, index }) => {
              return <ListWordByCate categoryName={item?.title} />;
            }}
          />
        </View>
      </VStack>
    </Container>
  );
};

export default AddWordToStorage;

const styles = StyleSheet.create({});
