function despacharPeticiones(event,liga){

	jQuery.ajax({
		url: liga,
		type: 'get',
		dataType: 'JSON',
		success: function(result)
		{
			if(/http:\/\/pred1.colmex.mx\/produccion_digital\/cursos_breves\/?/.test(liga))
				divCursosBreves(event,result);
			else if(/http:\/\/pred1.colmex.mx\/produccion_digital\/curso_breve\/reproducir\/?\?titulo=.*/.test(liga))
				divPlayerCursosBreves(event,result);

			window.history.pushState({},"Nueva página",liga);
		} 
  });
}

/* Función callback de AJAX cuando se entra a la sección de cursos breves (selector) */
function divCursosBreves(event,datos){
	try{
		var html = "";          
		for(var i = 0; i < datos["cursos"].length; i++){
			html = html + "<div style=\"width:100%;height:200px;background-color:#CCC;border:2px solid #000;\" onmouseenter=\"cambiarGif(event,'" + datos["cursos"][i]["img"] + "');\" onclick=\"reproducirCurso(event,'" + datos["cursos"][i]["curso"] + "')\">" + datos["cursos"][i]["curso"] + "</div>"
		}
		$("#selector-cursos").html(html);
	}
	catch(err){
		console.log(err);
	}
}

/* Función callback de AJAX cuando se entra al player de cursos breves */
function divPlayerCursosBreves(event,datos){
	if($("#curso-breve-1").css("top") != "0")
		$("#curso-breve-1").animate({left: "0"},250);
	try{
		var html = "";       
		for(var i = 0; i < datos.length; i++){
			html = html + "<div style=\"width:300px;height:100%;background-color:#CCC;border:2px solid #000;float:left;\" onclick=\"reproducirVideo(event,'" + datos[i]["liga"] + "')\">" + result[i]["titulo"] + "</div>"
		}
		$("#carousel-vids").css("width", (window.innerWidth > datos.length*300 ? window.innerWidth : datos.length*300));
		$("#carousel-vids").html(html);
		var video = datos[0]["liga"].split("/")[3]
		$("#player-curso-landscape").html('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/' + video + '" frameborder="0" allowfullscreen></iframe>');

	}
	catch(err){
		console.log(err);
	}

}
