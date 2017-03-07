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

function slide_pagina(event,render,liga,home){
	event.preventDefault();
	$("#next-page-izq").animate({left: (home ? "100%" : 0)}, 450);
	$("#mosaico").animate({top: (home ? "100%" : 0), height: (home ? "auto" : 0)}, 450);
	  jQuery.ajax({
      url: 'http://pred1.colmex.mx/produccion_digital/cursos_breves',
      type: 'get',
      dataType: 'JSON',
      success:function(result)
      {
          console.log(result);
          //document.write(data);
      } 
     });


	setTimeout(function(){

		window.history.pushState({},"Nueva página",liga);
	$("#brand,#menu_canvas,#menu_mask").animate({top: (/http:\/\/pred1\.colmex\.mx\/?[a-zA-Z0-9]+/.test(window.location.href) ? "1%" : "17%")}, 200);
	}, 450);
}

$(document).on("ready page:change",function(event){
	$("#brand,#menu_canvas,#menu_mask").animate({top: (/http:\/\/pred1\.colmex\.mx\/?[a-zA-Z0-9]+/.test(window.location.href) ? "1%" : "17%")}, 100);
	$("#mosaico").animate({top: (/http:\/\/pred1\.colmex\.mx\/?[a-zA-Z0-9]+/.test(window.location.href) ? "0" : "100%"), height: (/http:\/\/pred1\.colmex\.mx\/?[a-zA-Z0-9]+/.test(window.location.href) ? "0" : "auto")}, 450);
	//console.log(event);
	jQuery.ajax({
      url: 'http://pred1.colmex.mx/produccion_digital/cursos_breves',
      type: 'get',
      dataType: 'JSON',
      success:function(result)
      {
          console.log(result["cursos"]);
					try{
						var html = "";          
						for(var i = 0; i < result["cursos"].length; i++){
							html = html + "<div style=\"width:100%;height:200px;background-color:#CCC;border:2px solid #000;\" onmouseenter=\"cambiarGif(event,'" + result["cursos"][i]["img"] + "');\"></div>"
						}
						$("#selector-cursos").html(html);
					}
					catch(err){

					}
      } 
     });
})

function scrollSelector(event, element){
	if(((event.clientY - 110)/element.clientHeight) * element.scrollHeight >= window.innerHeight * 0.4 )
		element.scrollTop = ((event.clientY - 110)/element.clientHeight) * element.scrollHeight;
	else
		element.scrollTop = 0;
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
