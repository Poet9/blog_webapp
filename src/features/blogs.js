import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = [{id: "", title:"", img: null, description: "", 
    hashtags: [""], article: "", rate: 0, raters: 0}];

const blogsSlice = createSlice({
    name: "blogs",
    initialState: {value: initialStateValue},
    reducers: {
        getBlogs: (state, action) =>{
            state.value = [...state.value, ...action.payload];
        },
        updateBlog: (state, action)=>{
            state.value = state.value.map(blog => blog.id=== action.payload.id? 
                { ...blog, ...action.payload}: blog);
        },
        deleteBlog : (state, action)=>{
            state.value = state.value.filter(blog => blog.id !== action.payload.id)
        }
    }
});
export const {getBlogs , updateBlog, deleteBlog} = blogsSlice.actions;
export default blogsSlice.reducer;