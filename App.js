import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Login from './src/screens/login/Login'
import GetData from './src/screens/firebase/GetData'
import GetData2 from './src/screens/firebase/GetData2'
import GetDataCurrent from './src/screens/firebase/GetDataCurrent'
import AddData from './src/screens/firebase/AddData'
import UpdateData from './src/screens/firebase/UpdateData'
import RemoveData from './src/screens/firebase/RemoveData'

const App = () => {
  return (
    <>
      {/* <Login/> */}
      {/* <GetData/> */}
      {/* <GetDataCurrent/> */}
      {/* <AddData/> */}
      {/* <UpdateData/> */}
      <RemoveData/>
    </>
  )
}

export default App

const styles = StyleSheet.create({})