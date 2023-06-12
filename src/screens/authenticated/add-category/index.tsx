import {
  StyleSheet,
  Text,
  View,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
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

const AddCategory = () => {
  const navigation = useNavigation();
  const route = useRoute();
  const [list, setList] = React.useState([]);
  const [addModalVisible, setAddModalVisible] = React.useState(false);
  const [choiceModal, setChoiceModal] = React.useState(false);
  const handleClick = (index: any) => {
    if (list.find((item: any) => item === index)) {
      const newList = list.filter((item: any) => item !== index);
      return setList(newList);
    } else {
      return setList([...list, index]);
    }
  };
  const [randomColors, setRandomColors] = React.useState(randomColor());
  const color = randomColor();
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
                onPress={() => handleClick(item?.id)}
                activeOpacity={0.2}
              >
                <BigCard
                  style={{
                    borderWidth: 4,
                    borderColor: list?.find((items) => items === item?.id)
                      ? 'black'
                      : 'white',
                  }}
                  title={item?.title}
                  backgroundColor={randomColors}
                />
              </TouchableOpacity>
            );
          }}
        />
      </VStack>
      <AddEditModal
        isVisible={addModalVisible}
        onDismiss={() => setAddModalVisible(!addModalVisible)}
        title='Thêm chủ đề'
        btnTitle='Tạo chủ đề'
      />
      <Option
        isVisible={choiceModal}
        onDismiss={() => setChoiceModal(!choiceModal)}
        option1Title='Sửa chủ đề'
        option2Title='Xóa chủ đề'
        option3Title='Hủy bỏ'
        onCancelPress={() => setChoiceModal(false)}
      />
    </Container>
  );
};

export default AddCategory;

const styles = StyleSheet.create({});
