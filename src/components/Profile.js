import React, { Component } from 'react';
import { View, ScrollView } from 'react-native';
import { Card, Avatar, Text, Icon } from 'react-native-elements';


class Profile extends Component {

  renderform() {

  }
  render() {
    return (
      <ScrollView>
        <Card>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center' }}>
        <Avatar
          size="large"
          rounded
          source={{uri: "https://s3.amazonaws.com/uifaces/faces/twitter/brynn/128.jpg"}}
          onPress={() => console.log("Works!")}
          activeOpacity={0.7}
          />
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'center', paddingTop: 10 }}>
          <Text h3>Katie Singh</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', padding: 10 }}>
          <Icon name='phone' />
          <Text style={{ paddingLeft: 30 }}>+1 123 456 7890</Text>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', padding: 10 }}>
          <Icon name='home' />
          <View style={{ paddingLeft: 30 }}>
            <Text>3219 W Wilson Ave</Text>
            <Text>Apt 2</Text>
            <Text>Chicago</Text>
            <Text>IL 60625</Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', padding: 10 }}>
          <Icon name='home' />
          <View style={{ paddingLeft: 30 }}>
            <Text>St Johns Catholic Church</Text>
            <View style={{ flex: 1, justifyContent: 'flex-start' }}>
              <Text>Mass Time:</Text>
              <Text>Sunday 11:00 AM</Text>
              <Text>Sunday 7:00 PM</Text>
            </View>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', padding: 10 }}>
          <Icon name='train' />
          <View style={{ paddingLeft: 30 }}>
            <Text>Cadillac ATS</Text>
            <Text>4 Seats</Text>
          </View>
        </View>
        <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', padding: 10 }}>
          <Icon name='event' />
          <View style={{ paddingLeft: 30 }}>
            <Text>Cadillac ATS</Text>
          </View>
        </View>
        </Card>
      </ScrollView>
    );
  }
}



export default Profile;
