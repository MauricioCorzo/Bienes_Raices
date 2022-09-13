import express from "express";
import { inicio , categoria , buscador , noEncontrado } from "../controllers/appController.js"
import identificarUsuario from "../middleware/identificarUsuario.js";

const appRoutes = express.Router()


//Pagina de Inicio
appRoutes.get("/", identificarUsuario, inicio)

//Categorias
appRoutes.get("/categorias/:id", categoria)

//Buscador
appRoutes.post("/buscador", buscador)

//404
appRoutes.get("/404", noEncontrado)

export default appRoutes