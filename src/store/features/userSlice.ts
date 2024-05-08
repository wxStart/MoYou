import {createSlice} from '@reduxjs/toolkit';

export const userSlice = createSlice({
  name: 'user',
  initialState: {
    token: '',
    userInfo: {
      name: '一休',
    },
  },
  reducers: {
    setUser(state, action) {
      state.userInfo = action.payload;
    },
  },
});

export const {setUser} = userSlice.actions;

export default userSlice.reducer;
