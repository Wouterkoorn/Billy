function kennisbron_toevoegen() {

	let awhat = document.getElementById('myWhat').value;
	let awhy = document.getElementById('myWhy').value;
	let ahow = document.getElementById('myHow').value;

			
	let data = {"what": awhat, "why": awhy, "how": ahow};

	alert(JSON.stringify(data));			

	fetch('http://192.168.3.72:5000/toevoegen', {
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