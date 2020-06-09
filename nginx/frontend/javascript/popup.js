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


function popupTonen(kenniskaart_id) {
    console.log("hallo ik wil een popup tonen", `${ip}/api/ophalen/kenniskaart/${kenniskaart_id}`);
    let popup = document.getElementById("popupContainer");
    fetch(`${ip}/api/ophalen/kenniskaart/${kenniskaart_id}`)
        .then(function (response) {
            response.json().then( function (data) {
                console.log(response, data);
                //pop-up vullen met juiste data
                document.getElementsByClassName("popupContent")[0].setAttribute("id", data["id"])
                document.getElementById("popupTitel").innerText = data["titel"]
                document.getElementById("popupDatum").innerText = formatDateTime(data["datetime"])
                document.getElementById("popupHBO-i").innerText = data["hboi"]
                document.getElementById("popupVaardigheid").innerText = data["vaardigheid"]
                document.getElementById("popupRol").innerText = data["rol"]
                document.getElementById("popupWhat").innerText = data["what"]
                document.getElementById("popupWhy").innerText = data["why"]
                document.getElementById("popupHow").innerText = data["how"]
                document.getElementById("popupVoorbeeld").innerText = data["voorbeeld"]
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