function addEventListeners() {
    let popup = document.getElementById("popupContainer")
    let kenniskaarten = document.getElementsByClassName("kenniskaart");
    //gaat alle kenniskaarten langs en doet voor ieder:
    let i;
    for (i=0; i < kenniskaarten.length; i++) {
        //event listener toevoegen
        kenniskaarten[i].addEventListener('click', function (element) {
            //juiste id ophalen
            let kenniskaart = element.target,
                id = kenniskaart.getAttribute("id");
            if (id == null) {
                kenniskaart = kenniskaart.parentElement;
                id = kenniskaart.getAttribute("id");
            }
            //Juiste gegevens oproepen met fetch command
            fetch("http://84.105.28.226:56743/ophalen/kenniskaart/".concat(id))
                .then(function (response) {
                    response.json().then( function (data) {
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
        fetch("http://84.105.28.226:56743/verwijderen/kenniskaart/".concat(id), {
            method: "DELETE"
        })
            .then(function (response) {
                if (response["status"] === 200) {
                    const titel = document.getElementById("popupTitel").innerHTML;
                    //todo alert veranderen naar kleine korte popup zodat gebruiker niet geinterrupt wordt.
                    alert(`De kenniskaart: "${titel}" is verwijderd.`);
                    document.getElementById("popupContainer").style.display = "none";
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