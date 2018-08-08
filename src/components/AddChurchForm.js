import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Input, Icon, Button, Text } from 'react-native-elements';
import DatePicker from 'react-native-datepicker';

import { Card, CardSection } from './common';

class AddChurchForm extends Component {

  renderform() {

  }
  render() {
    return (
      <ScrollView>
      <Card >
      <CardSection>
      <Input
        placeholder='Church Name'
        inputContainerStyle={styles.inputContainerStyle}
        leftIcon={<Icon name='person' size={24} color='black' />}
      />
      </CardSection>
      <CardSection>
      <Input
        placeholder='Phone Number'
        keyboardType='phone-pad'
        inputContainerStyle={styles.inputContainerStyle}
        leftIcon={<Icon name='phone' size={24} color='black' />}
      />
      </CardSection>
      <CardSection>
      <Input
        placeholder='Street'
        inputContainerStyle={styles.inputContainerStyle}
        leftIcon={<Icon name='home' size={24} color='black' />}
      />
      </CardSection>
      <CardSection>
      <Input
        placeholder='City'
        inputContainerStyle={styles.inputContainerStyle}
        leftIcon={<Icon name='home' size={24} color='black' />}
      />
      </CardSection>
      <CardSection>
      <Input
        placeholder='State'
        inputContainerStyle={styles.inputContainerStyle}
        leftIcon={<Icon name='home' size={24} color='black' />}
      />
      </CardSection>
      <CardSection>
      <Input
        placeholder='ZIP'
        inputContainerStyle={styles.inputContainerStyle}
        leftIcon={<Icon name='home' size={24} color='black' />}
      />
      </CardSection>
      <CardSection>
        <View style={{ flex: 1, paddingLeft: 20 }}>
          <Text h4>Mass Times: </Text>
          <Text>Sun 10:00 AM</Text>
          <Text>Sun 11:00 AM</Text>
          <Text>Sun 12:00 PM</Text>
        </View>
      </CardSection>
      <CardSection>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <DatePicker
          style={{ width: 200 }}
          mode="datetime"
          format="HH:mm A"
          confirmBtnText="Ok"
          cancelBtnText="Cancel"
          customStyles={{ dateIcon: { display: 'none' } }}
          onDateChange={(time) => this.destinationTimeChange(time)}
        />
      </View>
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


export default AddChurchForm;
