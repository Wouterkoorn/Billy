function kenniskaart_toevoegen() {

	let what = document.getElementById('myWhat').value;
	let why = document.getElementById('myWhy').value;
	let how = document.getElementById('myHow').value;
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
	// let ip = 'http://192.168.3.72:5000/toevoegen'
	// var ip = '192.168.3.73:5000/toevoegen'

	fetch('http://192.168.3.72:5000/toevoegen', {
		method: 'POST',
		body: JSON.stringify(data)
	})
	.then((response) => {
		return response.json();})
	.then((result)=>{
		alert(result['succes']);
	});
}

function infoOphalen() {
	let serach1 = document.getElementsByTagName("#mySearch").value;
	let data = {
		"bron": search1
	};

	alert(JSON.stringify(data));


	fetch('http://192.168.3.72:5000/toevoegen', {
		method:'GET',
		body: JSON.stringify(data)
	})
	.then(response => response.json())
	.then(function (myJson) {
		for (search of myJson){
			var searchResult document.createElement("li");

		}
	})

}

function myFunction() {
  // Declare variables
  var input, filter, ul, li, a, i;
  input = document.getElementById("mySearch");
  filter = input.value;

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("a")[0];
    if (a.innerHTML.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}
