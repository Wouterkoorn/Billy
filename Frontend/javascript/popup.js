function addEventListeners() {
    let kenniskaarten = document.getElementsByClassName("kenniskaart");
    //gaat alle kenniskaarten langs en doet voor ieder:
    var i;
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
            //roept juiste gegevens op van database
            console.log(id, kenniskaart);
        })
    }


}


    //Neemt gegevens op in html
    //displayed gegevens in popup