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
import UIStore from '../../../stores/ui';
import useStores from '../../../hooks/use-stores';
import firestore from '@react-native-firebase/firestore';

const AddWordToStorage = () => {
  // const data = [
  //   { id: 1, title: 'category1' },
  //   { id: 2, title: 'category2' },
  //   { id: 3, title: 'category3' },
  //   { id: 4, title: 'category4' },
  // ];
  const uiStore: UIStore = useStores().uiStore;

  const [data, setData] = React.useState<any>([]);
  React.useEffect(() => {
    uiStore.showLoading();
    firestore()
      .collection('Category')
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
      });
  }, []);
  const navigation = useNavigation();
  return (
    <Container backgroundSource={images.MainBackground}>
      <Header
        title='Kho từ'
        onBackPress={() => navigation.goBack()}
        rightIconShown={true}
        rightIconSource={Icon.done}
      />
      <VStack space={5} style={{ padding: 10 }}>
        {/* <SearchInput /> */}
        <View style={{ height: sizeHeight(90) }}>
          <FlatList
            data={data}
            renderItem={({ item, index }) => {
              return <ListWordByCate categoryName={item?.key} />;
            }}
          />
        </View>
      </VStack>
    </Container>
  );
};

export default AddWordToStorage;

const styles = StyleSheet.create({});
