(function(){
    const lat = -34.6037389; 
    const lng = -58.3815704;
    const mapa = L.map('mapa-inicio').setView([lat, lng ], 12);

    //Los Pines que se van a mostar en el mapa de la pagina principal
    let markers = new L.FeatureGroup().addTo(mapa)

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);
    
    const obtenertPropiedades = async () => {
        try {
            const url = "/api/propiedades"
            const respuesta = await fetch(url)
            const propiedades = await respuesta.json()
            
            mostrarPropiedades(propiedades)
            
        } catch (error) {
            console.log(error)
        }
    }
    
    const mostrarPropiedades = (propiedades) => {
        
        for(let p of propiedades){
             //Agregar los pines
             const marker = new L.marker([p?.lat , p?.lng], {
                autoPan: true
            }).addTo(mapa).bindPopup(`
                <p class="text-indigo-600 font-bold">${p?.categoria.nombre}</p>
                <h1 class="text-xl font-extrabold my-2 uppercase">${p?.titulo}</h1>
                <img src="/uploads/${p?.imagen}" alt="Imagen de la propiedad ${p?.titulo}"/>
                <p class="text-gray-600 font-bold">${p?.precio.nombre}</p>
                <a href="/propiedad/${p?.id}" class="bg-indigo-600 block p-2 text-center font-bold uppercase text-white">Ver Propiedad<a/> 
            `)

            markers.addLayer(marker)
        }
    }
    
    obtenertPropiedades()

})()