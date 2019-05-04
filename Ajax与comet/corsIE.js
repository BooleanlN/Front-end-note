function pso(){
	var xdr = new XDomainRequest();
	xdr.onload = function(){
		console.log(xdr.responseText);
	};
	xdr.open("get","http://localhost:8080/testGet.php?name=4");
	xdr.send();
}