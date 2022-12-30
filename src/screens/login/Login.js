import {
  Image,
  ImageBackground,
  Pressable,
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
import gstyles from '../../globalStyle/GlobalStyle';
import LinearGradient from 'react-native-linear-gradient';
import FtIcon from 'react-native-vector-icons/Fontisto'

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
    <LinearGradient
    style={styles.container}
          start={{x: 0, y: 0}}
          end={{x: 0, y: 0.7}}
          colors={[ '#f05c21','#fa296b','#f6177b']}>
 
      <View style={[{flexDirection:'row'}, styles.sub_container]}>
      
      <FtIcon name='tinder' size={42} color={'#fff'} solid />
      <Text style={styles.tinder_txt}> tinder</Text>
      </View>
      <View style={styles.sub_container}>
        <>
        <View style={{marginHorizontal: moderateScale(30), marginBottom: moderateScaleVertical(10)}}>
          <Text style={styles.privacy_desc}>By clicking "Log In", you agree with our Terms. Learn how we process your data in our Privacy Policy and Cookie Policy.</Text>
        </View>
        <TouchableOpacity
          style={styles.btn}
          onPress={() =>
            googleSign().then(res => {
              dispatch(setUserdata(res.user));
              dispatch(setLogin(true));
              navigation.navigate('GetLocation');
            })
          }>
          <View style={{
            paddingHorizontal:10
            }}>
          <Image
        style={styles.login_log}
        source={require('../../../assets/img/google_logo.png')}
        />
        </View>
        <View style={{flexDirection:'row', justifyContent:'center', width: scr_width/1.6, paddingRight:20}}>
          <Text
            style={[{textAlign: 'center', fontWeight: 'bold', fontSize:16}, gstyles.glob_fontmedium]}
            // onPress={signOut}
          >
            LOG IN WITH GOOGLE
          </Text>
          </View>
        </TouchableOpacity>

        <Pressable 
        onPress={()=> {
          navigation.navigate('AccountRecovery')
          }}>
          <Text style={[{color:'#fff', fontSize:15},gstyles.glob_fontmedium]} >Trouble Logging in?</Text>
        </Pressable>
        
          
        </>
      </View>
  </LinearGradient>
  );
};

export default Login;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  sub_container:{
    flex: 1,
    ...gstyles.center_align
  },
  tinder_txt:{
    color:'#fff', 
    fontSize:42,
    ...gstyles.glob_fontsemibold
  },
  btn: {
  flexDirection:'row',
  justifyContent:'space-between',
  marginBottom : 20,
  width: scr_width / 1.2,
  borderRadius : 30,
   backgroundColor:'#fff',
   paddingHorizontal: moderateScale(10),
   paddingVertical: moderateScaleVertical(15),
  },
  privacy_desc : {
    ...gstyles.glob_fontmedium,
    color:'#fff',
    textAlign:'center'    
  },
  login_log:{
    width: moderateScale(25),
    height: moderateScaleVertical(25),
    borderRadius: 5,
    marginRight: moderateScale(10),
  },
});
