function kenniskaart_toevoegen() {
    /*Voegt alle data die is ingevuld bij de template samen in een json variable en verstuurd deze naar de backend.
    Geeft na een succesvolle operatie een alert dat het gelukt is.
    */
    let dataKenniskaart = {
            "titel": document.getElementById('formTitel').value,
            //todo for loopjes voor vaardigheid rol en hboi
            "vaardigheid": leesSelected(document.getElementsByClassName("toevoegenCompetentie")),
            "rol": leesSelected(document.getElementsByClassName("toevoegenRol")),
            "hboi": formathboi(document.getElementsByClassName("toevoegenArchitectuurlagen"), document.getElementsByClassName("toevoegenActiviteiten"), document.getElementsByClassName("toevoegenNiveau")),
            "what": document.getElementById('formWhat').innerText,
            "why": document.getElementById('formWhy').innerText,
            "how": document.getElementById('formHow').innerText,
            "voorbeeld": document.getElementById('formVoorbeeld').innerText,
        };
    console.log(dataKenniskaart["vaardigheid"]);
    fetch(`${ip}/api/toevoegen`, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(dataKenniskaart)
    })
        .then((response) => {
            try {
                return response.json();
            }
            catch(err) {
                return response;
            }
        })
        // .catch(function (error) {
        //     return error
        // })
    //todo verander komende alert in popup op index.html
    alert('uw kenniskaartje is toegevoegd');
    window.location.replace(`${ip}/index.html`);
}


function extra_select(select) {
    //maakt nog een competentie drop down list en een verwijder knop die gekopeld is aan de select door middel van een container
    let clone = select.cloneNode(true),
        container = document.createElement("div");

    clone.removeAttribute("id");
    container.setAttribute("class", "toevoegenExtraSelect");
    container.appendChild(clone);

    let deleteButton = document.createElement("button");
    deleteButton.appendChild(document.createTextNode("-"));
    // deleteButton.setAttribute("onclick", "delete_select(element)");
    container.appendChild(deleteButton);

    select.parentElement.appendChild(container);

    deleteButton.addEventListener("click", function (element) {
        element.target.parentElement.remove();
	})
}


function formathboi(architectuurlagen, activiteiten, niveau){
    let i,
        hboi = [];
    for (i = 0; i < architectuurlagen.length; i++) {
        hboi.push(`${architectuurlagen[i].value} ${activiteiten[i].value} ${niveau[i].value}`);
    }
    return hboi;
}


function leesSelected(lijst) {
    let i,
        values = [];
    for (i = 0; i < lijst.length; i++) {
        values.push(lijst[i].value);
    }
    return values;
}