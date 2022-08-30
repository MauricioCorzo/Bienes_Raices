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
        from: "BienesRaices",
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

export {
    emailRegistro
}