import {View, Text} from 'react-native';
import React, {createContext} from 'react';

const AuthContext = createContext({});

export const AuthProvider = ({children}) => {
  return <AuthContext.Provider value={null}>{children}</AuthContext.Provider>;
};
