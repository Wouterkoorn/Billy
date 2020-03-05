function kenniskaart_toevoegen() {

	let what = document.getElementById('myWhat').value;
	let why = document.getElementById('myWhy').value;
	let how = document.getElementById('myHow1').value;
	let titel = document.getElementById('myTitel').value;
	let hboi = document.getElementById('myHboi').value;
	let rol = document.getElementById('myRol').value;
	let voorbeeld = document.getElementById('myVoorbeeld').value;
	let vaardigheid = document.getElementById('myVaardigheid').value;

	let data = {
		"what": what,
		"why": why,
		"how": how,
		"titel": titel,
		"hboi": hboi,
		"rol": rol,
		"voorbeeld": voorbeeld,
		"vaardigheid": vaardigheid
	};

	alert(JSON.stringify(data));

	// Uncomment welk ip je wil benutten
	let ip = 'http://192.168.2.23:5000/toevoegen'
	// var ip = '192.168.3.73:5000/toevoegen'

	fetch(ip, {
		method: 'POST',
		body: JSON.stringify(data)
	    })
	    .then((response) => {
		return response.json();
	    }).then((result)=>{
		alert(result['succes']);
	    });
}
