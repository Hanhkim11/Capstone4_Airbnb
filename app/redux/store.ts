import { combineReducers, configureStore } from "@reduxjs/toolkit"
import locationSlice from "./slices/location.slice"
import userSlice from "./slices/user.slice"
import loadingSlice from "./slices/loading.slice"
import authSlice from "./slices/auth.slice"
const rootReducer = combineReducers({
    location: locationSlice,
    user: userSlice,
    loading: loadingSlice,
    auth: authSlice,
})
export const store = configureStore({
    reducer: rootReducer,
    middleware: (getDefaultMiddleware) => getDefaultMiddleware(),
})

export type RootState = ReturnType<typeof rootReducer>
export type AppDispatch = typeof store.dispatch