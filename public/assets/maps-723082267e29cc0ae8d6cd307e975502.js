// declare namespace
function removeTooltips(){$.each(window.annotation_view.tooltips,function(){this.hide()})}function ExtDraggableObject(e,t){function N(t){t?e.style.cursor=s:e.style.cursor=o}function C(t,n,r){var s,o;m=Math.round(t),v=Math.round(n),i.intervalX>1&&(s=Math.round(m%i.intervalX),m=s<S?m-s:m+(i.intervalX-s)),i.intervalY>1&&(o=Math.round(v%i.intervalY),v=o<x?v-o:v+(i.intervalY-o)),i.container&&i.container.offsetWidth&&(m=Math.max(0,Math.min(m,i.container.offsetWidth-e.offsetWidth)),v=Math.max(0,Math.min(v,i.container.offsetHeight-e.offsetHeight))),typeof f=="number"&&(m-f>i.toleranceX||f-(m+e.offsetWidth)>i.toleranceX||v-l>i.toleranceY||l-(v+e.offsetHeight)>i.toleranceY)&&(m=w,v=E),!i.restrictX&&!r&&(e.style.left=m+"px"),!i.restrictY&&!r&&(e.style.top=v+"px")}function k(e){var t=e||event;f=h+((t.pageX||t.clientX+document.body.scrollLeft+document.documentElement.scrollLeft)-p),l=c+((t.pageY||t.clientY+document.body.scrollTop+document.documentElement.scrollTop)-d),h=f,c=l,p=t.pageX||t.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,d=t.pageY||t.clientY+document.body.scrollTop+document.documentElement.scrollTop,u&&(C(f,l,a),r.trigger(n,"drag",{mouseX:p,mouseY:d,startLeft:w,startTop:E,event:t}))}function L(t){var i=t||event;N(!0),r.trigger(n,"mousedown",i);if(e.style.position!=="absolute"){e.style.position="absolute";return}p=i.pageX||i.clientX+document.body.scrollLeft+document.documentElement.scrollLeft,d=i.pageY||i.clientY+document.body.scrollTop+document.documentElement.scrollTop,w=e.offsetLeft,E=e.offsetTop,h=w,c=E,b=r.addDomListener(T,"mousemove",k),e.setCapture&&e.setCapture(),i.preventDefault?(i.preventDefault(),i.stopPropagation()):(i.cancelBubble=!0,i.returnValue=!1),u=!0,r.trigger(n,"dragstart",{mouseX:p,mouseY:d,startLeft:w,startTop:E,event:i})}function A(t){var i=t||event;u&&(N(!1),r.removeListener(b),e.releaseCapture&&e.releaseCapture(),u=!1,r.trigger(n,"dragend",{mouseX:p,mouseY:d,startLeft:w,startTop:E,event:i})),f=l=null,r.trigger(n,"mouseup",i)}var n=this,r=window.GEvent||google.maps.Event||google.maps.event,i=t||{},s=i.draggingCursor||"default",o=i.draggableCursor||"default",u=!1,a,f,l,c,h,p,d,v,m,g,y,b,w,E,S=Math.round(i.intervalX/2),x=Math.round(i.intervalY/2),T=e.setCapture?e:document;typeof i.intervalX!="number"&&(i.intervalX=1),typeof i.intervalY!="number"&&(i.intervalY=1),typeof i.toleranceX!="number"&&(i.toleranceX=Infinity),typeof i.toleranceY!="number"&&(i.toleranceY=Infinity),g=r.addDomListener(e,"mousedown",L),y=r.addDomListener(T,"mouseup",A),N(!1),i.container,e.style.position="absolute",i.left=i.left||e.offsetLeft,i.top=i.top||e.offsetTop,i.interval=i.interval||1,C(i.left,i.top,!1),n.moveTo=function(e){C(e.x,e.y,!1)},n.moveBy=function(t){C(e.offsetLeft+t.width,e.offsetHeight+t.height,!1)},n.setDraggingCursor=function(e){s=e,N(u)},n.setDraggableCursor=function(e){o=e,N(u)},n.left=function(){return m},n.top=function(){return v},n.valueX=function(){var e=i.intervalX||1;return Math.round(m/e)},n.valueY=function(){var e=i.intervalY||1;return Math.round(v/e)},n.setValueX=function(e){C(e*i.intervalX,v,!1)},n.setValueY=function(e){C(m,e*i.intervalY,!1)},n.preventDefaultMovement=function(e){a=e}}function makeGoogleAnnotations(e,t){$.getJSON(t,function(t){$.each(t,function(t,n){annotation_type=n.wkt_data[0],addGoogleAnnotation(e.googleMap,n.google_maps_annotation,annotation_type,n.body)})})}function refreshGoogleAnnotation(){$.each(this.annotations_array,function(){this.setMap(null)}),makeGoogleAnnotations(this.map_gmap,this.annotations_url_gmap)}function addGoogleAnnotation(e,t,n,r){var i=[],s=t.split(",");$.each(s,function(){coords=this.split(" "),i.push(new google.maps.LatLng(coords[0],coords[1]))});if(n=="P")var o=new google.maps.Polygon({paths:i,strokeColor:"#cc4400",strokeOpacity:.8,strokeWeight:2,fillColor:"#cc4400",fillOpacity:.4});else if(n=="L")var o=new google.maps.Polyline({path:i,strokeColor:"#cc4400",strokeOpacity:1,strokeWeight:3});var u=new google.maps.InfoWindow({content:r,position:new google.maps.LatLng(50,50),maxWidth:300});eventPolygonClick=google.maps.event.addListener(o,"click",function(t){var n=new google.maps.Marker({position:t.latLng});activeInfoWindow&&activeInfoWindow.close(),u.open(e,n),activeInfoWindow=u}),o.setMap(e),annotations_array.push(o)}function toggleGoogleAnnotations(){$.each(this.annotations_array,function(){toggleState==1?(this.setVisible(!1),activeInfoWindow&&activeInfoWindow.close()):this.setVisible(!0)}),toggleState=toggleState==1?0:1}maphub={},maphub.AnnotationView=function(e){function t(e){var t=e.feature.geometry.CLASS_NAME;e.feature.tooltip||(t=="OpenLayers.Geometry.Point"?e.feature.tooltip=new maphub.ControlPointTooltip(e.feature.control_point,p.user_id):e.feature.tooltip=new maphub.AnnotationTooltip(e.feature.annotation,p.user_id),p.tooltips.push(e.feature.tooltip));var n=e.feature.geometry.getBounds().getCenterLonLat(),r=this.map.getPixelFromLonLat(n);r.x<0&&(r.x=0),e.feature.tooltip.show(r.x,r.y)}function n(e){e.feature.tooltip.hide()}function r(e){p.keyboard_shortcuts.deactivate();for(var t in p.tooltips)p.tooltips[t].hide();var n=e.feature.geometry.CLASS_NAME;n=="OpenLayers.Geometry.Point"?s(e):i(e)}function i(e){var t=e.feature.geometry.toString();$("#annotation_body").attr("value","Add your annotation here!"),$("#annotation_wkt_data").attr("value",t),$("#annotation_boundary_attributes_ne_x").attr("value",e.feature.geometry.bounds.right),$("#annotation_boundary_attributes_ne_y").attr("value",e.feature.geometry.bounds.top),$("#annotation_boundary_attributes_sw_x").attr("value",e.feature.geometry.bounds.left),$("#annotation_boundary_attributes_sw_y").attr("value",e.feature.geometry.bounds.bottom),$("#modal-annotation-tags").empty(),$("#tagging-help").hide(),$("#no-tags").show(),$("#annotation-submit-button").removeAttr("disabled"),$("#modal-annotation").modal({backdrop:"static",keyboard:!1}),$("#annotation_body").focus(),$("#annotation_body").select()}function s(e){var t=e.feature.geometry.toString();$("#control_point_wkt_data").attr("value",t),$("#control_point_x").attr("value",e.feature.geometry.x),$("#control_point_y").attr("value",e.feature.geometry.y),$("#place-search").attr("value",""),$("#modal-control-point").modal({backdrop:"static",keyboard:!1}),$("#place-search").focus()}this.zoomify_width=e.width,this.zoomify_height=e.height,this.zoomify_url=e.zoomify_url,this.annotations_url=e.annotations_url,this.control_points_url=e.control_points_url,this.editable=e.editable,this.user_id=e.user_id,this.features_annotations=[],this.features_annotations_own=[],this.features_control_points=[],this.annotations=[],this.control_points=[],this.tooltips=[];var o=new OpenLayers.StyleMap({"default":new OpenLayers.Style({strokeColor:"#cc4400",fillOpacity:"0.4",fillColor:"#cc4400",cursor:"pointer"}),select:new OpenLayers.Style({strokeColor:"#005580",fillColor:"#00A9FF",fillOpacity:"0.4"})}),u=new OpenLayers.Style({externalGraphic:"/assets/pin-27e92d69012d40b9235c56eb150b8162.png",graphicWidth:"15",graphicWidth:"25",graphicXOffset:-13,graphicYOffset:-25,cursor:"pointer"}),a=new OpenLayers.StyleMap({"default":u,select:u,temporary:u});this.baseLayer=new OpenLayers.Layer.Zoomify("Zoomify",this.zoomify_url,new OpenLayers.Size(this.zoomify_width,this.zoomify_height),{displayInLayerSwitcher:!1}),this.editLayer=new OpenLayers.Layer.Vector("Editable",{styleMap:o,displayInLayerSwitcher:!1}),this.editLayer.events.register("featureadded",this.editLayer,r),this.controlPointEditLayer=new OpenLayers.Layer.Vector("Control Point Editable",{styleMap:a,displayInLayerSwitcher:!1}),this.controlPointEditLayer.events.register("featureadded",this.controlPointEditLayer,r),$("a.close").click(function(){p.editLayer.removeAllFeatures(),p.controlPointEditLayer.removeAllFeatures()}),this.annotationLayer=new OpenLayers.Layer.Vector("Annotations created by others",{styleMap:o}),this.annotationLayerOwn=new OpenLayers.Layer.Vector("Annotations created by me",{styleMap:o}),this.controlPointsLayer=new OpenLayers.Layer.Vector("Control Points",{styleMap:a});var f=new OpenLayers.Bounds(0,0,this.zoomify_width,this.zoomify_height),l={controls:[],maxExtent:f,restrictedExtent:f,maxResolution:Math.pow(2,this.baseLayer.numberOfTiers-1),numZoomLevels:this.baseLayer.numberOfTiers,units:"pixels",theme:"/assets/theme/default/style-7702ebcdb08c07098cafbabaa985da6d.css"};this.map=new OpenLayers.Map("viewer",l),this.map.addLayer(this.baseLayer),this.map.addLayer(this.editLayer),this.map.addLayer(this.controlPointEditLayer),this.map.addLayer(this.annotationLayer),this.editable&&this.map.addLayer(this.annotationLayerOwn),this.map.addLayer(this.controlPointsLayer),this.remoteLoadAnnotations(),this.remoteLoadControlPoints(),this.initAutoComplete(),this.map.addControl(new OpenLayers.Control.Navigation),this.map.addControl(new OpenLayers.Control.MousePosition),this.map.addControl(new OpenLayers.Control.PanZoomBar),this.keyboard_shortcuts=new OpenLayers.Control.KeyboardDefaults,this.map.addControl(this.keyboard_shortcuts),this.map.addControl(new OpenLayers.Control.LayerSwitcher({div:OpenLayers.Util.getElement("layerswitcher")}));var c=new OpenLayers.Control.SelectFeature([this.annotationLayer,this.annotationLayerOwn,this.controlPointsLayer],{renderIntent:"select",toggle:!0});this.map.addControl(c),c.activate(),this.annotationLayer.events.on({featureselected:t,featureunselected:n}),this.annotationLayerOwn.events.on({featureselected:t,featureunselected:n}),this.controlPointsLayer.events.on({featureselected:t,featureunselected:n});if(this.editable){this.drawControls={point:new OpenLayers.Control.DrawFeature(this.controlPointEditLayer,OpenLayers.Handler.Point),line:new OpenLayers.Control.DrawFeature(this.editLayer,OpenLayers.Handler.Path),polygon:new OpenLayers.Control.DrawFeature(this.editLayer,OpenLayers.Handler.Polygon),box:new OpenLayers.Control.DrawFeature(this.editLayer,OpenLayers.Handler.RegularPolygon,{handlerOptions:{sides:4,irregular:!0}})};for(var h in this.drawControls)this.map.addControl(this.drawControls[h]);$("#control-toggle-annotation-types").hide(),$("#control-toggle-annotation").click(function(){$("#control-toggle-annotation-types").slideDown()}),$("#control-toggle-control-point, #control-toggle-navigate").click(function(){$("#control-toggle-annotation-types").slideUp()});var p=this;$("#control-toggle button").click(function(){for(h in p.drawControls){var e=p.drawControls[h];this.value==h?e.activate():e.deactivate()}})}this.map.setBaseLayer(this.baseLayer),this.map.zoomToMaxExtent();var p=this},maphub.AnnotationView.prototype.initAutoComplete=function(){$("input#place-search").autocomplete({source:function(e,t){$.ajax({url:"http://ws.geonames.org/searchJSON",dataType:"jsonp",data:{featureClass:"P",style:"full",maxRows:12,name_startsWith:e.term},success:function(e){t($.map(e.geonames,function(e){return{label:e.name+(e.adminName1?", "+e.adminName1:"")+", "+e.countryName,value:e.name,short_name:e.name,lat:e.lat,lng:e.lng,geonameId:e.geonameId}}))}})},minLength:2,select:function(e,t){$("#control_point_name").attr("value",t.item.short_name),$("#control_point_geonames_label").attr("value",t.item.label),$("#control_point_lat").attr("value",t.item.lat),$("#control_point_lng").attr("value",t.item.lng),$("#control_point_geonames_id").attr("value",t.item.geonameId)},open:function(){$(this).removeClass("ui-corner-all").addClass("ui-corner-top")},close:function(){$(this).removeClass("ui-corner-top").addClass("ui-corner-all")}})},maphub.AnnotationView.prototype.remoteLoadAnnotations=function(){var e=new OpenLayers.Format.WKT,t=this;$.getJSON(this.annotations_url,function(n){$.each(n,function(n,r){var i=e.read(r.wkt_data);i.annotation=r,i.annotation.user_id==t.user_id?t.features_annotations_own.push(i):t.features_annotations.push(i),t.annotations.push(r)}),t.annotationLayer.addFeatures(t.features_annotations),t.annotationLayerOwn.addFeatures(t.features_annotations_own)})},maphub.AnnotationView.prototype.remoteLoadControlPoints=function(){var e=new OpenLayers.Format.WKT,t=this;$.getJSON(this.control_points_url,function(n){$.each(n,function(n,r){var i=e.read(r.wkt_data);i.control_point=r,t.features_control_points.push(i),t.control_points.push(r)}),t.controlPointsLayer.addFeatures(t.features_control_points)})},maphub.TaggingView=function(e,t){this.callback_url=e,this.timeout=t,this.tags=new Array,this.status="idle";var n=this;window.tagging_view=this,$("#annotation_body").keyup(function(){$(this).doTimeout("annotation-timeout",n.timeout,function(){var e=encodeURIComponent($("#annotation_body").val().replace(/[^\w\s]/gi,""));if(e!==""||e!="Add your annotation here!")if(n.status!="loading"){var t=n.callback_url+"?"+"text="+e+"&"+"annotation[boundary][ne_x]="+$("#annotation_boundary_attributes_ne_x").val()+"&"+"annotation[boundary][ne_y]="+$("#annotation_boundary_attributes_ne_y").val()+"&"+"annotation[boundary][sw_x]="+$("#annotation_boundary_attributes_sw_x").val()+"&"+"annotation[boundary][sw_y]="+$("#annotation_boundary_attributes_sw_y").val();$("#no-tags").hide(),$("#loading-tags").show(),n.status="loading",$.getJSON(t,function(e){$("#loading-tags").hide(),$("#tagging-help").fadeIn("slow"),$.each(e,function(e,t){var r=t.label,i=t.dbpedia_uri,s=t.description;if(n.tags[r]===undefined){var o=$(document.createElement("span"));o.attr("class","label label-neutral"),o.text(r);var u=$(document.createElement("a"));u.attr("rel","tooltip"),u.attr("title",s),u.html(o),u.appendTo($("#modal-annotation-tags"));var a=$(document.createElement("div"));a.attr("class","tag-fields");var f=$(document.createElement("input"));f.attr("type","text"),f.css("display","none"),f.attr("name","label[]"),f.attr("value",r),f.appendTo(a);var l=$(document.createElement("input"));l.attr("type","text"),l.css("display","none"),l.attr("name","dbpedia_uri[]"),l.attr("value",i),l.appendTo(a);var c=$(document.createElement("input"));c.attr("type","text"),c.css("display","none"),c.attr("name","description[]"),c.attr("value",s),c.appendTo(a);var h=$(document.createElement("input"));h.attr("type","text"),h.css("display","none"),h.attr("name","status[]"),h.attr("value","neutral"),h.appendTo(a),a.appendTo($("#modal-annotation-tags")),n.tags[r]=t,o.click(function(){$(this).hasClass("label-neutral")?($(this).removeClass("label-neutral").addClass("label-success"),n.tags[r].status="accepted",h.attr("value","accepted")):$(this).hasClass("label-success")?($(this).removeClass("label-success").addClass("label-important"),n.tags[r].status="rejected",h.attr("value","rejected")):$(this).hasClass("label-important")&&($(this).removeClass("label-important").addClass("label-neutral"),n.tags[r].status="neutral",h.attr("value","neutral"))})}}),n.status="idle"})}})})},maphub.TaggingView.prototype.reset=function(){this.tags=new Array},maphub.Map=function(e){this.id=e.id,typeof e["deleteHiddenTiles"]=="undefined"?this.deleteHiddenTiles=!1:this.deleteHiddenTiles=e.deleteHiddenTiles,typeof e["tileSize"]=="undefined"?this.tileSize=new google.maps.Size(256,256):this.tileSize=e.tileSize,this.mapBounds=new google.maps.LatLngBounds(new google.maps.LatLng(e.sw_lat,e.sw_lng),new google.maps.LatLng(e.ne_lat,e.ne_lng)),this.overlayTilesetUri=e.overlay_tileset_uri,this.minTileset=e.min_tileset,this.maxTileset=e.max_tileset,this.zoom=Math.floor(e.min_tileset+(e.max_tileset-e.min_tileset)/2)},maphub.Map.prototype.render=function(e){var t={center:this.mapBounds.getCenter(),mapTypeId:google.maps.MapTypeId.ROADMAP,streetViewControl:!1,zoom:this.zoom,minZoom:this.minTileset,maxZoom:this.maxTileset};this.googleMap=new google.maps.Map(e,t);var n=new maphub.AlphaOverlay({map:this,tileSize:this.tileSize,overlay_tileset_uri:this.overlayTilesetUri});this.googleMap.overlayMapTypes.push(n)},maphub.Map.toString=function(){return"Map<id="+this.id+">"},maphub.TileOverlay=function(e){this.tiles={};if(e){this.map=e.map,this.tileSize=e.tileSize,this.url=e.overlay_tileset_uri;var t=this;this.map.deleteHiddenTiles&&google.maps.event.addListener(this.map.googleMap,"idle",function(){t.deleteHiddenTiles()})}},maphub.TileOverlay.prototype.deleteHiddenTiles=function(){var e=this.map.googleMap.getBounds(),t=this.map.googleMap.getZoom(),n=e.getNorthEast(),r=e.getSouthWest(),i=this.latLngToTile(n,t),s=this.latLngToTile(r,t),o=new google.maps.Point(s.x,i.y),u=new google.maps.Point(i.x,s.y),a=s.x,f=i.x,l=s.y,c=i.y,h={};for(var p in this.tiles)for(var d=a;d<=f;d++)for(var v=c;v<=l;v++){var m=t+"-"+d+"-"+v;m==p&&(h[p]=this.tiles[p])}this.tiles=h;return},maphub.TileOverlay.prototype.getTile=function(e,t,n){var r=t+"-"+e.x+"-"+e.y,i=null;if(typeof this.tiles[r]=="undefined"){var s=this.getTileUrlCoord(e,t);i=n.createElement("div"),i.style.width=this.tileSize.width+"px",i.style.height=this.tileSize.height+"px",i.style.background="url("+this.url+"/"+t+"/"+s.x+"/"+s.y+".png) no-repeat",this.tiles[r]=i}else console.log("Found existing tile for "+r),i=this.tiles[r];return i},maphub.TileOverlay.prototype.latLngToTile=function(e,t){var n=this.map.googleMap.getProjection(),r=n.fromLatLngToPoint(e),i=new google.maps.Point(r.x*Math.pow(2,t),r.y*Math.pow(2,t)),s=new google.maps.Point(Math.floor(i.x/this.tileSize.width),Math.floor(i.y/this.tileSize.height));return s},maphub.TileOverlay.prototype.getTileUrlCoordFromLatLng=function(e,t){return this.getTileUrlCoord(this.latLngToTile(e,t),t)},maphub.TileOverlay.prototype.getTileUrlCoord=function(e,t){var n=1<<t,r=n-e.y-1,i=e.x;if(i<0||i>=n)i=(i%n+n)%n;return new google.maps.Point(i,r)},maphub.TileOverlay.prototype.toString=function(){return"TileOverlay<map="+this.map+", tileSize="+this.tileSize+">"},maphub.AlphaOverlay=function(e){e&&maphub.TileOverlay.prototype.constructor.apply(this,[e]),this.opacity=maphub.AlphaOverlay.InitialOpacity,this.createOpacityControl(this.map.googleMap,this.opacity)},maphub.AlphaOverlay.prototype=new maphub.TileOverlay,maphub.AlphaOverlay.constructor=maphub.AlphaOverlay,maphub.AlphaOverlay.SliderWidth=57,maphub.AlphaOverlay.InitialOpacity=75,maphub.AlphaOverlay.SliderImageURL="/assets/opacity-slider-94693ce1f00542895b5af6a576c4fdec.png",maphub.AlphaOverlay.prototype.getTile=function(e,t,n){var r=maphub.TileOverlay.prototype.getTile.apply(this,[e,t,n]);return this.setObjectOpacity(r,this.opacity),r},maphub.AlphaOverlay.prototype.createOpacityControl=function(e,t){var n=document.createElement("DIV");n.setAttribute("style","margin:5px;overflow-x:hidden;overflow-y:hidden;background:url("+maphub.AlphaOverlay.SliderImageURL+") no-repeat;width:71px;height:21px;cursor:pointer;");var r=document.createElement("DIV");r.setAttribute("style","padding:0;margin:0;overflow-x:hidden;overflow-y:hidden;background:url("+maphub.AlphaOverlay.SliderImageURL+") no-repeat -71px 0;width:14px;height:21px;"),n.appendChild(r);var i=new ExtDraggableObject(r,{restrictY:!0,container:n}),s=this;google.maps.event.addListener(i,"dragend",function(){s.setOpacity(i.valueX())}),google.maps.event.addDomListener(n,"click",function(e){var t=s.findPosLeft(this),n=e.pageX-t-5;i.setValueX(n),s.setOpacity(n)}),this.map.googleMap.controls[google.maps.ControlPosition.TOP_RIGHT].push(n);var o=maphub.AlphaOverlay.SliderWidth/(100/this.opacity);i.setValueX(o),this.setOpacity(o)},maphub.AlphaOverlay.prototype.setOpacity=function(e){var t=100/maphub.AlphaOverlay.SliderWidth*e;t<0&&(t=0),this.opacity=t;for(var n in this.tiles)console.log("Changing tile "+n),this.setObjectOpacity(this.tiles[n],t)},maphub.AlphaOverlay.prototype.setObjectOpacity=function(e,t){typeof e.style.filter=="string"&&(e.style.filter="alpha(opacity:"+t+")"),typeof e.style.KHTMLOpacity=="string"&&(e.style.KHTMLOpacity=t/100),typeof e.style.MozOpacity=="string"&&(e.style.MozOpacity=t/100),typeof e.style.opacity=="string"&&(e.style.opacity=t/100)},maphub.AlphaOverlay.prototype.findPosLeft=function(e){var t=0;if(e.offsetParent){do t+=e.offsetLeft;while(e=e.offsetParent);return t}return undefined},maphub.AlphaOverlay.prototype.toString=function(){return"AlphaOverlay<map="+this.map.id+", opacity="+this.opacity+", tileSize="+this.tileSize+">"};var activeInfoWindow;this.toggleState=1,this.annotations_array=[],this.annotations_url_gmap,this.map_gmap,maphub.OverlayView=function(e){e&&google.load("maps","3",{callback:function(){var t=new maphub.Map(e);t.render(document.getElementById("overlay_viewer")),map_gmap=t,annotations_url_gmap=e.annotations_url,makeGoogleAnnotations(map_gmap,annotations_url_gmap)},other_params:"sensor=true"})},maphub.AnnotationTooltip=function(e,t){this.div=$(document.createElement("div")),this.div.attr("class","annotation-tooltip"),this.div.attr("id","annotation-tooltip-"+e.id),this.div_body=$(document.createElement("div")),this.div_body.attr("class","annotation-tooltip-body"),this.div_body.html(e.body),this.div_user=$(document.createElement("div")),this.div_user.attr("class","annotation-tooltip-user single-user-container"),this.div_user.html($("#annotation-"+e.id+" .single-user-container").html()),this.div_body.appendTo(this.div),this.div_user.appendTo(this.div),this.div.prependTo("#tooltip-selected"),this.div.hide()},maphub.AnnotationTooltip.prototype.show=function(e,t){this.div.css("left",e),this.div.css("top",t),this.div.show()},maphub.AnnotationTooltip.prototype.hide=function(){this.div.hide()},maphub.ControlPointTooltip=function(e,t){this.div=$(document.createElement("div")),this.div.attr("class","control-point-tooltip"),this.div.attr("id","control-point-tooltip-"+e.id),this.div_body=$(document.createElement("div")),this.div_body.attr("class","control-point-tooltip-body"),this.div_body.html(e.geonames_label),this.div_delete=$(document.createElement("div")),this.div_delete.attr("class","control-point-tooltip-body"),this.div_delete.html("<hr><small><a href='/control_points/"+e.id+"' data-confirm='Are you sure?' data-method='delete' rel='nofollow'><i class='icon-trash'></i> Delete</a></small>"),this.div_body.appendTo(this.div),t==e.user_id&&this.div_delete.appendTo(this.div),this.div.prependTo("#tooltip-selected"),this.div.hide()},maphub.ControlPointTooltip.prototype.show=function(e,t){this.div.css("left",e),this.div.css("top",t),this.div.show()},maphub.ControlPointTooltip.prototype.hide=function(){this.div.hide()},maphub.EarthView=function(e){if(e){var t=e.kml_uri;google.load("earth","1",{callback:function(){google.earth.createInstance("earth_viewer",function(e){e.getWindow().setVisibility(!0),e.getNavigationControl().setVisibility(e.VISIBILITY_AUTO);var n=e.createLink(""),r=t;n.setHref(r);var i=e.createNetworkLink("");i.set(n,!0,!0),e.getFeatures().appendChild(i)},function(e){})}})}};