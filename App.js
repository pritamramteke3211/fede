import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from './src/screens/login/Login'
import GetData from './src/screens/firebase/GetData'
import GetData2 from './src/screens/firebase/GetData2'
import GetDataCurrent from './src/screens/firebase/GetDataCurrent'
import AddData from './src/screens/firebase/AddData'
import UpdateData from './src/screens/firebase/UpdateData'
import RemoveData from './src/screens/firebase/RemoveData'
import {store} from './src/store/Store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import Stack_navigation from './src/navigation/stack_navigation/stack_navigation'


const App = () => {
  return (
    <Provider store={store}>
    <NavigationContainer>
      <Stack_navigation/>
    </NavigationContainer>
    </Provider>
  )
}

export default App

const styles = StyleSheet.create({})