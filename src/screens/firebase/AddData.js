import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

const AddData = () => {
  const addDataF = () => {
    firestore()
      .collection('Users')
      .doc('ABC')
      .set({
        name: 'Ada Lovelace',
        age: 30,
      })
      .then(() => {
        console.log('User added!');
      });
  };

  return (
    <View>
      <Text>AddData</Text>
      <Button title="Add User" onPress={() => addDataF()} />
    </View>
  );
};

export default AddData;

const styles = StyleSheet.create({});
