import { FlatList, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { VStack } from 'native-base';
import { sizeWidth } from '../../../utils/Utils';
import MediumCard from '../../../components/medium-card';
import Card from './card';

const ListWordByCate = ({ categoryName }: { categoryName?: string }) => {
  const data = [
    { id: 1, title: 'word1' },
    { id: 2, title: 'word2' },
    { id: 3, title: 'word3' },
    { id: 4, title: 'word4' },
    { id: 5, title: 'word5' },
    { id: 6, title: 'word6' },
    { id: 7, title: 'word7' },
  ];
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
        <Text>{categoryName || 'categoryName'}</Text>
      </View>
      <FlatList
        data={data}
        horizontal={true}
        showsHorizontalScrollIndicator={false}
        renderItem={({ item, index }) => {
          return <Card wordName={item?.title} />;
        }}
      />
    </VStack>
  );
};

export default ListWordByCate;

const styles = StyleSheet.create({});
