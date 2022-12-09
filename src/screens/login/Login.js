import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React,{useEffect,useState} from 'react';
import { GoogleSignin, statusCodes } from '@react-native-google-signin/google-signin';
import auth from '@react-native-firebase/auth';


const Login = () => {

  const [userData, setuserData] = useState({})
  const [signIn, setsignIn] = useState(false)

  useEffect(() => {
    GoogleSignin.configure({
      webClientId: '1058085809384-34vjkkfe41hk2enc2fnhliu9k9j3qrvs.apps.googleusercontent.com',
      
    });
  }, [])

  const googleSign= async()=> {
    // Check if your device supports Google Play
    await GoogleSignin.hasPlayServices({ showPlayServicesUpdateDialog: true });
    // Get the users ID token
    const { idToken } = await GoogleSignin.signIn();
  
    // Create a Google credential with the token
    const googleCredential = auth.GoogleAuthProvider.credential(idToken);
  
    // Sign-in the user with the credential
    return auth().signInWithCredential(googleCredential);
  }
  
  // const googleSign = async () => {
  //   try {
  //     await GoogleSignin.hasPlayServices();
  //     const userInfo = await GoogleSignin.signIn();
  //     console.log("user info", userInfo);
  //   } catch (error) {
  //     if (error.code === statusCodes.SIGN_IN_CANCELLED) {
  //       console.log("SIGN_IN_CANCELLED",error)
  //     } else if (error.code === statusCodes.IN_PROGRESS) {
  //       console.log("IN_PROGRESS",error)
  //     } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
  //       console.log("PLAY_SERVICES_NOT_AVAILABLE",error)
  //     } else {
  //       console.log("Other Error",error)
  //     }
  //   }
  // };

  const signOut = async () => { 
    try {
      await GoogleSignin.revokeAccess();
      await auth().signOut();
      setsignIn(false)
      // Google Account disconnected from your app.
      // Perform clean-up actions, such as deleting data associated with the disconnected account.
    } catch (error) {
      console.error(error);
    }
  };

console.log("signIn",signIn);
  return (
    <View style={styles.container}>
{ signIn ?
<>
<View>
  <Text>UID: <Text>{userData.uid}</Text></Text>
  <Text>Name: <Text>{userData.displayName}</Text></Text>
  <Text>Email: <Text>{userData.email}</Text></Text>
</View>
  <TouchableOpacity style={styles.btn} onPress={()=> signOut()
      }>
      <Text style={{color:'white'}}>Google Logout</Text>
      </TouchableOpacity>
      </>  
:
<>
<TouchableOpacity style={styles.btn} onPress={()=> googleSign().then(res => {
  console.log(res.user)
  setuserData(res.user)
  setsignIn(true)
})
.catch(err => console.log(err))
}>
<Text style={{color:'white'}}>Google Login</Text>
</TouchableOpacity>
</>
      }
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent:'center',
    alignItems:'center',
  },
  btn:{
    padding: 20,
    margin: 10,
    backgroundColor:'#5337d0'
  }
});
