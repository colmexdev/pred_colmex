function changeToggle(over){
	var tog = (over == 0);
	$("#but-toggle").css({"background-color": (tog ? "#DCDCDC" : "")});
	$("#bar-s").css({"background-color": (tog == 0 ? "#A9A9A9" : "")});
	$("#bar-m").css({"background-color": (tog == 0 ? "#A9A9A9" : "")});
	$("#bar-i").css({"background-color": (tog == 0 ? "#A9A9A9" : "")});
}

function slideMenu(){
	var slide = ($("#menu-lat").width() == 0);
	$("#menu-lat").css({"width": (slide ? "" : "0px") });
	$("#graphs-gest").css({"width": (slide ? "" : "100%")});
}

function adjustWidths(cols){
	return (100/cols) + "%";
}

function hideLink(event,element,link,method,keyword,query){
  keyword = keyword || null;
	query = query || null;
	event = event || null;
  if(event != null)
		event.preventDefault();
	$(element).append('<a ' + (method == "DELETE" ? 'data-method="'+method+'" rel="nofollow" data-remote=true data-confirm="¿Seguro que desea eliminar el objeto?"' : "data-remote=true") + ' href="'+link+(keyword != null ? '&keyword='+keyword : "") + (query != null ? "&"+query[1]+"&complement="+query[0] : "") +'" style="display:none;" id="vlink"></a>');
	$("#vlink").trigger("click");
	$("#vlink").remove();
}

function filterAnalytics(link){
	var conds = [];
	var pars = "";
	var url = "";
	if($("#fecha_desde")[0].value != "")
		conds.push(["di",$("#fecha_desde")[0].value]);
	if($("#fecha_hasta")[0].value != "")
		conds.push(["dd",$("#fecha_hasta")[0].value]);
	if(conds.length != 0){
		url = link + (link.indexOf("?") != -1 ? "" : "?")
		for(var i in conds)
			pars = pars + conds[i][0] + "=" + conds[i][1] + (i == conds.length -1 ? "" : "&");
		url = url + "&" + pars;
	}
	//console.log(url);
	return url;
}

function buildQuery(conds){
	var query = "";
	var url_params = "";
	for(var i in conds){
		var filter = $("#"+conds[i][0])[0];
		if(filter.value == "" || filter.value == null) continue
		else{
			query += (query.length > 0 ? " and " : "") + conds[i][0] + " " + conds[i][1] + " " + (conds[i][2] == 0 ? "'" : ( conds[i][2] == 1 ? "'%'" : "")) + filter.value + (conds[i][2] == 0 ? "'" : ( conds[i][2] == 1 ? "'%'" : ""));
			url_params += (url_params.length > 0 ? "&" : "") + conds[i][0] + "=" + filter.value;
		}
	}
	return [query,url_params];
}

// 0 : Cadena (total)
// 1 : Cadena (parcial)
// 2 : Número
// 3 : Fecha
function filteredParams(set){
	if(set == "Descubre") return [["contenido","=",0]];
	else if(set == "Programas docentes") return [["programa","=",0]];
	else if(set == "Directorio de Autoridades") return [["seccion","=",0]];
	else if(set == "Documentos varios") return [["tipo","=",0]];
	else if(set == "Cátedras y seminarios") return [["tipo","=",0]];
	else if(set == "Directorio académico") return [["adscripcion","=",0]];
	else return [];
}

function readURL(input,display,file) {
  if (input.files && input.files[0]) {
		//console.log(input.files);
		window.archivo = input.files;
    var reader = new FileReader();
    
    reader.onload = function (e) {
				if(file != null ){
        	$(display).attr('src', e.target.result);
				}
				else{
					$(display).attr('src', e.target.result);
				}
    }
    
    reader.readAsDataURL(input.files[0]);
  }
}

function formatDate(fecha){
	var months = ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre']
	var day = fecha.getDate(), month = fecha.getMonth();
	return months[month] + " " + padZero(day) /*padZero(month)*/
}

