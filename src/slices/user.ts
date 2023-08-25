import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  name: '',
  nickname: '',
  phoneNumber: '',
  familyKey: '',
  accessToken: '',
  fontSize: 2,
  profileImgUrl: '',
  education: '',
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
      state.profileImgUrl = action.payload.profileImgUrl;
      state.education = action.payload.education;
    },
    setFontSize(state, action) {
      state.fontSize = action.payload;
    },
    setAccessToken(state, action) {
      state.accessToken = action.payload;
    },
    setPhoneNumber(state, action) {
      state.phoneNumber = action.payload;
    },
    setNickname(state, action) {
      state.nickname = action.payload;
    },
    setProfileImgUrl(state, action) {
      state.profileImgUrl = action.payload;
    },
    setEducation(state, action) {
      state.education = action.payload;
    },
  },
});

export default userSlice;
