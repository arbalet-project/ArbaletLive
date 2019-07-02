/**
 * @fileoverview This file contains the setting application's handler
 */

let config= {};
getconfig();

let nbRows = config["rows"];
let nbColumns = config["cols"];
let project = config["project"];
let simuation_enabled = config["simuation"];
let disabled_pixels = config["disabled"];


// URL handler for number of rows and columns
params = new URLSearchParams(window.location.search)
if (params.has('rows')) {
    nbRows = parseInt(params.get('rows'));
}
if (params.has('cols')) {
    nbColumns = parseInt(params.get('cols'));
}


// Functions

/**
 * Get settings from the json file config.file and stock it in config variable.
 */
function getconfig() {
  $.ajax({
      method: 'GET',
      url: `/config.json`,
      processData: true,
      async : false
  }).done(data => {
    config = data;
  });
}

/**
 * Set config variables
 * @param {String} pro the project name
 * @param {Number} nr number of rows
 * @param {Number} nc number of columns
 * @param {String} dpixels a string containing an array of the disabled pixels present in the matrix
 * @param {BOOL} se indicates if the app can accept other geometry than the native one
 */
function setconfig(pro, nr, nc, dpixels, se){
  project = pro;
  nbRows = nr;
  nbColumns = nc;
  simuation_enabled = se;
  let dpjson = `{"dp":`+ dpixels +`}`;
  disabled_pixels = JSON.parse(dpjson)['dp'];
}

/**
 * Save the current settings in config.json by overwriting it
 */
function saveSettings(){
  // FIX ME
}

/**
 * Build the setting formular by displaying the current value in the form fields
 */
function settingForm() {
  document.getElementById('input-project').innerHTML = `<input type="text" id="setting-project" value="${project}">`;
  document.getElementById('input-rows').innerHTML = `<input type="number" id="setting-rows" value=${nbRows}>`;
  document.getElementById('input-cols').innerHTML = `<input type="number" id="setting-cols" value=${nbColumns}>`;
  let msg = "[";
  let dummyVar = 0;
  for (let pix of disabled_pixels){
    if (dummyVar != 0) {
      msg += ", ";
    }
    msg += "[" + pix[0] + "," + pix[1] + "]";
    dummyVar += 1;
  }
  msg += "]";
  document.getElementById('input-disabled').innerHTML = `<input type="text" id="setting-disabled" value="${msg}">`;
}
