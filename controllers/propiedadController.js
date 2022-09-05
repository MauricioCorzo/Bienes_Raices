import Precio from "../models/Precio.js"
import Categoria from "../models/Categoria.js"
import { validationResult } from "express-validator"


const admin = (req,res) => {
    res.render("propiedades/admin", {
        pagina: "Mis Propiedades",
        barra: true
    })
} 

const crear = async (req,res) => {
    // Consultar Modelo de Precio Y Categoria
    const [categorias, precios] = await Promise.all([Categoria.findAll(), Precio.findAll()])

    res.render("propiedades/crear", {
        pagina: "Crear Propiedad",
        barra: true,
        csrfToken: req.csrfToken(),
        categorias: categorias,
        precios: precios,
        datos: {}
    })
}

const guardar = async(req,res) => {

    // Validacion del post
    let resultado = validationResult(req)

    if(!resultado.isEmpty()){
        const [categorias, precios] = await Promise.all([Categoria.findAll(), Precio.findAll()]) // Se require pq si hay error en el post del form igualmente tenemos que tener 
        // las categorias y precios

        return res.render("propiedades/crear", {
            pagina: "Crear Propiedad",
            barra: true,
            csrfToken: req.csrfToken(),
            categorias: categorias,
            precios: precios,
            errores: resultado.array(),
            datos: req.body

        })
    }
}

export {
    admin,
    crear,
    guardar
}