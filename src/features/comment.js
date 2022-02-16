import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = [{id: 0, email: "", body: "", 
    upVote: 0, postId: 0 }];

const commentsSlice = createSlice({
    name: "comments",
    initialState: {value: initialStateValue},
    reducers: {
        setComment: (state, action) =>{
            state.value = [...state.value, action.payload];
        },
        updateComment: (state, action)=>{
            state.value = state.value.map(comment => comment.id=== action.payload.id? 
                { ...comment, ...action.payload}: comment);
        },
        deleteComment : (state, action)=>{
            state.value = state.value.filter(blog => blog.id !== action.payload.id);
        }
    }
});
export const {setComment , updateComment, deleteComment} = commentsSlice.actions;
export default commentsSlice.reducer;