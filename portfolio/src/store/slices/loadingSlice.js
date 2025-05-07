import { createSlice } from "@reduxjs/toolkit";

const loadingSlice = createSlice({
    name: "loading_slice",
    initialState:{
        loading: true
    },
    reducers:{
        setLoading :(state, action)=>{
            state.loading= action.payload
        }
    }
})

export const {setLoading} = loadingSlice.actions;
export default loadingSlice.reducer;