import React, { Component } from 'react';
import { View, ScrollView, StyleSheet, Picker } from 'react-native';
import { Input, Icon, Button, Text } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

import { Card, CardSection } from './common';

class ProfileChurchForm extends Component {

  renderform() {

  }
  render() {
    return (
      <ScrollView>
      <Card >
      <CardSection>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', padding: 10 }}>
        <View style={{ paddingLeft: 10 }}>
          <Text h4>St Johns Catholic Church</Text>
          <View style={{ flex: 1, paddingTop: 5, paddingBottom: 5, justifyContent: 'flex-start' }}>
            <Text style={{ fontWeight: '700' }}>Mass Time:</Text>
            <View style={{ flex: 1, paddingTop: 5, paddingBottom: 5, flexDirection: 'row',
             justifyContent: 'space-between' }}>
              <Text>Sunday 11:00 AM</Text><Icon name='clear' size={16} />
            </View>
              <View style={{ flex: 1, paddingTop: 5, paddingBottom: 5, flexDirection: 'row',
               justifyContent: 'space-between' }}>
              <Text>Sunday 7:00 PM</Text><Icon name='clear' size={16} />
            </View>
          </View>
        </View>
      </View>
      </CardSection>
      <CardSection>
        <Picker selectedValue="sunday1200pm" style={{ marginTop: -80,
          marginBottom: -80, flex: 1 }}
        >
          <Picker.Item label="Sunday 11:00 AM" value="sunday1100am" />
          <Picker.Item label="Sunday 12:00 PM" value="sunday1200pm" />
          <Picker.Item label="Sunday 4:00 PM" value="sunday400pm" />
          <Picker.Item label="Sunday 7:00 PM" value="sunday700pm" />
        </Picker>
      </CardSection>
      <CardSection>
        <View style={{ flex: 1 }}>
          <Button
            icon={<Icon name='add' size={24} color='white' />}
            title='Add Mass Time'
          />
        </View>
      </CardSection>
      <CardSection>
        <View style={{ flex: 1 }}>
          <Button
            icon={<Icon name='add' size={24} color='white' />}
            title='Add Church'
          />
        </View>
      </CardSection>
      <CardSection>
      <View style={{ flex: 1 }}>
      <Button
        icon={<Icon name='save' size={24} color='white' />}
        title='SAVE'
      />
      </View>
      </CardSection>
      </Card>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  inputContainerStyle: {
    borderColor: 'rgba(255, 255, 255, 0)'
  }
});


export default ProfileChurchForm;
