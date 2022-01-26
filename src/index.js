import * as Data from './data.js'
import * as Map from './map.js'
import * as Table from './table.js'
import style from './style/main.scss'

const app = document.querySelector('#app')
const parentUrl = (window.location != window.parent.location) ? document.referrer : document.location.href

const hideTable = window.location.href.indexOf("table=hide") > 0

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
<div id="regionSelectDiv"></div>

<div class="credits" style="display: ${hideTable ? "none" : "block"}">
  ${parentUrl.indexOf("buildingproductecosystems.org") > 0  ? "" : '<p>Resources compiled by <a href="https://www.buildingproductecosystems.org/">Building Product Ecosystems</a> | Please submit <a href="https://www.buildingproductecosystems.org/regional-reuse-resources#suggestions">suggestions, additions, or corrections</a> here.</p>'}
</div>

<div class="table-wrapper" style="display: ${hideTable ? "none" : "block"}">
  <table id="table" class="stripe display responsive" width="100%"></table>
</div>
`

const init = async () => {
  // Data.getSpreadsheetData()
  let data = await Data.getAirtableData()
  let airtableData = data[0]
  const colorsData = data[1]

  console.log(airtableData, colorsData);

  Map.init(airtableData, colorsData);
  Table.init(airtableData, '#table');

  const mapLegend = document.querySelector('#mapLegend')
  mapLegend.innerHTML = Map.mapLegend(colorsData)

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

window.addEventListener('DOMContentLoaded', init)
