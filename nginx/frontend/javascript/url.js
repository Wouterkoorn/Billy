function urlParser() {

}


function urlParserIndex() {
    //todo search
    //todo filters
    //todo kenniskaart
    //possible maken om methods te gebruiken op standaard constant
    const urlParams = new URLSearchParams(window.location.search);

    let zoekquery = urlParams.get('search'),
        filters = urlParams.get('filters'),
        kenniskaart_id = urlParams.get('kenniskaart');



    if (zoekquery) {
        document.getElementById("searchBar").value = zoekquery;
        document.getElementById("searchButton").click();
    }
    if (filters) {
        //todo filters selecten op site en daarna "toepassen" op zoekresultaten als die gedaan zijn
        console.log(filters);
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
