import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import Container from '../../../components/Container';
import { images } from '../../../assets/images/const';
import Header from '../../../components/header';
import BigCard from '../../../components/Card/big-card';
import { HStack, VStack } from 'native-base';
import { randomColor, sizeHeight, sizeWidth } from '../../../utils/Utils';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../routers/ScreensName';
import SearchInput from '../../../components/search-input';
import { Icon } from '../../../assets/icons/const';
import firestore from '@react-native-firebase/firestore';

const HomeScreen = () => {
  // const data = [
  //   { id: 1, title: 'test1' },
  //   { id: 2, title: 'test2' },
  //   { id: 3, title: 'test3' },
  //   { id: 4, title: 'test4' },
  //   { id: 5, title: 'test5' },
  //   { id: 6, title: 'test6' },
  //   { id: 7, title: 'test7' },
  // ];
  const [data, setData] = React.useState<any>([]);
  React.useEffect(() => {
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
        // console.log(users);
      });
  }, []);
  const navigation = useNavigation();
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
        <SearchInput />

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
                    { title: item?.title, color: randomColor() } as any
                  )
                }
                activeOpacity={0.2}
              >
                <BigCard title={item?.key} backgroundColor={randomColor()} />
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
