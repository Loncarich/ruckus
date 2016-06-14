import React, { Component } from 'react';
import {
  AppRegistry,
  StyleSheet,
  Text,
  MapView,
  View
} from 'react-native';
import fetchData from './src/api.js';

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
  }

  // onRegionChangeComplete(region) {
  //   if(this.state.initialPosition !== '' && this.state.go) {
  //     this.setState({pin: {
  //       longitude: region.longitude,
  //       latitude: region.latitude
  //     }})
  //     this.setState({go: false});
  //   }
  // }

  componentDidMount() {
    const that= this;
    //Icon.getImageSource('md-beer', 30).then((source) => this.setState({ beerIcon: source }));
    navigator.geolocation.getCurrentPosition(
              (position) => {
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
        <MapView region= {region} annotations= {this.state.pins} showsUserLocation={true} style= {styles.map}>
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
