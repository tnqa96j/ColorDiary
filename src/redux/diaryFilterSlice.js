import { createSlice } from "@reduxjs/toolkit";

const initialState={
    selectedTags:[],
}

const diaryFilterSlice = createSlice({
    name:'diaryFilter',
    initialState,
    reducers:{
        setSelectedTags:(state,actions) =>{
            state.selectedTags = actions.payload;
        }
    },
});

export const selectSelectedTags = (state) => state.diaryFilter.selectedTags; 

export const {setSelectedTags} = diaryFilterSlice.actions;

export default diaryFilterSlice.reducer;