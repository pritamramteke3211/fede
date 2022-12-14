import {View, Text, TouchableOpacity, Image, StyleSheet} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {useState} from 'react';
import {useEffect} from 'react';
import getMatchedUserInfo from '../lib/getMatchedUserInfo';
import {useSelector} from 'react-redux';
import firestore from '@react-native-firebase/firestore';
import {
  moderateScale,
  moderateScaleVertical,
} from '../src/styles/ResponsiveSize';

const ChatRow = ({matchDetails}) => {
  const navigation = useNavigation();
  const userData = useSelector(state => state.authentication.user_data);
  const [matchedUserInfo, setmatchedUserInfo] = useState(null);
  const [lastMessage, setlastMessage] = useState('');

  const getLastMsg = async () => {
    let lsMsg = await firestore()
      .collection('matches')
      .doc(matchDetails.fid)
      .collection('messages')
      .orderBy('timestamp', 'desc')
      .onSnapshot(snap => {
        if (snap.docs.length > 0) {
          setlastMessage(snap.docs[0].data().message);
        }
      });
  };

  useEffect(() => {
    setmatchedUserInfo(getMatchedUserInfo(matchDetails.users, userData.uid));
    getLastMsg();
  }, [matchDetails, userData]);

  return (
    <TouchableOpacity
      style={[
        {
          flexDirection: 'row',
          alignItems: 'center',
          borderRadius: 10,
          marginHorizontal: moderateScale(10),
          paddingVertical: moderateScaleVertical(10),
          paddingHorizontal: moderateScale(10),
          backgroundColor: 'white',
        },
        styles.cardShadow,
      ]}
      onPress={() =>
        navigation.navigate('Message', {
          matchDetails,
        })
      }>
      <Image
        style={{
          height: 50,
          aspectRatio: 1,
          borderRadius: 5,
          marginRight: moderateScale(10),
        }}
        source={{uri: matchedUserInfo?.photoURL}}
      />

      <View>
        <Text style={{fontSize: 18, fontWeight: '500'}}>
          {matchedUserInfo?.displayName}
        </Text>
        <Text>{lastMessage || 'Say Hi!'}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default ChatRow;

const styles = StyleSheet.create({
  cardShadow: {
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 1,
    },
    shadowOpacity: 0.2,
    shadowRadius: 1.41,
    elevation: 2,
  },
});
