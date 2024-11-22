import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // For localStorage
import authSlice from "./authSlice"; // Auth slice reducer

// Persist configuration
const persistConfig = {
  key: "root",
  version: 1,
  storage,
};

// Combine all reducers
const rootReducer = combineReducers({
  auth: authSlice, // Add more slices if needed
});

// Wrap the rootReducer with persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Configure the Redux store
export const store = configureStore({
  reducer: persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ["persist/PERSIST", "persist/REHYDRATE"],
      },
    }),
});

// Persistor for rehydrating state
export const persistor = persistStore(store);
