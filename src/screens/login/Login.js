import {
  ImageBackground,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useEffect} from 'react';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';
import {useDispatch} from 'react-redux';
import {
  setLogin,
  setUserdata,
} from '../../store/feature/authentication/authentication';
import {
  moderateScale,
  moderateScaleVertical,
  scr_width,
} from '../../styles/ResponsiveSize';

const Login = ({navigation}) => {
  const dispatch = useDispatch();

  useEffect(() => {
    GoogleSignin.configure({
      webClientId:
        '1058085809384-34vjkkfe41hk2enc2fnhliu9k9j3qrvs.apps.googleusercontent.com',
    });
  }, []);

  const googleSign = async () => {
    await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
    const {idToken} = await GoogleSignin.signIn();
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
    return auth().signInWithCredential(googleCredential);
  };

  return (
    <View style={styles.container}>
      <View style={{flex: 1}}>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            googleSign().then(res => {
              dispatch(setUserdata(res.user));
              dispatch(setLogin(true));
              navigation.navigate('GetLocation');
            })
          }>
          <Text
            style={{textAlign: 'center', fontWeight: 'bold'}}
            // onPress={signOut}
          >
            Signin in & get swiping
          </Text>
        </TouchableOpacity>
      </View>
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
    bottom: moderateScaleVertical(120),
    width: scr_width / 2,
    marginHorizontal: moderateScale(scr_width * 0.25),
    padding: moderateScale(20),
    borderRadius: 20,
    backgroundColor: '#fff',
  },
});
