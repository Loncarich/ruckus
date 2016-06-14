const crimeData = require('../models/model.crimeData.js');
const yelpAPI = require('../lib/yelpAPI.js');
const request       = require('request')
const configHeaders = require('../config/config.crimeData.js')

module.exports = {
  getCrime: (req, res) => {
    configHeaders.url = configHeaders.url + '?$where=within_circle(geo_crime_location, ' + req.body.latitude + ', ' + req.body.longitude + ', 2000)'
    request(configHeaders, (err, data) => {
      res.send(data)
    })
  },
  getBars: (req,res) => {
    var concat = req.body.latitude + ',' + req.body.longitude;
    yelpAPI.yelpSearch(concat).then(data => res.send(data));
  }
};


