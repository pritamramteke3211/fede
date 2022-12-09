import { StyleSheet, Text, View } from 'react-native'
import React,{useEffect, useState} from 'react'
import firestore from '@react-native-firebase/firestore';

const GetData = () => {

    const [myData, setmyData] = useState(null)

    useEffect(() => {
      getDatabase()
    }, [])

    const getDatabase = async()=>{
        try{
            const data = await firestore().collection('testing').doc("LjVma6D0eEZhg90bXVUc").get()
            setmyData(data._data)
            console.log("data", data._data);
        }
        catch (err){
            console.log(err)
        }
    }
    
  return (
    <View>
      <Text>Name:-{myData? myData.name : 'Loading'}</Text>
      <Text>Age:-{myData? myData.age : 'Loading'}</Text>
      <Text>Hobby:-{myData? myData.hobby.map(list => `  ${list}`) : 'Loading'}</Text>
    </View>
  )
}

export default GetData

const styles = StyleSheet.create({})