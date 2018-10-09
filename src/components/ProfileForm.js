import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Input, Icon, Button, CheckBox } from 'react-native-elements';
import { firstNameChange, lastNameChange, phoneNumberChange, profileStreetChange,
  profileAptChange, profileCityChange, profileStateChange, profileZipChange,
  carModelChange, carSeatsChange, isProfileCheckboxChanged,
  saveProfile } from '../actions/forms';

import { Card, CardSection, Header } from './common';

class ProfileForm extends Component {

  static navigationOptions = {
    drawerLabel: () => null
  }

  firstNameChange(text) {
    this.props.firstNameChange(text);
  }
  lastNameChange(text) {
    this.props.lastNameChange(text);
  }
  phoneNumberChange(text) {
    this.props.phoneNumberChange(text);
  }
  profileStreetChange(text) {
    this.props.profileStreetChange(text);
  }
  profileAptChange(text) {
    this.props.profileAptChange(text);
  }
  profileCityChange(text) {
    this.props.profileCityChange(text);
  }
  profileStateChange(text) {
    this.props.profileStateChange(text);
  }
  profileZipChange(text) {
    this.props.profileZipChange(text);
  }
  carModelChange(text) {
    this.props.carModelChange(text);
  }
  carSeatsChange(text) {
    this.props.carSeatsChange(text);
  }
  checkboxChanged() {
    this.props.isProfileCheckboxChanged(!this.props.isChecked);
  }

  saveProfile() {
    const { firstName, lastName, phoneNumber, street, apt, city, state, zip,
      isChecked, carModel, carSeats, profileId } = this.props;
      if (isChecked) {
        this.props.saveProfile({ firstName, lastName, phoneNumber, street, apt,
        city, state, zip, carModel, carSeats, isChecked, profileId }, { firstName, lastName,
        phoneNumber, zip, carModel, carSeats, isChecked, profileId }, isChecked);
      } else {
        this.props.saveProfile({ firstName, lastName, phoneNumber, street, apt,
        city, state, zip, isChecked, profileId });
      }
  }

  showCarSection() {
    if (this.props.isChecked) {
      return (
        <View>
          <CardSection>
            <Input
              placeholder='Car Model'
              inputContainerStyle={styles.inputContainerStyle}
              leftIcon={<Icon name='train' size={24} color='black' />}
              onChangeText={this.carModelChange.bind(this)}
              value={this.props.carModel}
            />
          </CardSection>
          <CardSection>
            <Input
              placeholder='No of Seats'
              inputContainerStyle={styles.inputContainerStyle}
              leftIcon={<Icon name='event' size={24} color='black' />}
              onChangeText={this.carSeatsChange.bind(this)}
              value={this.props.carSeats}
            />
          </CardSection>
        </View>
      );
    }
  }

  render() {
    const { firstName, lastName, phoneNumber, street, apt, city, state, zip,
      isChecked } = this.props;
    return (
      <ScrollView>
      <Card >
       <Header headerText="Profile Details"/>
      <CardSection>
      <Input
        placeholder='First Name'
        inputContainerStyle={styles.inputContainerStyle}
        leftIcon={<Icon name='person' size={24} color='black' />}
        onChangeText={this.firstNameChange.bind(this)}
        value={firstName}
      />
      </CardSection>
      <CardSection>
      <Input
        placeholder='Last Name'
        inputContainerStyle={styles.inputContainerStyle}
        leftIcon={<Icon name='person' size={24} color='black' />}
        onChangeText={this.lastNameChange.bind(this)}
        value={lastName}
      />
      </CardSection>
      <CardSection>
      <Input
        placeholder='Phone Number'
        keyboardType='phone-pad'
        inputContainerStyle={styles.inputContainerStyle}
        leftIcon={<Icon name='person' size={24} color='black' />}
        onChangeText={this.phoneNumberChange.bind(this)}
        value={phoneNumber}
      />
      </CardSection>
      <CardSection>
      <Input
        placeholder='Street'
        inputContainerStyle={styles.inputContainerStyle}
        leftIcon={<Icon name='home' size={24} color='black' />}
        onChangeText={this.profileStreetChange.bind(this)}
        value={street}
      />
      </CardSection>
      <CardSection>
      <Input
        placeholder='Apartment\/Unit'
        inputContainerStyle={styles.inputContainerStyle}
        leftIcon={<Icon name='home' size={24} color='black' />}
        onChangeText={this.profileAptChange.bind(this)}
        value={apt}
      />
      </CardSection>
      <CardSection>
      <Input
        placeholder='City'
        inputContainerStyle={styles.inputContainerStyle}
        leftIcon={<Icon name='home' size={24} color='black' />}
        onChangeText={this.profileCityChange.bind(this)}
        value={city}
      />
      </CardSection>
      <CardSection>
      <Input
        placeholder='State'
        inputContainerStyle={styles.inputContainerStyle}
        leftIcon={<Icon name='home' size={24} color='black' />}
        onChangeText={this.profileStateChange.bind(this)}
        value={state}
      />
      </CardSection>
      <CardSection>
      <Input
        placeholder='ZIP'
        inputContainerStyle={styles.inputContainerStyle}
        leftIcon={<Icon name='home' size={24} color='black' />}
        onChangeText={this.profileZipChange.bind(this)}
        value={zip}
      />
      </CardSection>
      <CardSection>
      <View style={{ flex: 1 }}>
        <CheckBox containerStyle={{ backgroundColor: '#fff', flex: 1, flexDirection: 'row' }}
         title='Would you like to Drive?' checked={isChecked}
         onPress={this.checkboxChanged.bind(this)}
        />
      </View>
      </CardSection>
      {this.showCarSection()}
      <CardSection>
      <View style={{ flex: 1 }}>
      <Button
        icon={<Icon name='save' size={24} color='white' />}
        title='SAVE'
        onPress={this.saveProfile.bind(this)}
      />
      </View>
      </CardSection>
      </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  firstName: state.profileForm.firstName,
  lastName: state.profileForm.lastName,
  phoneNumber: state.profileForm.phoneNumber,
  street: state.profileForm.street,
  apt: state.profileForm.apt,
  city: state.profileForm.city,
  state: state.profileForm.state,
  zip: state.profileForm.zip,
  carModel: state.profileForm.carModel,
  carSeats: state.profileForm.carSeats,
  isChecked: state.profileForm.isChecked,
  profileId: state.profileForm.profileId
});

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderColor: 'rgba(255, 255, 255, 0)'
  }
});


export default connect(mapStateToProps, {
  firstNameChange,
  lastNameChange,
  phoneNumberChange,
  profileStreetChange,
  profileAptChange,
  profileCityChange,
  profileStateChange,
  profileZipChange,
  carModelChange,
  carSeatsChange,
  isProfileCheckboxChanged,
  saveProfile
})(ProfileForm);
