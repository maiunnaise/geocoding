let btn = document.querySelector('button');
let div = document.querySelector('div');
let highAcc = document.querySelector('input[name="HighAcc"]');
let maxAge = document.querySelector('input[name="maxAge"]');
let timeout = document.querySelector('input[name="timeout"]');

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
    let options= {maximunAge: 30000, timeout: 27000};

    if (highAcc.checked) {
        options.enableHighAccuracy = true;
    }
    else{
        options.enableHighAccuracy = false;
    }
    options.maximunAge = maxAge.value;
    options.timeout = timeout.value;
    
    navigator.geolocation.getCurrentPosition(succès, erreur, options);
    console.log(options);
});



   