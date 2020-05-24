//alle collapsible filters
const collapsibles = document.getElementsByClassName("collapsibleFilter");
let alleRollenChecked = false,
    alleCompetentiesChecked = false;

let i;
//eventlistener toevoegen aan alle collapsibles die de filter laat in of uitklappen.
for (i = 0; i < collapsibles.length; i++) {
    collapsibles[i].addEventListener("click", function(element) {
        let filter = element.target;
        let content = filter.nextElementSibling;
        if (content.style.display === "none") {
            content.style.display = "block";
        }
        else if (content.style.display === "block") {
            content.style.display = "none";
        }
        else {
            content.style.display = "block";
        }
    })
}


//event listeners toevoegen voor alle rol filters
const rollenFilters = document.getElementsByClassName("rol");
for (i = 0; i < rollenFilters.length; i++) {
    rollenFilters[i].addEventListener("click", function(){
        areAllBoxesChecked("rol", "allerollen");
    })
}


//event listeners toevoegen voor alle competentie filters
const competentieFilters = document.getElementsByClassName("competentie");
for (i = 0; i < competentieFilters.length; i++) {
    competentieFilters[i].addEventListener("click", function () {
        areAllBoxesChecked("competentie", "allecompetenties");
    })
}


function areAllBoxesChecked(classNameCheckboxes, alleCheckboxID) {
    //checkt of alle checkboxes gecheckd zijn zodat de "alle ..." ook gecheckt wordt
    let checkboxes = document.getElementsByClassName(classNameCheckboxes),
        i;
    for (i = 0; i < checkboxes.length; i++) {
        if (checkboxes[i].checked === false) {
            //als een checkbox niet gemarkt is stop hier
            document.getElementById(alleCheckboxID).checked = false;
            return false;
        }
    }
    //als alle checkboxes gemarkt zijn check ook "alle ..."
    document.getElementById(alleCheckboxID).checked = true;
}


function alleFilters(classNameCheckboxes, alleCheckboxID) {
    //toggle checkmarks bij alle checkboxen onder Rol filter nadat alle rollen checkbox is gecheckd of unchecked.
    const checkboxen = document.getElementsByClassName(classNameCheckboxes);
    if (document.getElementById(alleCheckboxID).checked === true) {
        for (i = 0; i < checkboxen.length; i++) {
            checkboxen[i].checked = true;
        }
    }
    else {
        for (i = 0; i < checkboxen.length; i++) {
            checkboxen[i].checked = false;
        }
    }
}


function filterFilters(filterlijst, category) {
    //returnd een string met alleen de aangeklikte filters bij een category in de juiste format
    let filters = "";
    for (i = 0; i < filterlijst.length; i++) {
        if (filterlijst[i].checked === true) {
            // console.log(filterlijst[i], true);
            // console.log(`${filterlijst[i].value}`.concat(`.${category};`));
            filters = filters + `${filterlijst[i].value}`.concat(`.${category};`);
        }
    }
    return filters;
}


function filtersToepassen() {
    //haalt alle geselecteerde filters op en past deze toe inclusief zoekterm als die is gebruikt.
    const rolfilters = document.getElementsByClassName("rol"),
        competentiefilters = document.getElementsByClassName("competentie"),
        hboifilters = document.getElementsByClassName("hboi");
    let selectedFilters = "";
    //todo verbeteren van de namen zodat het de documentatie volgt.

    //checken of alle ... is aangeklikt
    if (document.getElementById("allerollen").checked && document.getElementById("allecompetenties").checked) {
        selectedFilters = selectedFilters + "Alle rollen.rol;Alle Competenties.competentie;";
        selectedFilters = selectedFilters + filterFilters(hboifilters, "hboi");
    }
    else if (document.getElementById("allerollen").checked) {
        selectedFilters = selectedFilters + "Alle rollen.rol;";
        selectedFilters = selectedFilters + filterFilters(competentiefilters, "competentie");
    }
    else if (document.getElementById("allecompetenties").checked) {
        selectedFilters = selectedFilters + filterFilters(rolfilters, "rol");
        selectedFilters = selectedFilters + "Alle competenties.competentie;";
    }
    else {
        selectedFilters = selectedFilters + filterFilters(rolfilters, "rol");
        selectedFilters = selectedFilters + filterFilters(competentiefilters, "competentie");
        selectedFilters = selectedFilters + filterFilters(hboifilters, "hboi");
    }


    console.log(selectedFilters);
    console.log(zoekterm);
    //checken of er al is gezocht. Zo ja pas filters toe op resultaten van zoekterm
    if (zoekterm != null) {
        //wat is exacte api call
        fetch(`${ip}/api/filter/${selectedFilters}`)
            .then(function (response) {
                response.json().then(function (data) {
                    cleanupKenniskaarten();
                    data.forEach(function (item, index) {
                        maakKenniskaarten(item, index);
                    })
                })
            .then(function () {
                addEventListeners();
            })
            .catch(function (error) {
                console.log(error);
            })
        })
    }
    else {
        //wat is exacte api call?
        fetch(`${ip}/api/zoekfilter/${selectedFilters}`)
            .then(function (response) {
                response.json().then(function (data) {
                    cleanupKenniskaarten();
                    data.forEach(function (item, index) {
                        maakKenniskaarten(item, index);
                    })
                })
            .then(function () {
                addEventListeners();
            })
            .catch(function (error) {
                console.log(error);
            })
        })
    }
}
