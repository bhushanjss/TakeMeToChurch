import React, { Component } from 'react';
import { View, Linking, FlatList } from 'react-native';
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

  renderChurch() {
    const { churches } = this.props.driver;
    const defaultChurch = churches ? churches[0] : null;
    if(defaultChurch) {
      return (
        <CardSection>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start', padding: 10 }}>
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
        </CardSection>
      );
    }
  }

  render() {
    const { firstName, lastName, carModel, carSeats, profileImgUrl, churches } = this.props.driver;
    
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
          {this.renderChurch()}          
      </Card>
    );
  }
}


export default DriversItem;
