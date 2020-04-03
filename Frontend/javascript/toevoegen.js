function kenniskaart_toevoegen() {
	/*Voegt alle data die is ingevuld bij de template samen in een json variable en verstuurd deze naar de backend.
	Geeft na een succesvolle operatie een alert dat het gelukt is.
	*/
	let ip = 'http://82.72.167.14:56743/toevoegen';
	var emptyString = '';
	let dataKenniskaart = {
		"titel": document.getElementById('formTitel').value,
		"vaardigheid": document.getElementById('formVaardigheid').value,
		"rol": document.getElementById('formRol').value,
		"hboi": emptyString.concat(document.getElementById('formArchitectuurlagen').value, document.getElementById('formActiviteiten').value, document.getElementById('formNiveau').value),
		"what": document.getElementById('formWhat').value,
		"why": document.getElementById('formWhy').value,
		"how": document.getElementById('formHow').value,
		"voorbeeld": document.getElementById('formVoorbeeld').value,
	};
	console.log('hi')
	fetch(ip, {//met post method de json data die in dataKenniskaart is gezet
		method: 'POST',
		headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
		body: JSON.stringify(dataKenniskaart)
	})
	.then((response) => {
		return response.json();
	})
	.then((result) => {
		alert('uw kenniskaartje is toegevoegd');
	})
}
