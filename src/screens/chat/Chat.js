import {SafeAreaView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Header from '../../../components/Header';
import ChatList from '../../../components/ChatList';

const Chat = () => {
  return (
    <SafeAreaView>
      <Header title="Chat" />
      <ChatList />
    </SafeAreaView>
  );
};

export default Chat;

const styles = StyleSheet.create({});
