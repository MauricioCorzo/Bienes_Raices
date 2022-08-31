import express from "express"
import { autenticar, comprobarToken, confirmar, formularioLogin, formularioOlvidepassword, formularioRegistro, nuevoPassword, registrar, resetearPassword } from "../controllers/usuarioController.js"

const usersRoutes = express.Router()


usersRoutes.get("/login" , formularioLogin)
usersRoutes.post("/login" , autenticar)

usersRoutes.get("/registro" , formularioRegistro)
usersRoutes.post("/registro" , registrar)

usersRoutes.get("/confirmar/:token", confirmar)


usersRoutes.get("/olvide-password", formularioOlvidepassword)
usersRoutes.post("/olvide-password", resetearPassword)

usersRoutes.get("/olvide-password/:token", comprobarToken)
usersRoutes.post("/olvide-password/:token", nuevoPassword)




export default usersRoutes