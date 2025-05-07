import express from "express";
import {
  addNewClientProject,
  deleteClientProject,
  getAllClientProjects,
  getSingleClientProject,
  updateClientProject,
} from "../controller/clientprojectController.js";
import { isAuthenticated } from "../middlewares/auth.js";

const router = express.Router();

router.post("/add", isAuthenticated, addNewClientProject);
router.delete("/delete/:id", isAuthenticated, deleteClientProject);
router.put("/update/:id", isAuthenticated, updateClientProject);
router.get("/getall", getAllClientProjects);
router.get("/get/:id", getSingleClientProject);

export default router;