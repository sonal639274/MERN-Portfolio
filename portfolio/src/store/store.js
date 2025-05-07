import { configureStore } from '@reduxjs/toolkit';
import loadingSliceReducer from "./slices/loadingSlice"
const store = configureStore({
    reducer:{
        loading : loadingSliceReducer
    }
})

export default store