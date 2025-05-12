import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "./pages/Login";
import HomePage from "./pages/HomePage";
import ManageSkills from "./pages/ManageSkills";
import ManageProjects from "./pages/ManageProjects";
import ManageClientProjects from "./pages/ManageClientProjects";
import UpdateProject from "./pages/UpdateProject";
import { useDispatch } from "react-redux";
import React,{ useEffect } from "react";
import { getUser } from "./store/slices/userSlice";
import ForgotPassword from "./pages/ForgotPassword";
import ResetPassword from "./pages/ResetPassword";
import { getAllSkills } from "./store/slices/skillSlice";
import { getAllMessages } from "./store/slices/messageSlice";
import { getAllProjects } from "./store/slices/projectSlice";
import { getAllClientProjects } from "./store/slices/clientprojectSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUser());
    dispatch(getAllSkills());
    dispatch(getAllMessages());
    dispatch(getAllProjects());
    dispatch(getAllClientProjects());
  }, [dispatch]);
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/password/forgot" element={<ForgotPassword />} />
        <Route path="/password/reset/:token" element={<ResetPassword />} />
        <Route path="/manage/skills" element={<ManageSkills />} />
        <Route path="/manage/projects" element={<ManageProjects />} />
        <Route path="/manage/clientprojects" element={<ManageClientProjects />} />
        <Route path="/update/project/:id" element={<UpdateProject />} />
      </Routes>
      <ToastContainer position="bottom-right" theme="dark" />
    </Router>
  );
}

export default App;
