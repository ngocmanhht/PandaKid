import { StyleProp, StyleSheet, Text, TextStyle, View, ViewStyle } from 'react-native'
import React from 'react'
import { sizeHeight, sizeWidth } from '../../utils/Utils'
import TouchableOpacity from './TouchableOpacity'



interface CustomButtonProps {
  onPress?: () => void,
  title?: string,
  style?: StyleProp<ViewStyle>,
  titleStyle?: StyleProp<TextStyle>

}
const LongButton = ({
  title,
  onPress,
  style,
  titleStyle

}: CustomButtonProps) => {
  return (
    <>
      <TouchableOpacity onPress={onPress} style={[styles.continueBtn, style]}>
        <Text style={[{ color: 'white' }, titleStyle]}>
          {title}
        </Text>
      </TouchableOpacity>
    </>
  )
}

export default LongButton

const styles = StyleSheet.create({
  continueBtn: {
    bottom: sizeHeight(6),
    backgroundColor: '#7AA6FE',
    width: sizeWidth(80),
    height: sizeHeight(5),
    borderRadius: sizeWidth(6),
    justifyContent: 'center',
    alignItems: 'center',
    top: sizeHeight(0),
    alignSelf: 'center'

  }
})