import { StyleSheet, Text, View, FlatList } from 'react-native';
import React from 'react';
import Container from '../../../components/Container';
import { images } from '../../../assets/images/const';
import Header from '../../../components/header';
import AddButton from '../../../components/add-buton';
import { VStack } from 'native-base';
import MediumCard from '../../../components/medium-card';
import { useNavigation } from '@react-navigation/native';
import { Screens } from '../../../routers/ScreensName';
import firestore from '@react-native-firebase/firestore';

const StorageWord = () => {
  const data = [
    { id: 1, title: 'word1' },
    { id: 2, title: 'word2' },
    { id: 3, title: 'word3' },
    { id: 4, title: 'word4' },
    { id: 5, title: 'word5' },
    { id: 6, title: 'word6' },
    { id: 7, title: 'word7' },
  ];
  const addCollectionToFireBase = () => {
    firestore().collection('userData').add({
      name: 'Ada Lovelace',
      age: 30,
    });
  };
  const checkIfCollectionExists = () => {
    // firestore()
    //   .collection('Category')
    //   .limit(1)
    //   .get()
    //   .then((checkSnapshot) => {
    //     if (checkSnapshot.size == 0) {
    //       console.log('No snapshots');
    //     } else {
    //       console.log('co');
    //     }
    //   });
    // firestore()
    //   .collection('userData')
    //   .doc('userData')
    //   .get()
    //   .then((doc) => {
    //     if (doc.exists) {
    //       console.log('Exists');
    //     } else {
    //       console.log('No documents');
    //     }
    //   });
  };
  React.useEffect(() => {
    checkIfCollectionExists();
    addCollectionToFireBase();
    return () => {};
  }, []);

  const navigation = useNavigation();
  return (
    <Container backgroundSource={images.MainBackground}>
      <Header visible={false} title='Kho ghép từ' />
      <VStack space={3} style={{ padding: 10 }}>
        <AddButton
          onPress={() => navigation.navigate(Screens.AddWordToStorage as never)}
          title='Thêm từ vào kho'
        />
        <FlatList
          data={data}
          numColumns={3}
          renderItem={({ item, index }) => {
            return <MediumCard disabled={true} title={item?.title} />;
          }}
        />
      </VStack>
    </Container>
  );
};

export default StorageWord;

const styles = StyleSheet.create({});
