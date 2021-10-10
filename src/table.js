// var $ = require( 'jquery' )
// var dt = require( 'datatables.net' )( window, $ )
import * as $ from 'jquery'
import * as dt from 'datatables.net'
import * as dtResponsive from 'datatables.net-responsive'
import { zoomToRegion } from './map.js'

import {
  ENTITY_COL,
  LOCATION_COL,
  ROLE_COL,
  SECONDARY_ROLE_COL,
  ADDRESS_COL,
  CONTACT_COL,
  EMAIL_COL,
  PHONE_COL,
  WEBSITE_COL,
  COLLABORATION_COL,
} from './data_constants.js'

export {
  init
}

function init(data, elementId) {
  $.fn.dataTable.ext.errMode = 'none';  // suppress errors

  // for (var i = 0; i < data.length; i++) {
  //   let row = data[i]
  //   if (row[LOCATION_COL]) {
  //       row[ENTITY_COL] = row[ENTITY_COL] + ' - ' + row[LOCATION_COL]
  //   }
  // }
  const table = $(elementId).DataTable({
    data: data,
    responsive: true,
    // scrollY: '510px',
    // scrollCollapse: true,
    paging: true,
    lengthChange: false,
    order: [[ 0, "asc" ]],
    columns: [
      {
        data: ENTITY_COL,
        title: 'ENTITY:',
        className: 'details-col',
        render: function(data, type, full, meta) {
          return `<span class="details-link">${data}</span>`
        }
      },
      // {
      //   data: LOCATION_COL,
      //   title: 'LOCATION:',
      // },
      {
        data: ROLE_COL,
        title: 'PRIMARY ROLE:',
      },
      {
        data: SECONDARY_ROLE_COL,
        title: 'SECONDARY ROLE:',
      },
      {
        data: LOCATION_COL,
        name: 'REGION',
        title: 'REGION:',
      },
      {
        data: ADDRESS_COL,
        title: 'ADDRESS:',
        className: 'none',
      },
      {
        data: CONTACT_COL,
        title: 'CONTACT:',
        className: 'none',
      },
      {
        data: EMAIL_COL,
        title: 'EMAIL:',
        className: 'none',
        render: function(data, type, full, meta) {
          return `<a href="mailto:${data}">${data}</a>`
        }
      },
      {
        data: PHONE_COL,
        title: 'PHONE:',
        className: 'none',
        render: function(data, type, full, meta) {
          return `<a href="tel:${data}">${data}</a>`
        }
      },
      {
        data: WEBSITE_COL,
        title: 'WEBSITE:',
        className: 'none',
        render: function(data, type, full, meta) {
          return `<a href="${data}" target="_blank">${data}</a>`
        }
      },
      {
        data: COLLABORATION_COL,
        title: 'COLLABORATION OPPORTUNITIES:',
        className: 'none',
      },
    ]
  })

  // add filter for regions, if there are more than 1
  const allRegions = data.map(item => item.REGION)
  const regions = allRegions.filter((item, i, ar) => ar.indexOf(item) === i)
  if (regions.length > 1) {
    regions.unshift('All')

    $('<span><strong>Zoom to a region: </strong>&nbsp;</span>').appendTo('#regionSelectDiv')

    var regionSelect = $('<select id="regionSelect">').appendTo('#regionSelectDiv')
    $(regions).each(function() {
     regionSelect.append($('<option>').attr('value', this).text(this))
    })

    regionSelect.on('change', function() {
      const selectValue = this.value
      const searchValue = selectValue === 'All' ? '' : selectValue
      table
        .column('REGION:name')
        .search(searchValue)
        .draw()
      zoomToRegion(selectValue)
    })
  }

}
