import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Input, Icon, Button, Text } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

import { Card, CardSection } from './common';
import { churchNameChange, churchPhoneNumberChange, churchStreetChange,
churchCityChange, churchStateChange, churchZipChange, massTimeChange, addMassTimeChange,
saveMassTimeChange, deleteMassTimeChange, saveChurch } from '../actions/forms';

class AddChurchForm extends Component {

  churchNameChange(text) {
    this.props.churchNameChange(text);
  }

  churchPhoneNumberChange(text) {
    this.props.churchPhoneNumberChange(text);
  }

  churchStreetChange(text) {
    this.props.churchStreetChange(text);
  }

  churchCityChange(text) {
    this.props.churchCityChange(text);
  }

  churchStateChange(text) {
    this.props.churchStateChange(text);
  }

  churchZipChange(text) {
    this.props.churchZipChange(text);
  }

  massTimeChange(text) {
    this.props.massTimeChange(text);
  }

  handleMassTimeChange() {
    if (this.props.addMassTime) {
      this.props.saveMassTimeChange(this.props.massTime);
    } else {
      this.props.addMassTimeChange();
    }
  }

  deleteMassTimeChange(val) {
    this.props.deleteMassTimeChange(val);
  }

  saveChurch() {
    const { churchName, churchPhoneNumber, churchStreet, churchCity, churchState,
       churchZip, addMassTime, massTimes, error, loading } = this.props;
    this.props.saveChurch({ churchName, churchPhoneNumber, churchStreet,
      churchCity, churchState, churchZip, massTimes
    });
  }

  renderDateItem() {
    if (this.props.addMassTime) {
      return (
        <CardSection>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
          <DatePicker
            style={{ width: 200 }}
            mode="datetime"
            date={this.props.massTime}
            format="ddd HH:mm A"
            confirmBtnText="Ok"
            cancelBtnText="Cancel"
            customStyles={{ dateIcon: { display: 'none' } }}
            onDateChange={(time) => this.massTimeChange(time)}
          />
        </View>
        </CardSection>
      );
    }
  }

  render() {
    const { churchName, churchPhoneNumber, churchStreet, churchCity, churchState,
       churchZip, addMassTime, massTimes, error, loading } = this.props;
    return (
      <ScrollView>
      <Card >
      <CardSection>
      <Input
        placeholder='Church Name'
        inputContainerStyle={styles.inputContainerStyle}
        leftIcon={<Icon name='person' size={24} color='black' />}
        onChangeText={this.churchNameChange.bind(this)}
        value={churchName}
      />
      </CardSection>
      <CardSection>
      <Input
        placeholder='Phone Number'
        keyboardType='phone-pad'
        inputContainerStyle={styles.inputContainerStyle}
        leftIcon={<Icon name='phone' size={24} color='black' />}
        onChangeText={this.churchPhoneNumberChange.bind(this)}
        value={churchPhoneNumber}
      />
      </CardSection>
      <CardSection>
      <Input
        placeholder='Street'
        inputContainerStyle={styles.inputContainerStyle}
        leftIcon={<Icon name='home' size={24} color='black' />}
        onChangeText={this.churchStreetChange.bind(this)}
        value={churchStreet}
      />
      </CardSection>
      <CardSection>
      <Input
        placeholder='City'
        inputContainerStyle={styles.inputContainerStyle}
        leftIcon={<Icon name='home' size={24} color='black' />}
        onChangeText={this.churchCityChange.bind(this)}
        value={churchCity}
      />
      </CardSection>
      <CardSection>
      <Input
        placeholder='State'
        inputContainerStyle={styles.inputContainerStyle}
        leftIcon={<Icon name='home' size={24} color='black' />}
        onChangeText={this.churchStateChange.bind(this)}
        value={churchState}
      />
      </CardSection>
      <CardSection>
      <Input
        placeholder='ZIP'
        inputContainerStyle={styles.inputContainerStyle}
        leftIcon={<Icon name='home' size={24} color='black' />}
        onChangeText={this.churchZipChange.bind(this)}
        value={churchZip}
      />
      </CardSection>
      <CardSection>
      <View style={{ flex: 1 }}>
        <Text style={{ fontWeight: '700', paddingLeft: 20 }}>Mass Time:</Text>
        <FlatList
        data={massTimes}
        renderItem={(val) => (
          <View style={{ flex: 1, paddingTop: 10, paddingBottom: 5,
            paddingRight: 10, paddingLeft: 20, flexDirection: 'row',
           justifyContent: 'space-between' }}
          >
          <Text>{val.item}</Text>
          <Button
          title=''
          icon={<Icon name='clear' size={16} />}
          onPress={this.deleteMassTimeChange.bind(this, val.index)}
          />
          </View>
        )}
        />
      </View>
      </CardSection>
      {this.renderDateItem()}
      <CardSection>
      <View style={{ flex: 1 }}>
      <Button
        icon={<Icon name='add' size={24} color='white' />}
        title={addMassTime ? 'Save Mass Time' : 'Add Mass Time'}
        onPress={this.handleMassTimeChange.bind(this)}
      />
      </View>
      </CardSection>
      <CardSection>
      <View style={{ flex: 1 }}>
      <Button
        icon={<Icon name='save' size={24} color='white' />}
        title='SAVE'
        onPress={this.saveChurch.bind(this)}
      />
      </View>
      </CardSection>
      </Card>
      </ScrollView>
    );
  }
}

const mapStateToProps = state => ({
  churchName: state.addChurchForm.churchName,
  churchPhoneNumber: state.addChurchForm.churchPhoneNumber,
  churchStreet: state.addChurchForm.churchStreet,
  churchCity: state.addChurchForm.churchCity,
  churchState: state.addChurchForm.churchState,
  churchZip: state.addChurchForm.churchZip,
  massTime: state.addChurchForm.massTime,
  massTimes: state.addChurchForm.massTimes,
  addMassTime: state.addChurchForm.addMassTime,
  error: state.addChurchForm.error
});

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderColor: 'rgba(255, 255, 255, 0)'
  }
});


export default connect(mapStateToProps, {
  churchNameChange,
  churchPhoneNumberChange,
  churchStreetChange,
  churchCityChange,
  churchStateChange,
  churchZipChange,
  massTimeChange,
  addMassTimeChange,
  saveMassTimeChange,
  deleteMassTimeChange,
  saveChurch
})(AddChurchForm);
