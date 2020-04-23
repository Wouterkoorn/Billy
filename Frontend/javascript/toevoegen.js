function kenniskaart_toevoegen() {
	/*Voegt alle data die is ingevuld bij de template samen in een json variable en verstuurd deze naar de backend.
	Geeft na een succesvolle operatie een alert dat het gelukt is.
	*/
	let ip = 'http://82.72.167.14:56743/toevoegen';
	var emptyString = ''; //emptystring om alle data van HBO-i bij elkaar te zetten in een string
	let dataKenniskaart = {
		"titel": document.getElementById('formTitel').value,
		"vaardigheid": document.getElementById('formVaardigheid').value,
		"rol": document.getElementById('formRol').value,
		"hboi": emptyString.concat(document.getElementById('formArchitectuurlagen').value, document.getElementById('formActiviteiten').value, document.getElementById('formNiveau').value),
		"what": document.getElementById('formWhat').innerText,
		"why": document.getElementById('formWhy').innerText,
		"how": document.getElementById('formHow').innerText,
		"voorbeeld": document.getElementById('formVoorbeeld').innerText,
	};
	fetch(ip, {
		method: 'POST',
		headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
		body: JSON.stringify(dataKenniskaart)
	})
	.then((response) => {
		return response.json();
	});
	alert('uw kenniskaartje is toegevoegd');
	window.location.replace("http://82.72.167.14/html/index.html")
}
