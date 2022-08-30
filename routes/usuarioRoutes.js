import express from "express"
import { confirmar, formularioLogin, formularioOlvidepassword, formularioRegistro, registrar } from "../controllers/usuarioController.js"

const usersRoutes = express.Router()


usersRoutes.get("/login" , formularioLogin)

usersRoutes.get("/registro" , formularioRegistro)
usersRoutes.post("/registro" , registrar)

usersRoutes.get("/confirmar/:token", confirmar)

usersRoutes.get("/olvide-password", formularioOlvidepassword)




export default usersRoutes