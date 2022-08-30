import { check, validationResult } from "express-validator"
import { emailRegistro } from "../helpers/emailRegistro.js"
import { generarId } from "../helpers/tokens.js"
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
      // Almacenar Usuario y se hashea el passsword con el hook en el modelo
      const usuario = await Usuario.create({nombre, email, password, token: generarId()})

      //Envia email de confirmacion
      emailRegistro({
        nombre: usuario.nombre,
        email: usuario.email,
        token: usuario.token
      })

      //Mostrar msj
      res.render("templates/mensaje" , {
        pagina: "Cuenta creada Correctamente",
        mensaje: "Hemos enviado un email. Revisa tu correo"
      })
     
  } catch (error) {
    console.log(error)
  }
    
}

const confirmar = async (req,res) => {
  const { token } = req.params

  const usuario = await Usuario.findOne({where: {token : token}})

  if(!usuario){
    return res.render("auth/confirmar-cuenta",{
      pagina: "Error al confirmar cuenta",
      mensaje: "Hubo un error al confirmar. Intenta de nuevo",
      error: true
    })
  }  

  usuario.token = null
  usuario.confirmado = true
  await usuario.save()

  return res.render("auth/confirmar-cuenta",{
    pagina: "Cuenta Confirmada",
    mensaje: "La cuenta fue confirmada correctamente",
    error: false
  })
}


export {
    formularioLogin,
    formularioRegistro,
    formularioOlvidepassword,
    registrar,
    confirmar
}