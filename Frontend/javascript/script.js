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


// Get the kenniskaart
var kennis = document.getElementById("myKennis");
// Get the button that opens the kenniskaart
var btn = document.getElementById("myBtn");
// Get the div that opens the kenniskaart
var ken = document.getElementById("kennis");
// Get the <span> element that closes the kenniskaart
var span = document.getElementsByClassName("close")[0];
// When the user clicks the button, open the kenniskaart
btn.onclick = function() {
  kennis.style.display = "block";
}
// When the user clicks on the kenniskaart, open the kenniskaart
ken.addEventListener('click', function(event) {
  kennis.style.display = "block";
});
// When the user clicks on <span> (x), close the kenniskaart
span.onclick = function() {
  kennis.style.display = "none";
}
// When the user clicks anywhere outside of the kenniskaart, close it
window.onclick = function(event) {
  if (event.target == kennis) {
    kennis.style.display = "none";
  }
}
