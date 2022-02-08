import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user';
import blogsReducer from '../features/blogs';


export const store = configureStore({
  reducer: {
    user: userReducer,
    blogs: blogsReducer
  },
});
