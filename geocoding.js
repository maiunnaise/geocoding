let getPos = document.querySelector('button');
let div = document.querySelector('div');
let highAcc = document.querySelector('input[name="HighAcc"]');
let maxAge = document.querySelector('input[name="maxAge"]');
let timeout = document.querySelector('input[name="timeout"]');
let watchPos = document.querySelector('button:nth-of-type(2)');
let stopPos = document.querySelector('button:nth-of-type(3)');
let speedCalc = document.querySelector('input[name="speed"]');
let divAdress = document.querySelector('.adress');

let options={};
let id;
let previousPos;

const succès = (pos) => {
    if(previousPos !=undefined && (pos.coords.latitude - previousPos.coords.latitude > 0.01 || pos.coords.longitude - previousPos.coords.longitude > 0.01)){
        fetchAdress(pos.coords.latitude, pos.coords.longitude);
    }
    else if(previousPos == undefined){
        fetchAdress(pos.coords.latitude, pos.coords.longitude);
    }
    let speed = 0;
    if (previousPos) {
        const distance = getDistanceFromLatLonInMeters(previousPos.coords.latitude, previousPos.coords.longitude, pos.coords.latitude, pos.coords.longitude);
        const timeDiff = (pos.timestamp - previousPos.timestamp) / 1000; // convert to seconds
        speed = distance / timeDiff;
    }
    previousPos = pos;
    div.innerHTML = ` Date de la requête : ${new Date(pos.timestamp).toLocaleString("fr-FR")}
    <br> Précision : ${pos.coords.accuracy}
    <br> Latitude : ${pos.coords.latitude} 
    <br> Longitude : ${pos.coords.longitude}
    <br> Altitude : ${pos.coords.altitude}
    <br> Précision altitude : ${pos.coords.altitudeAccuracy}
    <br> Direction (deg) : ${pos.coords.heading}
    <br> Vitesse (m/s) : ${speedCalc.checked ? speed : pos.coords.speed}`; 
}
const erreur = (err) => {
    console.warn(`ERROR(${err.code}): ${err.message}`);
}

getPos.addEventListener('click', () => {
    defOptions();
    navigator.geolocation.getCurrentPosition(succès, erreur, options);
    //console.log(options);
});


watchPos.addEventListener('click', () => {
    stopPos.disabled = false;
    defOptions();
    id = navigator.geolocation.watchPosition(succès, erreur, options);
});

stopPos.addEventListener('click', () => {
    navigator.geolocation.clearWatch(id);
    div.innerHTML = "";
    stopPos.disabled = true;
});

function defOptions(){
    if (highAcc.checked) {
        options.enableHighAccuracy = true;
    }
    else{
        options.enableHighAccuracy = false;
    }
    options.timeout = timeout.value;
    options.maximumAge = maxAge.value;
}

function getDistanceFromLatLonInMeters(lat1,lon1,lat2,lon2) {
        const R = 6371000; 
        const dLat = deg2rad(lat2-lat1);  
        const dLon = deg2rad(lon2-lon1); 
        const a = 
            Math.sin(dLat/2) * Math.sin(dLat/2) +
            Math.cos(deg2rad(lat1)) * Math.cos(deg2rad(lat2)) * 
            Math.sin(dLon/2) * Math.sin(dLon/2)
            ; 
        const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a)); 
        const d = R * c;
        return d;
}

function deg2rad(deg) {
    return deg * (Math.PI/180)
}

function fetchAdress(latitude, longitude){
    divAdress.innerHTML = "";
    fetch(`https://nominatim.openstreetmap.org/reverse?format=geojson&lat=${latitude}&lon=${longitude}`)
        .then((resp)=>resp.json())
        .then((resp)=>{
            for (let elt in resp.features[0].properties.address){
                divAdress.innerHTML += `<br>${elt}: ${resp.features[0].properties.address[elt]}`;
            }
    })
}
