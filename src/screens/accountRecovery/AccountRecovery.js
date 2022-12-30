import React, {useState, useEffect, useRef, useCallback} from 'react';

import {
  Text,
  View,
  SafeAreaView,
  StyleSheet,
  Image,
  PermissionsAndroid,
  Platform,
  Button,
  TouchableOpacity,
} from 'react-native';
// import Ionicons from 'react-native-vector-icons/Ionicons'

import EntIcon from 'react-native-vector-icons/Entypo';
import Geolocation from '@react-native-community/geolocation';
import gstyles from '../../globalStyle/GlobalStyle';
import LinearGradient from 'react-native-linear-gradient';
import BottomSheet from '../../../components/bottom_sheet/BottomSheet';
import {GestureHandlerRootView} from 'react-native-gesture-handler';
import GradientBtn from '../../../components/Btn/GradientBtn';
import {useDispatch, useSelector} from 'react-redux';
import {setLoginUserLocation} from '../../store/feature/authentication/authentication';
import {
  moderateScale,
  moderateScaleVertical,
  scr_height,
  scr_width,
} from '../../styles/ResponsiveSize';
import NavBtn from '../../../components/Btn/NavBtn';

const AccountRecovery = ({navigation}) => {
  const ref = useRef();
  
  return (
 
      <View style={[gstyles.container,{paddingHorizontal:20}]}>
        {/* Back NavBtn */}
        <NavBtn icon={'arrow-back'} path={'Login'}/>
        
        <View style={[styles.location_para_container, gstyles.center_align]}>
          <View style={styles.loc_title_container}>
            <Text style={[styles.loc_title, gstyles.glob_fontmedium]}>
              Account recovery
            </Text>
          </View>
          <View style={styles.loc_para_container}>
            <Text style={[styles.loc_para, gstyles.glob_fontmedium]}>

              Changed your phone  number or lost access to your Facebook account? We can help you log in with your email.

              {/* You'll need to enable your {'\n'} location {'\n'} order to use
              Fede */}
            </Text>
          </View>

          <GradientBtn onPressA={()=> {}} text={"LOG IN WITH EMAIL"} />

        </View>
      </View>

    
  );
};

export default AccountRecovery;

const styles = StyleSheet.create({
  
  location_para_container: {
    flex: 0.7,
    // backgroundColor:'green',
  },

  loc_title_container: {
    marginBottom: moderateScaleVertical(10),
  },
  loc_title: {
    fontSize: 30,
    color: '#424242',
  },
  loc_para_container: {
    marginBottom: moderateScaleVertical(36),
    // width: scr_width/1.4,
  },
  loc_para: {
    textAlign: 'center',
    fontSize: 20,
    // color: '#424242',
  },
  btn_container: {
    paddingHorizontal: moderateScale(50),
    paddingVertical: moderateScaleVertical(5),
    borderRadius: 20,
    marginBottom: moderateScaleVertical(10),
  },
  btn_title: {
    fontSize: 20,
    color: '#fff',
  },
  more_title_container: {
    flexDirection: 'row',
  },
  more_title: {
    fontSize: 18,
  },
});
