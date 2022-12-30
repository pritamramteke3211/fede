import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import MTIcon from 'react-native-vector-icons/MaterialIcons';
import { moderateScaleVertical } from '../../src/styles/ResponsiveSize';
import { useNavigation } from '@react-navigation/native';

const NavBtn = ({icon,path}) => {
    const navigation = useNavigation()
    console.log("path",path)
  return (
    <View style={styles.icon_cont}>
      <MTIcon name={icon} size={25} color={'#b6b5b5'} onPress={()=> navigation.navigate(`${path}`)} />
    </View>
  )
}

export default NavBtn

const styles = StyleSheet.create({
    icon_cont : {
     paddingVertical: moderateScaleVertical(20),   
    }
})