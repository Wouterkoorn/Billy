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
            console.log(`${ip}/api/ophalen/kenniskaart/${id}`);
            //Juiste gegevens oproepen met fetch command
            fetch(`${ip}/api/ophalen/kenniskaart/${id}`)
                .then(function (response) {
                    response.json().then( function (data) {
                        console.log(response, data);
                        //pop-up vullen met juiste data
                        document.getElementsByClassName("popupContent")[0].setAttribute("id", data["id"])
                        document.getElementById("popupTitel").innerHTML = data["titel"]
                        document.getElementById("popupDatum").innerHTML = formatDateTime(data["datetime"])
                        document.getElementById("popupHBO-i").innerHTML = data["hboi"]
                        document.getElementById("popupVaardigheid").innerHTML = data["vaardigheid"]
                        document.getElementById("popupRol").innerHTML = data["rol"]
                        document.getElementById("popupWhat").innerHTML = data["what"]
                        document.getElementById("popupWhy").innerHTML = data["why"]
                        document.getElementById("popupHow").innerHTML = data["how"]
                        document.getElementById("popupVoorbeeld").innerHTML = data["voorbeeld"]
                        //pop-up tonen
                        popup.style.display = "block";
                        addParam('kenniskaart', data["id"]);
                        popup.addEventListener("click", function (element) {
                            //naast popup clicken sluit de pop-up
                            if (element.target.getAttribute("id") === popup.getAttribute("id")) {
                                popup.style.display = "none";
                            }
                        })
                    })
                })

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
                    const titel = document.getElementById("popupTitel").innerHTML;
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


function closeKenniskaartPopUp() {
    //sluit de pop-up van de kenniskaart.
    document.getElementById("popupContainer").style.display = "none";
}