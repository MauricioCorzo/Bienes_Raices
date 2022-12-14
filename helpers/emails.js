import nodemailer from "nodemailer"
import sgMail from "@sendgrid/mail"

const emailRegistro = async (data) => {
    // const transport = nodemailer.createTransport({
    //     host: process.env.EMAIL_HOST,
    //     port: process.env.EMAIL_PORT,
    //     auth: {
    //       user: process.env.EMAIL_USER,
    //       pass: process.env.EMAIL_PASS
    //     }
    //   });
    // Emails Reales
    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const {email,nombre,token} = data
    const msg =  {
        from: "bienes_raices@gmailni.com",
        to: email,
        subject: "Comprueba tu cuenta en BienesRaices",
        text: "Comprueba tu cuenta en BienesRaices",
        html: `<p>Hola ${nombre}, comprueba tu cuenta en BienesRaices.</p>
        <p> Tu cuenta ya esta lista, solo debes comprobarla en el siguiente enlace:
        <a href="${process.env.BACKEND_URL}/auth/confirmar/${token}">Comprobar Cuenta</a> </p>
        <p> Si tu no creaste esta cuenta puedes ignorar este mensaje</p>
        `
    }
    await sgMail.send(msg)
    console.log(`Mensaje enviado correctamente a ${email}`)
    } catch (error) {
        console.log(error)
    }
}


const emailOlvidePassword = async (data) => {
    // const transport = nodemailer.createTransport({
    //     host: process.env.EMAIL_HOST,
    //     port: process.env.EMAIL_PORT,
    //     auth: {
    //       user: process.env.EMAIL_USER,
    //       pass: process.env.EMAIL_PASS
    //     }
    //   });
    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);
    const {email,nombre,token} = data
    const msg = {
        from: "bienes_raices@gmailni.com",
        to: email,
        subject: "Recupera tu contraseña en BienesRaices",
        text: "Recupera tu contraseña en BienesRaices",
        html: `<p>Hola ${nombre}, Recupera tu contraseña en BienesRaices.</p>
        <p> Seras redirigido a un formulario para generar una nueva contraseña en el siguiente enlace:
        <a href="${process.env.BACKEND_URL}/auth/olvide-password/${token}">Recuperar Contraseña</a> </p>
        <p> Si tu no solicitaste el cambio de contraseña, puedes ignorar este mensaje</p>
        `
    }
    await sgMail.send(msg)
    console.log(`Mensaje enviado correctamente a ${email}`)
    } catch (error) {
        console.log(error)
    }
}

const envioDeMensaje = async (data) => {
    // const transport = nodemailer.createTransport({
    //   host: process.env.EMAIL_HOST,
    //   port: process.env.EMAIL_PORT,
    //   auth: {
    //     user: process.env.EMAIL_USER,
    //     pass: process.env.EMAIL_PASS
    //   }
    // });

    try {
        sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const {email,nombre, enviador, nombrePropiedad} = data
    const msg = {
        from: "bienes_raices@gmailni.com",
        to: email,
        subject: "Has recibido un Mensaje en BienesRaices.com",
        text: "Has recibido un Mensaje en BienesRaices.com",
        html: `<p>Hola ${nombre}, Has recibido un Mensaje en BienesRaices de ${enviador}, sobre la propiedad: "${nombrePropiedad}".</p>
        <p> Si quieres leer el mensaje, revisalo en tu cuenta dando click en el siguiente enlace:
        <a href="${process.env.BACKEND_URL}/mis-propiedades">Revisa tus mensajes</a> </p>
        <p> Si tú no solicitaste el cambio de contraseña, puedes ignorar este mensaje</p>
        `
    }
    await sgMail.send(msg)
    console.log(`Mensaje enviado correctamente a ${email}`)
    } catch (error) {
        console.log(error)
    }

}


export {
    emailRegistro,
    emailOlvidePassword,
    envioDeMensaje
}
