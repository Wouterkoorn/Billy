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
                        console.log(data);
                        console.log(data["datetime"], formatDateTime(data["datetime"]));
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