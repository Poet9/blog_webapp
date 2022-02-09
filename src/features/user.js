import { createSlice } from '@reduxjs/toolkit';

const initialStateValue = { username: "", age: 0, email: "", favUsers: [""]};

export const userSlice = createSlice({
  name: "user",
  initialState: { value: initialStateValue },
  reducers: {
    setUser: (state, action) => {
      state.value = action.payload;
    },

    clearUser: (state) => {
      state.value = initialStateValue;
    },
    updateUser: (state, action) =>{
        state.value = action.payload;
    }
  },
});

export const { setUser, clearUser, updateUser } = userSlice.actions;

export default userSlice.reducer;