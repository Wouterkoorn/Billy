function kenniskaart_toevoegen() {
    /*Voegt alle data die is ingevuld bij de template samen in een json variable en verstuurd deze naar de backend.
    Geeft na een succesvolle operatie een alert dat het gelukt is.
    */
    let emptyString = '', //emptystring om alle data van HBO-i bij elkaar te zetten in een string
        dataKenniskaart = {
            "titel": document.getElementById('formTitel').value,
            //todo for loopjes voor vaardigheid rol en hboi
            "vaardigheid": document.getElementById('formCompetentie').value,
            "rol": document.getElementById('formRol').value,
            "hboi": emptyString.concat(document.getElementById('formArchitectuurlagen').value, document.getElementById('formActiviteiten').value, document.getElementById('formNiveau').value),
            "what": document.getElementById('formWhat').innerText,
            "why": document.getElementById('formWhy').innerText,
            "how": document.getElementById('formHow').innerText,
            "voorbeeld": document.getElementById('formVoorbeeld').innerText,
        };
    fetch(`${ip}/api/toevoegen`, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(dataKenniskaart)
    })
        .then((response) => {
            return response.json();
        });
    alert('uw kenniskaartje is toegevoegd');
    window.location.replace(`${ip}/index.html`);
}


function extra_select(select) {
    //maakt nog een competentie drop down list en een verwijder knop die gekopeld is aan de select door middel van een container
    let clone = select.cloneNode(true),
        container = document.createElement("div");
    console.log(select.parentElement);

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