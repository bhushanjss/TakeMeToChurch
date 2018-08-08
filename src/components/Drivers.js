import React, { Component } from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Avatar, Text, Icon } from 'react-native-elements';
import { Card, CardSection } from './common';


class Drivers extends Component {

  render() {
    return (
      <ScrollView>
      <Card>
          <CardSection>
          <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }} >
            <Avatar
              size="large"
              rounded
              source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"}}
              onPress={() => console.log("Works!")}
              activeOpacity={0.7}
            />
            <View style={{ flex: 1, paddingLeft: 20, paddingRight: 10, justifyContent: 'flex-start' }}>
              <Text h4>Katie Singh</Text>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text>Cadillac ATS</Text>
                <Text>4 Seats</Text>
              </View>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Icon name='email' />
                <Icon name='message' />
                <Icon name='phone' />
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
        <Card>
            <CardSection>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }} >
              <Avatar
                size="large"
                rounded
                source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"}}
                onPress={() => console.log("Works!")}
                activeOpacity={0.7}
              />
              <View style={{ flex: 1, paddingLeft:20, justifyContent: 'flex-start' }}>
                <Text h4>Katie Singh</Text>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Text>Cadillac ATS</Text>
                  <Text>4 Seats</Text>
                </View>
                <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                  <Icon name='email' />
                  <Icon name='message' />
                  <Icon name='phone' />
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
      </ScrollView>
    );
  }
}

export default Drivers;
