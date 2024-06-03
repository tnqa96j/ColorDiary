import { configureStore } from "@reduxjs/toolkit";
import pickColorSlice from "./pickColorSlice";
import uploadDiarySlice from "./uploadDiarySlice";
import diaryFilterSlice from "./diaryFilterSlice";
import taskSlice from "./taskSlice";
import { persistStore, persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";
import pickColorReducer from "./pickColorSlice";
import uploadDiaryReducer from "./uploadDiarySlice";
import diaryFilterReducer from "./diaryFilterSlice";
import taskReducer from "./taskSlice";
import { thunk } from "redux-thunk";

const persistConfig = {
    key: 'root',
    storage: AsyncStorage,
};

const persistedPickColorReducer = persistReducer(persistConfig, pickColorReducer);
const persistedUploadDiaryReducer = persistReducer(persistConfig, uploadDiaryReducer);
const persistedDiaryFilterReducer =  persistReducer(persistConfig, diaryFilterReducer);
const persistedTaskReducer = persistReducer(persistConfig, taskReducer);

export const store = configureStore({
    reducer: {
        pickColor: persistedPickColorReducer,
        uploadDiary:persistedUploadDiaryReducer,
        diaryFilter: persistedDiaryFilterReducer,
        task: persistedTaskReducer,
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: false,
        }),
    //中間層
});

export const persistor = persistStore(store);


/*const store = configureStore({
    reducer: {
        pickColor: pickColorSlice,
        uploadDiary: uploadDiarySlice,
        diaryFilter:diaryFilterSlice,
        task:taskSlice,
    },
    devTools: process.env.NODE_ENV !== 'production',
});

export default store;*/