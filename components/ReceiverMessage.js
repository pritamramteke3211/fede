import { Image, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const ReceiverMessage = ({message}) => {
  return (
    <View
    style={{ alignSelf:'flex-end', marginRight:'auto', flexDirection:'row'}}
    >
        <Image
      style={{height: 40, aspectRatio:1,borderRadius:20, marginHorizontal:10}}
      source={{uri: message?.photoURL}}
      />
      <View style={{backgroundColor:'red', borderRadius:5, borderTopLeftRadius:0, paddingVertical:8, paddingHorizontal:10,  marginVertical:5,}}>
      <Text
      style={{color:'white'}}
      >{message.message}</Text>
      </View>
    </View>
  )
}

export default ReceiverMessage

const styles = StyleSheet.create({})