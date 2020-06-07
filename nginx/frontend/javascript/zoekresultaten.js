function clearOldResults(elementClassName) {
    //zoekt alle kenniskaarten op en verwijderd ze
    const element = document.getElementsByClassName(elementClassName);
    // console.log(element, element.length);
    while (element.length > 0) {
        element[0].remove();
    }
}


function formatDateTime(unformatedDatum) {
    //zet de datum format van mariadb om naar de gewenste datumformat voor JS met een uitgeschreven maand ipv cijfer
    var datum = new Date(unformatedDatum);
    const maanden = {
        0: "januari",
        1: "februari",
        2: "maart",
        3: "april",
        4: "mei",
        5: "juni",
        6: "juli",
        7: "augustus",
        8: "september",
        9: "oktober",
        10: "november",
        11: "december"
    };
    return datum.getDate() + " " + maanden[datum.getMonth()] + " " + datum.getFullYear()
}


function makeElement(locatie, classnaam, contentInElement, ElementType) {
    //maakt een DOM element met classnaam, content in gewenste elementtype en plaatst deze in de locatie
    var element = document.createElement(ElementType);
    element.appendChild(document.createTextNode(contentInElement));
    element.setAttribute('class', classnaam);
    console.log(element);
    locatie.appendChild(element);
}


function makeImg(locatie, classnaam, imageInDiv) {
    //maakt een DOM element specifiek voor de image
    var img = document.createElement('img');
    img.setAttribute('src', imageInDiv); //verander value naar imageInDiv
    img.setAttribute('class', classnaam);
    locatie.appendChild(img);
}


function maakKenniskaarten(item, index) {
    //maakt een kenniskaart volgens de json uit de variabele item
    var kenniskaartBestemming = document.getElementsByClassName("kenniskaartencontainer");
    var kenniskaart = document.createElement('div');
    kenniskaart.setAttribute('class', 'kenniskaart');
    kenniskaart.setAttribute('id', item['id']);
    kenniskaartBestemming[0].appendChild(kenniskaart);
    var kenniskaartlocatie = document.getElementsByClassName("kenniskaart");

    makeImg(kenniskaartlocatie[index], "kenniskaart-foto", '../css/fotos/placeholder.jpeg');
    makeElement(kenniskaartlocatie[index], "kenniskaart-datum", formatDateTime(item["datetime"]), "div");
    makeElement(kenniskaartlocatie[index], "kenniskaart-titel", item["titel"], "H3");
    makeElement(kenniskaartlocatie[index], "kenniskaart-what", item["what"], "div");
    // item["tags"].forEach(function (item) {           item["what"].slice(0, 150) + "..."
    //   makeElement(kenniskaartlocatie[index], "kenniskaart-tags", item, "div")
    // });
}

function cleanupKenniskaarten() {
  var kenniskaartenSection = document.getElementsByClassName('kenniskaartencontainer');
  console.log(kenniskaartenSection.firstElementChild);
  // kenniskaartenSection.innerHTML = '';
  while(kenniskaartenSection) {
    var element = document.getElementsByClassName('kenniskaart');
    kenniskaartenSection.removeChild(element);
  }
}

function fetchZoeken() {
    //verwijderd oude resultaten en haalt nieuwe resultaten op in json format. Roept Daarna de functie aan om de resultaten te maken.
    clearOldResults("kenniskaart"); //hetzelfde als cleanupKenniskaarten() functie


    console.log('zoeken...', `${ip}/api/ophalen/zoeken/${document.getElementById('searchBar').value}`);

    //todo remove this and replace by URL paramaters
    window.zoekterm = document.getElementById('searchBar').value;

    addParam('search', document.getElementById('searchBar').value)

    fetch(`${ip}/api/ophalen/zoeken/${document.getElementById('searchBar').value}`)
        .then(function (response) {
            //todo filters toepassen als die geselecteerd zijn
            response.json().then(function (data) {//response omzetten in json zodat javascript het kan gebruiken in de functie erna
                data.forEach(function (item, index) {
                    // cleanupKenniskaarten();
                    maakKenniskaarten(item, index);
                })
            })
                //todo gebruiker vermelden dat er niks is gevonden als er geen resultaten zijn.
                .then(function () {
                    addEventListeners();
                })
                .catch(function (error) {
                    console.log(error);
                })
        })
}


function fetchRecent() {
    //haalt de 5 laatst toegevoegde kaarten op en toont deze
    fetch(`${ip}/api/ophalen/recent`)
        .then(function (response) {
            response.json().then(function (data) {
                data.forEach(function (item, index) {
                    maakKenniskaarten(item, index);
                })
            })
                .then(function () {
                    addEventListeners();
                })
                .catch(function (error) {
                    console.log(error);
                })
        })

}


//eventlistener voor zoeken, toont zoekresultaten zodra enter wordt ingedrukt.
const zoekveld = document.getElementById("searchBar");

zoekveld.addEventListener('keydown', function (event) {
    switch (event.key) {
        case "Enter":
            fetchZoeken();
    }
});
