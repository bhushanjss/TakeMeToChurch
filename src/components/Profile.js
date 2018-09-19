import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Card, Avatar, Text, Icon } from 'react-native-elements';
import { loadProfile, loadProfileImage } from '../actions/entities';
import { uploadImage } from '../actions/forms';

class Profile extends Component {

  static navigationOptions = {
    title: 'Profile',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
    drawerLabel: 'Profile',
  };

  componentWillMount() {
    this.props.loadProfileImage();
    this.props.loadProfile();
  }

  pickImage() {
    this.props.uploadImage();
  }

 showProfileIcon() {
  const { firstName, lastName, profileImgUrl } = this.props;

  if(!profileImgUrl) {
    const title = firstName.charAt(0) + lastName.charAt(0);
    return (<Avatar
            title={title}
            size="large"
            rounded
            onPress={this.pickImage.bind(this)}
            activeOpacity={0.7}
          />);
  }

  return (<Avatar
            size="large"
            rounded
            source={{ uri: profileImgUrl }}
            onPress={this.pickImage.bind(this)}
            activeOpacity={0.7}
          />);
  }

  render() {
    const { firstName, lastName, phoneNumber, street, apt, city, state, zip,
      carModel, carSeats, isChecked
    } = this.props;
    return (
      <ScrollView>
        <Card>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        { this.showProfileIcon() }
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
    isChecked: profile.isChecked,
    profileImgUrl: state.entities.profileImgUrl
  };
};

export default connect(mapStateToProps, {
loadProfile,
uploadImage,
loadProfileImage
})(Profile);
