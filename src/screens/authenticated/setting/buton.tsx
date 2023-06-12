import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import React from 'react';
import { sizeWidth, fontSize, sizeHeight } from '../../../utils/Utils';
import { HStack } from 'native-base';
import { Icon } from '../../../assets/icons/const';

const ExitButton = ({ onPress }: { onPress?: () => void }) => {
  return (
    <TouchableOpacity
      onPress={onPress}
      style={{
        width: sizeWidth(90),
        borderWidth: 3,
        alignSelf: 'center',
        paddingHorizontal: 10,
        paddingVertical: 10,
        alignItems: 'flex-start',
        borderColor: 'white',
        borderRadius: sizeWidth(5),
        backgroundColor: '#92CB76',
        marginTop: sizeHeight(3),
      }}
    >
      <HStack alignItems={'center'} space={2}>
        <Image
          source={Icon.logout}
          style={{ width: 20, height: 20 }}
          resizeMode='contain'
        />
        <Text
          style={{ fontSize: fontSize(4), fontWeight: 'bold', color: 'white' }}
        >
          Đăng xuất
        </Text>
      </HStack>
    </TouchableOpacity>
  );
};

export default ExitButton;

const styles = StyleSheet.create({});
