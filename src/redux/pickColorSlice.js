import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    colors:{
        color1:"#000000",
        color2:"#000000",
        color3:"#000000",
        color4:"#000000",
        color5:"#000000",
    },
    hasPickedColor : false,
};

const pickColorSlice = createSlice({
    name:'pickColor',
    initialState,
    reducers:{
        //將顏色加入陣列的action
        setPickedColor:(state,actions) => {
            state.colors = actions.payload;
        },
        //將hasPickedColor改成true的action
        setHasPickedColor:(state) => {
            state.hasPickedColor = true;
        }
    },
});

export const selectPickedColors = (state) => state.pickColor.colors;
export const selectHasPickedColor = (state) => state.pickColor.hasPickedColor;

export const { setPickedColor,setHasPickedColor } = pickColorSlice.actions;

export default pickColorSlice.reducer;