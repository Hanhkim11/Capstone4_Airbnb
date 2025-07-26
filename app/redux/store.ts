import { combineReducers, configureStore } from "@reduxjs/toolkit";
import locationSlice from "./slices/location.slice";

const rootReducer = combineReducers({
  location: locationSlice,
});

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
});
export type RootState = ReturnType<typeof rootReducer>;
export type AppDispatch = typeof store.dispatch;
