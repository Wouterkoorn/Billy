function kenniskaartWijzigen() {
    //haalt kenniskaart data op en stopt dit in een toevoegen form zodat de kenniskaart gewijzigd kan worden.
    const id = readParam("kenniskaart");
    let searchParams = new URLSearchParams(''),
        url = `${ip}/toevoegen.html`;
    searchParams.set("kenniskaart", id);
    searchParams.set("wijzigen", true);
    console.log(`${url}?${searchParams}`);
    window.location.replace(`${url}?${searchParams}`);
}


