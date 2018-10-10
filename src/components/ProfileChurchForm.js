import React, { Component } from 'react';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Input, Icon, Button, Text } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';

import { Card, CardSection, Header } from './common';
class ProfileChurchForm extends Component {

  static navigationOptions = {
    title: 'Manage Church',
    headerStyle: {
      backgroundColor: '#f4511e',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
    },
  };

  churchItem = ({item}) => {
   return (
   <CardSection>
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start' }}>
        <View style={{ paddingLeft: 10 }}>
          <Text h4>{item.churchName}</Text>
          <View style={{ flex: 1, paddingBottom: 5, justifyContent: 'flex-start' }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: '700' }}>Mass Time:</Text>
              { this.renderAddMassButton() }
            </View>  
            <FlatList
            data={item.massTimes}
            renderItem={(val) => (
              <View style={{ flex: 1, paddingTop: 5, paddingBottom: 5, flexDirection: 'row',
               justifyContent: 'space-between' }}>
                <Text>{val.item}</Text>
                <Button
                  title=''
                  style={{ paddingLeft: 10}}
                  icon={<Icon name='clear' size={16} />}
                  />
              </View>
            )} />
          </View>
        </View>       
      </View>
      { this.renderAddMassTime() }       
    </View>  
  </CardSection>
  );
};

renderAddMassButton = () => {
  return (
    <Button
      icon={<Icon name='add' size={16} color='white' />}
      title=''
    />
  );
}

renderAddMassTime = () => {
  return (
  <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <Dropdown
          label='Mass Times'
          data={[{
              value: 'Sunday 11:00 AM',
            }, {
              value: 'Sunday 12:00 PM',
            }, {
              value: 'Sunday 4:00 PM',
            }, {
              value: 'Sunday 7:00 PM',
            }]}
        />
      </View>
  );
}

  renderChurchList() {

    const { myChurches } = this.props;
    const noListMsg = 'No Church Found. Please Add One!';

    if(myChurches.length > 0) {
      return (
        <FlatList
          data={myChurches}
          keyExtractor={(item, index) => item.churchName}
          renderItem={this.churchItem}
        />
      )
    }    
    return (
      <View style={{ alignItems: 'center', flex: 1 }}>
        <Text>{ noListMsg }</Text>
      </View>
    );  
  }

  render() {
    return (
      <ScrollView>     
      <Card >     
      <Header headerText='My Church Times' />       
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', padding: 10 }}>
      {this.renderChurchList()}
      </View>
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

const mapStatesToProps = state => ({
  myChurches: state.profileChurch.myChurches,
  
});


export default connect(mapStatesToProps)(ProfileChurchForm);
