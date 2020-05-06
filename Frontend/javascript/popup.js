function addEventListeners() {
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
                        //dynamisch maken van pop-up

                    })
                })
        })
    }


}


    //Neemt gegevens op in html
    //displayed gegevens in popup