import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  login: false,
  user_data: {},
  f_id: '',
  login_user_location : {longitude: '', latitude:''},
};

export const authenticationSlice = createSlice({
  name: 'authenticate',
  initialState,
  reducers: {
    setLogin: (state, action) => {
      state.login = action.payload;
    },
    setUserdata: (state, action) => {
      state.user_data = action.payload;
    },
    setLoginUserLocation: (state, action) => {
      state.login_user_location = action.payload;
    },  
    setFid: (state, action) => {
      state.f_id = action.payload;
    },
  },
});

export const {setLogin, setUserdata, setFid, setLoginUserLocation} = authenticationSlice.actions;

export default authenticationSlice.reducer;
