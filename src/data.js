import * as Papa from 'papaparse'
import Airtable from "airtable";
import * as Map from './map.js'
import * as Table from './table.js'

import {
  BASE_TABLE_CONFIG,
  COLORS_TABLE_CONFIG,
  ROLE_COL,
  SECONDARY_ROLE_COL,
  C_ROLE_COL,
  C_COLOR_COL,
  C_RECORD_ID_COL,
} from './data_constants.js'

const databaseId = 'app2Ufltjsi6qQF2b';
const airtableApiKey = 'keyXTEWIgSJI4MeGu';
const base = new Airtable({apiKey: airtableApiKey}).base(databaseId);

const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSZ_aRgmKOVqj1Ch4zy8zzjkQREuYo0xXzPlJUKv4-7ULfWNNQdJbOFJgVFayS4zbT7vvkIaJ5JZaBa/pub?output=csv'

export {
  getAirtableData,
  getSpreadsheetData,
}

const getAirtableRecords = async ({
  name,
  fields,
  view
}) => {
  return new Promise((resolve, reject) => {
    let allRecords = [];

    base(name).select({
      maxRecords: 500,
      view: view,
      fields: fields,
     })
      .eachPage(
        (records, fetchNextPage) => {
          allRecords = [
            ...allRecords,
            ...records.map(r => r.fields)
          ];
          fetchNextPage();
        },
        err => {
          if (err) reject(err);
          resolve(allRecords);
        }
      );
  });
}

const getAirtableData = async () => {
  let mainData = await getAirtableRecords(BASE_TABLE_CONFIG)
  let colorsData = await getAirtableRecords(COLORS_TABLE_CONFIG)

  // join main data to colors to find role names
  mainData = mainData.map(d => {
    const obj = {...d}
    obj[ROLE_COL] = obj[ROLE_COL].map(r => colorsData.find(c => c?.[C_RECORD_ID_COL] === r)?.[C_ROLE_COL])
    obj[SECONDARY_ROLE_COL] = obj[ROLE_COL].map(r => colorsData.find(c => c?.[C_RECORD_ID_COL] === r)?.[C_ROLE_COL])
    return obj
  })

  colorsData = colorsData.map(d => [d[C_ROLE_COL], d[C_COLOR_COL]])
  return [mainData, colorsData]
};

function getSpreadsheetData() {
  Papa.parse(publicSpreadsheetUrl, {
  download: true,
  header: true,
  complete: function(results) {
      const data = results.data
      const publishedData = data.filter(function(obj){
        if ('STATUS' in obj) {
          return obj['STATUS'].trim().toLowerCase() == 'published'
        }
      })
      Map.init(publishedData)
      Table.init(publishedData, '#table')
    }
  })
}
