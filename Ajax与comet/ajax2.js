function ptos(){
	var xhr = createXHR();
	xhr.onload = function(event){
		if((xhr.status>=200&&xhr.status<300)||xhr.status===304)
				{
					console.log(xhr.responseText);
					console.log(xhr.getAllResponseHeaders());
				}else{
					console.log("Request was fail"+xhr.status);
			}
	};
	//进度条
	xhr.onprogress = function(event){
		console.log(event);
		var divStatus = document.getElementById("status");
		if(event.lengthComputable){
			divStatus.innerHTML = "Received " + event.loaded + " of "+ event.total+" bytes";
		}
	}
	xhr.open("get","http://localhost:8080/testGet.php?name=2",true);
	xhr.setRequestHeader('X-P','H5');
	xhr.withCredentials = true;
	xhr.send();
}