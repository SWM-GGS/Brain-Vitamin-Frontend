import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  nickname: '',
  phoneNumber: '',
  familyKey: '',
  accessToken: '',
  fontSize: 'medium',
};
const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      state.name = action.payload.name;
      state.nickname = action.payload.nickname;
      state.phoneNumber = action.payload.phoneNumber;
      state.familyKey = action.payload.familyKey;
      state.fontSize = action.payload.fontSize;
      state.accessToken = action.payload.accessToken;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
  },
});

export default userSlice;
