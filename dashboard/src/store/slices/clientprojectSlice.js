import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {backend_URL} from '../../lib/backend_URL'
import { setLoading } from "./loadingSlice";

const clientprojectSlice = createSlice({
  name: "clientproject",
  initialState: {
    loading: false,
    clientprojects: [],
    error: null,
    message: null,
    singleProject: {},
  },
  reducers: {
    getAllClientProjectsRequest(state) {
      state.clientprojects = [];
      state.error = null;
      state.loading = true;
    },
    getAllClientProjectsSuccess(state, action) {
      state.clientprojects = action.payload;
      state.error = null;
      state.loading = false;
    },
    getAllClientProjectsFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
    },
    addNewClientProjectRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    addNewClientProjectSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    addNewClientProjectFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    deleteClientProjectRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    deleteClientProjectSuccess(state, action) {
      state.error = null;
      state.loading = false;
      state.message = action.payload;
    },
    deleteClientProjectFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    updateClientProjectRequest(state) {
      state.loading = true;
      state.error = null;
      state.message = null;
    },
    updateClientProjectSuccess(state, action) {
      state.loading = false;
      state.message = action.payload;
      state.error = null;
    },
    updateClientProjectFailed(state, action) {
      state.error = action.payload;
      state.loading = false;
      state.message = null;
    },
    resetClientProjectSlice(state) {
      state.error = null;
      state.message = null;
      state.loading = false;
    },
    clearAllErrors(state) {
      state.error = null;
      state = state.clientprojects;
    },
  },
});

export const getAllClientProjects = () => async (dispatch) => {
  dispatch(clientprojectSlice.actions.getAllClientProjectsRequest());
  try {
    const response = await axios.get(
      backend_URL+"/api/v1/clientproject/getall",
      { withCredentials: true }
    );
    dispatch(
      clientprojectSlice.actions.getAllClientProjectsSuccess(response.data.clientprojects)
    );
    dispatch(setLoading(false))
    dispatch(clientprojectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      clientprojectSlice.actions.getAllClientProjectsFailed(error.response.data.message)
    );
  }
};


export const addNewClientProject = (data) => async (dispatch) => {
  dispatch(clientprojectSlice.actions.addNewClientProjectRequest());
  try {
    const response = await axios.post(
      backend_URL+"/api/v1/clientproject/add",
      data,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(clientprojectSlice.actions.addNewClientProjectSuccess(response.data.message));
    dispatch(clientprojectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      clientprojectSlice.actions.addNewClientProjectFailed(error.response.data.message)
    );
  }
};
export const deleteClientProject = (id) => async (dispatch) => {
  dispatch(clientprojectSlice.actions.deleteClientProjectRequest());
  try {
    const response = await axios.delete(
      backend_URL+`/api/v1/clientproject/delete/${id}`,
      {
        withCredentials: true,
      }
    );
    dispatch(clientprojectSlice.actions.deleteClientProjectSuccess(response.data.message));
    dispatch(clientprojectSlice.actions.clearAllErrors());
  } catch (error) {
    dispatch(
      clientprojectSlice.actions.deleteClientProjectFailed(error.response.data.message)
    );
  }
};
export const updateClientProject = (id, newData) => async (dispatch) => {
  dispatch(clientprojectSlice.actions.updateClientProjectRequest());
  try {
    const response = await axios.put(
      backend_URL+`/api/v1/clientproject/update/${id}`,
      newData,
      {
        withCredentials: true,
        headers: { "Content-Type": "multipart/form-data" },
      }
    );
    dispatch(clientprojectSlice.actions.updateClientProjectSuccess(response.data.message));
    dispatch(clientprojectSlice.actions.clearAllErrors());
  } catch (error) {
    console.log(error);
    dispatch(
      clientprojectSlice.actions.updateClientProjectFailed(error.response.data.message)
    );
  }
};

export const resetClientProjectSlice = () => (dispatch) => {
  dispatch(clientprojectSlice.actions.resetClientProjectSlice());
};

export const clearAllClientProjectErrors = () => (dispatch) => {
  dispatch(clientprojectSlice.actions.clearAllErrors());
};

export default clientprojectSlice.reducer;