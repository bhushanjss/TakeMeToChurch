import React, { Component } from 'react';
import { View, StyleSheet, TextInput, TouchableOpacity, Text } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import MapView, { PROVIDER_GOOGLE, Marker } from 'react-native-maps';
import { Dropdown } from 'react-native-material-dropdown';

import { handleMapSearchInputChange, handleMapSearch, getPlaceDetails,
 addChurchDetails } from '../actions/services';

class MapMain extends Component {

  static navigationOptions = {
    drawerLabel: () => null
  }

  handleMapSearchInputChange(text) {
    this.props.handleMapSearchInputChange(text);
  }

  handleMapSearch() {
    this.props.handleMapSearch(this.props.mapsInput);
  }

  handleDropdownSelection(value, index) {
    this.props.getPlaceDetails(this.props.dropdownList[index].placeId);
  }

  handleAddChurch() {
    this.props.addChurchDetails(this.props.churchDetails);    
  }

  showDropdown() {
    if(this.props.dropdownVisible) {
      return (
        <View style={styles.dropdowContainer}>
          <Dropdown
          ref={dropdown => (this.dropdown = dropdown)}
            data={this.props.dropdownList}
            onChangeText={this.handleDropdownSelection.bind(this)}  
            value={this.props.dropdownDefaultValue}
            />
        </View>
      );
    }
  }

  showAddButton() {
    if(this.props.showAdd) {
      return(<View style={styles.button} >
        <TouchableOpacity 
        onPress={this.handleAddChurch.bind(this)}              
        >
          <Text style = {styles.buttonText} >
            Add It 
          </Text>
        </TouchableOpacity>
      </View>);
    }
  }

	render() {
    const { churchDetails } = this.props;

		return (
		<View style={styles.overallViewContainer}>
        <MapView 
          ref={map => {this.map = map}}
          // provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          minZoomLevel={13}
          maxZoomLevel={20}
          followsUserLocation={true}
          style={styles.container} 
          region={ {...churchDetails.latlang , latitudeDelta: 1, longitudeDelta: 1 }}
        >
          <Marker
            coordinate={churchDetails.latlang}
            title={churchDetails.churchName}
            description={churchDetails.formattedAddress}
            image={churchDetails.icon}
          />
        </MapView>
        <View style={styles.allNonMapThings}>
          <View style={styles.inputContainer}>
            <TextInput
              placeholder='Type Church Name then press Enter'
              style={styles.input}
              onChangeText={ this.handleMapSearchInputChange.bind(this) }
              value={ this.props.mapsInput}
              onSubmitEditing={ this.handleMapSearch.bind(this) }
            />
          </View>
          {this.showDropdown()}
          {this.showAddButton()}                
      </View>
   </View>   
		);
	}
}

const styles = StyleSheet.create({
  overallViewContainer: {
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
 container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'space-between'
  },
  input: {
    elevation: 1,
    width: '99%',
    marginTop: 'auto',
    marginBottom: 'auto',
    marginLeft: 'auto',
    marginRight: 'auto',
    padding: 5
  },
  allNonMapThings: {
    alignItems: 'center',
    height: '100%',
    width: '100%'
  },
  inputContainer: {
    elevation: 1,
    backgroundColor: 'white',
    width: '90%',
    height: '6%',
    top: 40,
    borderRadius: 3,
    shadowOpacity: 0.75,
    shadowRadius: 1,
    shadowColor: 'gray',
    shadowOffset: { height: 0, width: 0}
  },
  dropdowContainer: {
    elevation: 1,
    backgroundColor: 'white',
    width: '90%',
    top: 45,
    padding: 5
  },
  button: {
    elevation: 1,
    position: 'absolute',
    bottom: 25,
    backgroundColor: '#ff6600',
    borderRadius: 10,
    width: '60%',
    height: 40,
    alignItems: 'center',
    justifyContent: 'center',
    shadowOpacity: 0.75,
    shadowRadius: 1,
    shadowColor: 'gray',
    shadowOffset: { height: 0, width: 0}
  },
  buttonText: {
    color: 'white',
    fontSize: 24,
    fontWeight: 'bold',

  }
});

const mapStateToProps = state => {
  const dropdownListFiltered = _.map(state.maps.autoCompleteList, 
  (val, id) => ({
    placeId: val.place_id,
    value: val.description
  }));
  return {
    mapsInput: state.maps.mapsInput,
    dropdownList: dropdownListFiltered,
    churchDetails: state.maps.churchDetails,
    dropdownDefaultValue: ((dropdownListFiltered[0] && dropdownListFiltered[0].value)  || ''),
    dropdownVisible: (dropdownListFiltered.length > 0 ? true: false),
    showAdd: state.maps.churchDetails.churchName
  };
};

export default connect(mapStateToProps, {
  handleMapSearchInputChange,
  handleMapSearch,
  getPlaceDetails,
  addChurchDetails
})(MapMain);
