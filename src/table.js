// var $ = require( 'jquery' )
// var dt = require( 'datatables.net' )( window, $ )
import * as $ from 'jquery'
import * as dt from 'datatables.net'
import * as dtResponsive from 'datatables.net-responsive'

export {
  init
}

function init(data, elementId) {
  for (var i = 0; i < data.length; i++) {
    let row = data[i]
    row['ENTITY'] = row['ENTITY'] + ' - ' + row['LOCATION']
  }
  $(elementId).DataTable({
    data: data,
    responsive: true,
    // scrollY: '510px',
    // scrollCollapse: true,
    paging: true,
    columns: [
      {
        data: 'ENTITY',
        title: 'ENTITY:',
        className: 'details-col',
        render: function(data, type, full, meta) {
          return `<span class="details-link">${data}</span>`
        }
      },
      // {
      //   data: 'LOCATION',
      //   title: 'LOCATION:',
      // },
      {
        data: 'ROLE(S)',
        title: 'ROLE(S):',
      },
      {
        data: 'FULL ADDRESS',
        title: 'ADDRESS:',
        className: 'none',
      },
      {
        data: 'CONTACT',
        title: 'CONTACT:',
        className: 'none',
      },
      {
        data: 'EMAIL',
        title: 'EMAIL:',
        className: 'none',
        render: function(data, type, full, meta) {
          return `<a href="mailto:${data}">${data}</a>`
        }
      },
      {
        data: 'PHONE',
        title: 'PHONE:',
        className: 'none',
        render: function(data, type, full, meta) {
          return `<a href="tel:${data}">${data}</a>`
        }
      },
      {
        data: 'WEBSITE',
        title: 'WEBSITE:',
        className: 'none',
        render: function(data, type, full, meta) {
          return `<a href="${data}" target="_blank">${data}</a>`
        }
      },
      {
        data: 'COLLABORATION OPPORTUNITIES',
        title: 'COLLABORATION OPPORTUNITIES:',
        className: 'none',
      },
    ]
  })
}
