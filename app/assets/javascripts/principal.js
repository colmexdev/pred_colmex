function moverFondo(event,element){
	var containerWidth = element.innerWidth()*2.5,  
		  containerHeight = element.innerHeight()*3,
		  mousePositionX = (event.pageX / containerWidth) * 100,
		  mousePositionY = (event.pageY /containerHeight) * 100;

	element.css('background-position', (mousePositionX > 100 ? 100 : mousePositionX) + '%' + ' ' + (mousePositionY > 100 ? 100 : mousePositionY) + '%');
}

function cambiarHamburguesa(toggle){
	if($("#rect_sup").css("transform") == "none"){
		$("#rect_sup").css({ "margin": (toggle == 0 ? "35px auto 0" : ""), "height": (toggle == 0 ? "3px" : ""), "margin-top": (toggle == 0 ? "35px" : "25px")});
		$("#rect_mid").css({ "margin": (toggle == 0 ? "0 auto" : ""), "height": (toggle == 0 ? "0" : "")});
		$("#rect_inf").css({ "margin": (toggle == 0 ? "0 auto" : ""), "height": (toggle == 0 ? "3px" : "")});
	}
}

function desplegarMenu(){
	var ind = $("#cont_menu").css('z-index');
	$("#cont_menu").css("-webkit-animation-play-state", "paused");
	if(ind == -1){
		cambiarHamburguesa(0); 
		$("#rect_sup").css({"-webkit-transform": "rotate(50deg)", "-moz-transform": "rotate(50deg)", "-ms-transform": "rotate(50deg)", "-o-transform": "rotate(50deg)", "transform": "rotate(50deg)"});
		$("#rect_mid").css({"height": "0"});
		$("#rect_inf").css({"-webkit-transform": "translate(0,-2px) rotate(130deg)", "-moz-transform": "translate(0,-2px) rotate(130deg)", "-ms-transform": "translate(0,-2px) rotate(130deg)", "-o-transform": "translate(0,-2px) rotate(130deg)", "transform": "translate(0,-2px) rotate(130deg)"});
		$("#cont_menu").css({"-webkit-animation": "fade-in 0.8s ease 0s 1 normal both", "-moz-animation": "fade-in 0.8s ease 0s 1 normal both", "-o-animation": "fade-in 0.8s ease 0s 1 normal both", "animation": "fade-in 0.8s ease 0s 1 normal both", "z-index": "5"}); 
		$("#op1").css({"-webkit-animation": "opt-ap 0.6s ease 0.7s 1 normal both", "-moz-animation": "opt-ap 0.6s ease 0.7s 1 normal both", "-o-animation": "opt-ap 0.6s ease 0.7s 1 normal both", "animation": "opt-ap 0.6s ease 0.7s 1 normal both"});
		$("#op2").css({"-webkit-animation": "opt-ap 0.6s ease 0.8s 1 normal both", "-moz-animation": "opt-ap 0.6s ease 0.8s 1 normal both", "-o-animation": "opt-ap 0.6s ease 0.8s 1 normal both", "animation": "opt-ap 0.6s ease 0.8s 1 normal both"});
		$("#op3").css({"-webkit-animation": "opt-ap 0.6s ease 0.9s 1 normal both", "-moz-animation": "opt-ap 0.6s ease 0.9s 1 normal both", "-o-animation": "opt-ap 0.6s ease 0.9s 1 normal both", "animation": "opt-ap 0.6s ease 0.9s 1 normal both"});
		$("#op4").css({"-webkit-animation": "opt-ap 0.6s ease 1.0s 1 normal both", "-moz-animation": "opt-ap 0.6s ease 1.0s 1 normal both", "-o-animation": "opt-ap 0.6s ease 1.0s 1 normal both", "animation": "opt-ap 0.6s ease 1.0s 1 normal both"});
	}
	else{
		setTimeout(function(){ $("#cont_menu").css({"z-index": "-1"}); }, 750);
		$("#rect_sup").css({"-webkit-transform": "", "-moz-transform": "", "-ms-transform": "", "-o-transform": "", "transform": "", "margin": "6px auto", "margin-top": "25px"});
		$("#rect_mid").css({"height": "", "margin": "6px auto"});
		$("#rect_inf").css({"-webkit-transform": "", "-moz-transform": "", "-ms-transform": "", "-o-transform": "", "transform": "", "margin": "6px auto"});
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
		$("#"+render).animate({left: (toggle ? "0" : "100%")}, (/http:\/\/pred1\.colmex\.mx\/produccion_digital\/curso_breve\/reproducir/.test(window.location.href) ? 20 : 250));
	}
	else if($("#"+render).attr("class") == "der"){
		$("#"+render).animate({right: (toggle ? "0" : "100%")}, (/http:\/\/pred1\.colmex\.mx\/produccion_digital\/curso_breve\/reproducir/.test(window.location.href) ? 20 : 250));
	}
	else{
		$("#"+render).animate({top: (toggle ? "0" : "100%")}, (/http:\/\/pred1\.colmex\.mx\/produccion_digital\/curso_breve\/reproducir/.test(window.location.href) ? 20 : 250));
	}
}

