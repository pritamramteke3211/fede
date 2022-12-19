import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';
import {
  moderateScale,
  moderateScaleVertical,
  scr_height,
  scr_width,
} from '../../styles/ResponsiveSize';

const Match = () => {
  const navigation = useNavigation();
  const {
    params: {my_profile, userSwiped},
  } = useRoute();

  return (
    <View
      style={{
        backgroundColor: 'red',
        height: scr_height,
        opacity: 0.8,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View
        style={{
          paddingHorizontal: moderateScale(10),
          paddingTop: moderateScaleVertical(10),
        }}>
        <Image
          source={{uri: 'https://links.papareact.com/mg9'}}
          style={{width: scr_width / 1.5, height: 60}}
        />
      </View>

      <Text
        style={{
          color: '#fff',
          textAlign: 'center',
          marginVertical: moderateScaleVertical(30),
        }}>
        You and {userSwiped.displayName} have linked each other.
      </Text>

      {/* Images Section */}
      <View
        style={{
          width: scr_width / 1.2,
          flexDirection: 'row',
          justifyContent: 'space-evenly',
        }}>
        <Image
          source={{uri: my_profile.photoURL}}
          style={{width: 130, aspectRatio: 1, borderRadius: 60}}
          // resizeMode='contain'
        />
        <Image
          source={{uri: userSwiped.photoURL}}
          style={{width: 130, aspectRatio: 1, borderRadius: 60}}
          // resizeMode='contain'
        />
      </View>
      <TouchableOpacity
        style={{
          backgroundColor: '#fff',
          marginTop: moderateScaleVertical(55),
          paddingHorizontal: moderateScale(100),
          paddingVertical: moderateScaleVertical(20),
          borderRadius: 30,
        }}
        onPress={() => {
          navigation.navigate('Chat');
        }}>
        <Text> Say Hi </Text>
      </TouchableOpacity>
    </View>
  );
};

export default Match;
