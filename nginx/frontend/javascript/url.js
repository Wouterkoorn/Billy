function urlParser() {
    //possible maken om methods te gebruiken op standaard constant
    const urlParams = new URLSearchParams(window.location.search);

    console.log(urlParams.get('search'), urlParams.get('filters'));
}

function addParam(key, value) {
    const urlParams = new URLSearchParams(window.location.search);
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

//todo deleteParam function