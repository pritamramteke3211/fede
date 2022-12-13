import {StyleSheet} from 'react-native';
import React from 'react';
import {store} from './src/store/Store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import Stack_navigation from './src/navigation/stack_navigation/stack_navigation';

const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack_navigation />
      </NavigationContainer>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
