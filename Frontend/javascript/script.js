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
		"hboi": emptyString.concat(document.getElementById('formHBO-i').value, document.getElementById('formActiviteiten').value, document.getElementById('formNiveau').value),
		"what": document.getElementById('formWhat').value,
		"why": document.getElementById('formWhy').value,
		"how": document.getElementById('formHow').value,
		"voorbeeld": document.getElementById('formVoorbeeld').value,

	};
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


/*
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
		"titel": document.getElementById('formTitel').value,
		"hboi": hboi,
		"rol": rol,
		"what": what,
		"why": why,
		"how": how,
		"voorbeeld": voorbeeld,
		"vaardigheid": vaardigheid
	};

	alert(JSON.stringify(data));

	// Uncomment welk ip je wil benutten

	// let ip = 'http://192.168.3.72:5000/toevoegen'
	// var ip = '192.168.3.73:5000/toevoegen'
	let ip = 'http://82.72.167.14:56743/toevoegen';
	// let ip = '192.168.3.73:5000/toevoegen'


	fetch(ip, {
		method: 'POST',
		headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
		body: JSON.stringify(data)
	})
	.then((response) => {
		return response.json();})
	.then((result)=>{
		alert(result['succes']);
	});
}
*/



/*
function infoOphalen() {
	let serach1 = document.getElementsByTagName("#mySearch").value;
	let data = {
		"bron": search1
	};

	alert(JSON.stringify(data));


	fetch('http://82.72.167.14:5000/toevoegen', {
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
*/

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


// Get the modal
var modal = document.getElementById("myModal");
// Get the button that opens the modal
var btn = document.getElementById("myBtn");
var ken = document.getElementById("kennis");
// Get the <span> element that closes the modal
var span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the modal
btn.onclick = function() {
  modal.style.display = "block";
}
// When the user clicks on the kenniskaart, open the modal
ken.addEventListener('click', function(event) {
  modal.style.display = "block";
});
// When the user clicks on <span> (x), close the modal
span.onclick = function() {
  modal.style.display = "none";
}
// When the user clicks anywhere outside of the modal, close it
window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
}
