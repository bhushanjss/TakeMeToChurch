import React, { Component } from 'react';
import { View, Linking } from 'react-native';
import { Avatar, Text, Icon } from 'react-native-elements';
import { Card, CardSection } from './common';


class DriversItem extends Component {

  openEmail() {
    const { email } = this.props.driver.email;
    if (email) {
       Linking.openURL(`mailto:${email}`);
     }
  }

  openPhoneCall() {
    Linking.openURL(`tel:${this.props.driver.phoneNumber}`);
  }

  openPhoneMsg() {
    Linking.openURL(`sms:${this.props.driver.phoneNumber}`);
  }

  showProfileIcon() {
    const { firstName, lastName, profileImgUrl } = this.props.driver;    

    if(!profileImgUrl) {
      const title = firstName.charAt(0) + lastName.charAt(0);
      return (<Avatar
              title={title}
              size="large"
              rounded
              onPress={() => console.log('Works!')}
              activeOpacity={0.7}
            />);
    }

    return (<Avatar
              size="large"
              rounded
              source={{ uri: profileImgUrl }}
              onPress={() => console.log('Works!')}
              activeOpacity={0.7}
            />);
  }

  render() {
    const { firstName, lastName, carModel, carSeats, profileImgUrl } = this.props.driver;
    return (
      <Card>
          <CardSection>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }} >
            { this.showProfileIcon() }
            <View style={{ flex: 1, paddingLeft: 20, paddingRight: 10,
              justifyContent: 'flex-start' }}
            >
              <Text h4>{firstName} {lastName}</Text>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>{carModel} ATS</Text>
                <Text>{carSeats} Seats</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Icon name='email' onPress={this.openEmail.bind(this)} />
                <Icon name='message' onPress={this.openPhoneMsg.bind(this)} />
                <Icon name='phone' onPress={this.openPhoneCall.bind(this)} />
              </View>
            </View>
          </View>
          </CardSection>
          <CardSection>
             <View style={{ flex: 1, paddingLeft: 20 }}>
                <Text>St Johns Catholic Church</Text>
                <View style={{ flex: 1, justifyContent: 'flex-start' }}>
                  <Text>Sunday 11:00 AM</Text>
                  <Text>Sunday 7:00 PM</Text>
                </View>
            </View>
          </CardSection>
      </Card>
    );
  }
}


export default DriversItem;