/* Funciones de edición de texto */
function configTrix(){
	Trix.config.blockAttributes.left = {
		breakOnReturn: true,
		group: false,
		tagName: "p",
		style: {textAlign: "left"},
		terminal: true
	}
	Trix.config.blockAttributes.center = {
		breakOnReturn: true,
		group: false,
		tagName: "p",
		style: {textAlign: "center"},
		terminal: true
	}
	Trix.config.blockAttributes.right = {
		breakOnReturn: true,
		group: false,
		tagName: "p",
		style: {textAlign: "right"},
		terminal: true
	}
	Trix.config.blockAttributes.justify = {
		breakOnReturn: true,
		group: false,
		tagName: "p",
		style: {textAlign: "justify"},
		terminal: true
	}
	Trix.config.blockAttributes.heading2 = {
		breakOnReturn: true,
		group: false,
		tagName: "h2",
		terminal: true
	}
	Trix.config.blockAttributes.heading3 = {
		breakOnReturn: true,
		group: false,
		tagName: "h3",
		terminal: true
	}
	Trix.config.blockAttributes.heading4 = {
		breakOnReturn: true,
		group: false,
		tagName: "h4",
		terminal: true
	}
	Trix.config.blockAttributes.paragraph = {
		breakOnReturn: true,
		group: false,
		tagName: "div",
		terminal: true
	}
	Trix.config.textAttributes.underline = { 
		tagName: "u",
		parser: function(element) {
			return element.style.textDecoration === "underline"
		},
		inheritable: true
	}
	Trix.config.textAttributes.color = {
    tagName: "span", 
		style: { color: "#7E3355" },
		parser: function(element) {
			return element.style.color === "#7E3355"
		},
		inheritable: true
	}
	Trix.config.textAttributes.italic.tagName = "i";
	Trix.config.textAttributes.bold.tagName = "b";
}

function extendTrix(toolbar,blocks){
 		var buttonHTML = "<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"color\" title=\"Color\" tabindex=\"-1\"><div style=\"display:inline-block;background-color:#7E3355;width:18px;height:20px;margin:5px auto 0;\"></div></button>";
 		var buttonHTML2 = "<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"underline\" title=\"Underline\" tabindex=\"-1\"><div style=\"display:inline-block;\"><i class=\"fa fa-underline\" aria-hidden=\"true\"></i></div></button>";
 		var buttonHTML3 = "<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"heading2\" title=\"Heading2\" tabindex=\"-1\"><div style=\"display:inline-block;font-size:14px;width:100%;text-align:center;\">H2</div></button>";
 		var buttonHTML4 = "<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"heading3\" title=\"Heading3\" tabindex=\"-1\"><div style=\"display:inline-block;font-size:12px;width:100%;text-align:center;\">H3</div></button>";
 		//var buttonHTML5 = "<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"left\" title=\"Left\" tabindex=\"-1\"><div style=\"display:inline-block;font-size:20px;\"><i class=\"fa fa-align-left\" aria-hidden=\"true\"></i></div></button>";
 		//var buttonHTML6 = "<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"center\" title=\"Center\" tabindex=\"-1\"><div style=\"display:inline-block;font-size:20px;\"><i class=\"fa fa-align-center\" aria-hidden=\"true\"></i></div></button>";
 		//var buttonHTML7 = "<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"right\" title=\"Right\" tabindex=\"-1\"><div style=\"display:inline-block;font-size:20px;\"><i class=\"fa fa-align-right\" aria-hidden=\"true\"></i></div></button>";
 		//var buttonHTML8 = "<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"justify\" title=\"Justify\" tabindex=\"-1\"><div style=\"display:inline-block;font-size:20px;\"><i class=\"fa fa-align-justify\" aria-hidden=\"true\"></i></div></button>";
 		var buttonHTML9 = "<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"paragraph\" title=\"Paragraph\" tabindex=\"-1\"><div style=\"display:inline-block;font-size:20px;\"><i class=\"fa fa-paragraph\" aria-hidden=\"true\"></i></div></button>";
 		var buttonHTML10 = "<button type=\"button\" class=\"trix-button trix-button-icon\" data-trix-attribute=\"heading4\" title=\"Heading4\" tabindex=\"-1\"><div style=\"display:inline-block;font-size:12px;width:100%;text-align:center;\">H4</div></button>";
		toolbar.insertAdjacentHTML("beforeend", buttonHTML2);
		toolbar.insertAdjacentHTML("beforeend", buttonHTML);
		blocks.insertAdjacentHTML("afterbegin",buttonHTML3);
		blocks.insertAdjacentHTML("afterbegin",buttonHTML4);
		blocks.insertAdjacentHTML("afterbegin",buttonHTML10);
		blocks.insertAdjacentHTML("afterbegin",buttonHTML9);
		//blocks.insertAdjacentHTML("beforeend",buttonHTML5);
		//blocks.insertAdjacentHTML("beforeend",buttonHTML6);
		//blocks.insertAdjacentHTML("beforeend",buttonHTML7);
		//blocks.insertAdjacentHTML("beforeend",buttonHTML8);

}

function clearPars(edit){
	try{
	var regex = /<p>(?!<p>)(?!(<--block-->)?<br>).+?<\/p>/g;
	var cars = edit.value.length;
	var newHTML = edit.value.match(regex).join("").replace(/<p>/g,"<div>").replace(/<\/p>/g,"</div>");
	edit.innerHTML = "";
	edit.editor.setSelectedRange([0,cars]);
	edit.editor.deleteInDirection("forward");
	edit.editor.insertHTML(newHTML);
	
	}catch(err){

	}
}

function padZero(n){
	return (n < 10 ? "0" + n : n.toString())
}

/* Funciones de graficación */

