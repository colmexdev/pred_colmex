function moverFondo(event,element){
	var containerWidth = element.innerWidth()*2.5,  
		  containerHeight = element.innerHeight()*3,
		  mousePositionX = (event.pageX / containerWidth) * 100,
		  mousePositionY = (event.pageY /containerHeight) * 100;

	element.css('background-position', (mousePositionX > 100 ? 100 : mousePositionX) + '%' + ' ' + (mousePositionY > 100 ? 100 : mousePositionY) + '%');
}

function cambiarHamburguesa(toggle){

	$("#rect_sup").css({ "margin": (toggle == 0 ? "35px auto 0" : ""), "height": (toggle == 0 ? "2.5px" : ""), "margin-top": (toggle == 0 ? "35px" : "25px")});
	$("#rect_mid").css({ "margin": (toggle == 0 ? "0 auto" : ""), "height": (toggle == 0 ? "0" : "")});
	$("#rect_inf").css({ "margin": (toggle == 0 ? "0 auto" : ""), "height": (toggle == 0 ? "2.5px" : "")});
}

function desplegarMenu(){
	var ind = $("#cont_menu").css('z-index');
	$("#cont_menu").css("-webkit-animation-play-state", "paused");
	if(ind == -1){ 
		$("#cont_menu").css({"-webkit-animation": "fade-in 0.8s ease 0s 1 normal both", "-moz-animation": "fade-in 0.8s ease 0s 1 normal both", "-o-animation": "fade-in 0.8s ease 0s 1 normal both", "animation": "fade-in 0.8s ease 0s 1 normal both", "z-index": "5"}); 
		$("#op1").css({"-webkit-animation": "opt-ap 0.6s ease 0.7s 1 normal both", "-moz-animation": "opt-ap 0.6s ease 0.7s 1 normal both", "-o-animation": "opt-ap 0.6s ease 0.7s 1 normal both", "animation": "opt-ap 0.6s ease 0.7s 1 normal both"});
		$("#op2").css({"-webkit-animation": "opt-ap 0.6s ease 0.8s 1 normal both", "-moz-animation": "opt-ap 0.6s ease 0.8s 1 normal both", "-o-animation": "opt-ap 0.6s ease 0.8s 1 normal both", "animation": "opt-ap 0.6s ease 0.8s 1 normal both"});
		$("#op3").css({"-webkit-animation": "opt-ap 0.6s ease 0.9s 1 normal both", "-moz-animation": "opt-ap 0.6s ease 0.9s 1 normal both", "-o-animation": "opt-ap 0.6s ease 0.9s 1 normal both", "animation": "opt-ap 0.6s ease 0.9s 1 normal both"});
		$("#op4").css({"-webkit-animation": "opt-ap 0.6s ease 1.0s 1 normal both", "-moz-animation": "opt-ap 0.6s ease 1.0s 1 normal both", "-o-animation": "opt-ap 0.6s ease 1.0s 1 normal both", "animation": "opt-ap 0.6s ease 1.0s 1 normal both"});
	}
	else{
		setTimeout(function(){ $("#cont_menu").css({"z-index": "-1"}); }, 750);
		$("#cont_menu").css({"-webkit-animation": "fade-out 0.8s ease 0.5s 1 normal both", "-moz-animation": "fade-out 0.8s ease 0.5s 1 normal both", "-o-animation": "fade-out 0.8s ease 0.5s 1 normal both", "animation": "fade-out 0.8s ease 0.5s 1 normal both"});
		$("#op1").css({"-webkit-animation": "opt-dis 0.6s ease 0.6s 1 normal both", "-moz-animation": "opt-dis 0.6s ease 0.6s 1 normal both", "-o-animation": "opt-dis 0.6s ease 0.6s 1 normal both", "animation": "opt-dis 0.6s ease 0.6s 1 normal both"});
		$("#op2").css({"-webkit-animation": "opt-dis 0.6s ease 0.5s 1 normal both", "-moz-animation": "opt-dis 0.6s ease 0.5s 1 normal both", "-o-animation": "opt-dis 0.6s ease 0.5s 1 normal both", "animation": "opt-dis 0.6s ease 0.5s 1 normal both"});
		$("#op3").css({"-webkit-animation": "opt-dis 0.6s ease 0.4s 1 normal both", "-moz-animation": "opt-dis 0.6s ease 0.4s 1 normal both", "-o-animation": "opt-dis 0.6s ease 0.4s 1 normal both", "animation": "opt-dis 0.6s ease 0.4s 1 normal both"});
		$("#op4").css({"-webkit-animation": "opt-dis 0.6s ease 0.3s 1 normal both", "-moz-animation": "opt-dis 0.6s ease 0.3s 1 normal both", "-o-animation": "opt-dis 0.6s ease 0.3s 1 normal both", "animation": "opt-dis 0.6s ease 0.3s 1 normal both"});
	}	
}

function toggleBorde(event,borde,toggle){
	$(borde).css("width", (toggle == 0 ? "100%" : ""));
}

function scrollPagina(){
	$("html, body").animate({ scrollTop: window.innerHeight }, 800);
  return false;
}

