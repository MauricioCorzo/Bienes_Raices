import express  from "express";
import { body } from "express-validator" // Es la validacion en el router y no en el controlador. Aqui se usa body, en el controller se usa check
import { admin, agregarImagen, almacenarImagen, crear, editar, eliminar, enviarMensaje, guardar, guardarCambios, mostrarPropiedad, verMensajes } from "../controllers/propiedadController.js";
import protegerRuta from "../middleware/protegerRuta.js";
import upload from "../middleware/subirImagen.js";
import identificarUsuario from "../middleware/identificarUsuario.js";

const propiedadesRoutes = express.Router()

propiedadesRoutes.get("/mis-propiedades", protegerRuta, admin)

propiedadesRoutes.get("/propiedades/crear", protegerRuta, crear)

propiedadesRoutes.post("/propiedades/crear", protegerRuta,
    body("titulo").notEmpty().withMessage("El titulo del anuncio es obligatorio"),
    body("descripcion").notEmpty().withMessage("La descripcion no puede ir vacia"),
    body("categoria").isNumeric().withMessage("Selecciona una categoria"),   // usamos isNumeric porque el value en crear.pug es el id de cada categoria
    body("precio").isNumeric().withMessage("Selecciona un rango de precios"),
    body("habitaciones").isNumeric().withMessage("Selecciona la cantidad de habitaciones"),
    body("estacionamiento").isNumeric().withMessage("Selecciona la cantidad de estacionamientos"),
    body("wc").isNumeric().withMessage("Selecciona la cantidad de baños"),
    body("lat").notEmpty().withMessage("Ubica la propiedad en el mapa"),
    guardar)

propiedadesRoutes.get("/propiedades/agregar-imagen/:id", protegerRuta, agregarImagen)    
propiedadesRoutes.post("/propiedades/agregar-imagen/:id", protegerRuta, upload.single("imagen"), almacenarImagen)    // si son + imagenes se usa single.array()

propiedadesRoutes.get("/propiedades/editar/:id", protegerRuta, editar)
propiedadesRoutes.post("/propiedades/editar/:id", protegerRuta,
    body("titulo").notEmpty().withMessage("El titulo del anuncio es obligatorio"),
    body("descripcion").notEmpty().withMessage("La descripcion no puede ir vacia"),
    body("categoria").isNumeric().withMessage("Selecciona una categoria"),   // usamos isNumeric porque el value en crear.pug es el id de cada categoria
    body("precio").isNumeric().withMessage("Selecciona un rango de precios"),
    body("habitaciones").isNumeric().withMessage("Selecciona la cantidad de habitaciones"),
    body("estacionamiento").isNumeric().withMessage("Selecciona la cantidad de estacionamientos"),
    body("wc").isNumeric().withMessage("Selecciona la cantidad de baños"),
    body("lat").notEmpty().withMessage("Ubica la propiedad en el mapa"),
    guardarCambios)

propiedadesRoutes.post("/propiedades/eliminar/:id", protegerRuta, eliminar) 

//Area publica
propiedadesRoutes.get("/propiedad/:id", identificarUsuario, mostrarPropiedad)

//Almacenar los mensajes
propiedadesRoutes.post("/propiedad/:id", identificarUsuario,
    body("mensaje").isLength({min:20}).withMessage("El Mensaje no puede ir vacio o es muy corto"),
    enviarMensaje)

propiedadesRoutes.get("/mensajes/:id", protegerRuta, verMensajes )

export default propiedadesRoutes