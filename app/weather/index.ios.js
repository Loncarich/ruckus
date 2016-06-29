import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  MapView,
  View
} from 'react-native';
import fetchData from './src/api.js';
import _ from 'lodash';

class weather extends Component {
  constructor(props) {
    super(props)
    this.state= {
      initialPosition: '',
      lastPosition: '',
      pin: {
        latitude: 0,
        longitude: 0
      },
      pins: [],
      crimePins: [],
      barPins: [],
      watchId: '',
      go: true,
      longitudeDelta: 0.03,
      latitudeDelta: 0.03
     }
     this.debounceFetchData= this.debounceFetchData.bind(this)
  }
  debounceFetchData(){
    console.log('inside debounceFetchData');
    fetchData(this.state.pin.latitude, this.state.pin.longitude, this);
  }

  onRegionChangeComplete(region) {
    if(this.state.initialPosition) {
      this.setState({pin: {
        longitude: region.longitude,
        latitude: region.latitude
      }})
      console.log('inside region change complete');
      _.debounce(this.debounceFetchData, 3000)();
    }
  }

  componentDidMount() {
    const that= this;
    navigator.geolocation.getCurrentPosition(
              (position) => {
                console.log('test');
                var initialPosition = position;
                that.setState({initialPosition});
                that.setState({pin: {
                  longitude: initialPosition.coords.longitude,
                  latitude: initialPosition.coords.latitude
                }})
                fetchData(that.state.pin.latitude, that.state.pin.longitude, that);
              },
              (error) => alert(error.message),
              {enableHighAccuracy: true, timeout: 20000, maximumAge: 1000}
            )

    this.state.watchID = navigator.geolocation.watchPosition((position) => {
      var lastPosition = JSON.stringify(position);
      this.setState({lastPosition});
    });
  }
  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

  render() {
    const region= {
      latitude: this.state.pin.latitude,
      longitude: this.state.pin.longitude,
      latitudeDelta: this.state.latitudeDelta,
      longitudeDelta: this.state.longitudeDelta,
    }
    watchID: (null: ?number);
    return (
      <View style= {styles.container}>
        <MapView region= {region}
                 onRegionChangeComplete= {this.onRegionChangeComplete.bind(this)}
                 annotations= {this.state.pins}
                 showsUserLocation={true}
                 zoomEnabled={true}
                 scrollEnabled={true}
                 style= {styles.map}>

        </MapView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  map: {
    flex: 2,
    marginTop: 30
  },
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'stretch',
    backgroundColor: '#F5FCFF'
  },
  textWrapper: {
    flex: 1,
    alignItems: 'center'
  },
  text: {
    fontSize: 30
  }
});

AppRegistry.registerComponent('weather', () => weather);
