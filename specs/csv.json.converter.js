/**
 * Created by ANTON.ZUBAR on 12/11/2017.
 */

var csvToJson = require('convert-csv-to-json');

var fileInputName = 'D:/ph.automation-master/specs/test_data/bla.csv';
var fileOutputName = 'D:/ph.automation-master/specs/test_data/myOutputFile.json';

csvToJson.generateJsonFileFromCsv(fileInputName,fileOutputName);