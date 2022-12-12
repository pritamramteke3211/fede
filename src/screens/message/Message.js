import { Button, KeyboardAvoidingView, Keyboard, SafeAreaView, StyleSheet, Text, TextInput, TouchableWithoutFeedback, View, FlatList } from 'react-native'
import React from 'react'
import Header from '../../../components/Header'
import { useRoute } from '@react-navigation/native'
import { useEffect } from 'react'
import { useSelector } from 'react-redux'
import getMatchedUserInfo from '../../../lib/getMatchedUserInfo'
import { useState } from 'react'
import SenderMessage from '../../../components/SenderMessage'
import ReceiverMessage from '../../../components/ReceiverMessage'
import firestore from '@react-native-firebase/firestore';


const Message = () => {

    const {params:{matchDetails}} = useRoute()
    const userData = useSelector(state => state.authentication.user_data);
    const [input, setinput] = useState("")
    const [messages, setmessages] = useState([])

    const getMessages= async()=>{
      let Msgs = await firestore().collection('matches').doc(matchDetails.fid).collection('messages').orderBy("timestamp", "desc").onSnapshot(snap => 
        {
          // setlastMessage(snap.docs[0]?.data().message)
        console.log("snap",snap.docs.length)
        if (snap.docs.length > 0) {
          let msgs = snap.docs.map( doc =>
            ({
                        id: doc.id,
                        ...doc.data(),
                      }) )
          setmessages(msgs)
          
        }})}

    useEffect(() => {
      
        getMessages()
      
    }, [matchDetails])
    
   
    const sendMessage = async() => {

      let msgData = {
        timestamp : firestore.FieldValue.serverTimestamp(),
        userId: userData?.uid,
        displayName: userData?.displayName,
        message: input,
        photoURL: matchDetails?.users[userData?.uid]?.photoURL,
      }

      console.log("msgData",msgData)
        try {
          let save = await firestore()
          .collection('matches')
          .doc(matchDetails.fid)
          .collection('messages')
          .add(msgData)
          .then(() => {
            console.log('Message added!');
          });
           
        } catch (err) {
          console.log("save err", err);
        }
        

        setinput("")
        Keyboard.dismiss()
    }
    
  return (
    <SafeAreaView 
    style={{flex:1}}
    >
    <Header title={getMatchedUserInfo(matchDetails.users, userData.uid).displayName} callEnabled/>
      
      <KeyboardAvoidingView
      behavior={Platform.OS === "ios"? "padding" : "height"}
      style={{flex:1}}
      keyboardVerticalOffset={50}
      >
        
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <FlatList
            inverted={-1}
            data={messages}
            keyExtractor={item => item.id}
            renderItem={({item: message})=>
            message.userId === userData.uid ? (
                <SenderMessage key={message.id} message={message} />
            ):
            (
                <ReceiverMessage key={message.id} message={message} />
            )
        }
            />
          
        </TouchableWithoutFeedback> 
   
         
         <View style={{flexDirection:'row', justifyContent:'space-between', alignItems:'center', borderColor:'gray',borderWidth:1, paddingHorizontal:5, paddingVertical:2}}>
        <TextInput
        style={{height:50, fontSize:20}}
        placeholder="Send Message..."
        onChangeText={setinput}
        value={input}
        onSubmitEditing={()=> input && sendMessage()}
        />
        <Button 
        onPress={()=> input && sendMessage()}
         title="Send" color="#FF5864"/>

      </View>
   

          </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default Message

const styles = StyleSheet.create({})