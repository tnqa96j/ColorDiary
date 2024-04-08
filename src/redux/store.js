import { configureStore } from "@reduxjs/toolkit";
import pickColorSlice from "./pickColorSlice";

const store = configureStore({
    reducer:{
        pickColor:pickColorSlice,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;