import {
    ImageBackground,
    StyleSheet,
    Text,
    TouchableOpacity,
    View,
  } from 'react-native';
  import React, {useEffect, useLayoutEffect} from 'react';
  import {GoogleSignin} from '@react-native-google-signin/google-signin';
  import auth from '@react-native-firebase/auth';
  import {useDispatch, useSelector} from 'react-redux';
  import {
    setLogin,
    setUserdata,
  } from '../../store/feature/authentication/authentication';
  
  const FirstScreen = ({navigation}) => {
    const dispatch = useDispatch();
    const logined = useSelector(state => state.authentication.login);
    const log_user_loc = useSelector(state => state.authentication.login_user_location)
  
    checkCred = () => {
        if (logined && log_user_loc.latitude) {
          navigation.navigate('Home')
        }
        else if(logined){
          navigation.navigate('GetLocation')
        }
        else{
          navigation.navigate('Login')
        }
    }

    useLayoutEffect(() => {
      checkCred()
    }, [])
  
    return (
      <View style={styles.container}>
        <ImageBackground
          source={{uri: 'https://tinder.com/static/tinder.png'}}
          resizeMode="cover"
          style={{flex: 1}}>
        
        </ImageBackground>
      </View>
    );
  };
  
  export default FirstScreen;
  
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
  