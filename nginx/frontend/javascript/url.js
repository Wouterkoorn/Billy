function filtersAfChecken(classname, alleclassname, buttonid, jsonselector, zoekfilters) {
    let elements = document.getElementsByClassName(classname);
    for (i = 0; i < elements.length; i++) {
        if (jsonselector.length == 2) {
            if (zoekfilters[jsonselector[0]][jsonselector[1]].includes(elements[i].value)) {
                elements[i].checked = true;
            }
        } else {
            if (zoekfilters[jsonselector[0]].includes(elements[i].value)) {
                elements[i].checked = true;
            }
        }
    }
    try {
        areAllBoxesChecked(classname, alleclassname);
    } catch (error) {
        // console.error(error)
    }
    try {
        document.getElementById(buttonid).click();
    } catch (error) {
        // console.error(error)
    }
}


function setParamsWijzigen() {
    //zet paramaters voor toevoegenpagina om de juiste kenniskaart te wijzigen en stuurt daarna door naar wijzig pagina
    const id = readParam("kenniskaart");
    let searchParams = new URLSearchParams(''),
        url = `${ip}/html/toevoegen.html`;
    searchParams.set("kenniskaart", id);
    searchParams.set("wijzigen", true);
    // console.log(`${url}?${searchParams}`);
    window.location.replace(`${url}?${searchParams}`);
}


