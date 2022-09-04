import categorias from "./categorias.js";
import precios from "./precios.js";
import Categoria from "../models/Categoria.js";
import Precio from "../models/Precio.js"
import db from "../config/db.js";

//Lo mandamos a llamar desde package.json
const importarDatos = async () => {
    try {
        //Autenticar
        await db.authenticate()
        //Generar columnas
        await db.sync()
        // Insertar datos
        await Promise.all([Categoria.bulkCreate(categorias), Precio.bulkCreate(precios)])
        console.log("Categorias creadas correctamente")
        process.exit()
    } catch (error) {
        console.log(error)
        process.exit(1)
    }
}

if(process.argv[2] === "-i"){
    importarDatos();
}