function modifyTooltip(sheet,left){
	if(sheet.rules.length == 1){
		sheet.removeRule(0);
	}
	sheet.insertRule('#tooltip-backend::after { left: ' + left + 'px }',0);
}

function escala(tipo,dom,rango,pad){
	var scale = (tipo == 't' ? d3.scaleTime() : (tipo == 'l' ? d3.scaleLinear() : d3.scaleBand()));
	if(tipo == "b") scale = scale.paddingInner(pad[0]).paddingOuter(pad[1]);
	return scale
				.domain(dom)
				.range(rango)
}

function eje(o,escala,n_ticks,s_ticks,p_ticks,f_ticks){
	f_ticks = f_ticks || null;
	p_ticks = p_ticks || null;
	n_ticks = n_ticks || 10;
	s_ticks = s_ticks || null;
	var axis = (o == 'b' ? d3.axisBottom(escala) : d3.axisLeft(escala));
	return axis
					.ticks(n_ticks)
					.tickSize(s_ticks)
					.tickPadding(p_ticks)
					.tickFormat(f_ticks)
}

function completaFechas(f_i,f_f,only){
	only = only || false;
	var fs = [];
	var dif_dias = Math.ceil((f_f-f_i)/(24000*3600));
	for(var i=0; i<dif_dias; i++){
		if(!only)
			fs.push({key: new Date(f_i.getTime()+(i*24000*3600)), value: 0});
		else
			fs.push(new Date(f_i.getTime()+(i*24000*3600)));
	}
	return fs
}

function containerSelect(cont_id,cont_props){
	var c = d3.select(cont_id);
	for(var k in cont_props){
		if(cont_props.hasOwnProperty(k)){
			c = c.style(k,cont_props[k]);
		}
	}
	return c;
}

function traceFigures(canvas,d_set,fig_class,figure,fig_props,sc_x,sc_y,styles,delegs){
	styles = styles || null;
	delegs = delegs || null;
	var figs = d3.select(canvas).selectAll("."+fig_class)
		.data(d_set)
		.enter().append(figure);

	for(var k in fig_props){
		if(fig_props.hasOwnProperty(k)){
			figs = figs.attr(k,fig_props[k]);
		}
	}

	if(styles != null){
		for(var k in styles){
			if(styles.hasOwnProperty(k)){
				figs = figs.style(k,styles[k]);
			}
		}
	}

	if(delegs != null){
		for(var k in delegs){
			if(delegs.hasOwnProperty(k)){
				figs = figs.on(k,delegs[k]);
			}
		}
	}
}

function adjustLabels(){
	d3.selectAll(".axis-left .tick text").attr("x","-7");
	d3.selectAll(".axis-right .tick text").attr("x","7");
	d3.selectAll(".axis-top .tick text").attr("y","-10");
	d3.selectAll(".axis-bottom .tick text").attr("y","8");
}

// 0 : Fecha; 1: Número; Default other
function linea(sc_x,sc_y,inter,typeX,typeY,area,y0){
	area = area || false
	var fig = (area ? d3.area() : d3.line());
		fig = fig.x(function(d){return sc_x((typeX == 0 ? new Date(d.key) : (typeX == 1 ? +d.key : d.key)))}).curve(inter);
		fig = (area ? fig.y1(function(d){return sc_y((typeY == 0 ? new Date(d.value) : (typeY == 1 ? +d.value : d.value)))}) : fig.y(function(d){return sc_y((typeY == 0 ? new Date(d.value) : (typeY == 1 ? +d.value : d.value)))}) );
		

	return (area ? fig.y0(y0) : fig);
}

function pieChart(div_cont,cont_props,canvas,corners,c_id,radii,pads,sect_class,d_set,delegs){
	var cont = containerSelect(div_cont,cont_props);
	var svg_p = cont.select(canvas)
 		.attr("preserveAspectRatio", "xMinYMin meet")
		.attr("viewBox", "0 0 "+corners[0]+" "+corners[1])
		.append("g")
		.attr("id",c_id)
		.attr("transform","translate("+(corners[0]/2)+","+(corners[1]/2)+")");

	var arc = d3.arc()
			.outerRadius(radii[1])
			.innerRadius(radii[0])
			.padAngle(pads[0])
			.padRadius(pads[1]);

	/*var labelArc = d3.arc()
			.outerRadius(radius - 40)
			.innerRadius(radius - 40);*/

	var pie = d3.pie()
			.sort(null)
			.value(function(d) { return d.value; });

	var p_c = svg_p.selectAll("."+sect_class)
			.data(pie(d_set))
			.enter().append("g")
			.attr("class",sect_class)
			.attr("id",function(d,i){ return sect_class+"-"+i})
			.append("path")
			.attr("d",arc);

	for(var k in delegs){
		p_c = p_c.on(k,delegs[k]);
	}
}
