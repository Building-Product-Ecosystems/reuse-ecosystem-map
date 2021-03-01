import * as Data from './data.js'
import * as Map from './map.js'
import style from './style/main.scss'

const app = document.querySelector('#app')

app.innerHTML = `
<div id="spinner">
  <div class="spinner-grow text-secondary" role="status">
    <span class="sr-only">Loading...</span>
  </div>
</div>
<div id="map"></div>
<a href="https://www.buildingproductecosystems.org/" target="_blank">
  <img src="images/bpe-logo.png" alt="Building Product Ecosystems" id="mapLogo"></img>
</a>
<div id="mapLegend"></div>
<div class="table-wrapper">
  <table id="table" class="stripe display responsive" width="100%"></table>
</div>
`

window.addEventListener('DOMContentLoaded', init)

function init() {
  Data.getSpreadsheetData()

  const mapLegend = document.querySelector('#mapLegend')
  mapLegend.innerHTML = Map.mapLegend(Map.roleColors)

  const mapLegendShow = document.querySelector('#map-legend-show')
  const mapLegendHide = document.querySelector('#map-legend-hide')
  const mapLegendContent = document.querySelectorAll('.map-legend-content')

  mapLegendShow.onclick = function () {
    mapLegendShow.classList.add('invisible')
    mapLegendShow.classList.remove('visible')
    mapLegendHide.classList.add('visible')
    mapLegendHide.classList.remove('invisible')
    mapLegendContent.forEach(div => {
        div.classList.add('visible')
        div.classList.remove('invisible')
    })
  }
  mapLegendHide.onclick = function () {
    mapLegendShow.classList.remove('invisible')
    mapLegendShow.classList.add('visible')
    mapLegendHide.classList.remove('visible')
    mapLegendHide.classList.add('invisible')
    mapLegendContent.forEach(div => {
        div.classList.remove('visible')
        div.classList.add('invisible')
    })
  }
}
