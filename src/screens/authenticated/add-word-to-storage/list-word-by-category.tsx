import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { VStack } from 'native-base';
import { fontSize, sizeWidth } from '../../../utils/Utils';
import MediumCard from '../../../components/medium-card';
import Card from './card';
import firestore from '@react-native-firebase/firestore';
import UIStore from '../../../stores/ui';
import useStores from '../../../hooks/use-stores';
const ListWordByCate = ({ categoryName }: { categoryName?: string }) => {
  const [data, setData] = React.useState([]);
  const uiStore: UIStore = useStores().uiStore;

  React.useEffect(() => {
    uiStore.showLoading();
    firestore()
      .collection('Category')
      .doc(categoryName)
      .collection(categoryName)
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
  return (
    <VStack
      space={3}
      style={{
        borderWidth: 2,
        backgroundColor: '#DEE4FF',
        borderColor: 'white',
        padding: 10,
        borderRadius: sizeWidth(4),
        margin: 3,
      }}
    >
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          padding: 10,
          backgroundColor: 'white',
          borderRadius: sizeWidth(4),
        }}
      >
        <Text style={{ fontSize: fontSize(4), fontWeight: '600' }}>
          {categoryName || 'categoryName'}
        </Text>
      </View>
      <FlatList
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return <Card source={{ uri: item?.url }} wordName={item?.key} />;
        }}
      />
    </VStack>
  );
};

export default ListWordByCate;

const styles = StyleSheet.create({});
