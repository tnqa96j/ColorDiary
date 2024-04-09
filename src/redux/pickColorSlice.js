import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    colors:{
        color1:"#DCE2E3",
        color2:"#DCE2E3",
        color3:"#DCE2E3",
        color4:"#DCE2E3",
        color5:"#DCE2E3",
    },
    hasPickedColor : false,
};

const pickColorSlice = createSlice({
    name:'pickColor',
    initialState,
    reducers:{
        //將顏色加入陣列的action
        setPickedColor1:(state,actions) => {
            state.colors.color1 = actions.payload;
        },
        setPickedColor2:(state,actions) => {
            state.colors.color2 = actions.payload;
        },
        setPickedColor3:(state,actions) => {
            state.colors.color3 = actions.payload;
        },
        setPickedColor4:(state,actions) => {
            state.colors.color4 = actions.payload;
        },
        setPickedColor5:(state,actions) => {
            state.colors.color5 = actions.payload;
        },
        //將hasPickedColor改成true的action
        setHasPickedColor:(state) => {
            state.hasPickedColor = true;
        }
    },
});

export const selectPickedColors = (state) => state.pickColor.colors;
export const selectHasPickedColor = (state) => state.pickColor.hasPickedColor;

export const { setPickedColor1,setPickedColor2,setPickedColor3,setPickedColor4,setPickedColor5,setHasPickedColor } = pickColorSlice.actions;

export default pickColorSlice.reducer;