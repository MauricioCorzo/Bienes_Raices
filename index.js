import express from "express"
import csrf from "csurf"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import db from "./config/db.js"
import usersRoutes from "./routes/usuarioRoutes.js"
import propiedadesRoutes from "./routes/propiedadesRoutes.js"
import appRoutes from "./routes/appRoutes.js"
import apiRoutes from "./routes/apiRoutes.js"
import { importarDatos } from "./seed/seeder.js"

const app = express();

app.use(express.json())

//Habilitar lecturas de datos para formularios
app.use(express.urlencoded({extended: true}))
app.use(cors())
app.use(cookieParser());
app.use(csrf({cookie:true})) // lo dejamos disponible globalemente, es algo de seguridad, no es muy necesario
app.use(morgan("dev"));
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Credentials", "true");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  res.header("Access-Control-Allow-Methods", "GET, POST, OPTIONS, PUT, DELETE");
  next();
});

//Conexion a la database
try {
    await db.authenticate()
    await db.sync({force: true})
    await importarDatos()  // Crea las propiedades que se muestran al inicio
    console.log("Conexion correcta a la base de datos")
} catch (error) {
    console.log(error)
}

app.set("view engine", "pug") // Habilitar dependencia pug ("Template engine")
app.set("views", "./views")

app.use( express.static("public"))

app.use("/", appRoutes)
app.use("/auth", usersRoutes)
app.use("/", propiedadesRoutes)
app.use("/api", apiRoutes)


app.use((err, req, res, next) => {
  // eslint-disable-line no-unused-vars
  const status = err.status || 500;
  const message = err.message || err;
  console.error(err);
  res.status(status).send({ message });
});



const PORT = process.env.PORT || 3000

app.listen(PORT, () => {
    console.log(`Hola Mauricio, estoy corriendo en el puerto ${PORT}`)
})
