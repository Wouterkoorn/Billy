function kennisbron_toevoegen() {

	let awhat = document.getElementById('myWhat').value;
	let awhy = document.getElementById('myWhy').value;
	let ahow = document.getElementById('myHow').value;

			
	let data = {"what": awhat, "why": awhy, "how": ahow};

	alert(JSON.stringify(data));			

	fetch('http://82.72.167.14:5000/toevoegen', {
		method: 'POST',
		headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
		body: JSON.stringify(data)
	    })
	    .then((response) => {
		return response.json();
	    }).then((result)=>{
		alert(result['succes']);
	    });
}


		// if(document.getElementById('leden').rows.length > 1){
		// 	for (var i = 1; i <= document.getElementById('leden').rows.length; i++){
		// 		document.getElementById('leden').deleteRow(1);
		// 	}
		// }
		// fetch('restservices/persoon/leden')
		// .then(response => response.json())
		// .then(function vull(myJson){
		// 	for (let lid of myJson){
		// 		var lidnummer = document.createElement("td");
		// 		var lidnaam = document.createElement("td");
		// 		var info = document.createElement("button");
		// 	    info.setAttribute("type", "button");
		// 		var verwijderen = document.createElement("button");
		// 		verwijderen.setAttribute("type","button");
		// 		verwijderen.setAttribute("class", "verwijder");
		// 		var row = document.createElement("tr")
				
		// 		lidnummer.appendChild(document.createTextNode(lid.id));
		// 		lidnaam.appendChild(document.createTextNode(lid.voorletter + " " + lid.tussenvoegsel + " " + lid.achternaam));
		// 		info.appendChild(document.createTextNode("info opvragen"));
		// 		verwijderen.appendChild(document.createTextNode("verwijderen"));
				
				
		// 		info.addEventListener('click', function(){
		// 			document.getElementById("voorletter").innerHTML = lid.voorletter;
		// 			document.getElementById("tussenvoegsel").innerHTML = lid.tussenvoegsel;
		// 			document.getElementById("achternaam").innerHTML = lid.achternaam;
		// 			document.getElementById("geslacht").innerHTML = lid.geslacht;
		// 			document.getElementById("gebruikersnaam").innerHTML = lid.gebruikersnaam;
		// 			document.getElementById("geboorte").innerHTML = lid.geboorte;
		// 			document.getElementById("postcode").innerHTML = lid.postcode;
		// 			document.getElementById("huisnummer").innerHTML = lid.huisnummer;
		// 			document.getElementById("straat").innerHTML = lid.straatnaam;
		// 			document.getElementById("plaats").innerHTML = lid.plaats;
		// 			document.getElementById("telefoon").innerHTML = lid.telefoonnummer;
		// 			document.getElementById("email").innerHTML = lid.email;
		// 		});
				
		// 		verwijderen.addEventListener('click', function() {
		// 			var gebruiker = lid.gebruikersnaam;
		// 			fetch('restservices/persoon/verwijderen/'+gebruiker, {method: 'DELETE'})
		// 			.then(function (request) {
		// 				if (request.ok) {
		// 					console.log("lid is verwijderd");
		// 					alert("Lid is verwijderd!")
		// 				} else { 
		// 					console.log("Er is iets verkeerd");
		// 					alert("Er is een fout opgetreden!!");
		// 				}
		// 			})
		// 		});
				
		// 		row.appendChild(lidnummer);
		// 		row.appendChild(lidnaam);
		// 		row.appendChild(info);
		// 		row.appendChild(verwijderen);
				
		// 		document.querySelector('#leden').appendChild(row);
		// 	}
		// });

