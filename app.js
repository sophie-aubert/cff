"use strict";

const afficheLieuDepart = document.querySelector("h1");                                  
const afficheGaresArrivees = document.querySelector("#board");

//const recupStation = fetch(`http://transport.opendata.ch/v1/stationboard?station=Aarau&limit=10`)
//.then((res) => res.json()
//.then((recupStation) => console.log(recupStation)));


const recupStation = ((ville,nb) => {
    
    fetch(`https://transport.opendata.ch/v1/stationboard?station=${ville}}&limit=${nb}`)
    
.then((resultat) => {
    return resultat.json();
})
.then((data) => {
    //  TEST : console.log(data);

    data.stationboard.forEach((element) => afficheTableauGare(element));
    afficheLieuDepart.innerHTML = data.station.name;
})
})

recupStation("Lausanne", 10)

//**********************************************
// ETAPE 2 - ON AFFICHE LE TOUT : 
//**********************************************
const afficheTableauGare = (villeDeDepart) => {
// *************
// C'est pour la mise en forme pour les heures : 
const time = new Date(villeDeDepart.stop.departure);
const minute = time.getMinutes().toString().padStart(2, '0');
const heure = time.getHours();
// *************

// 2.A
// On récupère les éléments qui vont s'afficher pour 
// chaque gare de destination 
// 2.B 
// On construit le tout dynamiquement ! 

const html = `<article>
<div class="time">${heure + ":" + minute}</div>
<div class="category" data-category="${villeDeDepart.category}">${villeDeDepart.category}</div>
<div class="destination">${villeDeDepart.to}</div>
</article>`;
// Commande qui permet d'afficher le tout : 
afficheGaresArrivees.insertAdjacentHTML("beforeend", html);
};
