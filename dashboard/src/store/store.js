import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./slices/userSlice";
import forgotPasswordReducer from "./slices/forgotResetPasswordSlice";
import skillReducer from "./slices/skillSlice";
import projectReducer from "./slices/projectSlice";
import clientprojectReducer from "./slices/clientprojectSlice";

import messageReducer from "./slices/messageSlice";
import loadingSliceReducer from "./slices/loadingSlice"

export const store = configureStore({
  reducer: {
    loading : loadingSliceReducer,
    user: userReducer,
    forgotPassword: forgotPasswordReducer,
    skill: skillReducer,
    project: projectReducer,
    clientproject: clientprojectReducer,
    messages: messageReducer,
  },
});