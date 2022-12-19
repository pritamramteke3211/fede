import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import gstyles from '../../src/globalStyle/GlobalStyle';
import {moderateScaleVertical} from '../../src/styles/ResponsiveSize';

const AllowLocationBtn = ({getLocation}) => {
  return (
    <>
      <TouchableOpacity onPress={() => getLocation()}>
        <LinearGradient
          style={styles.btn_container}
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#fa298b', '#f55f14']}>
          <Text style={[styles.btn_title, gstyles.glob_fontmedium]}>
            ALLOW LOCATION
          </Text>
        </LinearGradient>
      </TouchableOpacity>
    </>
  );
};

export default AllowLocationBtn;

const styles = StyleSheet.create({
  btn_container: {
    paddingHorizontal: 50,
    paddingVertical: moderateScaleVertical(5),
    borderRadius: 20,
    marginBottom: 10,
  },
  btn_title: {
    fontSize: 20,
    color: '#fff',
  },
});
