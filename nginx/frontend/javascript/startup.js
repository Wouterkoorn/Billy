
urlParserIndex();

// Add active class to the current nav elemnet (highlight it)
var header = document.getElementById('menu');
var pages = header.getElementsByClassName('toevoegL');

for (var i = 0; i < pages.length; i++) {
  pages[i].addEventListener('onclick', function() {
    alert(document.className.innerHTML)

    var huidig = document.getElementsByClassName('active');
    if (huidig.length > 0) {
      huidig[0].className = huidig[0].className.replace(' active', 'active');
    }
    huidig.className += ' active';
  });
}
