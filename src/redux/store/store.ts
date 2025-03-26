import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../slice/userSlice";
import storage from 'redux-persist/lib/storage';
import { persistReducer, persistStore } from 'redux-persist';

const userPersistConfig = {
    key: 'user',
    storage,
    blacklist: [],
  };
const persistedUserReducer = persistReducer(userPersistConfig, userReducer);
  

const store = configureStore({
    reducer: {
        user: persistedUserReducer
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: ['persist/PERSIST', 'persist/REHYDRATE'],
            },
        })
});

export const persistor = persistStore(store);
export default store;

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;