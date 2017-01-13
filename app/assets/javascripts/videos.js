function validar(){
	if(document.getElementById("id_vid").value==""){
		event.preventDefault();
		alert("No se especificó una id de video de YouTube. Intente de nuevo.");
		return false;
	}
	if(!(/[1-9][0-9]*/.test(document.getElementById("num_part").value))){
		event.preventDefault();
		alert("Cantidad de participantes inválida. Intente de nuevo.");
		return false;
	}
}

function validarForma(){
	if(document.getElementById("video_tipo").value == ""){
		event.preventDefault();
		alert("No se ha especificado un tipo para este video. Verifique ese dato e intente de nuevo.");
		return false;
	}
	else if(document.getElementById("curso_p").checked && document.getElementById("video_curso").value == ""){
		event.preventDefault();
		alert("Se ha indicado un tema asociado a este video, pero no se ha especificado. Verifique este dato e intente de nuevo.");
		return false;
	}
	var i = 0;
	while(true){
		i = i + 1;
		var div_part = document.getElementById("p_"+i);
		if(div_part == null)
			break
		if(div_part.childNodes[3].value == ""){
			event.preventDefault();
			alert("Hacen falta nombres de participantes para registrar. Verifique ese dato e intente de nuevo.");
			return false;
		}
		if(div_part.childNodes[5].value == "COLMEX" && div_part.childNodes[7].value == ""){
			event.preventDefault();
			alert("Especificó un participante de EL Colegio, pero no especificó el Centro de Estudios al que pertenece. Verifique este dato e intente de nuevo.");
			return false;
		}
	}	
}

function swapTipo(element,target,texto,sel){
	document.getElementById(texto).value = "";
	if(element.value=="fijo"){
		document.getElementById(texto).disabled = true;
		document.getElementById(sel).disabled = false;
		document.getElementById(target).value = document.getElementById(sel).value;
	}
	else if(element.value=="otro"){
		document.getElementById(texto).disabled = false;
		document.getElementById(sel).disabled = true;
		document.getElementById(target).value = null;
	}
}

function registrarEntrada(element,target){
	if(!element.disabled){
		document.getElementById(target).value = element.value;
	}
}

function toggleCurso(element){
	document.getElementById("video_curso").value = null;
	document.getElementById("text_curso").value = "";
	if(element.checked){
		document.getElementById("fijo_c").disabled = false;
		document.getElementById("otro_c").disabled = false;
		document.getElementById("fijo_c").checked = true;
		document.getElementById("otro_c").checked = false;
		document.getElementById("sel_curso_sel_curso").disabled = false;
		document.getElementById("text_curso").disabled = true;
	}
	else{
		document.getElementById("fijo_c").disabled = true;
		document.getElementById("otro_c").disabled = true;
		document.getElementById("sel_curso_sel_curso").disabled = true;
		document.getElementById("text_curso").disabled = true;
	}
}

function toggleCentro(element,target){
	if(element.value == "Externo"){
		document.getElementById(target).childNodes[7].value = "";
		document.getElementById(target).childNodes[7].style.visibility = "hidden";
	}
	else{
		document.getElementById(target).childNodes[7].style.visibility ="visible";
	}
}
