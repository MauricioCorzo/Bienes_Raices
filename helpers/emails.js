import nodemailer from "nodemailer"

const emailRegistro = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

    const {email,name,token} = data
    const info = await transport.sendMail({
        from: "BienesRaices.com",
        to: email,
        subject: "Comprueba tu cuenta en BienesRaices",
        text: "Comprueba tu cuenta en BienesRaices",
        html: `<p>Hola ${name}, comprueba tu cuenta en BienesRaices.</p>
        <p> Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace:
        <a href="${process.env.BACKEND_URL}/auth/confirmar/${token}">Comprobar Cuenta</a> </p>
        <p> Si tu no creaste esta cuenta puedes ignorar este mensaje</p>
        `
    })
    console.log("Mensaje enviado: %s", info.messageId)
}


const emailOlvidePassword = async (data) => {
    const transport = nodemailer.createTransport({
        host: process.env.EMAIL_HOST,
        port: process.env.EMAIL_PORT,
        auth: {
          user: process.env.EMAIL_USER,
          pass: process.env.EMAIL_PASS
        }
      });

    const {email,name,token} = data
    const info = await transport.sendMail({
        from: "BienesRaices.com",
        to: email,
        subject: "Recupera tu contraseña en BienesRaices",
        text: "Recupera tu contraseña en BienesRaices",
        html: `<p>Hola ${name}, Recupera tu contraseña en BienesRaices.</p>
        <p> Seras redirigido a un formulario para generar una nueva contraseña en el siguiente enlace:
        <a href="${process.env.BACKEND_URL}/auth/olvide-password/${token}">Recuperar Contraseña</a> </p>
        <p> Si tu no solicitaste el cambio de contraseña, puedes ignorar este mensaje</p>
        `
    })
    console.log("Mensaje enviado: %s", info.messageId)
}

const envioDeMensaje = async (data) => {
    const transport = nodemailer.createTransport({
      host: process.env.EMAIL_HOST,
      port: process.env.EMAIL_PORT,
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
      }
    });
  
    const {email,name, enviador, nombrePropiedad} = data
    const info = await transport.sendMail({
        from: "BienesRaices.com",
        to: email,
        subject: "Has recibido un Mensaje en BienesRaices.com",
        text: "Has recibido un Mensaje en BienesRaices.com",
        html: `<p>Hola ${name}, Has recibido un Mensaje en BienesRaices de ${enviador}, sobre la propiedad: "${nombrePropiedad}".</p>
        <p> Si quieres leer el mensaje, revisalo en tu cuenta dando click en el siguiente enlace:
        <a href="${process.env.BACKEND_URL}/mis-propiedades">Revisa tus mensajes</a> </p>
        <p> Si tú no solicitaste el cambio de contraseña, puedes ignorar este mensaje</p>
        `
    })
    console.log("Mensaje enviado: %s", info.messageId)

}


export {
    emailRegistro,
    emailOlvidePassword,
    envioDeMensaje
}