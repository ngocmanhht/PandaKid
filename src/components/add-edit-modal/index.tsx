import {
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import ReactNativeModal from 'react-native-modal';
import { Modal, Stack, VStack } from 'native-base';
import Swiper from 'react-native-swiper';
import { sizeWidth, sizeHeight, fontSize } from '../../utils/Utils';
import { Icon } from '../../assets/icons/const';
import LongButton from '../Button/LongButton';

const AddEditModal = ({
  isVisible,
  onDismiss,
  title,
  btnTitle,
}: {
  isVisible?: any;
  onDismiss?: () => void;
  title?: string;
  btnTitle?: string;
}) => {
  return (
    <Modal
      style={{
        position: 'absolute',
        left: 0,
        right: 0,
        top: 0,
        bottom: 0,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
      }}
      isOpen={isVisible}
      onClose={onDismiss}
    >
      <VStack
        style={{
          width: sizeWidth(85),
          //   height: sizeHeight(55),
          borderRadius: sizeWidth(2),
          backgroundColor: 'white',
          alignSelf: 'center',
          paddingVertical: 20,
        }}
      >
        <VStack
          //   style={{ paddingHorizontal: 10, paddingVertical: 10 }}
          alignItems={'flex-end'}
          alignSelf={'center'}
          w={'80%'}
        >
          <TouchableOpacity onPress={onDismiss}>
            <Text style={{ fontSize: fontSize(4), fontWeight: 'bold' }}>X</Text>
          </TouchableOpacity>
        </VStack>
        <VStack
          space={5}
          style={{
            width: '80%',
            alignSelf: 'center',
            alignItems: 'center',
          }}
        >
          <Text
            style={{
              color: '#354853',
              fontSize: fontSize(4.5),
              fontWeight: '600',
            }}
          >
            {title || 'title'}
          </Text>
          <TouchableOpacity
            style={{
              width: '100%',
              alignSelf: 'center',
              alignItems: 'center',
              paddingVertical: sizeHeight(6),
              backgroundColor: '#DEE9FF',
              borderRadius: sizeWidth(4),
            }}
          >
            <Image
              resizeMode='cover'
              source={Icon.camera}
              style={{ width: sizeWidth(20), height: sizeHeight(10) }}
            />
          </TouchableOpacity>
          <LongButton
            style={{ width: '100%' }}
            title={btnTitle || 'btnTitle'}
            titleStyle={{ fontSize: fontSize(3.5), fontWeight: '600' }}
          />
        </VStack>
      </VStack>
    </Modal>
  );
};

export default AddEditModal;

const styles = StyleSheet.create({});
