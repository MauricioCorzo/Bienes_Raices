import express from "express";
import { inicio , categoria , buscador , noEncontrado } from "../controllers/appController.js"

const appRoutes = express.Router()


//Pagina de Inicio
appRoutes.get("/", inicio)

//Categorias
appRoutes.get("/categorias/:id", categoria)

//Buscador
appRoutes.post("/buscador", buscador)

//404
appRoutes.get("/404", noEncontrado)

export default appRoutes