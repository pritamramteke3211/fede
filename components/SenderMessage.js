import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {moderateScale} from '../src/styles/ResponsiveSize';

const SenderMessage = ({message}) => {
  return (
    <View
      style={{
        backgroundColor: 'purple',
        borderRadius: 5,
        borderTopRightRadius: 0,
        paddingVertical: moderateScaleVertical(8),
        paddingHorizontal: moderateScale(10),
        marginHorizontal: moderateScale(16),
        marginVertical: moderateScaleVertical(5),
        alignSelf: 'flex-start',
        marginLeft: 'auto',
      }}>
      <Text style={{color: 'white'}}>{message.message}</Text>
    </View>
  );
};

export default SenderMessage;

const styles = StyleSheet.create({});
