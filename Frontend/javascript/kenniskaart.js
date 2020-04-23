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
  kennis.style.display = "block" });
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
// Add the data to the kenniskaart
function add_data() {
  if(document.getElementById('myKennis'));
};
