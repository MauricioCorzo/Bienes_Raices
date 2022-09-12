import { Precio, Categoria, Propiedad } from "../models/index.js"

const inicio = async (req,res) => {
                                                                        //Me trae los datos simplificados
    const [ categorias, precios , casas, departamentos] = await Promise.all([
        Categoria.findAll({raw: true}), 
        Precio.findAll({raw:true}), 
        Propiedad.findAll({
            limit:3, 
            where: {
                categoriaId: 1 // Categoria de casas
            },
            include: [
                {model: Precio}
            ],
            order: [["createdAt", "DESC"]]
        }),
        Propiedad.findAll({
            limit:3, 
            where: {
                categoriaId: 2 // Categoria de departamentos
            },
            include: [
                {model: Precio}
            ],
            order: [["createdAt", "DESC"]]
        })
    ])
    
    res.render("inicio", {
        pagina: "Inicio",
        categorias: categorias,
        precios: precios,
        casas: casas,
        departamentos: departamentos
    })
}

const categoria = async (req,res) => {

}

const noEncontrado = async (req,res) => {

}

const buscador = async (req,res) => {

}

export {
    inicio,
    categoria,
    noEncontrado,
    buscador
}