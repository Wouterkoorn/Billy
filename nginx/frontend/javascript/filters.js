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
        kenniskaartenZoeken();
    })
}


//event listeners toevoegen voor alle competentie filters
const competentieFilters = document.getElementsByClassName("competentie");
for (i = 0; i < competentieFilters.length; i++) {
    competentieFilters[i].addEventListener("click", function () {
        areAllBoxesChecked("competentie", "allecompetenties");
        kenniskaartenZoeken();
    })
}


//event listeners toevoegen voor alle hboi filters
const hboiFilters = document.getElementsByClassName("hboi")
for (i = 0; i < hboiFilters.length; i++) {
    hboiFilters[i].addEventListener("click", function () {
        kenniskaartenZoeken();
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


function selectedFilters(classname) {
    //returnd een lijst met alleen de aangeklikte filters bij een category in de juiste format
    const elements = document.getElementsByClassName(classname);
    let selected = [];
    for (i = 0; i < elements.length; i++) {
        if (elements[i].checked) {
            if (classname === "hboiNiv") {
                selected.push(Number(elements[i].value))
            }
            else {
                selected.push(elements[i].value)
            }
        }
    }
    return selected
}


function kenniskaartenZoeken() {
    //haalt alle geselecteerde filters op en past deze toe inclusief zoekterm als die is gebruikt.
    let zoekfilters = {
        "zoekterm": document.getElementById("searchBar").value,
        "rollen": selectedFilters("rol"),
        "competenties": selectedFilters("competentie"),
        "hboi": {
            "architectuurlaag": selectedFilters("hboiArch"),
            "fase": selectedFilters("hboiFase"),
            "niveau": selectedFilters("hboiNiv")
        }
    }
    addParam("filters", JSON.stringify(zoekfilters));
    fetch(`${ip}/api/ophalen/zoeken`, {
        method: "POST",
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        body: JSON.stringify(zoekfilters)
    })
        .then((response) => {
            response.json().then(function (data) {
                if (data.length === 0) {
                    geenZoekResultaten();
                }
                else {
                    deleteChildren(document.getElementsByClassName('kenniskaartencontainer')[0]);
                    data.forEach(function (item, index) {
                        maakKenniskaarten(item, index)
                    })
                    addEventListeners();
                }
            })
                .catch(function (error) {
                    console.error(error);
                })
        })
}
