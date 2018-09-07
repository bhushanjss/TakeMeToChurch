import React, { Component } from 'react';
import { View, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Text } from 'react-native-elements';
import { CardSection } from './common';
import DriversItem from './DriversItem';
import { loadDrivers } from '../actions/entities';


class Drivers extends Component {

  static navigationOptions = {
    title: 'Drivers Nearby',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  componentWillMount() {
    this.props.loadDrivers();
  }

  renderItem(driver) {
    return <DriversItem driver={driver.item} />;
  }

  renderList() {
  if (!this.props.showList) {
    const noListMsg = 'No Drivers Found Nearby !!!';
    return (
      <View>
      <CardSection>
      <View style={{ alignItems: 'center', flex: 1 }}>
        <Text>{ noListMsg }</Text>
      </View>
      </CardSection>
      </View>
    );
  }

  return (<View>
    <FlatList
      data={this.props.drivers}
      renderItem={this.renderItem}
      keyExtractor={driver => driver.driverId}
    />
    </View>);
}

  render() {
    return (
      <View>
        {this.renderList()}
      </View>
    );
  }
}

const mapStateToProps = state => {
const drivers = _.map(state.entities.drivers, (val, driverId) => ({ ...val, driverId }));
  return { drivers, showList: (drivers.length > 0) };
};

export default connect(mapStateToProps, {
  loadDrivers
})(Drivers);
