

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
    let element = document.createElement(ElementType);
    element.appendChild(document.createTextNode(contentInElement));
    element.setAttribute('class', classnaam);
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

    // makeImg(kenniskaartlocatie[index], "kenniskaart-foto", '../css/fotos/placeholder.jpeg');
    if (item["dateTime"]) {
        makeElement(kenniskaartlocatie[index], "kenniskaart-datum", formatDateTime(item["datetime"]), "div");
    }
    makeElement(kenniskaartlocatie[index], "kenniskaart-titel", item["titel"], "H3");
    makeElement(kenniskaartlocatie[index], "kenniskaart-what", item["what"], "div");
    // item["tags"].forEach(function (item) {           item["what"].slice(0, 150) + "..."
    //   makeElement(kenniskaartlocatie[index], "kenniskaart-tags", item, "div")
    // });
}


function geenZoekResultaten() {
    deleteChildren(document.getElementsByClassName('kenniskaartencontainer')[0]);
    const item = {
        "titel": "Geen zoekresultaten gevonden",
        "what": "Er zijn helaas geen zoekresultaten gevonden. Als u met andere zoektermen zoekt heeft u misschien meer geluk."
    };
    maakKenniskaarten(item, 0);
}


function fetchRecent() {
    //haalt de 5 laatst toegevoegde kaarten op en toont deze
    fetch(`${ip}/api/ophalen/recent`)
        .then(function (response) {
            response.json().then(function (data) {
                deleteChildren(document.getElementsByClassName("kennniskaartencontainer")[0]);
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
            kenniskaartenZoeken();
    }
})
