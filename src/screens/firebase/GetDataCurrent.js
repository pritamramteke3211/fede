// Firestore Real Time
import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';

const GetDataCurrent = () => {
  const [myData, setmyData] = useState(null);
  const [count, setcount] = useState(0);

  const db = firestore().collection('testing');

  const loadDb = async () => {
    let dbg = await db
      .doc('LjVma6D0eEZhg90bXVUc')
      .onSnapshot(documentSnapshot => {
        console.log(count, ' User data U: ', documentSnapshot.data());
        setmyData(documentSnapshot.data());
        setcount(count + 1);
      });
  };

  useEffect(() => {
    loadDb();
  }, []);

  return (
    <View>
      <Text>GetDataCurrent{count}</Text>
      <Text>Name:-{myData ? myData.name : 'Loading'}</Text>
      <Text>Age:-{myData ? myData.age : 'Loading'}</Text>
      <Text>
        Hobby:-{myData ? myData.hobby.map(list => `  ${list}`) : 'Loading'}
      </Text>
    </View>
  );
};

export default GetDataCurrent;

const styles = StyleSheet.create({});
