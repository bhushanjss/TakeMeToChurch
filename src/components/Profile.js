import React, { Component } from 'react';
import { View, ScrollView, FlatList } from 'react-native';
import { connect } from 'react-redux';
import _ from 'lodash';
import { Card, Avatar, Text, Icon } from 'react-native-elements';
import { loadProfile, loadProfileImage, editProfile } from '../actions/entities';
import { uploadImage } from '../actions/forms';
import { Header } from './common';

class Profile extends Component {

  static navigationOptions = ({ navigation }) => {
    return {
      title: 'Profile'
    };
  };

  componentWillMount() {
    // this.props.loadProfileImage();
    this.props.loadProfile();
  }

  pickImage() {
    this.props.uploadImage();
  }

  editProfile() {
    const { firstName, lastName, phoneNumber, street, apt, city, state, zip,
      carModel, carSeats, isChecked
    } = this.props;

    this.props.editProfile({
      firstName,
      lastName,
      phoneNumber,
      street,
      apt,
      city,
      state,
      zip,
      carModel,
      carSeats,
      isChecked
    });
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

  renderChurch() {
    const { defaultChurch } = this.props;
    if(defaultChurch) {
      return (
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', padding: 10 }}>
          <Icon name='place' />
          <View style={{ paddingLeft: 30 }}>
            <Text>{defaultChurch.churchName}</Text>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
                <FlatList
                data={defaultChurch.massTimes}
                renderItem={(val) => (
                  <View style={{ flex: 1, flexDirection: 'row',
                   justifyContent: 'space-between' }}>
                    <Text>{val.item}</Text>
                  </View>
                )} />
            </View>   
          </View>
        </View>
      );
    }
  }

  renderCar() {
    const { isChecked, carModel, carSeats } = this.props;
    if(isChecked) {
      return (<View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', padding: 10 }}>
          <Icon name='drive-eta' />
          <View style={{ paddingLeft: 30 }}>
            <Text>{carModel}</Text>
            <Text>{carSeats} Seats</Text>
          </View>
        </View>)
    }
  }

  render() {
    const { firstName, lastName, phoneNumber, street, apt, city, state, zip,
      carModel, carSeats, isChecked
    } = this.props;
    return (
      <ScrollView>
        <Header headerText="Profile" />
        <Card>        
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        { this.showProfileIcon() }
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', paddingTop: 10 }}>          
          <Text h3>{firstName} {lastName}</Text>
          <Icon name='edit' onPress={this.editProfile.bind(this)} />
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
        {this.renderChurch()}  
        {this.renderCar()}  
        </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => {
  const profile = state.entities.profile;
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
    profileImgUrl: state.entities.profileImgUrl,
    defaultChurch: profile.churches ? profile.churches[0] : null 
  };
};

export default connect(mapStateToProps, {
loadProfile,
uploadImage,
loadProfileImage,
editProfile
})(Profile);
