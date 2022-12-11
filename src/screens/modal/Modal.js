import {
    Image,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useState} from 'react';
  import {useNavigation} from '@react-navigation/native';
  import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';

const Modal = () => {
    const userData = useSelector(state => state.authentication.user_data);
    const navigation = useNavigation();
    const [image, setimage] = useState(null);
    const [job, setjob] = useState(null);
    const [age, setage] = useState(null);

    const incompleteForm = !image || !job || !age;

    const updateUserProfile = () => {
        const timestamp = firestore.FieldValue.serverTimestamp();
    
        const data = {
          uid: userData.uid,
          displayName: userData.displayName,
          photoURL: image,
          job: job,
          age: age,
          added_at: timestamp,
        };
        

          firestore()
  .collection('users')
  .doc(userData.uid)
  .set(data)
  .then(() => {
    navigation.navigate('Home');
  }).catch(err => alert(err.message));
        
      };

  return (
    <View
    style={{
      flex: 1,
      marginTop: 10,
      borderRadius: 10,
      alignItems: 'center',
      backgroundColor: '#fff',
    }}>
    <Image
      style={{height: 100, width: '100%'}}
      resizeMode="contain"
      source={{uri: 'https://links.papareact.com/2pf'}}
    />
    <Text
      style={{fontSize: 18, color: 'gray', padding: 5, fontWeight: 'bold'}}>
      Welcome {userData.displayName}
    </Text>

    <Text
      style={{
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 7,
        color: 'red',
      }}>
      Step 1: The Profile Pic
    </Text>
    <TextInput
      style={{paddingBottom: 5, textAlign: 'center', fontSize: 16}}
      placeholder="Enter a Profile Pic URL"
      value={image}
      onChangeText={setimage}
    />

    <Text
      style={{
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 7,
        color: 'red',
      }}>
      Step 2: The Job
    </Text>
    <TextInput
      style={{paddingBottom: 5, textAlign: 'center', fontSize: 16}}
      placeholder="Enter your occupation"
      value={job}
      onChangeText={setjob}
    />

    <Text
      style={{
        textAlign: 'center',
        fontWeight: 'bold',
        padding: 7,
        color: 'red',
      }}>
      Step 3: The Age
    </Text>
    <TextInput
      style={{paddingBottom: 5, textAlign: 'center', fontSize: 16}}
      placeholder="Enter your age"
      value={age}
      onChangeText={setage}
      maxLength={2}
    />

    <TouchableOpacity
      disabled={incompleteForm}
      style={{
        width: '40%',
        alignItems: 'center',
        backgroundColor: incompleteForm ? '#80808070' : '#ff00007c',
        padding: 12,
        borderRadius: 10,
        position: 'absolute',
        bottom: 10,
      }}
      onPress={updateUserProfile}>
      <Text style={{color: '#fff', fontSize: 16}}>Update Profile</Text>
    </TouchableOpacity>
  </View>
  )
}

export default Modal

const styles = StyleSheet.create({})