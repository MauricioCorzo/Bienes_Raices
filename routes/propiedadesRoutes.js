import express  from "express";
import { admin, crear } from "../controllers/propiedadController.js";

const propiedadesRoutes = express.Router()

propiedadesRoutes.get("/mis-propiedades", admin)

propiedadesRoutes.get("/propiedades/crear", crear)



export default propiedadesRoutes