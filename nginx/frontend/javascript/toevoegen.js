function kenniskaart_toevoegen() {
    /*Voegt alle data die is ingevuld bij de template samen in een json variable en verstuurd deze naar de backend.
    Geeft na een succesvolle operatie een alert dat het gelukt is.
    */
    let rollen = document.getElementsByClassName("toevoegenRol"),
        lijstRollen = [],
        competenties = leesSelected(document.getElementsByClassName("toevoegenCompetentie")),
        lijstCompetenties = [],
        hboi1 = leesSelected(document.getElementsByClassName("toevoegenArchitectuurlagen")),
        hboi2 = leesSelected(document.getElementsByClassName("toevoegenActiviteiten")),
        hboi3 = leesSelected(document.getElementsByClassName("toevoegenNiveau")),
        lijsthboi = [],
        i;

    for (i = 0; i < rollen.length; i++) {
        lijstRollen.push(rollen[i].value)
    }

    for (i = 0; i < competenties.length; i++) {
        let split = competenties[i].split(";");
        lijstCompetenties.push({
            "categorie": split[0],
            "competentie": split[1]
        });
    }

    for (i = 0; i < hboi1.length; i++) {
        lijsthboi.push({
            "architectuurlaag": hboi1[i],
            "fase": hboi2[i],
            "niveau": hboi3[i]
        })
    }

    let dataKenniskaart = {
        "titel": document.getElementById("formTitel").value,
        "auteur": document.getElementById("formAuteur").value,
        "what": document.getElementById("formWhat").value,
        "why": document.getElementById("formWhy").value,
        "how": document.getElementById("formHow").value,
        "rollen": lijstRollen,
        "competenties": lijstCompetenties,
        "hboi": lijsthboi,
        "voorbeeld": document.getElementById('formVoorbeeld').value,
        "bronnen": document.getElementById("formBronnen").value
    }

    console.log(dataKenniskaart);
    fetch(`${ip}/api/toevoegen`, {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(dataKenniskaart)
    })
        .then((response) => {
            if (response["status"] === 200) {
                alert('uw kenniskaartje is toegevoegd');
                window.location.replace(`${ip}/index.html`);
            }
            try {
                return response.json();
            }
            catch(error) {
                return response;
            }
        })
}


function extra_select(select) {
    //maakt nog een competentie drop down list en een verwijder knop die gekopeld is aan de select door middel van een container
    let clone = select.cloneNode(true),
        container = document.createElement("div");

    clone.removeAttribute("id");
    container.setAttribute("class", "toevoegenExtraSelect");
    container.appendChild(clone);

    let deleteButton = document.createElement("button");
    deleteButton.setAttribute("class", "plusButton");
    deleteButton.appendChild(document.createTextNode("-"));
    // deleteButton.setAttribute("onclick", "delete_select(element)");
    container.appendChild(deleteButton);

    select.parentElement.appendChild(container);

    deleteButton.addEventListener("click", function (element) {
        element.target.parentElement.remove();
	})
}


function leesSelected(lijst) {
    let i,
        values = [];
    for (i = 0; i < lijst.length; i++) {
        values.push(lijst[i].value);
    }
    return values;
}