function slide_pagina(event,render,liga,home,menu){
	event.preventDefault();
	menu = menu || false;
  if(menu) desplegarMenu();
	var izqs = $(".izq");
	var ders = $(".der");
	for(var i = 0; i < izqs.length; i++){
		traerPagina(izqs[i]["id"], render == izqs[i]["id"]);
	}
	for(var i = 0; i < ders.length; i++){
		traerPagina(ders[i]["id"], render == ders[i]["id"]);
	}
	$("#player-curso-landscape").html('');

	despacharPeticiones(event,liga);

	$("#mosaico").animate({top: (home ? "100%" : "0%")}, 250, function(){
		if(!(/http:\/\/pred1\.colmex\.mx\/?$/.test(window.location.href)))
			$("#mosaico").css("display","none");
		else
			$("#mosaico").css("display","block");
	});

	window.history.pushState({},"Nueva página",liga);

	setTimeout(function(){
		$("#brand").animate({top: (!(/http:\/\/pred1\.colmex\.mx\/?$/.test(window.location.href)) ? "1%" : "17%")}, 90);
		$("#menu_canvas,#menu_mask").animate({top: (!(/http:\/\/pred1\.colmex\.mx\/?$/.test(window.location.href)) ? "1px" : "17%")}, 90);
		$("#brand").animate({width: (/http:\/\/pred1\.colmex\.mx\/?$/.test(window.location.href) ? "130px" : "65px"), height: (/http:\/\/pred1\.colmex\.mx\/?$/.test(window.location.href) ? "100px" : "50px")}, 50);
	}, 35);
}

$(document).on("ready page:change",function(event){
	try{
		configTrix();
		addEventListener("trix-initialize", function(event) {
			var histElement = event.target.toolbarElement.querySelector("[data-trix-button-group='history-tools']");
			var groupElement = event.target.toolbarElement.querySelector("[data-trix-button-group='text-tools']");
			var blockElement = event.target.toolbarElement.querySelector("[data-trix-button-group='block-tools']");
			histElement.style.display = "none";
			event.target.toolbarElement.querySelector("[data-trix-attribute='code']").style.display = "none";
			event.target.toolbarElement.querySelector("[data-trix-attribute='quote']").style.display = "none";
			extendTrix(groupElement,blockElement);
			clearPars(event.srcElement);
			if(window.location.href.indexOf("calendario-escolar") != -1){
				event.target.toolbarElement.querySelector("[data-trix-attribute='paragraph']").style.display = "none";
				event.target.toolbarElement.querySelector("[data-trix-attribute='number']").style.display = "none";
				event.target.toolbarElement.querySelector("[data-trix-attribute='bullet']").style.display = "none";
				event.target.toolbarElement.querySelector("[data-trix-action='decreaseNestingLevel']").style.display = "none";
				event.target.toolbarElement.querySelector("[data-trix-action='increaseNestingLevel']").style.display = "none";
			}
		});
	}
	catch(err){
		console.log(err);
	}
	despacharPeticiones(event,window.location.href);

	$("#curso-breve-1").animate({left: (/http:\/\/pred1\.colmex\.mx\/produccion_digital\/curso_breve\/reproducir/.test(window.location.href) ? "0" : "100%")}, 250);

		$("#brand").animate({top: (!(/http:\/\/pred1\.colmex\.mx\/?$/.test(window.location.href)) ? "1%" : "17%")}, 90);
		$("#menu_canvas,#menu_mask").animate({top: (!(/http:\/\/pred1\.colmex\.mx\/?$/.test(window.location.href)) ? "1px" : "17%")}, 90);
		$("#brand").animate({width: (/http:\/\/pred1\.colmex\.mx\/?$/.test(window.location.href) ? "130px" : "65px"), height: (/http:\/\/pred1\.colmex\.mx\/?$/.test(window.location.href) ? "100px" : "50px")}, 50);

	$("#mosaico").animate({top: (!(/http:\/\/pred1\.colmex\.mx(\/|((\/)?\?.*))?$/.test(window.location.href)) ? "0" : "100%")}, 250, function(){
	if(!(/http:\/\/pred1\.colmex\.mx\/?$/.test(window.location.href)))
		$("#mosaico").css("display","none");
	else
		$("#mosaico").css("display","block");
	});

	$("#cursos-breves").animate({left: (/http:\/\/pred1\.colmex\.mx\/produccion_digital\/cursos_breves/.test(window.location.href) ? "0" : "100%")}, 250);
	$("#produccion-digital").animate({right: (/http:\/\/pred1\.colmex\.mx\/produccion_digital\/principal/.test(window.location.href) ? "0" : "100%")}, 250);
	$("#player-curso-landscape").html('');

	$(window).trigger("resize");
});

