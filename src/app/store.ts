import { configureStore } from "@reduxjs/toolkit";
import blocksReducer from "../features/blocks/blocksSlice";
import userReducer from "../features/user/userSlice";

const store = configureStore({
  reducer: {
    blocks: blocksReducer,
    user: userReducer,
  }
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
