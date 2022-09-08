import { Propiedad , Precio , Categoria } from "../models/index.js"
import { validationResult } from "express-validator"
import { unlink } from "node:fs/promises"


const admin = async (req,res) => {
    const { usuario } = req;

    const propiedades = await Propiedad.findAll({
        where: { 
            usuarioId: usuario.id 
        }, include: [
            { model: Categoria}, // se le puede agregar esto : , as: "categoria" (para llamarlo como queramos)
            { model: Precio}
        ]
    })

    res.render("propiedades/admin", {
        pagina: "Mis Propiedades",
        csrfToken: req.csrfToken(),
        propiedades: propiedades
    });
};

const crear = async (req,res) => {
    // Consultar Modelo de Precio Y Categoria
    const [categorias, precios] = await Promise.all([Categoria.findAll(), Precio.findAll()]);

    res.render("propiedades/crear", {
        pagina: "Crear Propiedad",
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

const agregarImagen = async (req,res) => {
    const { id } = req.params;
    const { usuario } = req;

    //Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id);
    if(!propiedad){
        return res.redirect("/mis-propiedades")
    };

    //Validar que no este publicada(tiene que ser false)
    if(propiedad.publicado){
        return res.redirect("/mis-propiedades")
    };

    //Validar que la propiedad pertenece a quien visita la pagina. Al comparar id es recomendable pasarlos a toString()
    // porque algunos ORM´s los evalua como objetos y siempre daria false aunque los id´s sean iguales
    if(usuario.id.toString() !== propiedad.usuarioId.toString()){
        return res.redirect("/mis-propiedades")
    };

    res.render("propiedades/agregar-imagen", {
        pagina: `Agregar Imagen a: "${propiedad.titulo}"`,
        csrfToken: req.csrfToken(),
        propiedad: propiedad,
    });
};

const almacenarImagen = async (req,res) => {
    const { id } = req.params;
    const { usuario } = req;

    //Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id);
    if(!propiedad){
        return res.redirect("/mis-propiedades")
    };

    //Validar que no este publicada(tiene que ser false)
    if(propiedad.publicado){
        return res.redirect("/mis-propiedades")
    };

    //Validar que la propiedad pertenece a quien visita la pagina. Al comparar id es recomendable pasarlos a toString()
    // porque algunos ORM´s los evalua como objetos y siempre daria false aunque los id´s sean iguales
    if(usuario.id.toString() !== propiedad.usuarioId.toString()){
        return res.redirect("/mis-propiedades")
    };

    try {
        // console.log(req.file)
        // req.file.filname es igual generarId().jpg o .png o jpeg
        // Almacenar imagen y publicar propiedad
        propiedad.imagen = req.file.filename;

        propiedad.publicado = true;

        await propiedad.save();
        return res.redirect("/mis-propiedades") //este redirect se hace desde la funcion dropzone en agregarImagen.js
        // next()

    } catch (error) {
        console.log(error);
    }
}

const editar = async (req,res) => {
    const { id } = req.params;
    const { usuario } = req;

    //Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id);
    if(!propiedad){
        return res.redirect("/mis-propiedades")
    };

    //Revisar que el usuario sea el que creó la propiedad
    if(usuario.id.toString() !== propiedad.usuarioId.toString()){
        return res.redirect("/mis-propiedades")
    };

    // Consultar Modelo de Precio Y Categoria
    const [categorias, precios] = await Promise.all([Categoria.findAll(), Precio.findAll()]);

    res.render("propiedades/editar", {
        pagina: `Editar Propiedad: "${propiedad.titulo}"`,
        csrfToken: req.csrfToken(),
        categorias: categorias,
        precios: precios,
        datos: propiedad
    });
}


const guardarCambios = async (req,res) => {
    const { id } = req.params;
    const { usuario } = req;

    // Validacion del post
    let resultado = validationResult(req);

    if(!resultado.isEmpty()){
        const [categorias, precios] = await Promise.all([Categoria.findAll(), Precio.findAll()]); // Se require pq si hay error en el post del form igualmente tenemos que tener 
        // las categorias y precios

        return res.render("propiedades/editar", {
            pagina: `Editar Propiedad`,
            csrfToken: req.csrfToken(),
            categorias: categorias,
            precios: precios,
            errores: resultado.array(),
            datos: req.body

        });
    };

    //Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id);
    if(!propiedad){
        return res.redirect("/mis-propiedades")
    };

    //Revisar que el usuario sea el que creó la propiedad
    if(usuario.id.toString() !== propiedad.usuarioId.toString()){
        return res.redirect("/mis-propiedades")
    };

    //Actualizar Propiedad
    try {
        const { titulo , descripcion, habitaciones , estacionamiento , wc , calle , lat , lng, precio, categoria} = req.body;

        //Casi Igual que en crear, set es un metodo de sequelize. No le pasamos la imagen ni usuario id pa ya los tenemos
       propiedad.set({
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
        });

        await propiedad.save();

        res.redirect("/mis-propiedades");

    } catch (error) {
        console.log(error);
    }
}

const eliminar = async (req,res) => {
    const { usuario } = req;
    const { id } = req.params;

    //Validar que la propiedad exista
    const propiedad = await Propiedad.findByPk(id);
    if(!propiedad){
        return res.redirect("/mis-propiedades")
    };

    //Revisar que el usuario sea el que creó la propiedad
    if(usuario.id.toString() !== propiedad.usuarioId.toString()){
        return res.redirect("/mis-propiedades")
    };

    //Eliminar la imagen
    await unlink(`public/uploads/${propiedad.imagen}`)

    //Eliminar propiedad
    await propiedad.destroy()
    res.redirect("/mis-propiedades")
}

const mostrarPropiedad = async (req,res) => {
    const { id } = req.params;

    const propiedad = await Propiedad.findByPk(id, {
        include: [
            { model: Categoria}, 
            { model: Precio}
        ]
    }); 
    if(!propiedad){
        return res.redirect("/404")
    };
    

    res.render("propiedades/mostrar", {
        propiedad: propiedad,
        pagina: propiedad.titulo
    })
}

export {
    admin,
    crear,
    guardar, 
    agregarImagen,
    almacenarImagen,
    editar,
    guardarCambios,
    eliminar,
    mostrarPropiedad
};