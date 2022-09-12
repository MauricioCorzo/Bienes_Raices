import Propiedad from "./Propiedad.js";
import Precio from "./Precio.js";
import Usuario from "./Usuario.js";
import Categoria from "./Categoria.js";
import Mensaje from "./Mensaje.js"

Propiedad.belongsTo(Precio)
Propiedad.belongsTo(Categoria)
Propiedad.belongsTo(Usuario)
Propiedad.hasMany(Mensaje, {foreignKey: "propiedadId"})

Mensaje.belongsTo(Propiedad, {foreignKey: "propiedadId"}) //Sin esto me generaba error no se porque
Mensaje.belongsTo(Usuario)

export {
    Propiedad,
    Precio,
    Usuario,
    Categoria,
    Mensaje
}