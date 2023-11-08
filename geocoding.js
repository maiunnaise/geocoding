let btn = document.querySelector('button');
let div = document.querySelector('div');
let HighAcc = document.querySelector('input[name="HighAcc"]');

const succès = (pos) => {
    console.log(pos);
    div.innerHTML = ` Date de la requête : ${new Date(pos.timestamp).toLocaleString("fr-FR")}
    <br> Précision : ${pos.coords.accuracy}
    <br> Latitude : ${pos.coords.latitude} 
    <br> Longitude : ${pos.coords.longitude}
    <br> Altitude : ${pos.coords.altitude}
    <br> Précision altitude : ${pos.coords.altitudeAccuracy}
    <br> Direction (deg) : ${pos.coords.heading}
    <br> Vitesse (m/s) : ${pos.coords.speed}`;
}
const erreur = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

btn.addEventListener('click', () => {
    let options= {};

    if (HighAcc.checked) {
        options.enableHighAccuracy = true;
    }
    navigator.geolocation.getCurrentPosition(succès, erreur, options);
    console.log(options);
});



   