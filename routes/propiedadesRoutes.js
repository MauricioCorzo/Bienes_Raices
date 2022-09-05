import express  from "express";
import { body } from "express-validator" // Es la validacion en el router y no en el controlador. Aqui se usa body, en el controller se usa check
import { admin, crear, guardar } from "../controllers/propiedadController.js";

const propiedadesRoutes = express.Router()

propiedadesRoutes.get("/mis-propiedades", admin)

propiedadesRoutes.get("/propiedades/crear", crear)

propiedadesRoutes.post("/propiedades/crear",
    body("titulo").notEmpty().withMessage("El titulo del anuncio es obligatorio"),
    body("descripcion").notEmpty().withMessage("La descripcion no puede ir vacia"),
    body("categoria").isNumeric().withMessage("Selecciona una categoria"),   // usamos isNumeric porque el value en crear.pug es el id de cada categoria
    body("precio").isNumeric().withMessage("Selecciona un rango de precios"),
    body("habitaciones").isNumeric().withMessage("Selecciona la cantidad de habitaciones"),
    body("estacionamiento").isNumeric().withMessage("Selecciona la cantidad de estacionamientos"),
    body("wc").isNumeric().withMessage("Selecciona la cantidad de baños"),
    body("lat").notEmpty().withMessage("Ubica la propiedad en el mapa"),
    guardar)



export default propiedadesRoutes