import { configureStore } from "@reduxjs/toolkit";
import pickColorSlice from "./pickColorSlice";
import { persistStore,persistReducer } from "redux-persist";
import AsyncStorage from "@react-native-async-storage/async-storage";

const persistConfig ={
    key:'root',
    storage:AsyncStorage,
};

export const store = configureStore({
    reducer:{
        pickColor:persistReducer(persistConfig,pickColorSlice)
    },
    devTools: process.env.NODE_ENV !== 'production',
    middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

persistStore(store);