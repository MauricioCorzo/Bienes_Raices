(function() {
    
    const lat = -34.6037389;
    const lng = -58.3815704;
    const mapa = L.map('mapa').setView([lat, lng ], 14);
    let marker;
    

    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    }).addTo(mapa);

    //El Pin y configuracion de leaflet (opcion gratis a google)
    marker = new L.marker([lat,lng], {
        draggable: true, // Poder mover el pin
        autoPan: true // Se mueve el mapa si muevo el pin
    })
    .addTo(mapa)
})()