$(window).on("resize",function(event){
	$(".wrapper-header-pd").css({"height": window.innerHeight, "width": "100%"});
	$(".img-desc-pd").css({"height": ($(".wrapper-main-pd").height() - $(".header-pd").height()) + "px"});
	$(".img-section-pd").css({"height": (window.innerWidth <= 992 ? (($(".wrapper-main-pd").width() * 0.40625) + "px") : "")});
	$(".text-section-pd").css({"height": (window.innerWidth <= 992 ? (($(".img-desc-pd").height() - $(".img-section-pd").height()) + "px") : "")});
	$(".header-pd").css({"font-size": (window.innerWidth <= 992 ? ((20 + 15*(window.innerWidth - 300)/692)+"px") : "")});
	reescalarImagen(event,$(".img-pd"),0.625,$(".img-section-pd").height());
});

function reescalarImagen(event,element,ratio,height_limit){
	var height = ratio*element.width();
	element.css({"height": (height > height_limit ? height_limit : height) +"px"});
}

function reproducirCurso(event,titulo){
	despacharPeticiones(event,'http://pred1.colmex.mx/produccion_digital/curso_breve/reproducir?titulo='+titulo);
	window.history.pushState({},"Nueva página",'http://pred1.colmex.mx/produccion_digital/curso_breve/reproducir?titulo='+titulo);
}

function reproducirVideo(event,video){
	$("#player-curso-landscape").html('<iframe width="100%" height="100%" src="https://www.youtube.com/embed/' + video + '" frameborder="0" allowfullscreen></iframe>');
}

/* Funciones que se llaman en sustitución del scroll */

function scrollSelectorY(event,element,offset,touch){
	if(touch)
		element.scrollTop = element.scrollTop + (((event.changedTouches[0].clientY - offset) - (element.clientHeight/2)) < (window.innerHeight - offset) * -0.1 ? -10 : (((event.changedTouches[0].clientY - offset) - (element.clientHeight/2)) < (window.innerHeight - offset) * 0.1 ? 0 : 10 ));
	else
		element.scrollTop = element.scrollTop + (((event.clientY - offset) - (element.clientHeight/2)) < (window.innerHeight - offset) * -0.1 ? -10 : (((event.clientY - offset) - (element.clientHeight/2)) < (window.innerHeight - offset) * 0.1 ? 0 : 10 ));
}

function scrollSelectorX(event,element,offset,touch){
	if(touch)
		element.scrollLeft = element.scrollLeft + (((event.changedTouches[0].clientX - offset) - (element.clientWidth/2)) < (window.innerWidth - offset) * -0.1 ? -10 : (((event.changedTouches[0].clientX - offset) - (element.clientWidth/2)) < (window.innerWidth - offset) * 0.1 ? 0 : 10 ));
	else
		element.scrollLeft = element.scrollLeft + (((event.clientX - offset) - (element.clientWidth/2)) < (window.innerWidth - offset) * -0.1 ? -10 : (((event.clientX - offset) - (element.clientWidth/2)) < (window.innerWidth - offset) * 0.1 ? 0 : 10 ));
}

function cambiarGif(event,gif){
	$("#player-curso").css("background", "url("+String(gif)+") no-repeat center center/ 100% 100%");
}

function centrarMenu(event,align){
    $("#cont_menu").css({"margin-left": (align ? "-8px" : "") });
}

window.onpopstate = function(event){
    if(event.state !== null) {
        location.reload();
    } else if(event.state === null){ // no state data available

    }
};
