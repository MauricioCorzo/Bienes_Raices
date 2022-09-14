import categorias from "./categorias.js";
import precios from "./precios.js";
import usuarios from "./usuarios.js";
// import Categoria from "../models/Categoria.js";
// import Precio from "../models/Precio.js"
import db from "../config/db.js";
import { Categoria , Precio, Usuario } from "../models/index.js"

//Lo mandamos a llamar desde package.json
const importarDatos = async () => {
    try {
        //Autenticar
        await db.authenticate()
        //Generar columnas
        await db.sync()
        // Insertar datos
        const [c, p] = await Promise.all([Categoria.findAll(), Precio.findAll()])
        if(c.length > 0 || p.length > 0) {
            console.log("Categorias y Precios ya existen")
            // process.exit()
            return
        } else {
            await Promise.all([Categoria.bulkCreate(categorias), Precio.bulkCreate(precios), Usuario.bulkCreate(usuarios)])
            console.log("Categorias y Precios creadas correctamente")
            // process.exit()
            return
        }
    } catch (error) {
        console.log(error)
        // process.exit(1)
    }
}

const eliminarDatos = async () => {
    try {
        // await Promise.all([
        //     Categoria.destroy({truncate:true, cascade:true}), // El tuncate es para que tmb se eliminen los ids y la proximas vez que se crean no empiecen del ultimo id anterior al destroy
        //     Precio.destroy({truncate:true, cascade:true}), // El cascade lo utilizo pq me generaba problemas solamente con truncate
        //     Usuario.destroy({truncate:true,cascade:true})
        // ])
        await db.sync({force:true}) //Hace el mismo trabajo que arriba. Esto eliminaria todo, en la de arriba solo lo que le pasamos que elimine
        console.log("Categorias y Precios eliminadas correctamente")
        // process.exit()
        return
    } catch (error) {
        console.log(error)
        // process.exit(1)
    }
}

if(process.argv[2] === "-i"){
    importarDatos();
}
if(process.argv[2] === "-e"){
    eliminarDatos();
}

 export {
    importarDatos
 }