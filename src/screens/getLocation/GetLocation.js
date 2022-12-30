import React, {useState, useEffect, useRef, useCallback, useLayoutEffect} from 'react';

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
import EvlIcon from 'react-native-vector-icons/EvilIcons';
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
import {Linking,DevSettings} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const GetLocation = () => {

  const navigation = useNavigation()
  const ref = useRef();
  const dispatch = useDispatch();

  const [locationStatus, setlocationStatus] = useState('');
  const [permission_denied, setpermission_denied] = useState(false)
  const [refresh, setrefresh] = useState(false)

  const watchID = null;

  const onTellMeMore = useCallback(() => {
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-scr_height);
    }
  }, []);

  const getLocation = () => {

    const requestLocationPermission = async () => {
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        // subscribeLocationLocation();
      } else {
        try {
          const granted = await PermissionsAndroid.request(
            PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
            {
              title: 'Location Access Required',
              message: 'This App need to Access your location',
            },
          );

          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            // To Check, If Permission is granted
            getOneTimeLocation();
            // subscribeLocationLocation();
          } else {
            setpermission_denied(true)
            setlocationStatus('Permission Denied');
          }
        } catch (err) {
          console.warn(err);
        }
      }
    };

    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    };
  };

  const getOneTimeLocation = () => {
    setlocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      position => {
        setlocationStatus('You are Here');

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude);

        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude);

        dispatch(
          setLoginUserLocation({
            longitude: currentLongitude,
            latitude: currentLatitude,
          }),
        );

        setlocationStatus('clean');
        navigation.navigate('Home');
      },
      err => {
        setlocationStatus(err.message);
        alert(err.message);
      },

      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 10000,
      },
    );
  };

  const openAppSetting = () => {
    Linking.openSettings()
  }

  const checkLocationPermission = async () => {
    const granted = await PermissionsAndroid.check( PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION );

    if (granted) {
      console.log( "You can use the ACCESS_FINE_LOCATION" )
    } 
    else {
      console.log( "ACCESS_FINE_LOCATION permission denied" )}
    
  }

  useLayoutEffect(() => {
    
    checkLocationPermission()
    const focusHandler = navigation.addListener('focus', () => {
      checkLocationPermission()
      // DevSettings.reload()

    });
    return focusHandler;
  }, []);


  return (
    <GestureHandlerRootView style={gstyles.container}>
      <View style={gstyles.container}>
        <View style={[styles.location_container, gstyles.center_align]}>
          <View style={[styles.icon_container, gstyles.center_align]}>
            <EvlIcon name="location" size={scr_width / 3.2} />
          </View>
        </View>
       { !permission_denied ? 
        <View style={[styles.location_para_container, gstyles.center_align]}>
          <View style={styles.loc_title_container}>
            <Text style={[styles.loc_title, gstyles.glob_fontmedium]}>
              Enable location
            </Text>
          </View>
          <View style={styles.loc_para_container}>
            <Text style={[styles.loc_para, gstyles.glob_fontmedium]}>
              You'll need to enable your {'\n'} location {'\n'} order to use
              Fede
            </Text>
          </View>

          <GradientBtn onPressA={getLocation} text={'Allow Location'} />

          <TouchableOpacity
            style={[styles.more_title_container]}
            onPress={onTellMeMore}>
            <Text style={[styles.more_title, gstyles.glob_fontmedium]}>
              TELL ME MORE
            </Text>
            <EntIcon name="chevron-small-down" size={25} />
          </TouchableOpacity>
        </View>
        :
        <View style={[styles.location_para_container, gstyles.center_align]}>
          <View style={styles.loc_title_container}>
            <Text style={[styles.loc_title, gstyles.glob_fontmedium]}>
              Oops
            </Text>
          </View>
          <View style={styles.loc_para_container}>
            <Text style={[styles.loc_para, gstyles.glob_fontmedium]}>
              In order to use Tinder, please {'\n'}
              enable your location
              {'\n'} {'\n'}
              Go to App Setting 
              <EntIcon name="chevron-small-right" size={25} />
              {'\n'}
               Permissions
            </Text>
          </View>

          <GradientBtn onPressA={openAppSetting} text={'OPEN SETTINGS'} />

        </View>
}
      </View>

      <BottomSheet ref={ref}>
        <View
          style={[
            gstyles.center_align,
            {paddingVertical: moderateScaleVertical(25)},
          ]}>
          <GradientBtn getLocation={getLocation} text={'Allow Location'} />
        </View>
        <View
          style={[
            {height: scr_height / 1.4, backgroundColor: '#fff'},
            gstyles.center_align,
          ]}>
          <View style={styles.loc_title_container}>
            <Text style={[styles.loc_title, gstyles.glob_fontmedium]}>
              Meet people nearby
            </Text>
          </View>
          <View style={styles.loc_para_container}>
            <Text style={[styles.loc_para, gstyles.glob_fontmedium]}>
              Your location will be used to {'\n'} show {'\n'} potential matches
              near you
            </Text>
          </View>
        </View>
      </BottomSheet>
    </GestureHandlerRootView>
  );
};

export default GetLocation;

const styles = StyleSheet.create({
  location_container: {
    flex: 1.2,
  },
  location_para_container: {
    flex: 0.8,
    // backgroundColor:'green',
  },
  icon_container: {
    width: scr_width / 1.8,
    aspectRatio: 1,
    borderRadius: scr_width / 2,
    borderWidth: 1,
    borderColor: '#d9d8d8df',
    backgroundColor: '#e5e1e170',
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
