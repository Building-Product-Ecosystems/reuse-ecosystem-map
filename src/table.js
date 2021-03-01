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
  const table = $(elementId).DataTable({
    data: data,
    responsive: true,
    // scrollY: '510px',
    // scrollCollapse: true,
    paging: true,
    "order": [[ 1, "asc" ]],
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
        data: 'REGION',
        title: 'REGION:',
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

  // add filter for regions, if there are more than 1
  const regions = [...new Set(data.map(item => item.REGION))]
  if (regions.length > 1) {
    regions.unshift('All')

    $('<span><strong>Region</strong>&nbsp;</span>').appendTo('#regionSelectDiv')

    var sel = $('<select id="regionSelect">').appendTo('#regionSelectDiv')
    $(regions).each(function() {
     sel.append($('<option>').attr('value', this).text(this))
    })

    sel.on('change', function() {
      const selectValue = this.value
      const searchValue = selectValue === 'All' ? '' : selectValue
      table
        .column($(this).data('index'))
        .search(searchValue)
        .draw()
    })
  }

}
