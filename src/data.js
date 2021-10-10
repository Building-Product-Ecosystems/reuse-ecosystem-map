import * as Papa from 'papaparse'
import Airtable from "airtable";
import * as Map from './map.js'
import * as Table from './table.js'

import {
  ALL_FIELDS,
} from './data_constants.js'

const airtableDatabaseId = 'app2Ufltjsi6qQF2b';
const airtableApiKey = 'keyXTEWIgSJI4MeGu';
const base = new Airtable({apiKey: airtableApiKey}).base(airtableDatabaseId);
const baseTableName = 'data';

const publicSpreadsheetUrl = 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSZ_aRgmKOVqj1Ch4zy8zzjkQREuYo0xXzPlJUKv4-7ULfWNNQdJbOFJgVFayS4zbT7vvkIaJ5JZaBa/pub?output=csv'

export {
  getAirtableData,
  getSpreadsheetData,
}

const getAirtableData = async () => {
  return new Promise((resolve, reject) => {
    let allRecords = [];

    base(baseTableName).select({
      maxRecords: 500,
      view: "View for map",
      fields: ALL_FIELDS
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
