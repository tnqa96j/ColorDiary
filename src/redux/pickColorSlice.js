import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    colorArray:[],
    hasPickedColor : false,
};

const pickColorSlice = createSlice({
    name:'pickColor',
    initialState,
    reducers:{
        //將顏色加入陣列的action
        setPickedColor:(state) => {

        },
        //將hasPickedColor改成true的action
        setHasPickedColor:(state) => {

        }
    },
});

export const selectPickedColors = (state) => state.colorArray;
export const selectHasPickedColor = (state) => state.hasPickedColor;

export const { setPickedColor,setHasPickedColor } = pickColorSlice.actions;

export default pickColorSlice.reducer;