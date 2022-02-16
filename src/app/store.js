import { configureStore } from '@reduxjs/toolkit';
import userReducer from '../features/user';
import blogsReducer from '../features/blogs';
import filterReducer from '../features/filter';
import commentReducer from '../features/comment';

export const store = configureStore({
  reducer: {
    user: userReducer,
    blogs: blogsReducer,
    filter: filterReducer,
    comment: commentReducer
  },
});
