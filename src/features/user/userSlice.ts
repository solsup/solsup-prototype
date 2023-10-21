import { PayloadAction, createSlice } from "@reduxjs/toolkit";

export interface User {
  userId: string | null;
}

const initialState: User = {
  userId: null,
}

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    userLoggedIn(state, action: PayloadAction<string>) {
      state.userId = action.payload;
    },
  }
})

export const { userLoggedIn } = userSlice.actions;
export default userSlice.reducer;
