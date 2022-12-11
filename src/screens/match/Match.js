import {
  Dimensions,
  Image,
  StyleSheet,
  Text,
  Touchable,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import {useNavigation, useRoute} from '@react-navigation/native';

const Match = () => {
  const navigation = useNavigation();
  const {
    params: {my_profile, userSwiped},
  } = useRoute();

  return (
    <View
      style={{
        backgroundColor: 'red',
        height: '100%',
        opacity: 0.8,
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <View style={{paddingHorizontal: 10, paddingTop: 10}}>
        <Image
          source={{uri: 'https://links.papareact.com/mg9'}}
          style={{width: Dimensions.get('window').width / 1.5, height: 60}}
        />
      </View>

      <Text style={{color: '#fff', textAlign: 'center', marginVertical: 30}}>
        You and {userSwiped.displayName} have linked each other.
      </Text>

      {/* Images Section */}
      <View
        style={{
          width: Dimensions.get('window').width / 1.2,
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
          marginTop: 55,
          paddingHorizontal: 100,
          paddingVertical: 20,
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

const styles = StyleSheet.create({});
