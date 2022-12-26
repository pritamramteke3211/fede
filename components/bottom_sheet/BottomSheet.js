import { Dimensions, StyleSheet, Text, View } from 'react-native'
import React, { forwardRef, useCallback, useEffect, useImperativeHandle } from 'react'
import Animated, { Extrapolate, interpolate, useAnimatedStyle, useSharedValue, withSpring, withTiming } from 'react-native-reanimated';
import { Gesture, GestureDetector } from 'react-native-gesture-handler';
import EntIcon from 'react-native-vector-icons/Entypo'
import { moderateScaleVertical } from '../../src/styles/ResponsiveSize';

const { height: SCREEN_HEIGHT } = Dimensions.get('window');

const MAX_TRANSLATE_Y = -SCREEN_HEIGHT ;

const BottomSheet = forwardRef(({children},ref) => {

  const translateY = useSharedValue(0)
  const active = useSharedValue(false);

  const scrollTo = useCallback((destination) => {
    'worklet';
    active.value = destination !== 0;
    translateY.value = withSpring(destination, { damping: 50 });
  }, []);
  

  const isActive = useCallback(() => {
    return active.value;
  }, []);

  useImperativeHandle(ref, () => ({ scrollTo, isActive }), [
    scrollTo,
    isActive,
  ]);

  const context = useSharedValue({ y: 0 });
  const gesture = Gesture.Pan()
  .onStart(() => {
    context.value = { y: translateY.value };
  })
  .onUpdate((event) => {
    translateY.value = event.translationY + context.value.y;
    translateY.value = Math.max(translateY.value, MAX_TRANSLATE_Y);
  })
  .onEnd(() => {
    if (translateY.value > -SCREEN_HEIGHT / 2) {
      scrollTo(0);
    } else if (translateY.value < -SCREEN_HEIGHT / 2) {
      scrollTo(MAX_TRANSLATE_Y);
    }
  });




  const rBottomSheetStyle = useAnimatedStyle(() => {
    
    return {
      transform: [{ translateY: translateY.value }],
    };
  });

  return (
    <GestureDetector gesture={gesture }>
    <Animated.View style={[styles.bottomSheetContainer, rBottomSheetStyle]}>
      <View style={{alignSelf:'center'}}>
      <EntIcon
                name='chevron-small-up'
                size={25}
                color={'green'}
                />
     
      </View>
      {children}
    </Animated.View>
    </GestureDetector>
  )
})

export default BottomSheet

const styles = StyleSheet.create({
  bottomSheetContainer: {
    height: SCREEN_HEIGHT,
    width: '100%',
    backgroundColor: 'white',
    position: 'absolute',
    top: SCREEN_HEIGHT,
    // borderRadius: 25,
  },

})