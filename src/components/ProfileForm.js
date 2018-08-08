import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Input, Icon, Button, CheckBox } from 'react-native-elements';

import { Card, CardSection } from './common';

class ProfileForm extends Component {

  renderform() {

  }
  render() {
    let isChecked = false;
    return (
      <ScrollView>
      <Card >
      <CardSection>
      <Input
        placeholder='First Name'
        inputContainerStyle={styles.inputContainerStyle}
        leftIcon={<Icon name='person' size={24} color='black' />}
      />
      </CardSection>
      <CardSection>
      <Input
        placeholder='Last Name'
        inputContainerStyle={styles.inputContainerStyle}
        leftIcon={<Icon name='person' size={24} color='black' />}
      />
      </CardSection>
      <CardSection>
      <Input
        placeholder='Phone Number'
        keyboardType='phone-pad'
        inputContainerStyle={styles.inputContainerStyle}
        leftIcon={<Icon name='person' size={24} color='black' />}
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
        placeholder='Apartment/Unit'
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
      <View style={{ flex: 1 }}>
        <CheckBox containerStyle={{ backgroundColor: '#fff', flex: 1, flexDirection: 'row' }} title='Would you like to Drive?' checked={isChecked} />
      </View>
      </CardSection>
      <CardSection>
      <Input
        placeholder='Car Model'
        inputContainerStyle={styles.inputContainerStyle}
        leftIcon={<Icon name='train' size={24} color='black' />}
      />
      </CardSection>
      <CardSection>
      <Input
        placeholder='No of Seats'
        inputContainerStyle={styles.inputContainerStyle}
        leftIcon={<Icon name='event_seat' size={24} color='black' />}
      />
      </CardSection>
      <CardSection>
      <View style={{ flex: 1 }}>
      <Button
        icon={
          <Icon
            name='save'
            size={24}
            color='white'
          />
        }
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


export default ProfileForm;
