const Yelp = require('yelp');
const keys = require('../config/config.sample.js');

const yelp = new Yelp({
  consumer_key: keys.yelp.consumer_key,
  consumer_secret: keys.yelp.consumer_secret,
  token: keys.yelp.token,
  token_secret: keys.yelp.token_secret,
});

module.exports = {
  yelpSearch: latLongString => {
    return new Promise((resolve, reject) => {
       yelp.search({term: 'bar', ll: latLongString})
        .then(data => {
          //console.log('yelp data', data);
          return resolve(data);
        })
          .catch(err => {
            console.log('err', err);
            return reject(err);
          });
    });
  }
};