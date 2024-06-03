import { createSlice } from "@reduxjs/toolkit";

const initialState = [{
    userName: "",

    color1: "#DCE2E3",
    color2: "#DCE2E3",
    color3: "#DCE2E3",
    color4: "#DCE2E3",
    color5: "#DCE2E3",

    hasPickedColor: false,
    todayColor:"",
    todayColorName:"",

}];

const pickColorSlice = createSlice({
    name: 'pickColor',
    initialState,
    reducers: {
        //將顏色加入陣列的action
        setPickedColor1: (state, actions) => {
            state.color1 = actions.payload;
        },
        setPickedColor2: (state, actions) => {
            state.color2 = actions.payload;
        },
        setPickedColor3: (state, actions) => {
            state.color3 = actions.payload;
        },
        setPickedColor4: (state, actions) => {
            state.color4 = actions.payload;
        },
        setPickedColor5: (state, actions) => {
            state.color5 = actions.payload;
        },
        //將hasPickedColor改成true的action
        setHasPickedColor: (state) => {
            state.hasPickedColor = true;
        },
        //設定UserName
        setUser: (state, actions) => {
            state.userName = actions.payload;
        },
        setTodayColor: (state, actions) => {
            state.todayColor = actions.payload;
        },
        setTodayColorName: (state, actions) => {
            state.todayColorName = actions.payload;
        },
    },
});

export const selectPickedColor1 = (state) => state.pickColor.color1;
export const selectPickedColor2 = (state) => state.pickColor.color2;
export const selectPickedColor3 = (state) => state.pickColor.color3;
export const selectPickedColor4 = (state) => state.pickColor.color4;
export const selectPickedColor5 = (state) => state.pickColor.color5;

export const selectHasPickedColor = (state) => state.pickColor.hasPickedColor;
export const selectUser = (state) => state.pickColor.userName;

export const selectTodayColor = (state) =>state.pickColor.todayColor;
export const selectTodayColorName = (state) =>state.pickColor.todayColorName;

export const { setPickedColor1, setPickedColor2, setPickedColor3, setPickedColor4, setPickedColor5, setHasPickedColor, setUser,setTodayColor,setTodayColorName } = pickColorSlice.actions;

export default pickColorSlice.reducer;