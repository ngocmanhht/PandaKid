import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { fontSize, sizeHeight, sizeWidth } from '../../../utils/Utils';
import { images } from '../../../assets/images/const';
import { VStack } from 'native-base';

const Card = ({ source, wordName }: { source?: any; wordName?: string }) => {
  return (
    <VStack
      space={1}
      style={{
        borderWidth: 2,
        width: sizeWidth(30),
        padding: 5,
        margin: 5,
        borderColor: 'white',
        backgroundColor: '#9CAEFF',
        borderRadius: sizeWidth(4),
        alignItems: 'center',
      }}
    >
      <Image
        source={source || images.Test}
        style={{
          width: '90%',
          borderRadius: sizeWidth(4),
          height: sizeHeight(12),
        }}
        resizeMode='cover'
      />
      <Text
        style={{ fontSize: fontSize(3.5), color: 'white', fontWeight: '600' }}
      >
        {wordName || 'word'}
      </Text>
    </VStack>
  );
};

export default Card;

const styles = StyleSheet.create({});
