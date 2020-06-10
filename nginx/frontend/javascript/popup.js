function addEventListeners() {
    let popup = document.getElementById("popupContainer"),
        kenniskaarten = document.getElementsByClassName("kenniskaart"),
        i;
    //gaat alle kenniskaarten langs en doet voor ieder:
    for (i=0; i < kenniskaarten.length; i++) {
        //event listener toevoegen
        kenniskaarten[i].addEventListener('click', function (element) {
            //juiste id ophalen
            let kenniskaart = element.target,
                id = kenniskaart.getAttribute("id");
            if (id == null) {
                //als child element is aangeklikt wordt id van parent (kenniskaart zelf) element gepakt
                kenniskaart = kenniskaart.parentElement;
                id = kenniskaart.getAttribute("id");
            }
            //Juiste gegevens oproepen met fetch command
            popupTonen(id);
        })
    }
}

function kenniskaartVerwijderen() {
    //zodra op de verwijderknop wordt gedrukt wordt de kenniskaart id opghehaald en wordt de kenniskaart verwijderd uit de database en uit de HTML
    if (confirm(`Weet je zeker dat je de kenniskaart: "${document.getElementById("popupTitel").innerHTML}" wilt verwijderen?`)) {
        const id = document.getElementsByClassName("popupContent")[0].getAttribute("id");
        fetch(`${ip}/api/verwijderen/kenniskaart/${id}`, {
            method: "DELETE"
        })
            .then(function (response) {
                if (response["status"] === 200) {
                    const titel = document.getElementById("popupTitel").innerText;
                    //todo alert veranderen naar kleine korte popup zodat gebruiker niet geinterrupt wordt.
                    alert(`De kenniskaart: "${titel}" is verwijderd.`);
                    closeKenniskaartPopUp();
                    // verwijder kaart uit lijst in html zodat pagina of zoekresultaten niet opniew geladen hoeft te worden.
                    //todo toekomstige shareable urls checken of situatie toch niet om refresh vraagt van resultaten.
                    document.getElementById(id).remove();
                }
                else {
                    console.error(`The delete request responded with something other than status (ok) 200: `, response);
                }
            })
            .catch(error => {
                console.error('There has been a problem with your fetch Delete operation:', error);
            })
    }
}


function deleteChildren(myNode) {
    //verwijderd alle kinderen van het element myNode
    while (myNode.firstChild) {
        myNode.removeChild(myNode.lastChild);
    }
}


function popupTonen(kenniskaart_id) {
    //vult de template in html in met de data die opgehaald wordt uit de database en toont daarna de popup.
    //Er worden daarna nog event listeners toegevoegd zodat de popup kan worden gesloten

    // console.log("hallo ik wil een popup tonen", `${ip}/api/ophalen/kenniskaart/${kenniskaart_id}`);
    let popup = document.getElementById("popupContainer");
    fetch(`${ip}/api/ophalen/kenniskaart/${kenniskaart_id}`)
        .then(function (response) {
            response.json().then( function (data) {
                //console.log(response, data);
                //todo pop-up oude data verwijderen
                deleteChildren(document.getElementById("popupHBO-i"));
                deleteChildren(document.getElementById("popupCompetentie"));
                deleteChildren(document.getElementById("popupRollen"));
                //pop-up vullen met juiste data
                let i;
                //todo onderstaande code verbeteren. Dit is technisch gezien mezelf repeaten op een lelijke manier
                //hboi vullen
                for (i = 0; i < data["hboi"].length; i++) {
                    let contentString = "";
                    contentString = contentString.concat(data["hboi"][i]["architectuurlaag"], " ", data["hboi"][i]["fase"], " ", data["hboi"][i]["niveau"]);
                    //maak container en plaats op de juiste locatie
                    makeElement(document.getElementById("popupHBO-i"), "hboiContainer", contentString, "div");
                }

                //competentie vullen
                for (i = 0; i < data["competenties"].length; i++) {
                    let contentString = "";
                    contentString = contentString.concat(data["competenties"][i]["categorie"], " ", data["competenties"][i]["competentie"]);
                    //maak container en plaats op de juiste locatie
                    makeElement(document.getElementById("popupCompetentie"), "competentieContainer", contentString, "div");
                }

                //rollen vullen
                for (i = 0; i < data["rollen"].length; i++) {
                    //maak container en plaats op de juiste locatie
                    makeElement(document.getElementById("popupRollen"), "rollenContainer", data["rollen"][i], "div");
                }


                document.getElementsByClassName("popupContent")[0].setAttribute("id", data["id"])
                document.getElementById("popupTitel").innerText = data["titel"]
                document.getElementById("popupDatum").innerText = formatDateTime(data["datetime"])
                document.getElementById("popupHBO-i").innerText = data["hboi"]
                document.getElementById("popupWhat").innerText = data["what"]
                document.getElementById("popupWhy").innerText = data["why"]
                document.getElementById("popupHow").innerText = data["how"]
                document.getElementById("popupVoorbeeld").innerText = data["voorbeeld"]
                document.getElementById("popupBronnen").innerText = data["bronnen"]
                document.getElementById("popupAuteur").innerText = data["auteur"]
                //pop-up tonen
                popup.style.display = "block";
                //paramater voor kenniskaart toevoegen
                addParam('kenniskaart', data["id"]);

                //event listeners om popup te sluiten toevoegen
                popup.addEventListener("click", function (element) {
                    //naast popup clicken sluit de pop-up
                    if (element.target.getAttribute("id") === popup.getAttribute("id")) {
                        popup.style.display = "none";
                        deleteParam('kenniskaart');
                    }
                })
                document.getElementById("popupCloseButton").addEventListener("click", function (element) {
                    //sluit de pop-up van de kenniskaart.
                    document.getElementById("popupContainer").style.display = "none";
                    deleteParam('kenniskaart');
                })
            })
        })

}