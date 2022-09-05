import { Propiedad , Precio , Categoria } from "../models/index.js"
import { validationResult } from "express-validator"


const admin = (req,res) => {
    res.render("propiedades/admin", {
        pagina: "Mis Propiedades",
        barra: true
    })
} 

const crear = async (req,res) => {
    // Consultar Modelo de Precio Y Categoria
    const [categorias, precios] = await Promise.all([Categoria.findAll(), Precio.findAll()]);

    res.render("propiedades/crear", {
        pagina: "Crear Propiedad",
        barra: true,
        csrfToken: req.csrfToken(),
        categorias: categorias,
        precios: precios,
        datos: {}
    });
};

const guardar = async(req,res) => {

    // console.log(req.body)
    // Validacion del post
    let resultado = validationResult(req);

    if(!resultado.isEmpty()){
        const [categorias, precios] = await Promise.all([Categoria.findAll(), Precio.findAll()]); // Se require pq si hay error en el post del form igualmente tenemos que tener 
        // las categorias y precios

        return res.render("propiedades/crear", {
            pagina: "Crear Propiedad",
            barra: true,
            csrfToken: req.csrfToken(),
            categorias: categorias,
            precios: precios,
            errores: resultado.array(),
            datos: req.body

        });
    };

    //Crear registro
    const { titulo , descripcion, habitaciones , estacionamiento , wc , calle , lat , lng, precio, categoria} = req.body;
    const { usuario } = req;
    try {
        const propiedadGuardada = await Propiedad.create({
            titulo: titulo,
            descripcion: descripcion,
            habitaciones: habitaciones,
            estacionamiento: estacionamiento,
            wc: wc,
            calle: calle,
            lat: lat,
            lng: lng,
            precioId: precio,
            categoriaId: categoria,
            usuarioId: usuario.id,
            imagen: "" 

        });

        const { id } = propiedadGuardada;
        res.redirect(`/propiedades/agregar-imagen/${id}`)

    } catch (error) {
        console.log(error);
    }
}

export {
    admin,
    crear,
    guardar
}