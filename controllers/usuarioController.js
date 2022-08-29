import { check, validationResult } from "express-validator"
import Usuario from "../models/Usuario.js"

const formularioLogin = (req ,res) => {
    res.render("auth/login", {
        pagina: "Iniciar Sesion"
    })
}

const formularioRegistro = (req, res) => {
    res.render("auth/registro", {
        pagina: "Crear Cuenta"
    })
}

const formularioOlvidepassword = (req, res) => {
    res.render("auth/olvide-password", {
        pagina: "Recupera tu Cuenta"
    })
}

const registrar = async (req,res) => {
    const { nombre , email , password } = req.body
  try {
      //Validacion
      await check("nombre").notEmpty().withMessage("El nombre es obligatorio").run(req)
      await check("email").isEmail().withMessage("Lo que ingresaste no es un email").run(req)
      await check("password").isLength({min: 6}).withMessage("El password debe ser de al menos 6 caracteres").run(req)
      await check("repetir_password").equals(password).withMessage("Los passwords no son iguales").run(req)
  
      let resultado = validationResult(req)

        //   return res.json(resultado.array())
        // Verificar que el resultado tenga errores
      if(!resultado.isEmpty()){
            return res.render("auth/registro", {
            pagina: "Crear Cuenta",
            errores: resultado.array(),
            usuario: { // Para que se mantengan los campos si son correctos en los errores
                nombre: nombre,
                email: email
            }
        })
      }  

      // Verficar usuarios duplicapos
      const usuarioExiste = await Usuario.findOne({where: { email: email}})
      
      if(usuarioExiste){
        return res.render("auth/registro", {
            pagina: "Crear Cuenta",
            errores: [{msg: "El usuario ya esta registrado"}],
            usuario: { // Para que se mantengan los campos si son correctos en los errores
                nombre: nombre,
                email: email
            }
        })
      }
      // Almacenar Usuario
      const usuario = await Usuario.create({nombre, email, password, token: 123})
      res.json(usuario)
     
  } catch (error) {
    console.log(error)
  }
    
}


export {
    formularioLogin,
    formularioRegistro,
    formularioOlvidepassword,
    registrar
}