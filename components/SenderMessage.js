import { StyleSheet, Text, View } from 'react-native'
import React from 'react'

const SenderMessage = ({message}) => {
  return (
    <View
    style={{backgroundColor:'purple', borderRadius:5, borderTopRightRadius:0, paddingVertical:8, paddingHorizontal:10, marginHorizontal:16, marginVertical:5, alignSelf:'flex-start', marginLeft:'auto'}}
    >
      <Text
      style={{color:'white'}}
      >{message.message}</Text>
    </View>
  )
}

export default SenderMessage

const styles = StyleSheet.create({})