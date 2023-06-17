import { StyleSheet, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import { HStack, Modal, VStack } from 'native-base';
import { sizeWidth, fontSize } from '../../utils/Utils';
import Choice from './choice';
import { Icon } from '../../assets/icons/const';
import { observer } from 'mobx-react';
import UIStore from '../../stores/ui';
import useStores from '../../hooks/use-stores';

const CameraOption = observer(() => {
  const uiStore: UIStore = useStores().uiStore;
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
      isOpen={uiStore?.cameraOption?.isVisible}
      onClose={() => uiStore.hideCameraOption()}
    >
      <VStack
        style={{
          width: sizeWidth(85),
          borderRadius: sizeWidth(2),
          backgroundColor: 'white',
          alignSelf: 'center',
          padding: 20,
        }}
        space={3}
      >
        <TouchableOpacity onPress={() => uiStore.hideCameraOption()}>
          <Text style={{ fontSize: fontSize(4), fontWeight: 'bold' }}>X</Text>
        </TouchableOpacity>
        <Text
          style={{
            fontSize: fontSize(4),
            alignSelf: 'center',
            color: '#354853',
            fontWeight: '600',
          }}
        >
          Chọn ảnh
        </Text>
        <Choice source={Icon.cameraOptions} title='Chụp ảnh' />
        <Choice source={Icon.libraryOptions} title='Thư viện ảnh' />
      </VStack>
    </Modal>
  );
});

export default CameraOption;

const styles = StyleSheet.create({});
