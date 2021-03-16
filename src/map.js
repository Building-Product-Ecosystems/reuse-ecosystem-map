import * as L from 'leaflet'

const MAPBOX_LINK = 'https://api.mapbox.com/styles/v1/bplmp/cklqt2e0v3ia517pfvnkqyt1z/tiles/256/{z}/{x}/{y}@2x?access_token=pk.eyJ1IjoiYnBsbXAiLCJhIjoiY2tscXN6ZXJvMHlmZDJ2cHNuYXg4cm0zdSJ9.NJq68mVfGTdY3qFd1Huj5w'
const LAT_COL = 'LAT'
const LON_COL = 'LON'
const INITIAL_COORDS = [37.76496739271615, -122.39985495803376]
const INITIAL_ZOOM = 5
const isMobile = window.innerHeight >= window.innerWidth

const roleColors = {
  'Consulting': '#ff7f0e',
  'Deconstruction': '#2ca02c',
  'Government / Public Agency': '#aec7e8',
  'Reuse': '#9467bd',
  'Waste Management & Recycling': '#bcbd22',
}

export {
  init,
  roleColors,
  mapLegend,
  zoomToRegion,
}

let geoJSON
let map

function init(data) {
  geoJSON = buildGeoJSON(data)
  console.log(data)
  console.log(geoJSON)
  console.log(data.length, 'rows received')
  console.log(geoJSON.features.length, 'rows parsed')
  loadMap(geoJSON)
  setTimeout(function(){
    document.getElementById('spinner').style.display = 'none'
  }, 350)
}

function buildFeature(feature) {
  let featureObject = {
    "type": "Feature",
    "properties": {},
    "geometry": {
      "type": "Point",
      "coordinates": []
    }
  }
  for (let variable in feature) {
    if (feature.hasOwnProperty(variable)) {
      featureObject.properties[variable.trim()] = feature[variable].trim()
    }
  }
  featureObject.geometry.coordinates.push(parseFloat(feature[LON_COL]))
  featureObject.geometry.coordinates.push(parseFloat(feature[LAT_COL]))
  return featureObject
}

function buildGeoJSON(data) {
  let featureCollection = {
    "type": "FeatureCollection",
    "features": []
  }
  for (var i = 0; i < data.length; i++) {
    let feature = data[i]
    feature[LON_COL] = feature[LON_COL].replace(',', '.')
    feature[LAT_COL] = feature[LAT_COL].replace(',', '.')
    let lon = feature[LON_COL]
    let lat = feature[LAT_COL]
    if (lon.match(/[a-z]/i) && lat.match(/[a-z]/i)) {
      feature[LON_COL] = parseDMS(feature[LON_COL])
      feature[LAT_COL] = parseDMS(feature[LAT_COL])
    }
    try {
      if (isNaN(parseFloat(lon)) == false && isNaN(parseFloat(lat)) == false) {
        let built = buildFeature(feature)
        featureCollection['features'].push(built)
      }
    } catch (e) {
        console.log('error parsing row', i, feature, e)
    }
  }
  return featureCollection
}

