function validar(){
	if(document.getElementById("id_vid").value==""){
		event.preventDefault();
		alert("No se especificó una id de video de YouTube. Intente de nuevo.");
		return false;
	}
}

function swapTipo(element){
	document.getElementById("text_tipo").value = "";
	if(element.value=="fijo"){
		document.getElementById("text_tipo").disabled = true;
		document.getElementById("sel_tipo_sel_tipo").disabled = false;
		document.getElementById("video_tipo").value = document.getElementById("sel_tipo_sel_tipo").value;
	}
	else if(element.value=="otro"){
		document.getElementById("text_tipo").disabled = false;
		document.getElementById("sel_tipo_sel_tipo").disabled = true;
		document.getElementById("video_tipo").value = "";
	}
}

function registrarSel(element){
	if(!element.disabled){
		document.getElementById("video_tipo").value = element.options[element.selectedIndex].value;
	}
}

function registrarEntrada(element){
	if(!element.disabled){
		document.getElementById("video_tipo").value = element.value;
	}
}
