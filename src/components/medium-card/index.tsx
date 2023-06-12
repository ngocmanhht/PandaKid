import {
  Image,
  StyleProp,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  ViewProps,
  ViewStyle,
} from 'react-native';
import React from 'react';
import { VStack } from 'native-base';
import { fontSize, sizeHeight, sizeWidth } from '../../utils/Utils';
import { images } from '../../assets/images/const';

const MediumCard = ({
  backgroundColor,
  title,
  source,
  style,
  onPress,
  disabled = false,
}: {
  backgroundColor?: any;
  title?: string;
  source?: any;
  style?: StyleProp<ViewStyle>;
  onPress?: (e: any) => void;
  disabled?: boolean;
}) => {
  return (
    <TouchableOpacity
      disabled={disabled}
      onPress={onPress}
      style={[
        style,
        {
          justifyContent: 'center',
          alignItems: 'center',
          borderWidth: 3,
          margin: sizeHeight(1),
          borderColor: 'white',
          width: '29%',
          height: sizeHeight(20),
          borderRadius: sizeWidth(4),
          backgroundColor: backgroundColor || '#9CAEFF',
        },
      ]}
    >
      <Image
        source={source || images.Test}
        style={{ width: '90%', height: '75%', borderRadius: sizeWidth(4) }}
        resizeMode='cover'
      />
      <Text
        style={{
          fontSize: fontSize(4),
          color: 'white',
          fontWeight: 'bold',
          paddingTop: 5,
        }}
      >
        {title || 'Test'}
      </Text>
    </TouchableOpacity>
  );
};

export default MediumCard;

const styles = StyleSheet.create({});
