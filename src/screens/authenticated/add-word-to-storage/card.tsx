import { Image, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { fontSize, sizeHeight, sizeWidth } from '../../../utils/Utils';
import { images } from '../../../assets/images/const';
import { HStack, VStack } from 'native-base';
import CheckBox from '@react-native-community/checkbox';

const Card = ({
  source,
  wordName,
  onValueChange,
}: {
  source?: any;
  wordName?: string;
  onValueChange?: (e) => void;
}) => {
  return (
    <VStack
      space={2}
      style={{
        borderWidth: 2,
        width: sizeWidth(35),
        padding: 5,
        margin: 5,
        borderColor: 'white',
        backgroundColor: '#9CAEFF',
        borderRadius: sizeWidth(4),
        alignItems: 'center',
        paddingVertical: 10,
      }}
    >
      <HStack>
        <Image
          source={source || images.Test}
          style={{
            width: '90%',
            borderRadius: sizeWidth(4),
            height: sizeHeight(12),
          }}
          resizeMode='cover'
        />
        <CheckBox
          style={{
            backgroundColor: 'white',
            width: 15,
            height: 15,
            position: 'absolute',
            right: 5,
            top: 0,
          }}
          onValueChange={onValueChange}
          boxType='square'
          tintColor='#00D33B'
          onFillColor='#00D33B'
          onTintColor='#00D33B'
          onCheckColor='white'
          onAnimationType='fade'
          offAnimationType='fade'
        />
      </HStack>

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
