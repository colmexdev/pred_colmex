/* Javascripts asociados a las 4 secciones de la página */
function trasladarDivs(){
	var divs_izq = $(".slides-op.izq");
	var divs_der = $(".slides-op.der");
	var cont_margin = ($(".wrapper-main-pd").outerWidth(true) - $(".wrapper-main-pd").outerWidth())*0.5;
	divs_izq.each(function(){
		var style = "translate(" + (cont_margin < (this.offsetWidth*0.5) ? "" : "-") + (Math.abs((this.offsetWidth*0.5) - cont_margin)) + "px,0) rotate(90deg)";
		this.style.webkitTransform = style;
		this.style.MozTransform = style;
		this.style.msTransform = style;
		this.style.OTransform = style;
		this.style.transform = style;
	});

	divs_der.each(function(){
		var style = "translate(-" + (Math.abs((this.offsetWidth*0.5) + cont_margin)) + "px,0) rotate(90deg)";
		this.style.webkitTransform = style;
		this.style.MozTransform = style;
		this.style.msTransform = style;
		this.style.OTransform = style;
		this.style.transform = style;
	});
}
