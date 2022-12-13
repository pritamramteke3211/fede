import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

const UpdateData = () => {
  const updateDataF = () => {
    firestore()
      .collection('Users')
      .doc('ABC')
      .update({
        age: 24,
      })
      .then(() => {
        console.log('User updated!');
      });
  };

  return (
    <View>
      <Text>UpdateData</Text>
      <Button title="Update User" onPress={() => updateDataF()} />
    </View>
  );
};

export default UpdateData;

const styles = StyleSheet.create({});
