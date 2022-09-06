import { Dropzone } from "dropzone"

//Leer documentacion de dropzone. El ,imagen es del id que tiene el form en agregar-imagen.pug
Dropzone.options.imagen = {
    dictDefaultMessage: "Arrastra las imagenes aquí",
    acceptedFiles: `.png, .jpg, .jpeg`,
    maxFilesize: 5,
    maxFiles: 1,
    parallelUploads: 1,
    autoProcessQueue: false,
    addRemoveLinks: true,
    dictRemoveFile: "Borrar imagen",
    dictMaxFilesExceeded: "El limite es 1 Archivos"
}