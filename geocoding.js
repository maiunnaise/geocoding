let getPos = document.querySelector('button');
let div = document.querySelector('div');
let highAcc = document.querySelector('input[name="HighAcc"]');
let maxAge = document.querySelector('input[name="maxAge"]');
let timeout = document.querySelector('input[name="timeout"]');
let watchPos = document.querySelector('button:nth-of-type(2)');
let stopPos = document.querySelector('button:nth-of-type(3)');

let options={};
let id;

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

getPos.addEventListener('click', () => {

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


watchPos.addEventListener('click', () => {
    stopPos.disabled = false;
    id = navigator.geolocation.watchPosition(succès, erreur, options);
});

stopPos.addEventListener('click', () => {
    navigator.geolocation.clearWatch(id);
    stopPos.disabled = true;
});



   