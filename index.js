import express from "express"
import csrf from "csurf"
import cors from "cors"
import cookieParser from "cookie-parser"
import morgan from "morgan"
import db from "./config/db.js"
import usersRoutes from "./routes/usuarioRoutes.js"

const app = express();

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
    db.sync({force: true})
    console.log("Conexion correcta a la base de datos")
} catch (error) {
    console.log(error)
}

app.set("view engine", "pug") // Habilitar dependencia pug ("Template engine")
app.set("views", "./views")

app.use( express.static("public"))


app.use("/auth", usersRoutes)

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