function urlParserWijzigen() {
    const urlParams = new URLSearchParams(window.location.search),
        kenniskaart_id = urlParams.get("kenniskaart");
    if (urlParams.get("wijzigen") === "true") {
        console.log("fetching kenniskaart for wijzigen")
        fetch(`${ip}/api/ophalen/kenniskaart/${kenniskaart_id}`)
            .then(response => {
                if (response["status"] === 200) {
                    response.json().then(data => {
                        console.log(data)
                        let knop = document.getElementById("toevoegenButton");
                        knop.innerText = "Kenniskaart wijzigen";
                        knop.setAttribute("onclick", `kenniskaartDatabase('/wijzigen/kenniskaart/${kenniskaart_id}', 'PATCH')`);

                        document.getElementById("formTitel").value = data["titel"];
                        document.getElementById("formAuteur").value = data["auteur"];
                        document.getElementById("formWhat").value = data["what"];
                        document.getElementById("formWhy").value = data["why"];
                        document.getElementById("formHow").value = data["how"];
                        document.getElementById("formVoorbeeld").value = data["voorbeeld"];
                        document.getElementById("formBronnen").value = data["bronnen"];

                        for (i = 1; i < data["rollen"].length; i++) {
                            extra_select(document.getElementById("toevoegenRol"));
                        }
                        let rollenSelects = document.getElementsByClassName("toevoegenRol");
                        for (i = 0; i < data["rollen"].length; i++) {
                            if (data["rollen"][i] === "Product owner") {
                                rollenSelects[i].selectedIndex = 0;
                            } else if (data["rollen"][i] === "Business analyst") {
                                rollenSelects[i].selectedIndex = 1;
                            } else if (data["rollen"][i] === "Front-end developer") {
                                rollenSelects[i].selectedIndex = 2;
                            } else if (data["rollen"][i] === "UX designer") {
                                rollenSelects[i].selectedIndex = 3;
                            } else if (data["rollen"][i] === "Cyber security & cloud") {
                                rollenSelects[i].selectedIndex = 4;
                            } else if (data["rollen"][i] === "Back-end developer") {
                                rollenSelects[i].selectedIndex = 5;
                            } else if (data["rollen"][i] === "AI specialist") {
                                rollenSelects[i].selectedIndex = 6;
                            } else if (data["rollen"][i] === "Alle rollen") {
                                rollenSelects[i].selectedIndex = 7;
                            }
                        }
                        for (i = 1; i < data["competenties"].length; i++) {
                            extra_select(document.getElementById("toevoegenCompetentie"));
                        }
                        let competentieSelects = document.getElementsByClassName("toevoegenCompetentie");
                        for (i = 0; i < data["competenties"].length; i++) {
                            console.log(data["competenties"][i]["competentie"]);
                            if (data["competenties"][i]["competentie"] === "juiste kennis ontwikkelen") {
                                competentieSelects[i].selectedIndex = 0;
                            } else if (data["competenties"][i]["competentie"] === "kwalitatief product maken") {
                                competentieSelects[i].selectedIndex = 1;
                            } else if (data["competenties"][i]["competentie"] === "creatief werken") {
                                competentieSelects[i].selectedIndex = 2;
                            } else if (data["competenties"][i]["competentie"] === "kritisch oordelen") {
                                competentieSelects[i].selectedIndex = 3;
                            } else if (data["competenties"][i]["competentie"] === "samenwerken") {
                                competentieSelects[i].selectedIndex = 4;
                            } else if (data["competenties"][i]["competentie"] === "boodschap overbrengen") {
                                competentieSelects[i].selectedIndex = 5;
                            } else if (data["competenties"][i]["competentie"] === "plannen") {
                                competentieSelects[i].selectedIndex = 6;
                            } else if (data["competenties"][i]["competentie"] === "aanpassingsvermogen") {
                                competentieSelects[i].selectedIndex = 7;
                            } else if (data["competenties"][i]["competentie"] === "pro-actief handelen") {
                                competentieSelects[i].selectedIndex = 8;
                            } else if (data["competenties"][i]["competentie"] === "reflecteren") {
                                competentieSelects[i].selectedIndex = 9;
                            }
                        }

                        for (i = 1; i < data["hboi"].length; i++) {
                            extra_select(document.getElementById("formhboi"));
                        }
                        let hboiArchSelects = document.getElementsByClassName("toevoegenArchitectuurlagen");
                        for (i = 0; i < data["hboi"].length; i++) {
                            if (data["hboi"][i]["architectuurlaag"] === "Gebruikersinteractie") {
                                hboiArchSelects[i].selectedIndex = 0;
                            } else if (data["hboi"][i]["architectuurlaag"] === "Organisatieprocessen") {
                                hboiArchSelects[i].selectedIndex = 1;
                            } else if (data["hboi"][i]["architectuurlaag"] === "Infrastructuur") {
                                hboiArchSelects[i].selectedIndex = 2;
                            } else if (data["hboi"][i]["architectuurlaag"] === "Software") {
                                hboiArchSelects[i].selectedIndex = 3;
                            } else if (data["hboi"][i]["architectuurlaag"] === "Hardware Interfacing") {
                                hboiArchSelects[i].selectedIndex = 4;
                            }
                        }

                        let hboiActSelects = document.getElementsByClassName("toevoegenActiviteiten");
                        for (i = 0; i < data["hboi"].length; i++) {
                            if (data["hboi"][i]["fase"] === "analyseren") {
                                hboiActSelects[i].selectedIndex = 0;
                            } else if (data["hboi"][i]["fase"] === "adviseren") {
                                hboiActSelects[i].selectedIndex = 1;
                            } else if (data["hboi"][i]["fase"] === "ontwerpen") {
                                hboiActSelects[i].selectedIndex = 2;
                            } else if (data["hboi"][i]["fase"] === "realiseren") {
                                hboiActSelects[i].selectedIndex = 3;
                            } else if (data["hboi"][i]["fase"] === "manage & control") {
                                hboiActSelects[i].selectedIndex = 4;
                            }
                        }

                        let hboiNivSelects = document.getElementsByClassName("toevoegenNiveau");
                        for (i = 0; data["hboi"].length; i++) {
                            console.log(`niveau iteration: ${i} of ${data["hboi"].length}`);
                            if (data["hboi"][i]["niveau"] === 1) {
                                hboiNivSelects[i].selectedIndex = 0;
                            } else if (data["hboi"][i]["niveau"] === 2) {
                                hboiNivSelects[i].selectedIndex = 1;
                            } else if (data["hboi"][i]["niveau"] === 3) {
                                hboiNivSelects[i].selectedIndex = 2;
                            } else if (data["hboi"][i]["niveau"] === 4) {
                                hboiNivSelects[i].selectedIndex = 3;
                            }
                        }
                    })
                }
            })
    }
}


