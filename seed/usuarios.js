//Generar usuarios de prueba, agregarlos al arreglo para no hacer el flujo de confirmacion por mail

import bcrypt from "bcrypt"

const usuarios = [
    {
        nombre: "Eliana",
        email: "correo2@correo.com",
        confirmado: true,
        password: bcrypt.hashSync("123456", 10)
    },
    {
        nombre: "Mauricio",
        email: "correo@correo.com",
        confirmado: true,
        password: bcrypt.hashSync("123456", 10)
    }
]

export default usuarios