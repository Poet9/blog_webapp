import { createSlice } from "@reduxjs/toolkit";

const initialStateValue = {filter: "", blogTitle: ""};

const filterSlice = createSlice({
    name: "filter",
    initialState: {value: initialStateValue},
    reducers: {
        setFilter: (state, action) =>{
            state.value.filter = action.payload;
        },
        setBlogTitle: (state, action) =>{
            state.value.blogTitle = action.payload;
        }
    }
});
export const {setFilter, setBlogTitle} = filterSlice.actions;
export default filterSlice.reducer;