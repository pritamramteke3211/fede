import { combineReducers } from '@reduxjs/toolkit';
import {configureStore} from '@reduxjs/toolkit';
import authenticationReducer from './feature/authentication/authentication';
import { persistStore, persistReducer } from "redux-persist"
import AsyncStorage from '@react-native-async-storage/async-storage';

const persistConfig = {
  key : 'persist-key',
  storage : AsyncStorage,
  version: 1,
}

const appReducer = combineReducers({
  authentication: authenticationReducer,
})

const persistedReducer = persistReducer(persistConfig, appReducer)

const store = configureStore({
  reducer: persistedReducer,
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

const persistor = persistStore(store)

export { store, persistor}