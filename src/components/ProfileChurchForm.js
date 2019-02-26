import React, { Component } from 'react';
import _ from 'lodash';
import { connect } from 'react-redux';
import { View, ScrollView, StyleSheet, FlatList } from 'react-native';
import { Input, Icon, Button, Text } from 'react-native-elements';
import { Dropdown } from 'react-native-material-dropdown';
import DatePicker from 'react-native-datepicker';

import { churchLookUp, profileAddMassDropdown, profileChurchDeleteMassTime,
 saveProfileChurches, loadProfileChurches, editChurchMass, profileChurchMakeDefault } from '../actions/forms/';
 import { getDrivers } from '../actions/entities';

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

  componentWillMount() {
    if(!this.props.editChurchName)
    {
      this.props.loadProfileChurches();
    }
  }

  churchLookUp() {
    this.props.churchLookUp();
  }

  handleDropdownSelection(value, index) {
    this.props.profileAddMassDropdown(value);
  }

  deleteMassTime(val) {
    this.props.profileChurchDeleteMassTime(val);
  }

  makeDefault() {
    this.props.profileChurchMakeDefault();    
  }

  editChurchMassTime(placeId) {
    this.props.editChurchMass(placeId);
  }

  getDrivers(placeId) {
    this.props.getDrivers(placeId);
  }

  saveChurch() {
    const { myChurches, editChurchName, editChurchCity, selectedMassTimes, editChurchDefault, 
      editChurchPlaceId, isChecked } 
    = this.props;
    const church = {
      churchName: editChurchName,
      churchCity: editChurchCity,
      massTimes: selectedMassTimes,
      churchPlaceId: editChurchPlaceId,
      churchDefault: editChurchDefault
    };
    const churches = myChurches ? ( editChurchDefault ? [church, ...myChurches] : 
      [ ...myChurches, church]) : [church];
    this.props.saveProfileChurches(churches, isChecked);
  }

  cancelProfileChurch() {
    this.props.loadProfileChurches();
  }

  churchItem = ({item}) => {
   return (
   <CardSection>
    <View style={{ flex: 1, flexDirection: 'column' }}>
      <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
        <View style={{ paddingLeft: 10 }}>
          <Text h4>{item.churchName}</Text>
          <Text>{item.churchCity}</Text>
          <View style={{ flex: 1, paddingBottom: 5, justifyContent: 'flex-start' }}>
            <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontWeight: '500', paddingTop: 5, paddingBottom: 5 }}>Mass Time:</Text>
              <Button
                  title=''
                  style={{ paddingLeft: 10}}
                  buttonStyle={{ backgroundColor: 'white', marginRight: 10 }}
                  icon={<Icon name='drive-eta' size={24} />}
                  onPress={this.getDrivers.bind(this, item.churchPlaceId)}
              />
              <Button
                icon={<Icon name='edit' size={24} /> }
                onPress={this.editChurchMassTime.bind(this, item.churchPlaceId)}
                title=''
                buttonStyle={{ backgroundColor: 'white', marginRight: 10 }}
                disabled={this.props.editChurchName ? true : false}
              />
            </View>
            <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'space-between' }}>  
              <FlatList
              data={item.massTimes}
              renderItem={(val) => (
                <View style={{ flex: 1, paddingBottom: 5, flexDirection: 'row',
                 justifyContent: 'space-between' }}>
                  <Text>{val.item}</Text>
                </View>
              )} />
            </View>
          </View>
        </View>       
      </View>            
    </View>  
   </CardSection>
   );
  };

  editChurch() {
    const { editChurchName, selectedMassTimes, editChurchCity, editChurchDefault } = this.props;
    if(editChurchName) {
    return (
     <CardSection>
      <View style={{ flex: 1, flexDirection: 'column' }}>
        <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
          <View style={{ paddingLeft: 10 }}>
            <Text h4>{editChurchName}</Text>
            <Text>{editChurchCity}</Text>
            <View style={{ flex: 1, paddingBottom: 5, justifyContent: 'flex-start' }}>
              <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'space-between' }}>
                <Text style={{ fontWeight: '500', paddingTop: 5, paddingBottom: 5 }}>Mass Time:</Text>
              </View>  
              <View style={{ flex: 1, flexDirection: 'column', justifyContent: 'flex-start' }}>
                <FlatList
                data={selectedMassTimes}
                renderItem={(val) => (
                  <View style={{ flex: 1, flexDirection: 'row',
                   justifyContent: 'space-between' }}>
                    <Text>{val.item}</Text>
                    <Button
                      title=''
                      onPress={this.deleteMassTime.bind(this, val.item)}
                      style={{ paddingLeft: 10}}
                      buttonStyle={{ backgroundColor: 'white', marginRight: 10 }}
                      icon={<Icon name='clear' size={20} />}
                      />
                  </View>
                )} />
              </View>  
            </View>
          </View>       
        </View> 
        { this.massDropDown() }
        <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10 }}>
        <Button
          style={{ paddingBottom:10 }}
          icon={<Icon name='save' size={24} color='white' />}
          title='Make Default'
          disabled={editChurchDefault}
          onPress={this.makeDefault.bind(this)}
          />
        <Button
          style={{ paddingBottom:10 }}
          icon={<Icon name='save' size={24} color='white' />}
          title='SAVE'
          onPress={this.saveChurch.bind(this)}
          />    
        <Button
          icon={<Icon name='save' size={24} color='white' />}
          title='CANCEL'
          onPress={this.cancelProfileChurch.bind(this)}
        />      
        </View>                    
      </View>       
    </CardSection> 
   );
    }
  };

  massDropDown() {
    const { dropdowList, showDropDown } = this.props;
    if(showDropDown) {
      const dropDownValue = dropdowList[0].value;
      return (
        <View style={{ flex: 1, paddingLeft: 10, paddingRight: 10,
         flexDirection: 'column', justifyContent: 'flex-start' }}>
          <Dropdown label='Available Mass Times' data={dropdowList}
            onChangeText={this.handleDropdownSelection.bind(this)}  
          />
        </View>
      );
    }
  }

  renderChurchList() {

    const { myChurches, showMyChurches } = this.props;
    const noListMsg = 'No Church Found. Please Add One!';

    if(showMyChurches) {
      return (
        <FlatList
          data={myChurches}
          keyExtractor={(item, index) => item.churchPlaceId}
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
      <Header headerText='My Church Times' />   
      <Card >
        {this.editChurch()}
      <View style={{ flex: 1, flexDirection: 'row', justifyContent: 'flex-start', padding: 10 }}>
        {this.renderChurchList()}
      </View>
      <CardSection>
        <View style={{ flex: 1 }}>
          <Button
            icon={<Icon name='add' size={24} color='white' />}
            title='Add Church'
            onPress={this.churchLookUp.bind(this)}
            disabled={this.props.editChurchName ? true : false}
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
  showMyChurches: state.profileChurch.myChurches && state.profileChurch.myChurches.length,
  editChurchName: state.profileChurch.editChurchName,
  editChurchCity: state.profileChurch.editChurchCity,
  selectedMassTimes: state.profileChurch.selectedMassTimes,
  editChurchPlaceId: state.profileChurch.editChurchPlaceId,
  editChurchDefault: state.profileChurch.editChurchDefault || !state.profileChurch.myChurches,
  dropdowList: _.map(state.profileChurch.editChurchMassTimes,
   val => ( { value: val } )),
  showDropDown: state.profileChurch.editChurchMassTimes && state.profileChurch.editChurchMassTimes.length,
  isChecked: state.entities.profile.isChecked
});


export default connect(mapStatesToProps, {
  churchLookUp,
  profileAddMassDropdown,
  profileChurchDeleteMassTime,
  saveProfileChurches, 
  loadProfileChurches,
  editChurchMass,
  profileChurchMakeDefault,
  getDrivers
})(ProfileChurchForm);
