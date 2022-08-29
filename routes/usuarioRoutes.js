import express from "express"
import { formularioLogin, formularioOlvidepassword, formularioRegistro, registrar } from "../controllers/usuarioController.js"

const usersRoutes = express.Router()


usersRoutes.get("/login" , formularioLogin)

usersRoutes.get("/registro" , formularioRegistro)

usersRoutes.post("/registro" , registrar)

usersRoutes.get("/olvide-password", formularioOlvidepassword)




export default usersRoutes