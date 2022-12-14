import React, {useState, useEffect} from 'react';

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

import Ionicons from 'react-native-vector-icons/Ionicons'

import Geolocation from '@react-native-community/geolocation';

const GetLocation = ({navigation}) => {
  const [currentLongitude, setcurrentLongitude] = useState('...')
  const [currentLatitude, setcurrentLatitude] = useState('...')
  const [locationStatus, setlocationStatus] = useState('')

  const watchID = null;

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

        //Setting Longitude state
        setcurrentLongitude(currentLongitude)

        //Setting Lattitude state
        setcurrentLatitude(currentLatitude)
      },
      (err) =>{
        setlocationStatus(err.message)
      },

      {
        enableHighAccuracy: false,
        timeout: 5000,
        maximumAge: 10000
      },
    );
    navigation.navigate('Home')
  };
  

  return (
    <View>
      <Text>App</Text>
      <View>
        <Text>{locationStatus}</Text>
      </View>
      <View>
        <Text>currentLatitude: {currentLatitude}</Text>
        <Text>currentLongitude: {currentLongitude}</Text>
      </View>
      <View>
        <TouchableOpacity style={{padding:30,backgroundColor:'red'}} onPress={()=>{
          getLocation()
        }}>
          <Text>Allow Location</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

export default GetLocation
