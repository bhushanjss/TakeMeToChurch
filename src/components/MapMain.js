import React, { Component } from 'react';
import {
  View
} from 'react-native';

import MapView from 'react-native-maps';

class MapMain extends Component {

	render() {
		return (
		<View style={styles.mapContainer}>
          <MapView style={styles.map} />
        </View>
		);
	}
}


const styles = {
  mapContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  map: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
};

export default MapMain;
