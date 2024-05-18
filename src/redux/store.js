import { configureStore } from "@reduxjs/toolkit";
import pickColorSlice from "./pickColorSlice";
import uploadDiarySlice from "./uploadDiarySlice";
import diaryFilterSlice from "./diaryFilterSlice";

const store = configureStore({
    reducer: {
        pickColor: pickColorSlice,
        uploadDiary: uploadDiarySlice,
        diaryFilter:diaryFilterSlice,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;