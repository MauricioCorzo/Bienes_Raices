import express  from "express";
import { admin } from "../controllers/propiedadController.js";

const propiedadesRoutes = express.Router()

propiedadesRoutes.get("/mis-propiedades", admin) 


export default propiedadesRoutes