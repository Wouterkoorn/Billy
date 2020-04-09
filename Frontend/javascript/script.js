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

function searchFunction() {
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


function (window, document, undefined) {
	var toeForm = document.getElementById('toevoegenForm');

  toeForm.style.display = 'block';

  function processForm( event ) {

    //get all form data
    var vaardigheid = document.getElementsByName('Vaardigheid')[0].value,
        rol = document.getElementsByName('Rol')[0].value,
        activiteiten = document.getElementsByName('Architectuurlagen')[0].value,
        niveau = document.getElementsByName('niveau')[0].value,
        what = document.getElementsByName('formWhat')[0].value,
        why = document.getElementsByName('formWhy')[0].value,
        how = document.getElementsByName('formHow')[0].value,
        voorbeeld = document.getElementsByName('formVoorbeeld')[0].value;
  }
}
