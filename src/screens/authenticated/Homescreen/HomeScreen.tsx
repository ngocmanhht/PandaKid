import { FlatList, Image, StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import Container from '../../../components/Container';
import { images } from '../../../assets/images/const';
import Header from '../../../components/header';
import BigCard from '../../../components/Card/big-card';
import { VStack } from 'native-base';
import { randomColor, sizeHeight, sizeWidth } from '../../../utils/Utils';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../routers/ScreensName';
import SearchInput from '../../../components/search-input';
import { Icon } from '../../../assets/icons/const';
import firestore from '@react-native-firebase/firestore';
import { AnyIfEmpty } from 'react-redux';
import UIStore from '../../../stores/ui';
import useStores from '../../../hooks/use-stores';

const HomeScreen = () => {
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
  const [searchValue, setSearchValue] = React.useState('');
  const searchedData = () => {
    data.filter((item: any) =>
      encodeURI(item?.key?.toLowerCase())?.includes(
        encodeURI(searchValue.toLowerCase())
      )
    );
  };
  return (
    <Container backgroundSource={images.MainBackground}>
      {/* <Text>sdd</Text> */}
      <Header
        visible={false}
        title='Trang chủ'
        rightIconShown={true}
        rightIconSource={Icon.add}
        rightOnpress={() =>
          navigation.navigate(
            Screens.AddCategory as never,
            { data: data } as never
          )
        }
      />

      <VStack
        paddingTop={5}
        alignSelf={'center'}
        style={{ paddingHorizontal: 10 }}
        h={sizeHeight(80)}
      >
        {/* <SearchInput onChangText={(e) => setSearchValue(e)} /> */}

        <FlatList
          data={data}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          snapToEnd={true}
          contentContainerStyle={{ alignSelf: 'center', width: sizeWidth(90) }}
          renderItem={({ item }) => {
            return (
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(
                    Screens.WordScreens as never,
                    { title: item?.key, color: randomColor() } as any
                  )
                }
                activeOpacity={0.2}
              >
                <BigCard
                  source={{ uri: item?.url }}
                  title={item?.key}
                  backgroundColor={randomColor()}
                />
              </TouchableOpacity>
            );
          }}
        />
      </VStack>
    </Container>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({});
