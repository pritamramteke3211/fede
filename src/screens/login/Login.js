import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import {
  GoogleSignin,
  statusCodes,
} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {
  setLogin,
  setUserdata,
} from '../../store/feature/authentication/authentication';

const Login = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1058085809384-34vjkkfe41hk2enc2fnhliu9k9j3qrvs.apps.googleusercontent.com',
    });
  }, []);

  const googleSign = async () => {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    // Get the users ID token
    const {idToken} = await GoogleSignin.signIn();
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);

    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  };

  return (
    <View style={styles.container}>
      <ImageBackground source={{ uri: 'https://tinder.com/static/tinder.png'}}  resizeMode="cover" style={{flex:1}}>
      <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            googleSign().then(res => {
              // console.log(res.user);

              dispatch(setUserdata(res.user));
              dispatch(setLogin(true));
            })
          }>
          <Text
            style={{textAlign: 'center', fontWeight: 'bold'}}
            // onPress={signOut}
          >
            Signin in & get swiping
          </Text>
        </TouchableOpacity>
      </ImageBackground>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  btn: {
    position: 'absolute',
    bottom: 120,
    width: '50%',
    marginHorizontal: '25%',
    padding: 20,
    borderRadius: 20,
    backgroundColor: '#fff',
  },
});
