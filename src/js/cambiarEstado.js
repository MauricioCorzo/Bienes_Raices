
(function(){

    const cambiarEstadoBtn = document.querySelectorAll(".cambiar-estado")


    cambiarEstadoBtn.forEach( (boton) => {
        boton.addEventListener("click", cambiarEstadoPropiedad)
    })

    async function cambiarEstadoPropiedad(event) {
       const { token , propiedadId } = event.target.dataset  // dataset es un atributo personalizado (data-propiedad-id y data-token)

       try {
        const url = `/propiedades/${propiedadId}`
        const respuesta = await fetch(url, {
            method: "PUT",
            headers: {
                "CSRF-Token": token
            }
        })
        const {resultado} = await respuesta.json()
        // este resultado es lo que mandamos como res.json en cambiarEstado en propiedadController
        // console.log(resultado)

        if(resultado){
            if(event.target.textContent == "Publicado"){
                event.target.textContent = "No Publicado"
                event.target.classList.add("bg-yellow-100", "text-yellow-800") 
                event.target.classList.remove("bg-green-100", "text-green-800")
            } else {
                event.target.textContent = "Publicado"
                event.target.classList.add("bg-green-100" , "text-green-800") 
                event.target.classList.remove("bg-yellow-100" , "text-yellow-800")
            }
        }


       } catch (error) {
        console.log(error)
       }
    }

})()