$(document).on("scroll",function(event){
  var y = $(this).scrollTop();
	$("#contenedor").css({"width": (y < 1 ? "90%" : ( y >= window.innerHeight ? "75%" : ((75 + (15*(1 - (y/window.innerHeight)))) + "%") )), "height" : (y < 1 ? "85%" : ( y >= window.innerHeight ? "65%" : ((65 + (20*(1 - (y/window.innerHeight)))) + "%") ))});
});

function traerPagina(render, toggle){
	if($("#"+render).attr("class") == "izq"){
		$("#"+render).animate({left: (toggle ? "0" : "100%")}, 250);
	}
	else if($("#"+render).attr("class") == "der"){
		$("#"+render).animate({right: (toggle ? "0" : "100%")}, 250);
	}
	else{
		$("#"+render).animate({top: (toggle ? "0" : "100%")}, 250);
	}
}

function slide_pagina(event,render,liga,home){
	event.preventDefault();
	var izqs = $(".izq");
	var ders = $(".der");
	for(var i = 0; i < izqs.length; i++){
		traerPagina(izqs[i]["id"], render == izqs[i]["id"]);
	}
	for(var i = 0; i < ders.length; i++){
		traerPagina(ders[i]["id"], render == ders[i]["id"]);
	}

	despacharPeticiones(event,liga);


	$("#mosaico").animate({top: (home ? "100%" : "0%")}, 250, function(){
		if(!(/http:\/\/pred1\.colmex\.mx\/?$/.test(window.location.href)))
			$("#mosaico").css("display","none");
		else
			$("#mosaico").css("display","block");
	});

	window.history.pushState({},"Nueva página",liga);

	setTimeout(function(){

		$("#brand,#menu_canvas,#menu_mask").animate({top: (!(/http:\/\/pred1\.colmex\.mx\/?$/.test(window.location.href)) ? "1%" : "17%")}, 150);
	}, 230);
}

$(document).on("ready page:change",function(event){
	despacharPeticiones(event,window.location.href);

	$("#brand,#menu_canvas,#menu_mask").animate({top: (!(/http:\/\/pred1\.colmex\.mx\/?$/.test(window.location.href)) ? "1%" : "17%")}, 100);

	$("#mosaico").animate({top: (!(/http:\/\/pred1\.colmex\.mx\/?$/.test(window.location.href)) ? "0" : "100%")}, 250, function(){
	if(!(/http:\/\/pred1\.colmex\.mx\/?$/.test(window.location.href)))
		$("#mosaico").css("display","none");
	else
		$("#mosaico").css("display","block");
	});

	$("#cursos-breves").animate({left: (/http:\/\/pred1\.colmex\.mx\/produccion_digital\/cursos_breves/.test(window.location.href) ? "0" : "100%")},250);
	$("#curso-breve-1").animate({left: (/http:\/\/pred1\.colmex\.mx\/produccion_digital\/curso_breve\/reproduciendo/.test(window.location.href) ? "0" : "100%")},250);
	$("#produccion-digital").animate({right: (/http:\/\/pred1\.colmex\.mx\/produccion_digital\/principal/.test(window.location.href) ? "0" : "100%")},250);

});

function reproducirCurso(event,titulo){
	despacharPeticiones(event,'http://pred1.colmex.mx/produccion_digital/curso_breve/reproducir?titulo='+titulo);
	window.history.pushState({},"Nueva página",'http://pred1.colmex.mx/produccion_digital/curso_breve/reproducir?titulo='+titulo);
}

function reproducirVideo(event,video){
	var id = video.split("/")[3]
	$("#player-curso-landscape").html('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/' + id + '" frameborder="0" allowfullscreen></iframe>');
}

/* Funciones que se llaman en sustitución del scroll */

function scrollSelectorTouch(event,element){
	if(((event.changedTouches[0].clientY - 110)/element.clientHeight) * (element.scrollHeight * 0.5) >= window.innerHeight * 0.15 )
		element.scrollTop = ((event.changedTouches[0].clientY - 110)/element.clientHeight) * (element.scrollHeight * 0.65);
	else
		element.scrollTop = 0;
}

function scrollSelector(event, element){
	if(((event.clientY - 110)/element.clientHeight) * (element.scrollHeight * 0.5) >= window.innerHeight * 0.15 )
		element.scrollTop = ((event.clientY - 110)/element.clientHeight) * (element.scrollHeight * 0.65);
	else
		element.scrollTop = 0;
}

function scrollSelectorTouchX(event,element){
	if(((event.changedTouches[0].clientX)/element.clientWidth) * (element.scrollWidth * 0.5) >= window.innerWidth * 0.1 )
		element.scrollLeft = ((event.changedTouches[0].clientX )/element.clientWidth) * (element.scrollWidth * 0.15);
	else
		element.scrollLeft = 0;
}

function scrollSelectorX(event, element){
	if(((event.clientX)/element.clientWidth) * (element.scrollWidth * 0.5) >= window.innerWidth * 0.1 )
		element.scrollLeft = ((event.clientX)/element.clientWidth) * (element.scrollWidth * 0.15);
	else
		element.scrollLeft = 0;
}

function cambiarGif(event,gif){
	$("#player-curso").css("background", "url("+String(gif)+") no-repeat center center/ 100% 100%");
}

window.onpopstate = function(event){
    if(event.state !== null) {
        location.reload();
    } else if(event.state === null){ // no state data available

    }
};
