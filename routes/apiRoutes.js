import express from "express";
import { propiedades } from "../controllers/apiController.js";

const apiRoutes = express.Router()

apiRoutes.get("/propiedades", propiedades)

export default apiRoutes