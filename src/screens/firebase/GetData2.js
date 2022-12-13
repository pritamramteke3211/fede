import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useState} from 'react';
import firestore from '@react-native-firebase/firestore';
import database from '@react-native-firebase/database';

const GetData2 = () => {
  const [myData, setmyData] = useState(null);

  useEffect(() => {
    getDatabase();
  }, []);

  const getDatabase = async () => {
    try {
      const data = await database().ref('users/1').once('value');
      console.log('data', data);
      setmyData(data.val());
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <View>
      <Text>Name:-{myData ? myData.name : 'Loading'}</Text>
      <Text>Age:-{myData ? myData.age : 'Loading'}</Text>
      {/* <Text>Hobby:-{myData? myData.hobby.map(list => `  ${list}`) : 'Loading'}</Text> */}
    </View>
  );
};

export default GetData2;

const styles = StyleSheet.create({});
