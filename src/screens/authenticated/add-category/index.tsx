import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React, { useEffect } from 'react';
import Container from '../../../components/Container';
import { images } from '../../../assets/images/const';
import Header from '../../../components/header';
import { useNavigation, useRoute } from '@react-navigation/native';
import BigCard from '../../../components/Card/big-card';
import { HStack, VStack } from 'native-base';
import { randomColor, sizeHeight, sizeWidth } from '../../../utils/Utils';
import { Screens } from '../../../routers/ScreensName';
import SearchInput from '../../../components/search-input';
import { Icon } from '../../../assets/icons/const';
import AddButton from '../../../components/add-buton';
import AddEditModal from '../../../components/add-edit-modal';
import Option from '../../../components/option';
import { firebase } from '@react-native-firebase/firestore';
import SessionStore from '../../../stores/session';
import useStores from '../../../hooks/use-stores';
import auth from '@react-native-firebase/auth';
import useCustomToast from '../../../hooks/useToast';
import UIStore from '../../../stores/ui';
import firestore from '@react-native-firebase/firestore';

const AddCategory = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [list, setList] = React.useState([]);
  const [addModalVisible, setAddModalVisible] = React.useState(false);
  const [choiceModal, setChoiceModal] = React.useState(false);
  const sessionStore: SessionStore = useStores().sessionStore;
  const uiStore: UIStore = useStores().uiStore;
  const [text, setText] = React.useState<any>();
  const [sesssionData, setSesssionData] = React.useState<any>();

  const handleClick = (item: any) => {
    const index = item?.id;
    if (list.find((item: any) => item?.id === index)) {
      const newList = list.filter((item: any) => item?.id !== index);

      return setList(newList);
    } else {
      return setList([...list, item]);
    }
  };
  const [randomColors, setRandomColors] = React.useState(randomColor());
  const db = firebase.firestore();
  const email = auth().currentUser?.email as any;
  const toast = useCustomToast();
  const getCurrentId = async () => {
    const res = await db.collection('Category').get();
    return res.size + 1;
  };
  const onHandleAddPress = async () => {
    uiStore.showLoading();
    const currentId = await getCurrentId();
    if (sessionStore?.dataImage?.imageData !== undefined && text) {
      db.collection('Category')
        .doc(text)
        .set({
          name: text,
          url: sessionStore?.dataImage?.imageData,
          id: currentId,
          type: email,
        })
        .then(() => {
          console.log('Document successfully written!');
          toast.show({ type: 'success', msg: 'Thêm thành công' });
          sessionStore.setImageData({ imageData: undefined });
          setAddModalVisible(!addModalVisible);
          uiStore.hideLoading();
        })
        .catch((error) => {
          console.error('Error writing document: ', error);
          toast.show({ type: 'error', msg: 'Có lỗi' });
          uiStore.hideLoading();
        });
    } else {
      toast.show({ type: 'error', msg: 'Hoàn thành các trường còn thiếu' });
    }
  };
  const deleteCategory = (nameCategory: any) => {
    firestore()
      .collection('Category')
      .doc(nameCategory)
      .delete()
      .then(() => {
        console.log('User deleted!');
        toast.show({ type: 'success', msg: 'Xóa thành công' });
      });
  };
  const handleDeletePress = async () => {
    const isNotIncludeAdminCate = list.filter(
      (item: any) => item?.type !== 'admin'
    );
    if (isNotIncludeAdminCate?.length > 0) {
      console.log(isNotIncludeAdminCate);
      isNotIncludeAdminCate.forEach((item: any) => {
        deleteCategory(item?.name);
      });
      setChoiceModal(!choiceModal);
    } else {
      console.log(' k xoa dc');
      return toast.show({
        type: 'error',
        msg: 'Bạn không thể xóa những mục này',
      });
    }
    return toast.show({ type: 'success', msg: 'Xóa thành công' });
  };

  return (
    <Container backgroundSource={images.MainBackground}>
      <Header
        rightIconSource={Icon.option}
        rightIconShown={list.length !== 0 ? true : false}
        onBackPress={() => navigation.goBack()}
        rightOnpress={() => setChoiceModal(!choiceModal)}
        title='Thêm chủ đề'
      />
      <VStack
        paddingTop={5}
        alignSelf={'center'}
        style={{ paddingHorizontal: 10, paddingVertical: 20 }}
      >
        <AddButton
          onPress={() => setAddModalVisible(!addModalVisible)}
          title='Thêm chủ đề'
        />
        <FlatList
          data={route.params?.data}
          numColumns={2}
          showsVerticalScrollIndicator={false}
          snapToEnd={true}
          contentContainerStyle={{
            alignSelf: 'center',
            width: sizeWidth(90),
            paddingVertical: 10,
          }}
          renderItem={({ item, index }) => {
            return (
              <TouchableOpacity
                onPress={() => handleClick(item)}
                activeOpacity={0.2}
              >
                <BigCard
                  style={{
                    borderWidth: 4,
                    borderColor: list?.find(
                      (items: any) => items?.id === item?.id
                    )
                      ? 'black'
                      : 'white',
                  }}
                  title={item?.key}
                  backgroundColor={randomColors}
                  source={{ uri: item?.url }}
                />
              </TouchableOpacity>
            );
          }}
        />
      </VStack>
      <AddEditModal
        isVisible={addModalVisible}
        onDismiss={() => {
          setAddModalVisible(!addModalVisible);
          sessionStore.setImageData({ imageData: undefined });
          setText('');
        }}
        title='Thêm chủ đề'
        btnTitle='Tạo chủ đề'
        placeholderTxt='Mời nhập chủ đề'
        onChangeText={(e: any) => setText(e)}
        onAddPress={onHandleAddPress}
      />
      <Option
        isVisible={choiceModal}
        onDismiss={() => {
          setChoiceModal(!choiceModal);
        }}
        option1Title='Sửa chủ đề'
        option2Title='Xóa chủ đề'
        option3Title='Hủy bỏ'
        onCancelPress={() => setChoiceModal(false)}
        onDeletePress={handleDeletePress}
      />
    </Container>
  );
};

export default AddCategory;

const styles = StyleSheet.create({});
