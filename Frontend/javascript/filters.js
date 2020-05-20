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
    //returnd een lijst met alleen de aangeklikte filters bij een category in de juiste format
    let array = [];
    for (i = 0; i < filterlijst.length; i++) {
        if (filterlijst[i].checked === true) {
            // console.log(filterlijst[i], true);
            array.push(`${filterlijst[i].value}`.concat(`.${category}`));
        }
    }
    // console.log(array);
    return array;
}
function filtersToepassen() {
    const rolfilters = document.getElementsByClassName("rol"),
        competentiefilters = document.getElementsByClassName("competentie"),
        hboifilters = document.getElementsByClassName("hboi");
    // console.log(rolfilters, competentiefilters, hboifilters); //filters goed gevonden
    let selectedFilters = [];
    //todo verbeteren van de namen zodat het de documentatie volgt.
    selectedFilters = selectedFilters.concat(filterFilters(rolfilters, "rol"));
    selectedFilters = selectedFilters.concat(filterFilters(competentiefilters, "competentie"));
    selectedFilters = selectedFilters.concat(filterFilters(hboifilters, "hboi"));
    console.log(selectedFilters);
    //todo fetch
    //todo inside fetch -> make new kenniskaarten and display them
}
