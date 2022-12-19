import {StyleSheet} from 'react-native';
import React from 'react';
import {persistor, store} from './src/store/Store';
import {Provider} from 'react-redux';
import {NavigationContainer} from '@react-navigation/native';
import Stack_navigation from './src/navigation/stack_navigation/stack_navigation';
import {PersistGate} from 'redux-persist/integration/react';

const App = () => {
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
        <NavigationContainer>
          <Stack_navigation />
        </NavigationContainer>
      </PersistGate>
    </Provider>
  );
};

export default App;

const styles = StyleSheet.create({});
