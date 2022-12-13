import {Button, StyleSheet, Text, View} from 'react-native';
import React, {useEffect} from 'react';
import firestore from '@react-native-firebase/firestore';

const RemoveData = () => {
  const removeDataF = () => {
    firestore()
      .collection('Users')
      .doc('ABC')
      .delete()
      .then(() => {
        console.log('User deleted!');
      });
  };

  return (
    <View>
      <Text>RemoveData</Text>
      <Button title="Remove User" onPress={() => removeDataF()} />
    </View>
  );
};

export default RemoveData;

const styles = StyleSheet.create({});
