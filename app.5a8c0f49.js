(window.webpackJsonp=window.webpackJsonp||[]).push([[0],[,,,,function(e,t,n){e.exports=n(7)},,function(e,t,n){},function(e,t,n){"use strict";n.r(t);var o,a,i=n(3),s=n(1),r=[37.76496739271615,-122.39985495803376],l=window.innerHeight>=window.innerWidth,d={Consulting:"#ff7f0e",Deconstruction:"#2ca02c","Government / Public Agency":"#aec7e8",Reuse:"#9467bd","Waste Management & Recycling":"#bcbd22"};function c(e){o=function(e){for(var t={type:"FeatureCollection",features:[]},n=0;n<e.length;n++){var o=e[n];o.LON=o.LON.replace(",","."),o.LAT=o.LAT.replace(",",".");var a=o.LON,i=o.LAT;a.match(/[a-z]/i)&&i.match(/[a-z]/i)&&(o.LON=g(o.LON),o.LAT=g(o.LAT));try{if(0==isNaN(parseFloat(a))&&0==isNaN(parseFloat(i))){var s=u(o);t.features.push(s)}}catch(e){console.log("error parsing row",n,o,e)}}return t}(e),console.log(e),console.log(o),console.log(e.length,"rows received"),console.log(o.features.length,"rows parsed"),function(e){a=s.map("map",{center:r,zoom:5,scrollWheelZoom:!1,zoomControl:!1}),s.control.zoom({position:"bottomleft"}).addTo(a),s.tileLayer("https://api.mapbox.com/styles/v1/bplmp/cklqt2e0v3ia517pfvnkqyt1z/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYnBsbXAiLCJhIjoiY2tscXN6ZXJvMHlmZDJ2cHNuYXg4cm0zdSJ9.NJq68mVfGTdY3qFd1Huj5w",{maxZoom:18,attribution:'Map data &copy <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, <a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',id:"mapbox.light"}).addTo(a);var t=s.geoJSON(e,{pointToLayer:function(e,t){return s.circleMarker(t,{radius:9,fillColor:p(e.properties["GENERAL ROLE"]),color:"#fff",weight:1.5,opacity:1,fillOpacity:.9})},onEachFeature:function(e,t){var n=e.properties;t.bindPopup('\n      <div class="popup">\n        <h2>'+n.ENTITY+"</h2>\n        "+(n.LOCATION?"<h4>"+n.LOCATION+"</h4>":"")+'\n        <hr/>\n        <table class="popup-table">\n          <tbody>\n            <tr><td><strong>Role(s)</strong></td><td>'+n["ROLE(S)"]+"</td></tr>\n            <tr><td><strong>Address</strong></td><td>"+n["FULL ADDRESS"]+"</td></tr>\n            <tr><td><strong>Contact</strong></td><td>"+n.CONTACT+'</td></tr>\n            <tr><td><strong>Email</strong></td><td><a href="mailto:'+n.EMAIL+'">'+n.EMAIL+'</a></td></tr>\n            <tr><td><strong>Phone</strong></td><td><a href="tel:'+n.PHONE+'">'+n.PHONE+'</a></td></tr>\n            <tr><td><strong>Website</strong></td><td><a href="'+n.WEBSITE+'" target="_blank">'+n.WEBSITE+'</a></td></tr>\n          </tbody>\n        </table>\n        <p class="popup-p"><strong>Collaboration Opportunities: </strong>'+n["COLLABORATION OPPORTUNITIES"]+"</p>\n      </div>\n      ",{maxWidth:l?.75*window.innerWidth:450}),t.bindTooltip('\n      <div class="tooltip">\n        <strong style="font-size: 1.25em;">'+n.ENTITY+"</strong>\n        "+(n.LOCATION?"<br /><span>"+n.LOCATION+"</span>":"")+"\n      </div>\n      ",{maxWidth:l?.75*window.innerWidth:450})}}).addTo(a);a.fitBounds(t.getBounds())}(o),setTimeout((function(){document.getElementById("spinner").style.display="none"}),350)}function p(e){var t=e.trim();return"Reuse"===t.split(" ")[0]&&(t="Reuse"),d[t]?d[t]:"#333333"}function u(e){var t={type:"Feature",properties:{},geometry:{type:"Point",coordinates:[]}};for(var n in e)e.hasOwnProperty(n)&&(t.properties[n.trim()]=e[n].trim());return t.geometry.coordinates.push(parseFloat(e.LON)),t.geometry.coordinates.push(parseFloat(e.LAT)),t}function g(e){var t=e.split(/[^\d\w\.]+/);return function(e,t,n,o){var a=parseInt(e)+parseInt(t)/60+parseInt(n)/3600;"S"!=o&&"W"!=o||(a*=-1);return a}(t[0],t[1],t[2],t[3])}var v=n(0);n(2),n(5);function m(e,t){for(var n=0;n<e.length;n++){var i=e[n];i.LOCATION&&(i.ENTITY=i.ENTITY+" - "+i.LOCATION)}var r=v(t).DataTable({data:e,responsive:!0,paging:!0,lengthChange:!1,order:[[0,"asc"]],columns:[{data:"ENTITY",title:"ENTITY:",className:"details-col",render:function(e,t,n,o){return'<span class="details-link">'+e+"</span>"}},{data:"GENERAL ROLE",title:"CATEGORY:"},{data:"ROLE(S)",title:"ROLE(S):"},{data:"REGION",name:"REGION",title:"REGION:"},{data:"FULL ADDRESS",title:"ADDRESS:",className:"none"},{data:"CONTACT",title:"CONTACT:",className:"none"},{data:"EMAIL",title:"EMAIL:",className:"none",render:function(e,t,n,o){return'<a href="mailto:'+e+'">'+e+"</a>"}},{data:"PHONE",title:"PHONE:",className:"none",render:function(e,t,n,o){return'<a href="tel:'+e+'">'+e+"</a>"}},{data:"WEBSITE",title:"WEBSITE:",className:"none",render:function(e,t,n,o){return'<a href="'+e+'" target="_blank">'+e+"</a>"}},{data:"COLLABORATION OPPORTUNITIES",title:"COLLABORATION OPPORTUNITIES:",className:"none"}]}),l=e.map((function(e){return e.REGION})).filter((function(e,t,n){return n.indexOf(e)===t}));if(l.length>1){l.unshift("All"),v("<span><strong>Zoom to a region: </strong>&nbsp;</span>").appendTo("#regionSelectDiv");var d=v('<select id="regionSelect">').appendTo("#regionSelectDiv");v(l).each((function(){d.append(v("<option>").attr("value",this).text(this))})),d.on("change",(function(){var e=this.value,t="All"===e?"":e;r.column("REGION:name").search(t).draw(),function(e){if("all"!==e.toLowerCase()){var t=o.features.filter((function(t){return t.properties.REGION===e}));t&&a.fitBounds(s.geoJSON(t).getBounds())}else a.fitBounds(s.geoJSON(o).getBounds())}(e)}))}v('<label>Search:<input id="search" type="search" class="" placeholder="" aria-controls="table"></label>').appendTo("#searchDiv"),v("#search").on("input",(function(){var e=this.value;console.log(e),r.search(e).draw(),console.log(r.search(e).draw().rows().data()),function(e){for(var t=[],n=0;n<e.length;n++)t.push(e[n].ROW);console.log(t)}(r.rows().search(e).data())}))}n(6);var f=document.querySelector("#app"),h=window.location!=window.parent.location?document.referrer:document.location.href;f.innerHTML='\n<div id="spinner">\n  <div class="spinner-grow text-secondary" role="status">\n    <span class="sr-only">Loading...</span>\n  </div>\n</div>\n<div id="map"></div>\n<a href="https://www.buildingproductecosystems.org/" target="_blank">\n  <img src="images/bpe-logo.png" alt="Building Product Ecosystems" id="mapLogo"></img>\n</a>\n<div id="mapLegend"></div>\n<div id="regionSelectDiv"></div>\n<div id="searchDiv"></div>\n'+(h.indexOf("buildingproductecosystems.org")>0?"":'<p>Resources compiled by <a href="https://www.buildingproductecosystems.org/">Building Product Ecosystems</a> | Please submit <a href="https://www.buildingproductecosystems.org/regional-reuse-resources#suggestions">suggestions, additions, or corrections</a> here.</p>')+'\n<div class="table-wrapper">\n  <table id="table" class="stripe display responsive" width="100%"></table>\n</div>\n',window.addEventListener("DOMContentLoaded",(function(){i.parse("https://docs.google.com/spreadsheets/d/e/2PACX-1vSZ_aRgmKOVqj1Ch4zy8zzjkQREuYo0xXzPlJUKv4-7ULfWNNQdJbOFJgVFayS4zbT7vvkIaJ5JZaBa/pub?output=csv",{download:!0,header:!0,complete:function(e){var t=e.data.filter((function(e){if("STATUS"in e)return"published"==e.STATUS.trim().toLowerCase()}));c(t),m(t,"#table")}}),document.querySelector("#mapLegend").innerHTML=function(e){var t=['\n    <div id="map-legend-show" class="map-legend-row map-legend-icon flex '+(l?"visible":"invisible")+'">\n      <span>See Legend</span>\n    </div>\n    <div id="map-legend-hide" class="map-legend-row map-legend-icon flex '+(l?"invisible":"visible")+'">\n      <span>Hide Legend</span>\n    </div>\n  '];for(var n in e)e.hasOwnProperty(n)&&t.push('\n        <div class="map-legend-row map-legend-content flex '+(l?"invisible":"visible")+'">\n          <div class="map-legend-color" style="background: '+e[n]+'"></div>\n          <span>'+n+"</span>\n        </div>\n      ");return'<div class="map-legend flex flex-column">'+t.join("\n")+"</div>"}(d);var e=document.querySelector("#map-legend-show"),t=document.querySelector("#map-legend-hide"),n=document.querySelectorAll(".map-legend-content");e.onclick=function(){e.classList.add("invisible"),e.classList.remove("visible"),t.classList.add("visible"),t.classList.remove("invisible"),n.forEach((function(e){e.classList.add("visible"),e.classList.remove("invisible")}))},t.onclick=function(){e.classList.remove("invisible"),e.classList.add("visible"),t.classList.remove("visible"),t.classList.add("invisible"),n.forEach((function(e){e.classList.remove("visible"),e.classList.add("invisible")}))}}))}],[[4,1,2]]]);
//# sourceMappingURL=app.5a8c0f49.js.map