
function filtersAfChecken(classname, alleclassname, buttonid, jsonselector, zoekfilters) {
    let elements = document.getElementsByClassName(classname);
    for (i = 0; i < elements.length; i++) {
        if (jsonselector.length == 2) {
            if (zoekfilters[jsonselector[0]][jsonselector[1]].includes(elements[i].value)) {
                elements[i].checked = true;
            }
        }
        else {
            if (zoekfilters[jsonselector[0]].includes(elements[i].value)) {
                elements[i].checked = true;
            }
        }
    }
    try {
        areAllBoxesChecked(classname, alleclassname);
    }
    catch(error) {
        console.error(error)
    }
    try {
        document.getElementById(buttonid).click();
    }
    catch (error) {
        console.error(error)
    }
}

function urlParserIndex() {
    //possible maken om methods te gebruiken op standaard constant
    const urlParams = new URLSearchParams(window.location.search);

    let zoekfilters = JSON.parse(urlParams.get('filters')),
        kenniskaart_id = urlParams.get('kenniskaart'),
        i,
        hboifilter = false;

    console.log(zoekfilters)

    if (zoekfilters["zoekterm"]) {
        document.getElementById("searchBar").value = zoekfilters["zoekterm"];
    }

    if (zoekfilters["rollen"].length > 0) {
        filtersAfChecken("rol", "allerollen", "filterRolButton", ["rollen"], zoekfilters);
    }

    if (zoekfilters["competenties"].length > 0) {
        let elements = document.getElementsByClassName("competentie");
        for (i = 0; i < elements.length; i++) {
            if (zoekfilters["competenties"].includes(elements[i].value.split(";")[0])) {
                elements[i].checked = true;
            }
        }
        areAllBoxesChecked("competentie", "allecompetenties");
        document.getElementById("filterCompetentieButton").click();
    }

    if (zoekfilters["hboi"]["architectuurlaag"].length > 0) {
        filtersAfChecken("hboiArch", "", "", ["hboi", "architectuurlaag"], zoekfilters);
        hboifilter = true;
    }

    if (zoekfilters["hboi"]["fase"].length >0) {
        filtersAfChecken("hboiFase", "", "", ["hboi", "fase"], zoekfilters);
        hboifilter = true;
    }

    if (zoekfilters["hboi"]["fase"].length > 0) {
        filtersAfChecken("hboiNiv", "", "", ["hboi", "niveau"], zoekfilters);
        hboifilter = true;
    }

    if (hboifilter) {
        document.getElementById("filterhboiButton").click();
    }

    if (kenniskaart_id) {
        popupTonen(kenniskaart_id);
    }
}


function appendParam(key, value) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.append(key, value);
    window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
}


function addParam(key, value) {
    const urlParams = new URLSearchParams(window.location.search);
    if (value) {
        //checken of search paramater al bestaat
        if (urlParams.has(key)) {
            urlParams.set(key, value);
        }
        else {
            urlParams.append(key, value);
        }
        //naar url writen
        window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
    }
}


function deleteParam(key) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete(key);
    window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
}
