import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Card, Avatar, Text, Icon } from 'react-native-elements';
import { loadProfile } from '../actions/entities';

class Profile extends Component {

  componentWillMount() {
    this.props.loadProfile();
  }

  render() {
    const { firstName, lastName, phoneNumber, street, apt, city, state, zip,
      carModel, carSeats, isChecked
    } = this.props;
    return (
      <ScrollView>
        <Card>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Avatar
          size="large"
          rounded
          source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', paddingTop: 10 }}>
          <Text h3>{firstName} {lastName}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', padding: 10 }}>
          <Icon name='phone' />
          <Text style={{ paddingLeft: 30 }}>{phoneNumber}</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', padding: 10 }}>
          <Icon name='home' />
          <View style={{ paddingLeft: 30 }}>
            <Text>{street}</Text>
            <Text>{apt}</Text>
            <Text>{city}</Text>
            <Text>{state} {zip}</Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', padding: 10 }}>
          <Icon name='home' />
          <View style={{ paddingLeft: 30 }}>
            <Text>St Johns Catholic Church</Text>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <Text>Mass Time:</Text>
              <Text>Sunday 11:00 AM</Text>
              <Text>Sunday 7:00 PM</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', padding: 10 }}>
          <Icon name='train' />
          <View style={{ paddingLeft: 30 }}>
            <Text>{carModel}</Text>
            <Text>{carSeats} Seats</Text>
          </View>
        </View>
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  console.log(state);
  const profile = _.values(state.entities.profile)[0];
  return {
    firstName: profile.firstName,
    lastName: profile.lastName,
    phoneNumber: profile.phoneNumber,
    street: profile.street,
    apt: profile.apt,
    city: profile.city,
    state: profile.state,
    zip: profile.zip,
    carModel: profile.carModel,
    carSeats: profile.carSeats,
    isChecked: profile.isChecked
  };
};

export default connect(mapStateToProps, {
loadProfile
})(Profile);
