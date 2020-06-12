
function urlParserIndex() {
    //todo filters
    //possible maken om methods te gebruiken op standaard constant
    const urlParams = new URLSearchParams(window.location.search);

    let zoekfilters = JSON.parse(urlParams.get('filters')),
        kenniskaart_id = urlParams.get('kenniskaart'),
        i;

    if (zoekfilters["zoekterm"]) {
        document.getElementById("searchBar").value = zoekfilters["zoekterm"];
    }
    // if (zoekfilters[""])




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
