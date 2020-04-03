
function formatDateTime(unformatedDatum) {
  var datum = new Date(unformatedDatum);
  return datum.getDate() + " " + datum.getMonth() + " " + datum.getFullYear()
}


function makeElement(locatie, classnaam, contentInElement, ElementType) {
  var element = document.createElement(ElementType);
  element.appendChild(document.createTextNode(contentInElement));
  element.setAttribute('class', classnaam);
  locatie.appendChild(element);
}


function makeImg(locatie, classnaam, imageInDiv) {
  var img = document.createElement('img');
  img.setAttribute('src', imageInDiv); //verander value naar imageInDiv
  img.setAttribute('class', classnaam);
  locatie.appendChild(img);
}


function toonZoekResultaten(item, index) {
  var kenniskaartBestemming = document.getElementsByClassName("kenniskaartencontainer");

  var kenniskaart = document.createElement('div');
  kenniskaart.setAttribute('class', 'kenniskaart');
  kenniskaartBestemming[0].appendChild(kenniskaart);
  var kenniskaartlocatie = document.getElementsByClassName("kenniskaart");

  makeImg(kenniskaartlocatie[index], "kenniskaart-foto", '../css/fotos/placeholder.jpeg');
  makeElement(kenniskaartlocatie[index], "kenniskaart-datum", formatDateTime(item["datetime"]), "div");
  makeElement(kenniskaartlocatie[index], "kenniskaart-titel", item["titel"], "H3");
  makeElement(kenniskaartlocatie[index], "kenniskaart-what", item["what"].slice(0, 150) + "...", "div");
  // item["tags"].forEach(function (item) {
  //   makeElement(kenniskaartlocatie[index], "kenniskaart-tags", item, "div")
  // });
}


// testSearchResults.forEach(function(item, index) {toonZoekResultaten(item, index)})

function fetchResultaten() {
  if (event.keyCode === 13) {
    console.log('zoeken...');
    fetch("http://82.72.167.14:56743/ophalen/".concat(document.getElementById('searchBar').value))
        .then(
            function (response) {
              response.json().then(function (data) {//response omzetten in json zodat javascript het kan gebruiken in de functie erna
                // data.reverse();//sorteren op laatst toegevoegd
                data.forEach(function (item, index) {
                  toonZoekResultaten(item, index);
                })
              })
            })
        .catch(function (error) {
          console.log(error);
        })
  }
}