function urlParserIndex() {
    //possible maken om methods te gebruiken op standaard constant
    const urlParams = new URLSearchParams(window.location.search);
    let toepassen = false;

    try {
        let zoekfilters = JSON.parse(urlParams.get('filters')),
            i,
            hboifilter = false,
            filters = document.getElementsByClassName("filter");

        if (zoekfilters["zoekterm"]) {
            document.getElementById("searchBar").value = zoekfilters["zoekterm"];
            toepassen = true;
        }

        if (zoekfilters["rollen"].length > 0) {
            filtersAfChecken("rol", "allerollen", "filterRolButton", ["rollen"], zoekfilters);
            toepassen = true;
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
            toepassen = true;
        }

        if (zoekfilters["hboi"]["architectuurlaag"].length > 0) {
            filtersAfChecken("hboiArch", "", "", ["hboi", "architectuurlaag"], zoekfilters);
            hboifilter = true;
            toepassen = true;
        }

        if (zoekfilters["hboi"]["fase"].length > 0) {
            filtersAfChecken("hboiFase", "", "", ["hboi", "fase"], zoekfilters);
            hboifilter = true;
            toepassen = true;
        }

        if (zoekfilters["hboi"]["niveau"].length > 0) {
            filtersAfChecken("hboiNiv", "", "", ["hboi", "niveau"], zoekfilters);
            let elements = document.getElementsByClassName("hboiNiv"),
                lijstNiveaus = [];
            for (i = 0; i < zoekfilters["hboi"]["niveau"].length; i++) {
                lijstNiveaus.push(`${zoekfilters["hboi"]["niveau"][i]}`);
            }
            for (i = 0; i < elements.length; i++) {
                if (lijstNiveaus.includes(elements[i].value)) {
                    elements[i].checked = true;
                }
            }
            areAllBoxesChecked("competentie", "allecompetenties");
            document.getElementById("filterCompetentieButton").click();
            toepassen = true;
        }

        if (zoekfilters["sorteer"]) {
            if (zoekfilters["sorteer"] === "aflopend") {
                document.getElementById("sorteer1").selectedIndex = 0;
            } else if (zoekfilters["sorteer"] === "oplopend") {
                document.getElementById("sorteer1").selectedIndex = 1;
            }
            document.getElementById("sorteer1").value = zoekfilters["sorteer"];
            document.getElementById("sorteerButton").click();
        }

        //if any of hboi filters were selected => open hboi filter menu
        if (hboifilter) {
            document.getElementById("filterhboiButton").click();
        }

        //kenniskaart popup openen als een kenniskaart id is meegegeven

    } catch (typeError) {
        console.log("There were no zoekfilters selected.")
    }

    try {
        kenniskaart_id = urlParams.get('kenniskaart');
        if (kenniskaart_id) {
            console.log(`Kenniskaart ${kenniskaart_id} wordt geopend`);
            popupTonen(kenniskaart_id);
        }
    } catch (e) {
        console.log(`Geen kenniskaart aangegeven in url.`)
    }

    if (!toepassen) {
        fetchRecent();
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
        } else {
            urlParams.append(key, value);
        }
        //naar url writen
        window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
    }
}


function readParam(key) {
    const urlParams = new URLSearchParams(window.location.search);
    return urlParams.get(key)
}


function deleteParam(key) {
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.delete(key);
    window.history.replaceState({}, '', `${location.pathname}?${urlParams}`);
}
