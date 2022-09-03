(function() {
    
    const lat = -34.6037389;
    const lng = -58.3815704;
    const mapa = L.map('mapa').setView([lat, lng ], 14);
    let marker;

    // Utilizar Provider y Geocoder para obtener el nombre de las calles
    const geocodeService = L.esri.Geocoding.geocodeService()
    

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    //El Pin y configuracion de leaflet (opcion gratis a google)
    marker = new L.marker([lat,lng], {
        draggable: true, // Poder mover el pin
        autoPan: true // Se mueve el mapa si muevo el pin
    })
    .addTo(mapa)

    //Detectar el movimiento del pin y sus coordenadas
    marker.on("moveend", (e) => {
        marker = e.target

        const posicion = marker.getLatLng()

        // console.log(posicion)

        mapa.panTo(new L.LatLng(posicion.lat, posicion.lng)) // Centrar el mapa al soltar el pin

        // Leer la info de las calles al soltar el Pin
        geocodeService.reverse().latlng(posicion, 13).run((error,result) => {
            // console.log(result)

            marker.bindPopup(result.address.LongLabel)

            //Llenar campos en el front de archivo crear.pug
            document.querySelector(".calle").textContent = result.address?.Address ?? "";
            document.querySelector("#calle").value = result.address?.Address ?? "";
            document.querySelector("#lat").value = result.latlng?.lat ?? "";
            document.querySelector("#lng").value = result.latlng?.lng ?? "";
        })
    })
})()