function loadMap(geoJSON) {
  map = L.map('map', {
    center: INITIAL_COORDS,
    zoom: INITIAL_ZOOM,
    scrollWheelZoom: false,
    zoomControl: false,
  })

  L.control.zoom({
    position: 'bottomleft'
  }).addTo(map);

  L.tileLayer(MAPBOX_LINK, {
    maxZoom: 18,
    attribution: 'Map data &copy <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors, ' +
      '<a href="https://creativecommons.org/licenses/by-sa/2.0/">CC-BY-SA</a>, ' +
      'Imagery © <a href="https://www.mapbox.com/">Mapbox</a>',
    id: 'mapbox.light'
  }).addTo(map)

  function popup(feature, layer) {
    let prop = feature.properties

    layer.bindPopup(`
      <div class="popup">
        <h2>${prop['ENTITY']}</h2>
        ${prop['LOCATION'] ? `<h4>${prop['LOCATION']}</h4>` : ''}
        <hr/>
        <table class="popup-table">
          <tbody>
            <tr><td><strong>Role(s)</strong></td><td>${prop['ROLE(S)']}</td></tr>
            <tr><td><strong>Address</strong></td><td>${prop['FULL ADDRESS']}</td></tr>
            <tr><td><strong>Contact</strong></td><td>${prop['CONTACT']}</td></tr>
            <tr><td><strong>Email</strong></td><td><a href="mailto:${prop['EMAIL']}">${prop['EMAIL']}</a></td></tr>
            <tr><td><strong>Phone</strong></td><td><a href="tel:${prop['PHONE']}">${prop['PHONE']}</a></td></tr>
            <tr><td><strong>Website</strong></td><td><a href="${prop['WEBSITE']}" target="_blank">${prop['WEBSITE']}</a></td></tr>
          </tbody>
        </table>
        <p class="popup-p"><strong>Collaboration Opportunities: </strong>${prop['COLLABORATION OPPORTUNITIES']}</p>
      </div>
      `, {
        maxWidth : isMobile ? window.innerWidth * 0.75 : 450
      })

    layer.bindTooltip(`
      <div class="tooltip">
        <strong style="font-size: 1.25em;">${prop['ENTITY']}</strong>
        ${prop['LOCATION'] ? `<br /><span>${prop['LOCATION']}</span>` : ''}
      </div>
      `, {
        maxWidth : isMobile ? window.innerWidth * 0.75 : 450
      })
  }

  const pointsLayers = L.geoJSON(geoJSON, {
    pointToLayer: function(feature, latlng) {
      return L.circleMarker(latlng, {
        radius: 9,
        fillColor: roleColors[feature.properties['GENERAL ROLE']],
        color: "#fff",
        weight: 1.5,
        opacity: 1,
        fillOpacity: 0.9,
      })
    },
    onEachFeature: popup
  }).addTo(map)

  map.fitBounds(pointsLayers.getBounds())
}

function zoomToRegion(regionName) {
  if (regionName.toLowerCase() === 'all') {
    map.fitBounds(L.geoJSON(geoJSON).getBounds())
    return
  }
  const filteredData = geoJSON.features.filter(row => row.properties['REGION'] === regionName)
  if (filteredData) {
    map.fitBounds(L.geoJSON(filteredData).getBounds())
  }
}

// https://stackoverflow.com/questions/1140189/converting-latitude-and-longitude-to-decimal-values
function parseDMS(input) {
    let parts = input.split(/[^\d\w\.]+/)
    return convertDMSToDD(parts[0], parts[1], parts[2], parts[3])
}

function convertDMSToDD(degrees, minutes, seconds, direction) {
    let dd = parseInt(degrees) + parseInt(minutes)/60 + parseInt(seconds)/(60*60)

    if (direction == "S" || direction == "W") {
        dd = dd * -1
    }
    return dd
}

function mapLegend(colors) {
  const colorsHTML = [`
    <div id="map-legend-show" class="map-legend-row map-legend-icon flex ${isMobile ? 'visible' : 'invisible'}">
      <span>See Legend</span>
    </div>
    <div id="map-legend-hide" class="map-legend-row map-legend-icon flex ${isMobile ? 'invisible' : 'visible'}">
      <span>Hide Legend</span>
    </div>
  `]
  for (let variable in colors) {
    if (colors.hasOwnProperty(variable)) {
      colorsHTML.push(`
        <div class="map-legend-row map-legend-content flex ${isMobile ? 'invisible' : 'visible'}">
          <div class="map-legend-color" style="background: ${colors[variable]}"></div>
          <span>${variable}</span>
        </div>
      `)
    }
  }
  return `<div class="map-legend flex flex-column">${colorsHTML.join('\n')}</div>`
}
