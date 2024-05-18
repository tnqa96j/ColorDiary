import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    title:"",
    content:"",
    colors:[],
    imageUri:"",
    tags:[],
    isPending:false,
}

const uploadDiarySlice = createSlice({
    name:'uploadDiary',
    initialState,
    reducers:{
        setDiaryTitle:(state,actions) => {
            state.title = actions.payload;
        },
        setDiaryContent:(state,actions) => {
            state.content = actions.payload;
        },
        setDiaryColors:(state,actions) => {
            state.colors = actions.payload;
        },
        setDiaryImageUri:(state,actions) => {
            state.imageUri = actions.payload;
        },
        setDiaryTags:(state,actions) => {
            state.tags = actions.payload;
        },
        setIsPending:(state) => {
            state.isPending = !state.isPending;
        }
    },
});

export const selectTitle = (state) =>state.uploadDiary.title;
export const selectContent = (state) =>state.uploadDiary.content;
export const selectColors = (state) => state.uploadDiary.colors;
export const selectImageUri = (state) =>state.uploadDiary.imageUri;
export const selectTags = (state) => state.uploadDiary.tags;
export const selectIsPending = (state) => state.uploadDiary.isPending;

export const {setDiaryTitle,setDiaryContent,setDiaryColors,setDiaryImageUri,setDiaryTags,setIsPending} = uploadDiarySlice.actions;

export default uploadDiarySlice.reducer;