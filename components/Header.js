import { SafeAreaView, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import FIcon from 'react-native-vector-icons/Foundation'
import Ioicon from 'react-native-vector-icons/Ionicons'
import { useNavigation } from '@react-navigation/native'
 
const Header = ({ title, callEnabled }) => {
  const navigation = useNavigation()
    return (
    <View style={{flexDirection:'row', alignItems:'center',justifyContent:'space-between', padding:10}}>
      <View style={{flex:1, flexDirection:'row',alignItems:'center'}}>
        <TouchableOpacity onPress={()=> navigation.goBack()} >
          <Ioicon name="chevron-back" size={34} color="#FF5864" />
        </TouchableOpacity>
        <Text style={{fontSize: 18, fontWeight:'bold', paddingLeft: 10}} >{title}</Text>
      </View>

      
      {
      callEnabled && (
        <TouchableOpacity style={{marginRight: 10, backgroundColor:'#fa868eb1', paddingVertical:8, paddingHorizontal:10, borderRadius: 20}} >
          <FIcon style={{}} color='red' name="telephone" size={20}/>
        </TouchableOpacity>
      )

      }

    </View>
  )
}

export default Header

const styles = StyleSheet.create({})