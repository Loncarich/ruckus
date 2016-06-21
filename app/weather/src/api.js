import { MapView } from 'react-native';

export default function fetchData (latitude, longitude, param) {

    fetchCrime.call(param, latitude, longitude)
    .then(fetchVice.call(param, latitude, longitude))
    .catch(err => console.log(err));
}

function fetchCrime(latitude, longitude){
     return new Promise ((resolve, reject) => {
      fetch('http://localhost:8000/api/crime', {
        method: 'POST',
        headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          latitude: latitude,
          longitude: longitude
        })
      }).then(response => {
        return response.json();
      }).then(responseJSON => {
        var tempPins= JSON.parse(responseJSON.body);
        console.log('tempPins', tempPins)
        var crimePins= tempPins.map(function(crime){
          return {latitude: crime.geo_crime_location.coordinates[1],
                  longitude: crime.geo_crime_location.coordinates[0],
                  title: crime.statistical_code_description,
                  image: require('../knuckles.png')};
        });
        //console.log('tempPins', crimePins);
        var tempPins= this.state.pins.concat(crimePins);
        this.setState({pins: tempPins})
        resolve(latitude, longitude);
      }).catch(err => console.log(err));
    })
}

function fetchVice(latitude, longitude){
    fetch('http://localhost:8000/api/vice', {
    method: 'POST',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      latitude: latitude,
      longitude: longitude
    })
  }).then(response => {
    return response.json();
  }).then(responseJSON => {
    //var temp= response.json();
    //console.log('yelp Data', responseJSON);
    const barsArray= responseJSON.businesses;
    console.log('barsArray', barsArray);
    const barPins= barsArray.map(function(bar){
      return {latitude: bar.location.coordinate.latitude,
              longitude: bar.location.coordinate.longitude,
              title: bar.name,
              image: require('../beer.png')}})
    //console.log('barPins', barPins);
    const tempPins= this.state.pins.concat(barPins);
    this.setState({pins: tempPins});
  })
  .catch(err => {console.log(err)})
}