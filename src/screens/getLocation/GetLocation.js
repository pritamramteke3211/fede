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
import EvlIcon from 'react-native-vector-icons/EvilIcons'
import EntIcon from 'react-native-vector-icons/Entypo'
import Geolocation from '@react-native-community/geolocation';
import gstyles from '../../globalStyle/GlobalStyle';
import { scr_width,scr_height } from '../../constant/ProjectConstant';
import LinearGradient from 'react-native-linear-gradient';
import BottomSheet from '../../../components/bottom_sheet/BottomSheet';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import AllowLocationBtn from '../../../components/Btn/AllowLocationBtn';
import { useDispatch, useSelector } from 'react-redux';
import { setLoginUserLocation } from '../../store/feature/authentication/authentication';


const GetLocation = ({navigation}) => {

  const ref = useRef()
  const dispatch = useDispatch()

  const [locationStatus, setlocationStatus] = useState('')

  const watchID = null;

  const onTellMeMore = useCallback(
    () => {
    
    const isActive = ref?.current?.isActive();
    if (isActive) {
      ref?.current?.scrollTo(0);
    } else {
      ref?.current?.scrollTo(-scr_height+45); 
    }
    
  },[],
  )
  

  const getLocation = ()=>{
    const requestLocationPermission = async()=>{
      if (Platform.OS === 'ios') {
        getOneTimeLocation();
        // subscribeLocationLocation();
      }
      else{
        
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
          }
          else{
            setlocationStatus('Permission Denied');
          }

        } catch (err) {
          console.warn(err)
        }
      }
    };

    requestLocationPermission();
    return () => {
      Geolocation.clearWatch(watchID);
    }
  }
  
  const getOneTimeLocation = () => {
    setlocationStatus('Getting Location ...');
    Geolocation.getCurrentPosition(
      //Will give you the current location
      (position) => {
        setlocationStatus('You are Here');

        //getting the Longitude from the location json
        const currentLongitude = JSON.stringify(position.coords.longitude)
        
        //getting the Latitude from the location json
        const currentLatitude = JSON.stringify(position.coords.latitude)

        dispatch(setLoginUserLocation({longitude: currentLongitude, latitude: currentLatitude}))        
        
        setlocationStatus('clean')
        navigation.navigate('Home')
      },
      (err) =>{
        setlocationStatus(err.message)
        alert(err.message)
      },

      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 10000
      }, 
    );
    
  };
  

  return (
    <GestureHandlerRootView style={gstyles.container}>
      
<View style={gstyles.container}>    
        
        <View style={[
          styles.location_container,
          gstyles.center_align]}>
            <View style={[styles.icon_container,gstyles.center_align]}>
        
            
        <EvlIcon
                name='location'
                size={scr_width/3.2}
                />
            </View>
        </View>

        <View style={[
              styles.location_para_container,
              gstyles.center_align]}>
          
            <View style={styles.loc_title_container}>
              <Text style={[styles.loc_title,gstyles.glob_fontmedium]}>Enable location</Text>
            </View>
            <View style={styles.loc_para_container}>
              <Text style={[styles.loc_para,gstyles.glob_fontmedium]}>You'll need to enable your {'\n'} location {'\n'} order to use Fede</Text>
            </View>

            
            <AllowLocationBtn getLocation={getLocation} />

            <TouchableOpacity style={[
              styles.more_title_container,
              ]}
              onPress={onTellMeMore}
              >
            <Text style={[styles.more_title,gstyles.glob_fontmedium]}>TELL ME MORE</Text>
            <EntIcon
                name='chevron-small-down'
                size={25}
                />
            </TouchableOpacity>

        </View>
        </View>

        <BottomSheet ref={ref}>
          <View style={[gstyles.center_align,{paddingVertical: 25}]}>
              <AllowLocationBtn getLocation={getLocation} />
          </View>
          <View style={[{height:scr_height/1.4, backgroundColor:'#fff'},gstyles.center_align]}>
          <View style={styles.loc_title_container}>
            <Text style={[styles.loc_title,gstyles.glob_fontmedium]}>Meet people nearby</Text>
            </View>
            <View style={styles.loc_para_container}>
            <Text style={[styles.loc_para,gstyles.glob_fontmedium]}>Your location will be used to {'\n'} show {'\n'} potential matches near you</Text>
            </View>
          </View>
            </BottomSheet>
       
    </GestureHandlerRootView>
  )
}

export default GetLocation

const styles = StyleSheet.create({
   
    location_container:{
        flex:1.2, 
    },
    location_para_container:{
        flex:0.8, 
        // backgroundColor:'green',
    },
    icon_container:{
        width: scr_width/1.8,
        aspectRatio:1,
        borderRadius: scr_width/2,
        borderWidth: 1,
        borderColor: '#d9d8d8df',
        backgroundColor: '#e5e1e170',
        
    },
    loc_title_container: {
      marginBottom: 10,
    },
    loc_title:{
        fontSize: 30,
        color: '#424242',
    },
    loc_para_container: {
      marginBottom: 36,
      // width: scr_width/1.4,
    },
    loc_para:{
      textAlign:'center',
        fontSize: 20,
        // color: '#424242',
    },
    btn_container:{  
      paddingHorizontal: 50,
      paddingVertical: 5,
      borderRadius: 20,
      marginBottom: 10,
    },
    btn_title:{
      fontSize: 20,
      color: '#fff',
    },
    more_title_container:{  
     flexDirection:'row',
    },
    more_title:{
      fontSize: 18,
    },
  });