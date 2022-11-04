import { combineReducers, configureStore } from "@reduxjs/toolkit";
import genreSlice from "./reducer/genreSlice";
import sidebarSlice from "./reducer/sidebarSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";
import userSlice from "./reducer/userSlice";

const reducers = combineReducers({
    sidebar: sidebarSlice,
    genre: genreSlice,
    user: userSlice
});

const persistConfig = {
    key: 'myKey',
    storage
}

const persistedReducer = persistReducer(persistConfig, reducers);



const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) => 
        getDefaultMiddleware({
            serializableCheck: false
        })
})
const persistor = persistStore(store);

export { store, persistor}