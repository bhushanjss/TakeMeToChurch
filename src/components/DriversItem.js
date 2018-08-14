import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Avatar, Text, Icon } from 'react-native-elements';
import Autolink from 'react-native-autolink';
import { Card, CardSection } from './common';


class DriversItem extends Component {
  render() {
    const { firstName, lastName, phoneNumber, carModel, carSeats, isChecked } = this.props.driver;
    return (
      <Card>
          <CardSection>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }} >
            <Avatar
              size="large"
              rounded
              source={{ uri: 'https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg' }}
              onPress={() => console.log('Works!')}
              activeOpacity={0.7}
            />
            <View style={{ flex: 1, paddingLeft: 20, paddingRight: 10,
              justifyContent: 'flex-start' }}
            >
              <Text h4>{firstName} {lastName}</Text>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>{carModel} ATS</Text>
                <Text>{carSeats} Seats</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Icon name='email' />
                <Icon name='message' >
                  <Autolink text='sms:{phoneNumber}' />
                </Icon>
                <Icon name='phone'>
                  <Autolink text='tel:{phoneNumber}' />
                </Icon>
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
