import { FlatList, StyleSheet, Text, View } from 'react-native'
import React, { useEffect,useState } from 'react'
import { useSelector } from 'react-redux';
import ChatRow from './ChatRow';
import firestore from '@react-native-firebase/firestore';


const ChatList = () => {

    const [matches, setmatches] = useState([])
    const userData = useSelector(state => state.authentication.user_data);
    const db = firestore().collection('users')


    useEffect(() => {
      try {
        let  mc = firestore().collection('matches')
        .where('usersMatched','array-contains', userData.uid).onSnapshot(snap => {
          
          setmatches(
        snap.docs.map(doc => 
            ({ 
            fid: doc.id,
            ...doc.data(),
        }) ))
      
        });  
      } catch (err) {
        console.log("err", err)
      }
      
    }, [userData])
    
 

  return matches.length > 0 ? (
   <FlatList
   style={{height:'100%'}}
   data={matches}
   keyExtractor={item => item.fid}
   renderItem={({item}) => <ChatRow matchDetails={item}  />}
   />
  ) :
  (
    <View style={{padding:50}}>
      <Text style={{textAlign:'center', fontSize:40}}>No Matches at the moment😢 </Text>
    </View>
  )
}

export default ChatList

const styles = StyleSheet.create({})