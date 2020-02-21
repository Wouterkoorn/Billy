function kennisbron_toevoegen() {

	var what = document.getElementById('myWhat').value;
	var why = document.getElementById('myWhy').value;
	var how = document.getElementById('myHow').value;
	var titel = document.getElementById('myTitel').value;
	var hboi = document.getElementById('myHboi').value;
	var rol = document.getElementById('myRol').value;
	var voorbeeld = document.getElementById('myVoorbeeld').value;
	var vaardigheid = document.getElementById('myVaardigheid').value;

			
	var data = {"what": what, "why": why, "how": how, "titel":titel ,"hboi":hboi ,"rol":rol ,"voorbeeld":voorbeeld ,"vaardigheid":vaardigheid };

	alert(JSON.stringify(data));			

	fetch('http://192.168.3.73:5000/toevoegen', {
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